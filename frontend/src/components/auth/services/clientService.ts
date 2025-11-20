// services/clientService.ts
export interface Client {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  role: 'ADMINISTRATORCLIENT' | 'NORMALCLIENT';
  hasPharmacy: boolean;
  totalOrders?: number;
  totalSpent?: number;
  activeSubscription?: {
    id: string;
    packName: string;
    startDate: string;
    endDate: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ClientStats {
  totalClients: number;
  clientsWithPharmacy: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface ClientsResponse {
  clients: Client[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ClientService {
  async getClients(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    role: string = ''
  ): Promise<ApiResponse<ClientsResponse>> {
    console.log('🔄 Using mock clients data');
    
    // Simulate async operation with delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.getMockClientsResponse(page, limit, search, role);
  }

  async getClientStats(): Promise<ApiResponse<ClientStats>> {
    console.log('🔄 Using mock stats data');
    
    // Simulate async operation with delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.getMockStatsResponse();
  }

  async deleteClient(id: string): Promise<ApiResponse<void>> {
    console.log(`🗑️ Mock deletion of client ${id}`);
    
    // Simulate async operation with delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      message: 'Mock deletion - client would be deleted in production'
    };
  }

  // Enhanced mock data methods
  private getMockClients(): Client[] {
    return [
      {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        role: 'NORMALCLIENT',
        hasPharmacy: true,
        totalOrders: 15,
        totalSpent: 1250.75,
        activeSubscription: {
          id: 'sub1',
          packName: 'Premium',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
        },
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2024-01-20T14:25:00Z',
      },
      {
        id: '2',
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1234567891',
        role: 'ADMINISTRATORCLIENT',
        hasPharmacy: false,
        totalOrders: 8,
        totalSpent: 845.50,
        activeSubscription: {
          id: 'sub2',
          packName: 'Basic',
          startDate: '2024-02-01',
          endDate: '2024-08-01',
        },
        createdAt: '2023-08-20T09:15:00Z',
        updatedAt: '2024-01-18T11:45:00Z',
      },
      {
        id: '3',
        firstname: 'Robert',
        lastname: 'Johnson',
        email: 'robert.j@example.com',
        phone: '+1234567892',
        role: 'NORMALCLIENT',
        hasPharmacy: true,
        totalOrders: 23,
        totalSpent: 1890.25,
        activeSubscription: {
          id: 'sub3',
          packName: 'Enterprise',
          startDate: '2024-01-15',
          endDate: '2024-12-15',
        },
        createdAt: '2023-11-10T14:20:00Z',
        updatedAt: '2024-01-25T09:30:00Z',
      },
      {
        id: '4',
        firstname: 'Emily',
        lastname: 'Brown',
        email: 'emily.brown@example.com',
        phone: '+1234567893',
        role: 'NORMALCLIENT',
        hasPharmacy: false,
        totalOrders: 5,
        totalSpent: 450.00,
        createdAt: '2024-01-05T08:45:00Z',
        updatedAt: '2024-01-28T16:15:00Z',
      },
      {
        id: '5',
        firstname: 'Michael',
        lastname: 'Wilson',
        email: 'michael.w@example.com',
        phone: '+1234567894',
        role: 'NORMALCLIENT',
        hasPharmacy: true,
        totalOrders: 32,
        totalSpent: 2875.40,
        activeSubscription: {
          id: 'sub4',
          packName: 'Premium',
          startDate: '2024-03-01',
          endDate: '2024-09-01',
        },
        createdAt: '2023-12-01T11:20:00Z',
        updatedAt: '2024-02-10T14:35:00Z',
      },
      {
        id: '6',
        firstname: 'Sarah',
        lastname: 'Davis',
        email: 'sarah.davis@example.com',
        phone: '+1234567895',
        role: 'ADMINISTRATORCLIENT',
        hasPharmacy: true,
        totalOrders: 42,
        totalSpent: 3560.80,
        activeSubscription: {
          id: 'sub5',
          packName: 'Enterprise',
          startDate: '2024-01-10',
          endDate: '2024-12-10',
        },
        createdAt: '2023-09-15T13:45:00Z',
        updatedAt: '2024-02-15T10:20:00Z',
      },
      {
        id: '7',
        firstname: 'David',
        lastname: 'Miller',
        email: 'david.m@example.com',
        phone: '+1234567896',
        role: 'NORMALCLIENT',
        hasPharmacy: false,
        totalOrders: 12,
        totalSpent: 980.25,
        createdAt: '2024-01-20T16:30:00Z',
        updatedAt: '2024-02-18T12:15:00Z',
      },
      {
        id: '8',
        firstname: 'Lisa',
        lastname: 'Anderson',
        email: 'lisa.a@example.com',
        phone: '+1234567897',
        role: 'NORMALCLIENT',
        hasPharmacy: true,
        totalOrders: 28,
        totalSpent: 2150.60,
        activeSubscription: {
          id: 'sub6',
          packName: 'Basic',
          startDate: '2024-02-15',
          endDate: '2024-08-15',
        },
        createdAt: '2023-10-05T09:20:00Z',
        updatedAt: '2024-02-12T14:45:00Z',
      }
    ];
  }

  private getMockStats(): ClientStats {
    return {
      totalClients: 156,
      clientsWithPharmacy: 89,
      totalOrders: 1247,
      totalRevenue: 125430.75,
    };
  }

  private getMockClientsResponse(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    role: string = ''
  ): ApiResponse<ClientsResponse> {    
    let filteredClients = this.getMockClients();

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClients = filteredClients.filter(client =>
        client.firstname.toLowerCase().includes(searchLower) ||
        client.lastname.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.phone?.toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (role && role !== 'all') {
      filteredClients = filteredClients.filter(client => client.role === role);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: {
        clients: paginatedClients,
        pagination: {
          total: filteredClients.length,
          totalPages: Math.ceil(filteredClients.length / limit),
          currentPage: page,
          hasNext: startIndex + limit < filteredClients.length,
          hasPrev: page > 1,
        },
      },
    };
  }

  private getMockStatsResponse(): ApiResponse<ClientStats> {
    return {
      success: true,
      data: this.getMockStats(),
    };
  }
}

export const clientService = new ClientService();