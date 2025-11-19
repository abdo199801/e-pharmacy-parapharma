'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ShoppingCart,
  DollarSign,
  UserCheck,
  Building2,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Crown
} from 'lucide-react'
import { clientService, Client, ClientStats } from '../../../services/clientService'
import { DataTable, Column } from '../../../components/admin/DataTable'

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [stats, setStats] = useState<ClientStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const fetchClients = async (
    page: number = 1, 
    search: string = '', 
    role: string = ''
  ) => {
    try {
      setLoading(true)
      const response = await clientService.getClients(page, 10, search, role)
      setClients(response.data.clients)
      setTotalPages(response.data.pagination.totalPages)
      setTotalCount(response.data.pagination.total)
    } catch (error) {
      console.error('Error fetching clients:', error)
      // You can set empty array or show error message
      setClients([])
      setTotalPages(1)
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }

  const fetchClientStats = async () => {
    try {
      setStatsLoading(true)
      const response = await clientService.getClientStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching client stats:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    fetchClients(currentPage, searchTerm, selectedRole)
    fetchClientStats()
  }, [currentPage, searchTerm, selectedRole])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleEdit = (client: Client) => {
    console.log('Edit client:', client)
    // Implement edit functionality - open modal or navigate to edit page
  }

  const handleDelete = async (client: Client) => {
    if (confirm(`Are you sure you want to delete "${client.firstname} ${client.lastname}"? This action cannot be undone.`)) {
      try {
        await clientService.deleteClient(client.id)
        fetchClients(currentPage, searchTerm, selectedRole)
        fetchClientStats() // Refresh stats
      } catch (error: any) {
        console.error('Error deleting client:', error)
        alert(error.response?.data?.error || 'Error deleting client. Please try again.')
      }
    }
  }

  const handleView = (client: Client) => {
    console.log('View client:', client)
    // Navigate to client details page
    // router.push(`/admin/clients/${client.id}`)
  }

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Client',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
            row.role === 'ADMINISTRATORCLIENT' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-600'
              : 'bg-gradient-to-br from-blue-500 to-cyan-600'
          }`}>
            {row.firstname[0]}{row.lastname[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <div className="font-medium text-gray-900">
                {row.firstname} {row.lastname}
              </div>
              {row.role === 'ADMINISTRATORCLIENT' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </span>
              )}
              {row.hasPharmacy && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Building2 className="h-3 w-3 mr-1" />
                  Pharmacy
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 truncate">{row.email}</div>
            <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
              {row.phone && (
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>{row.phone}</span>
                </div>
              )}
              {row.activeSubscription && (
                <div className="flex items-center space-x-1">
                  <CreditCard className="h-3 w-3" />
                  <span>{row.activeSubscription.packName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      sortable: true,
      align: 'center',
      render: (value) => (
        <div className="flex items-center justify-center space-x-1">
          <ShoppingCart className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">{value || 0}</span>
        </div>
      )
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      align: 'center',
      render: (value) => (
        <div className="flex items-center justify-center space-x-1">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">
            ${value ? Number(value).toFixed(2) : '0.00'}
          </span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      align: 'center',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'ADMINISTRATORCLIENT' 
            ? 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value === 'ADMINISTRATORCLIENT' ? 'Administrator' : 'Client'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  ]

  const totalRevenue = clients.reduce((sum, client) => sum + (client.totalSpent || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your clients, view their orders, subscriptions, and track spending
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => {
              fetchClients(currentPage, searchTerm, selectedRole)
              fetchClientStats()
            }}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <Link
            href="/admin/clients/create"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Client
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {statsLoading ? '...' : stats?.totalClients || 0}
              </div>
              <div className="text-sm text-gray-600">Total Clients</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {clients.reduce((sum, client) => sum + (client.totalOrders || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {statsLoading ? '...' : stats?.clientsWithPharmacy || 0}
              </div>
              <div className="text-sm text-gray-600">Pharmacy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="all">All Roles</option>
            <option value="ADMINISTRATORCLIENT">Administrators</option>
            <option value="NORMALCLIENT">Clients</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {clients.length} of {totalCount} clients
          </div>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable={false} // We have custom search above
        pagination={true}
        pageSize={10}
        loading={loading}
        emptyMessage={
          searchTerm || selectedRole !== 'all' 
            ? "No clients found matching your search criteria."
            : "No clients found in the database. Add your first client to get started."
        }
        onSort={(key, direction) => {
          console.log('Sort by:', key, direction)
          // Implement sorting if needed
        }}
      />
    </div>
  )
}