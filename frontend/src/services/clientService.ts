import { apiClient } from '../lib/apiClient';

export interface Client {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
  createdAt: string;
  totalOrders?: number;
  totalSpent?: number;
  hasPharmacy?: boolean;
  activeSubscription?: {
    packName: string;
    price: number;
    endDate: string;
  } | null;
}

export interface CreateClientData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
}

export interface UpdateClientData {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
}

export interface ClientsResponse {
  data: {
    clients: Client[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ClientDetails {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
  createdAt: string;
  pharmacyInfo?: {
    pharmacyName: string;
    address: string;
    city: string;
    country: string;
    licenseNumber: string;
    phone?: string;
    website?: string;
  };
  purchases: any[];
  subscriptions: any[];
  stats: {
    totalOrders: number;
    totalSpent: number;
    totalItems: number;
    averageOrder: number;
    totalSubscriptions: number;
    activeSubscriptions: number;
    hasPharmacy: boolean;
  };
  recentActivity: any[];
}

export interface ClientStats {
  totalClients: number;
  totalAdmins: number;
  clientsWithPharmacy: number;
  totalRevenue: number;
  recentClients: Client[];
}

export const clientService = {
  // Get all clients with pagination
  getClients: async (
    page: number = 1, 
    limit: number = 10, 
    search: string = '',
    role: string = ''
  ): Promise<ClientsResponse> => {
    const response = await apiClient.get<ClientsResponse>(
      `/admin/clients?page=${page}&limit=${limit}&search=${search}&role=${role}`
    );
    return response;
  },

  // Get single client
  getClient: async (id: string): Promise<{ data: ClientDetails }> => {
    const response = await apiClient.get<{ data: ClientDetails }>(`/admin/clients/${id}`);
    return response;
  },

  // Create client
  createClient: async (clientData: CreateClientData): Promise<{ data: Client; message: string }> => {
    const response = await apiClient.post<{ data: Client; message: string }>(
      '/admin/clients',
      clientData
    );
    return response;
  },

  // Update client
  updateClient: async (id: string, clientData: UpdateClientData): Promise<{ data: Client; message: string }> => {
    const response = await apiClient.put<{ data: Client; message: string }>(
      `/admin/clients/${id}`,
      clientData
    );
    return response;
  },

  // Delete client
  deleteClient: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/admin/clients/${id}`);
    return response;
  },

  // Get client statistics
  getClientStats: async (): Promise<{ data: ClientStats }> => {
    const response = await apiClient.get<{ data: ClientStats }>('/admin/clients/stats');
    return response;
  }
};