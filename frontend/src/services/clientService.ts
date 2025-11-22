// services/clientService.ts
import { apiClient } from '@/lib/apiClient';

export interface Client {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  city?: string;
  country?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  subscription?: string;
}

export interface ClientStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  byRole?: Record<string, number>;
  activeSubscriptions?: number;
}

export interface ClientListResponse {
  clients: Client[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateClientData {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  pharmacyInfo?: {
    pharmacyName: string;
    address: string;
    city: string;
    country: string;
    licenseNumber: string;
    phone?: string;
    website?: string;
  };
}

class ClientService {
  async getClients(params: {
    page: number;
    limit: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<ClientListResponse> {
    try {
      // Remove undefined params
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
      );

      return await apiClient.get('/clients', cleanParams);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      throw error;
    }
  }

  async getClientStats(): Promise<ClientStats> {
    try {
      return await apiClient.get('/clients/stats');
    } catch (error) {
      console.error('Failed to fetch client stats:', error);
      throw error;
    }
  }

  async getClientById(id: string): Promise<Client> {
    try {
      return await apiClient.get(`/clients/${id}`);
    } catch (error) {
      console.error(`Failed to fetch client ${id}:`, error);
      throw error;
    }
  }

  async createClient(clientData: CreateClientData): Promise<Client> {
    try {
      return await apiClient.post('/clients', clientData);
    } catch (error) {
      console.error('Failed to create client:', error);
      throw error;
    }
  }

  async updateClient(id: string, clientData: Partial<CreateClientData>): Promise<Client> {
    try {
      return await apiClient.put(`/clients/${id}`, clientData);
    } catch (error) {
      console.error(`Failed to update client ${id}:`, error);
      throw error;
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      await apiClient.delete(`/clients/${id}`);
    } catch (error) {
      console.error(`Failed to delete client ${id}:`, error);
      throw error;
    }
  }
}

export const clientService = new ClientService();