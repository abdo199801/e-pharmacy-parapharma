// src/components/dashboard/Sidebar.tsx
'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Building,
  Pill,
  Truck
} from 'lucide-react'

const menuItems = [
  { name: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Produits', icon: Package, href: '/dashboard/products' },
  { name: 'Commandes', icon: ShoppingCart, href: '/dashboard/orders' },
  { name: 'Clients', icon: Users, href: '/dashboard/customers' },
  { name: 'Pharmacies', icon: Building, href: '/dashboard/pharmacies' },
  { name: 'Médicaments', icon: Pill, href: '/dashboard/medications' },
  { name: 'Livraisons', icon: Truck, href: '/dashboard/deliveries' },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Paramètres', icon: Settings, href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        w-64 lg:w-64
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-medical-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">E-Pharma</span>
              <span className="block text-xs text-primary-600">Dashboard</span>
            </div>
          </div>
          
          <button
            onClick={() => setIsCollapsed(true)}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">PH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">Pharmacie du Centre</p>
              <p className="text-sm text-gray-500 truncate">admin@pharmacie.ma</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors group"
            >
              <item.icon className="h-5 w-5 text-gray-400 group-hover:text-primary-600" />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group">
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  )
}