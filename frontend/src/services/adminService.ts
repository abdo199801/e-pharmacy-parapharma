import { apiClient } from '../lib/apiClient'
import { AdminStats, Product, Pharmacy, Client, Order } from '../types/admin'

export const adminService = {
  // Dashboard
  getStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get<{ success: boolean; data: AdminStats }>('/admin/stats')
    return response.data
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<{ success: boolean; data: Product[] }>('/admin/products')
    return response.data
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const response = await apiClient.post<{ success: boolean; data: Product }>('/admin/products', productData)
    return response.data
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put<{ success: boolean; data: Product }>(`/admin/products/${id}`, productData)
    return response.data
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/products/${id}`)
  },

  // Pharmacies
  getPharmacies: async (): Promise<Pharmacy[]> => {
    const response = await apiClient.get<{ success: boolean; data: Pharmacy[] }>('/admin/pharmacies')
    return response.data
  },

  // Clients
  getClients: async (): Promise<Client[]> => {
    const response = await apiClient.get<{ success: boolean; data: Client[] }>('/admin/clients')
    return response.data
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<{ success: boolean; data: Order[] }>('/admin/orders')
    return response.data
  },

  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await apiClient.patch<{ success: boolean; data: Order }>(`/admin/orders/${id}`, { status })
    return response.data
  }
}