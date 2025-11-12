import { apiClient } from '../lib/apiClient';

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  status: 'active' | 'inactive';
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  status?: 'active' | 'inactive';
}

export interface CategoriesResponse {
  data: {
    categories: Category[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export const categoryService = {
  // Get all categories with pagination
  getCategories: async (page: number = 1, limit: number = 10, search: string = ''): Promise<CategoriesResponse> => {
    const response = await apiClient.get<CategoriesResponse>(
      `/admin/categories?page=${page}&limit=${limit}&search=${search}`
    );
    return response;
  },

  // Get single category
  getCategory: async (id: string): Promise<{ data: Category }> => {
    const response = await apiClient.get<{ data: Category }>(`/admin/categories/${id}`);
    return response;
  },

  // Create category
  createCategory: async (categoryData: CreateCategoryData): Promise<{ data: Category; message: string }> => {
    const response = await apiClient.post<{ data: Category; message: string }>(
      '/admin/categories',
      categoryData
    );
    return response;
  },

  // Update category
  updateCategory: async (id: string, categoryData: UpdateCategoryData): Promise<{ data: Category; message: string }> => {
    const response = await apiClient.put<{ data: Category; message: string }>(
      `/admin/categories/${id}`,
      categoryData
    );
    return response;
  },

  // Delete category
  deleteCategory: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/admin/categories/${id}`);
    return response;
  }
};