import { apiClient } from './apiClient';

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
  token?: string; // Added for backward compatibility
}

export interface RefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken?: string;
}

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      console.log('🔐 Attempting login for:', credentials.email);
      
      const { userType, ...backendCredentials } = credentials;
      
      const response = await apiClient.post<any>('/auth/login', backendCredentials);
      
      // Handle both response formats (accessToken vs token)
      const formattedResponse: AuthResponse = {
        ...response,
        accessToken: response.accessToken || response.token,
        refreshToken: response.refreshToken || response.token || ''
      };
      
      if (formattedResponse.success) {
        console.log('✅ Login successful for:', credentials.email);
        this.saveAuthData(formattedResponse.accessToken, formattedResponse.refreshToken, formattedResponse.client);
        
        // Redirect to appropriate dashboard based on role
        this.redirectAfterAuth(formattedResponse.client.role);
      } else {
        console.warn('⚠️ Login failed:', response.message);
      }
      
      return formattedResponse;
    } catch (error: any) {
      console.error('❌ Login service error:', error);
      if (error.message?.includes('Network') || error.message?.includes('Failed to fetch')) {
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      }
      throw error;
    }
  },

  /**
   * Register a new user - REDIRECT TO LOGIN VERSION
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      console.log('👤 Attempting registration for:', userData.email);
      
      const response = await apiClient.post<any>('/auth/register', userData);
      
      // Handle both response formats (accessToken vs token)
      const formattedResponse: AuthResponse = {
        ...response,
        accessToken: response.accessToken || response.token,
        refreshToken: response.refreshToken || response.token || ''
      };
      
      if (formattedResponse.success) {
        console.log('✅ Registration successful for:', userData.email);
        
        // DO NOT auto-login - just store registration success for login page
        if (typeof window !== 'undefined') {
          localStorage.setItem('registrationSuccess', 'true');
          localStorage.setItem('registeredEmail', userData.email);
          
          // Redirect to login page after short delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      } else {
        console.warn('⚠️ Registration failed:', response.message);
      }
      
      return formattedResponse;
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
   * Check if there's a successful registration to show message on login page
   */
  checkRegistrationSuccess(): { success: boolean; email?: string } {
    if (typeof window !== 'undefined') {
      try {
        const success = localStorage.getItem('registrationSuccess');
        const email = localStorage.getItem('registeredEmail');
        
        if (success === 'true' && email) {
          // Clear the flags so message only shows once
          localStorage.removeItem('registrationSuccess');
          localStorage.removeItem('registeredEmail');
          return { success: true, email };
        }
      } catch (error) {
        console.error('❌ Failed to check registration success:', error);
      }
    }
    return { success: false };
  },

  /**
   * Redirect user to appropriate page after authentication
   */
  redirectAfterAuth(role: string) {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (role === 'ADMINISTRATORCLIENT') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      }, 1000); // Small delay to ensure tokens are saved
    }
  },

  /**
   * Refresh token
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
        localStorage.setItem('accessToken', response.accessToken);
        
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
      this.logout();
      return false;
    }
  },

  /**
   * Save authentication data to localStorage
   */
  saveAuthData(accessToken: string, refreshToken: string, user: any) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('💾 Auth data saved to localStorage');
      } catch (error) {
        console.error('❌ Failed to save auth data to localStorage:', error);
      }
    }
  },

  /**
   * Clear authentication data
   */
  logout() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        console.log('🚪 User logged out');
        window.location.href = '/login';
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
   * Get JWT access token from localStorage
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
   * Get JWT refresh token from localStorage
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
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        return false; 
      }
      return true;
    } catch {
      return false;
    }
  },

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