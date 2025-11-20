// Fichier : apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Flag pour éviter les boucles de rafraîchissement infinies
let isRefreshing = false;
// File d'attente pour les requêtes échouées pendant le rafraîchissement
let failedQueue: Array<{resolve: Function, reject: Function}> = [];

/**
 * Traite les requêtes en attente après un rafraîchissement de token.
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      // Résout la promesse de la requête en attente pour la relancer
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Fonction asynchrone pour importer authService uniquement en cas de besoin (pour rompre la dépendance circulaire).
 */
async function getAuthService() {
    if (typeof window !== 'undefined') {
        try {
            const { authService } = await import('./authService');
            return authService;
        } catch (e) {
            console.error("Failed to dynamically import authService:", e);
            throw new Error('Auth service not found.');
        }
    }
    // Empêche l'exécution côté serveur (SSR) si non requis
    throw new Error('AuthService is not available during SSR execution.');
}

class ApiClient {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    isRetry = false 
  ): Promise<T> {

    const isAuthEndpoint = endpoint.startsWith('/auth/login') || endpoint.startsWith('/auth/register');
    // Le Refresh Token est souvent géré par un cookie, donc on n'ajoute pas l'Access Token pour le refresh
    const isRefreshEndpoint = endpoint.startsWith('/auth/refresh');
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(!isAuthEndpoint && !isRefreshEndpoint && token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      // Important : Permet d'envoyer les cookies (Refresh Token)
      credentials: 'include', 
      ...options,
    };

    // Si nous sommes en train de rafraîchir, mettez la requête en attente
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        // Ajoute la requête à la file d'attente pour être relancée plus tard
        failedQueue.push({ 
            resolve: (token: string | null) => {
                // Relance la requête avec le nouveau token
                const newConfig = { ...options, headers: { ...options.headers, Authorization: `Bearer ${token}` } };
                resolve(this.request<T>(endpoint, newConfig, true));
            }, 
            reject 
        });
      }) as Promise<T>;
    }

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`🌐 Making request to: ${url}`, config);
      const response = await fetch(url, config);

      if (!response.ok) {
        // --- LOGIQUE D'INTERCEPTION 401 ---
        if (response.status === 401 && !isAuthEndpoint && !isRetry) {
          console.warn('⚠️ 401 Unauthorized. Attempting token refresh...');
          isRefreshing = true;

          try {
                const authService = await getAuthService(); 
                const refreshSuccess = await authService.refreshToken();
                
                if (refreshSuccess) {
                  console.log('🔄 Retrying original request...');
                  const newToken = localStorage.getItem('accessToken');
                  processQueue(null, newToken);
                  // Relance immédiatement la requête originale
                  return this.request<T>(endpoint, options, true); 
                } else {
                  // Le refresh a échoué -> déconnexion
                  const error = new Error('Session expirée. Veuillez vous reconnecter.');
                  processQueue(error, null);
                  // Déconnecte l'utilisateur et redirige (logique dans authService)
                    authService.logout(); 
                  throw error;
                }
          } catch (error: any) {
            processQueue(error, null);
            throw error;
          } finally {
            isRefreshing = false;
          }
        }
        // --- FIN DE LA LOGIQUE D'INTERCEPTION ---

        // Gestion des autres erreurs HTTP (y compris le 401 si isRetry était true)
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        
        // Log détaillé pour le débogage
        console.error(`❌ API Error [${response.status}] for ${endpoint}:`, {
          status: response.status,
          statusText: response.statusText,
          url,
          errorMessage
        });
        
        throw new Error(errorMessage);
      }

      // Gestion des réponses sans contenu (ex: 204 No Content)
      if (response.status === 204) {
        return {} as T;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ API request failed for ${API_BASE_URL}${endpoint}:`, error);
      
      // Amélioration des messages d'erreur pour les problèmes réseau
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        const networkError = new Error(
          `Impossible de se connecter au serveur. Vérifiez que le serveur est démarré sur ${API_BASE_URL}`
        );
        console.error('💡 Conseil: Vérifiez que votre serveur backend est en cours d\'exécution');
        throw networkError;
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    // Construction des paramètres de requête
    let url = endpoint;
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key].toString());
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Méthode pour tester la connexion à l'API
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testing API connection...');
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        console.log('✅ API connection successful');
        return true;
      } else {
        console.warn('⚠️ API connection test failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ API connection test failed:', error);
      return false;
    }
  }
}

export const apiClient = new ApiClient();