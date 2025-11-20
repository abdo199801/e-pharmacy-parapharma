import { apiClient, ApiResponse } from '@/lib/apiClient'

export interface CartItem {
  id: string
  productId: string
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    brand: string
    sku: string
  }
  quantity: number
  total: number
  createdAt: string
  updatedAt: string
}

export interface Cart {
  id: string
  clientId: string
  items: CartItem[]
  totalItems: number
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export interface AddToCartData {
  productId: string
  quantity: number
}

export interface UpdateCartItemData {
  quantity: number
}

class CartService {
  async getCart(): Promise<ApiResponse<Cart>> {
    try {
      const response = await apiClient.get<ApiResponse<Cart>>('/cart')
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async addToCart(cartData: AddToCartData): Promise<ApiResponse<Cart>> {
    try {
      const response = await apiClient.post<ApiResponse<Cart>>('/cart/items', cartData)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async updateCartItem(itemId: string, updateData: UpdateCartItemData): Promise<ApiResponse<Cart>> {
    try {
      const response = await apiClient.put<ApiResponse<Cart>>(`/cart/items/${itemId}`, updateData)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
    try {
      const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async clearCart(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>('/cart/clear')
      return response.data
    } catch (error: any) {
      throw error
    }
  }
}

export const cartService = new CartService()