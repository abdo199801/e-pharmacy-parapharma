import { apiClient, ApiResponse, PaginationResponse, SearchParams } from '@/lib/apiClient'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  category: {
    id: string
    name: string
  }
  dashboard: {
    id: string
    name: string
  }
  discount?: number
  isNew?: boolean
  isBestSeller?: boolean
  deliveryTime: string
  brand: string
  dosage?: string
  quantity: string
  stock: number
  minStock: number
  status: 'active' | 'inactive' | 'low-stock'
  sku: string
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  products: Product[]
  pagination: PaginationResponse
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  dashboardId: string
  categoryId: string
  image?: string
  brand?: string
  dosage?: string
  quantity?: string
  stock?: number
  minStock?: number
  sku?: string
}

export interface UpdateProductData {
  name?: string
  description?: string
  price?: number
  categoryId?: string
  image?: string
  brand?: string
  dosage?: string
  quantity?: string
  stock?: number
  minStock?: number
  sku?: string
  status?: 'active' | 'inactive'
}

class ProductService {
  async getProducts(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    categoryId: string = '',
    dashboardId: string = ''
  ): Promise<ApiResponse<ProductsResponse>> {
    try {
      const params: SearchParams = { page, limit }
      if (search) params.search = search
      if (categoryId) params.categoryId = categoryId
      if (dashboardId) params.dashboardId = dashboardId

      const response = await apiClient.get<ApiResponse<ProductsResponse>>('/products', { params })
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async createProduct(productData: CreateProductData): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.post<ApiResponse<Product>>('/products', productData)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async updateProduct(id: string, productData: UpdateProductData): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, productData)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/products/${id}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    try {
      // This would be a custom endpoint for featured products
      const response = await apiClient.get<ApiResponse<Product[]>>('/products/featured')
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  async getProductsByCategory(categoryId: string): Promise<ApiResponse<ProductsResponse>> {
    try {
      const response = await apiClient.get<ApiResponse<ProductsResponse>>(`/categories/${categoryId}/products`)
      return response.data
    } catch (error: any) {
      throw error
    }
  }
}

export const productService = new ProductService()