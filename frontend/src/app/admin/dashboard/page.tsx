'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  Building2,
  DollarSign,
  Activity,
  Tag,
  CreditCard,
  FileText,
  BarChart3,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface Stats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalPharmacies: number
  revenue: number
  growth: number
  totalCategories: number
  totalSubscriptions: number
  totalPages: number
  totalBusinesses: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalPharmacies: 0,
    revenue: 0,
    growth: 0,
    totalCategories: 0,
    totalSubscriptions: 0,
    totalPages: 0,
    totalBusinesses: 0
  })

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      // In real app, replace with actual API call
      setTimeout(() => {
        setStats({
          totalUsers: 1245,
          totalProducts: 567,
          totalOrders: 89,
          totalPharmacies: 23,
          revenue: 45230,
          growth: 12.5,
          totalCategories: 15,
          totalSubscriptions: 67,
          totalPages: 8,
          totalBusinesses: 45
        })
      }, 1000)
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: `+${stats.growth}%`,
      trend: 'up'
    },
    {
      title: 'Total Clients',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-purple-500',
      change: '+12.4%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-orange-500',
      change: '+5.7%',
      trend: 'up'
    },
    {
      title: 'Categories',
      value: stats.totalCategories.toLocaleString(),
      icon: Tag,
      color: 'bg-indigo-500',
      change: '+3.1%',
      trend: 'up'
    },
    {
      title: 'Subscriptions',
      value: stats.totalSubscriptions.toLocaleString(),
      icon: CreditCard,
      color: 'bg-pink-500',
      change: '+15.3%',
      trend: 'up'
    },
    {
      title: 'Pages',
      value: stats.totalPages.toLocaleString(),
      icon: FileText,
      color: 'bg-teal-500',
      change: '+2.2%',
      trend: 'up'
    },
    {
      title: 'Pharmacy Businesses',
      value: stats.totalBusinesses.toLocaleString(),
      icon: Building2,
      color: 'bg-cyan-500',
      change: '+4.8%',
      trend: 'up'
    }
  ]

  const recentActivities = [
    { type: 'order', description: 'New order from John Doe', time: '2 min ago', amount: '$42.90' },
    { type: 'subscription', description: 'Monthly subscription renewed', time: '5 min ago', amount: '$29.99' },
    { type: 'product', description: 'New product added: Vitamin D3', time: '10 min ago', amount: '' },
    { type: 'client', description: 'New client registration', time: '15 min ago', amount: '' },
    { type: 'pharmacy', description: 'Pharmacy business updated', time: '20 min ago', amount: '' }
  ]

  const quickActions = [
    {
      title: 'Manage Products',
      description: 'Add, edit or remove products',
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Clients',
      description: 'View and manage clients',
      icon: Users,
      href: '/admin/clients',
      color: 'bg-green-500'
    },
    {
      title: 'Categories',
      description: 'Manage product categories',
      icon: Tag,
      href: '/admin/categories',
      color: 'bg-purple-500'
    },
    {
      title: 'Subscriptions',
      description: 'Manage subscription plans',
      icon: CreditCard,
      href: '/admin/subscriptions',
      color: 'bg-orange-500'
    },
    {
      title: 'Pages',
      description: 'Manage website pages',
      icon: FileText,
      href: '/admin/pages',
      color: 'bg-teal-500'
    },
    {
      title: 'Pharmacy Business',
      description: 'Manage pharmacy businesses',
      icon: Building2,
      href: '/admin/pharmacy-business',
      color: 'bg-cyan-500'
    },
    {
      title: 'Purchases',
      description: 'View purchase history',
      icon: ShoppingCart,
      href: '/admin/purchases',
      color: 'bg-pink-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-indigo-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-teal-100">
              Here's what's happening with your pharmacy platform today.
            </p>
          </div>
          <div className="hidden md:block">
            <Activity className="h-16 w-16 text-white/20" />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          const TrendIcon = card.trend === 'up' ? ArrowUp : ArrowDown
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <div className={`flex items-center mt-1 text-sm font-medium ${
                    card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    <span>{card.change}</span>
                  </div>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Revenue chart will be displayed here</p>
              <p className="text-sm mt-2">Last 30 days: ${stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'order' ? 'bg-green-100 text-green-600' :
                    activity.type === 'subscription' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'product' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'client' ? 'bg-orange-100 text-orange-600' :
                    'bg-cyan-100 text-cyan-600'
                  }`}>
                    {activity.type === 'order' && <ShoppingCart className="h-4 w-4" />}
                    {activity.type === 'subscription' && <CreditCard className="h-4 w-4" />}
                    {activity.type === 'product' && <Package className="h-4 w-4" />}
                    {activity.type === 'client' && <Users className="h-4 w-4" />}
                    {activity.type === 'pharmacy' && <Building2 className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                {activity.amount && (
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.amount}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={() => window.location.href = action.href}
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors group"
              >
                <div className={`p-2 rounded-lg ${action.color} mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700 text-center">
                  {action.title}
                </span>
                <span className="text-xs text-gray-500 text-center mt-1">
                  {action.description}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {[
              { name: 'Medications', count: 234, color: 'bg-blue-500' },
              { name: 'Supplements', count: 156, color: 'bg-green-500' },
              { name: 'Medical Devices', count: 89, color: 'bg-purple-500' },
              { name: 'Personal Care', count: 67, color: 'bg-orange-500' },
              { name: 'Baby Care', count: 45, color: 'bg-pink-500' }
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <span className="text-sm text-gray-500">{category.count} products</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Status</h3>
          <div className="space-y-4">
            {[
              { plan: 'Basic', count: 23, revenue: '$230', color: 'bg-gray-500' },
              { plan: 'Pro', count: 32, revenue: '$960', color: 'bg-blue-500' },
              { plan: 'Enterprise', count: 12, revenue: '$600', color: 'bg-purple-500' }
            ].map((subscription, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${subscription.color}`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{subscription.plan}</p>
                    <p className="text-sm text-gray-500">{subscription.count} active</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{subscription.revenue}/mo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pharmacy Business Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Business Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.totalBusinesses}</p>
            <p className="text-sm text-gray-600">Active Businesses</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-gray-600">Products Listed</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">567</p>
            <p className="text-sm text-gray-600">Monthly Orders</p>
          </div>
        </div>
      </div>
    </div>
  )
}