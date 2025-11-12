export interface AdminStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalPharmacies: number
  revenue: number
  growth: number
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: string
  stock: number
  pharmacyId: string
  pharmacyName: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description?: string
  status: 'active' | 'inactive'
  productCount: number
  createdAt: string
}

export interface Client {
  id: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  role: 'ADMINISTRATORCLIENT' | 'NORMALCLIENT'
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Order {
  id: string
  clientName: string
  clientEmail: string
  totalAmount: number
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  createdAt: string
  items: OrderItem[]
}

export interface OrderItem {
  productName: string
  quantity: number
  price: number
}