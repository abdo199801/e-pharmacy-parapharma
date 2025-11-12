import { apiClient } from './apiClient';

// --- INTERFACES MISES À JOUR ---

export interface LoginData {
  email: string;
  password: string;
  userType: 'pharmacist' | 'client';
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
}

// Le backend DOIT maintenant renvoyer accessToken et refreshToken
export interface AuthResponse {
  success: boolean;
  message: string;
  client: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Réponse attendue de l'endpoint /auth/refresh
export interface RefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken?: string; // Le backend peut optionnellement rafraîchir le refresh token
}


export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting login for:', credentials.email);
      
      const { userType, ...backendCredentials } = credentials;
      
      const response = await apiClient.post<AuthResponse>('/auth/login', backendCredentials);
      
      if (response.success) {
        console.log('✅ Login successful for:', credentials.email);
        // Sauvegarde des DEUX tokens
        this.saveAuthData(response.accessToken, response.refreshToken, response.client);
      } else {
        console.warn('⚠️ Login failed:', response.message);
      }
      
      return response;
    } catch (error: any) {
      console.error('❌ Login service error:', error);
      if (error.message?.includes('Network') || error.message?.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      }
      throw error;
    }
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      console.log('👤 Attempting registration for:', userData.email);
      
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      
      if (response.success) {
        console.log('✅ Registration successful for:', userData.email);
        // Sauvegarde des DEUX tokens
        this.saveAuthData(response.accessToken, response.refreshToken, response.client);
      } else {
        console.warn('⚠️ Registration failed:', response.message);
      }
      
      return response;
    } catch (error: any) {
      console.error('❌ Register service error:', error);
      if (error.message?.includes('Network') || error.message?.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      }
      if (error.message?.includes('already exists') || error.message?.includes('already registered')) {
        throw new Error('Cette adresse email est déjà utilisée.');
      }
      throw error;
    }
  },

  /**
   * [NOUVEAU] Tente de rafraîchir l'access token en utilisant le refresh token
   */
  async refreshToken(): Promise<boolean> {
    console.log('🔄 Attempting token refresh...');
    const currentRefreshToken = this.getRefreshToken();
    if (!currentRefreshToken) {
      console.log('🚫 No refresh token found. Logging out.');
      this.logout();
      return false;
    }

    try {
      const response = await apiClient.post<RefreshResponse>('/auth/refresh', {
        token: currentRefreshToken
      });

      if (response.success) {
        // Sauvegarde le nouvel accessToken
        localStorage.setItem('accessToken', response.accessToken);
        
        // Si le backend a fait une rotation du refresh token, on le sauvegarde aussi
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        console.log('✅ Token refresh successful');
        return true;
      } else {
        throw new Error('Refresh failed');
      }
    } catch (error) {
      console.error('❌ Token refresh failed. Forcing logout.', error);
      this.logout(); // Le refresh token est invalide ou a expiré
      return false;
    }
  },

  /**
   * [MIS À JOUR] Save authentication data to localStorage
   */
  saveAuthData(accessToken: string, refreshToken: string, user: any) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('💾 Auth data (access, refresh, user) saved to localStorage');
      } catch (error) {
        console.error('❌ Failed to save auth data to localStorage:', error);
      }
    }
  },

  /**
   * [MIS À JOUR] Clear authentication data
   */
  logout() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        console.log('🚪 User logged out, all tokens cleared');
        // Optionnel : rediriger vers la page de login
        // window.location.href = '/login';
      } catch (error) {
        console.error('❌ Failed to clear auth data:', error);
      }
    }
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser() {
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error('❌ Failed to get current user:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * [MIS À JOUR] Get JWT access token from localStorage
   */
  getAccessToken() {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('accessToken');
      } catch (error) {
        console.error('❌ Failed to get accessToken:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * [NOUVEAU] Get JWT refresh token from localStorage
   */
  getRefreshToken() {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('refreshToken');
      } catch (error) {
        console.error('❌ Failed to get refreshToken:', error);
        return null;
      }
    }
    return null;
  },


  /**
   * [MIS À JOUR] Check if user is authenticated
   */
  isAuthenticated() {
    const token = this.getAccessToken(); // Vérifie l'access token
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      // Si l'access token est expiré, l'intercepteur de l'apiClient
      // devrait s'en charger. Mais pour une vérif synchrone,
      // on peut le considérer comme "non authentifié" pour l'instant.
      if (isExpired) {
        // Ne pas déconnecter ici, laisser le refresh token tenter sa chance
        return false; 
      }
      return true;
    } catch {
      return false;
    }
  },

  // ... Le reste de vos fonctions (getUserRole, isPharmacist, isClient) reste inchangé
   /**
   * Get user role
   */
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  },

  /**
   * Check if user is pharmacist
   */
  isPharmacist(): boolean {
    return this.getUserRole() === 'ADMINISTRATORCLIENT';
  },

  /**
   * Check if user is client
   */
  isClient(): boolean {
    return this.getUserRole() === 'NORMALCLIENT';
  }
};