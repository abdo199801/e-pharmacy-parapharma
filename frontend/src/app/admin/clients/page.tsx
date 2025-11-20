// src/app/admin/clients/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Users,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ShoppingCart,
  DollarSign,
  Building2,
  CreditCard,
  Phone,
  Crown,
  AlertCircle
} from 'lucide-react'
import { clientService, Client, ClientStats } from '@/services/clientService'
import { DataTable, Column } from '@/components/admin/DataTable'
import { StatsCard } from '@/components/admin/StatsCard'

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [stats, setStats] = useState<ClientStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [statsLoading, setStatsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchClients = async (
    page: number = 1, 
    search: string = '', 
    role: string = ''
  ) => {
    setLoading(true)
    const response = await clientService.getClients(page, 10, search, role)
    
    if (response.success && response.data) {
      setClients(response.data.clients)
      setTotalPages(response.data.pagination.totalPages)
      setTotalCount(response.data.pagination.total)
    }
    setLoading(false)
  }

  const fetchClientStats = async () => {
    setStatsLoading(true)
    const response = await clientService.getClientStats()
    
    if (response.success && response.data) {
      setStats(response.data)
    }
    setStatsLoading(false)
  }

  useEffect(() => {
    fetchClients(currentPage, searchTerm, selectedRole)
    fetchClientStats()
  }, [currentPage, searchTerm, selectedRole])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleRefresh = () => {
    fetchClients(currentPage, searchTerm, selectedRole)
    fetchClientStats()
  }

  const handleEdit = async (client: Client) => {
    setActionLoading(client.id)
    console.log('Edit client:', client)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setActionLoading(null)
  }

  const handleDelete = async (client: Client) => {
    if (!confirm(`Are you sure you want to delete "${client.firstname} ${client.lastname}"? This action cannot be undone.`)) {
      return
    }

    setActionLoading(client.id)
    await clientService.deleteClient(client.id)
    await fetchClients(currentPage, searchTerm, selectedRole)
    await fetchClientStats()
    setActionLoading(null)
  }

  const handleView = (client: Client) => {
    console.log('View client:', client)
    // Navigate to client details page
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Calculate derived stats from current clients data
  const totalRevenue = clients.reduce((sum, client) => sum + (client.totalSpent || 0), 0)
  const totalOrders = clients.reduce((sum, client) => sum + (client.totalOrders || 0), 0)
  const pharmacyClients = clients.filter(client => client.hasPharmacy).length

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Client',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
            row.role === 'ADMINISTRATORCLIENT' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-600'
              : 'bg-gradient-to-br from-blue-500 to-cyan-600'
          }`}>
            {row.firstname?.[0]}{row.lastname?.[0]}
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
      render: (value) => value ? new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : 'N/A'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your clients, view their orders, subscriptions, and track spending
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              Demo Mode
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
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
        <StatsCard
          title="Total Clients"
          value={stats?.totalClients || clients.length}
          icon={Users}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders || totalOrders}
          icon={ShoppingCart}
          color="bg-green-500"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue ? Number(stats.totalRevenue).toFixed(2) : totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="bg-purple-500"
        />
        <StatsCard
          title="Pharmacy Clients"
          value={stats?.clientsWithPharmacy || pharmacyClients}
          icon={Building2}
          color="bg-amber-500"
        />
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
            onChange={(e) => {
              setSelectedRole(e.target.value)
              setCurrentPage(1)
            }}
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
        searchable={false}
        pagination={true}
        pageSize={10}
        currentPage={currentPage}
        totalItems={totalCount}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
        actionLoading={actionLoading}
        emptyMessage={
          searchTerm || selectedRole !== 'all' 
            ? "No clients found matching your search criteria."
            : "No clients found in the database. Add your first client to get started."
        }
        onRefresh={handleRefresh}
        serverSide={true}
      />
    </div>
  )
}