import { apiClient } from '../lib/apiClient';

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalPharmacies: number;
  revenue: number;
  growth: number;
  totalCategories: number;
  totalSubscriptions: number;
  totalPages: number;
  totalBusinesses: number;
  activeSubscriptions: number;
  averageOrderValue: number;
  totalPacks: number;
}

export interface RecentActivity {
  type: 'purchase' | 'subscription' | 'client';
  description: string;
  time: string;
  amount: string;
  details: string;
}

export interface CategoryDistribution {
  name: string;
  count: number;
  color: string;
}

export interface SubscriptionStatus {
  plan: string;
  count: number;
  revenue: number;
  color: string;
}

export interface DashboardResponse {
  success: boolean;
  data: {
    stats: DashboardStats;
    recentActivities: RecentActivity[];
    categoryDistribution: CategoryDistribution[];
    subscriptionStatus: SubscriptionStatus[];
    monthlyRevenue: any[];
  };
}

export interface ChartsResponse {
  success: boolean;
  data: {
    revenueTrend: any[];
    topProducts: Array<{
      name: string;
      revenue: number;
      orders: number;
      quantity: number;
      category: string;
    }>;
    clientAcquisition: any[];
  };
}

export interface SystemHealth {
  database: string;
  api: string;
  memory: string;
  uptime: number;
  totalClients: number;
  totalProducts: number;
  dbSize: number;
}

export interface HealthResponse {
  success: boolean;
  data: SystemHealth;
}

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardResponse> {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  async getDashboardCharts(period: string = '6 months'): Promise<ChartsResponse> {
    const response = await apiClient.get(`/dashboard/charts?period=${period}`);
    return response.data;
  },

  async getSystemHealth(): Promise<HealthResponse> {
    const response = await apiClient.get('/dashboard/health');
    return response.data;
  }
};