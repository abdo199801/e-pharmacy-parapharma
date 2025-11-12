'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter,
  Tag,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Package
} from 'lucide-react'
import { categoryService, Category } from '../../../services/categoryService'
import { DataTable, Column } from '../../../components/admin/DataTable'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const fetchCategories = async (page: number = 1, search: string = '') => {
    try {
      setLoading(true)
      const response = await categoryService.getCategories(page, 10, search)
      setCategories(response.data.categories)
      setTotalPages(response.data.pagination.totalPages)
      setTotalCount(response.data.pagination.total)
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Fallback data for demo
      setCategories([
        {
          id: '1',
          name: 'Médicaments Essentiels',
          description: 'Antidouleurs, antibiotiques et traitements spécialisés',
          icon: '💊',
          color: '#3B82F6',
          status: 'active',
          productCount: 156,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-03-20T00:00:00Z'
        },
        {
          id: '2',
          name: 'Soins Cardiovasculaires',
          description: 'Tension artérielle, cholestérol et santé cardiaque',
          icon: '❤️',
          color: '#EF4444',
          status: 'active',
          productCount: 89,
          createdAt: '2024-02-10T00:00:00Z',
          updatedAt: '2024-03-18T00:00:00Z'
        },
        {
          id: '3',
          name: 'Pédiatrie Spécialisée',
          description: 'Soins adaptés pour enfants et bébés',
          icon: '👶',
          color: '#EC4899',
          status: 'active',
          productCount: 67,
          createdAt: '2024-01-20T00:00:00Z',
          updatedAt: '2024-03-15T00:00:00Z'
        }
      ])
      setTotalPages(1)
      setTotalCount(3)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories(currentPage, searchTerm)
  }, [currentPage, searchTerm])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleEdit = (category: Category) => {
    console.log('Edit category:', category)
    // Implement edit functionality
  }

  const handleDelete = async (category: Category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await categoryService.deleteCategory(category.id)
        fetchCategories(currentPage, searchTerm)
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Error deleting category. Please try again.')
      }
    }
  }

  const handleView = (category: Category) => {
    console.log('View category:', category)
    // Navigate to category details or implement view functionality
  }

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Category Name',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor: row.color }}
          >
            {row.icon}
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 line-clamp-1">
              {row.description}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'productCount',
      label: 'Products',
      sortable: true,
      align: 'center',
      render: (value) => (
        <div className="flex items-center justify-center space-x-1">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      align: 'center',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-1">
            Manage product categories and organize your inventory
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => fetchCategories(currentPage, searchTerm)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <Link
            href="/admin/categories/create"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Category
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
              <div className="text-sm text-gray-600">Total Categories</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.filter(cat => cat.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Categories</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Filter className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.filter(cat => cat.status === 'inactive').length}
              </div>
              <div className="text-sm text-gray-600">Inactive Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable={true}
        searchPlaceholder="Search categories..."
        pagination={true}
        pageSize={10}
        loading={loading}
        emptyMessage="No categories found. Create your first category to get started."
        onSort={(key, direction) => {
          console.log('Sort by:', key, direction)
          // Implement sorting
        }}
        onFilter={(key, value) => {
          console.log('Filter:', key, value)
          // Implement filtering
        }}
      />
    </div>
  )
}