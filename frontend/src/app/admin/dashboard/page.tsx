'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  Building2,
  DollarSign,
  Activity
} from 'lucide-react'

interface Stats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalPharmacies: number
  revenue: number
  growth: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalPharmacies: 0,
    revenue: 0,
    growth: 0
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
          growth: 12.5
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
      change: `+${stats.growth}%`
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+8.2%'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-purple-500',
      change: '+12.4%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-orange-500',
      change: '+5.7%'
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">{card.change}</p>
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
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{1000 + order}</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">$42.90</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors group">
            <Package className="h-8 w-8 text-gray-400 group-hover:text-teal-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Add Product</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors group">
            <Building2 className="h-8 w-8 text-gray-400 group-hover:text-teal-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Add Pharmacy</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors group">
            <Users className="h-8 w-8 text-gray-400 group-hover:text-teal-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Manage Users</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors group">
            <ShoppingCart className="h-8 w-8 text-gray-400 group-hover:text-teal-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">View Orders</span>
          </button>
        </div>
      </div>
    </div>
  )
}