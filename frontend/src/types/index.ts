// src/types/index.ts
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'pharmacist' | 'client'
  pharmacyName?: string
  licenseNumber?: string
  phone: string
  address?: string
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  stock: number
  pharmacyId: string
  isAvailable: boolean
  createdAt: Date
}

export interface Order {
  id: string
  customerId: string
  pharmacyId: string
  products: OrderProduct[]
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface OrderProduct {
  productId: string
  quantity: number
  price: number
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  email: string
  ownerId: string
  isOpen: boolean
  hasDelivery: boolean
  location: {
    lat: number
    lng: number
  }
  workingHours: string
  rating: number
  createdAt: Date
}