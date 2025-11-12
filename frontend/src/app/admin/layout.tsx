'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  BarChart3, 
  Package, 
  Building2, 
  Users, 
  ShoppingCart, 
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Tag,
  CreditCard,
  FileText,
  ShoppingBag,
  Database,
  Layers
} from 'lucide-react'
import { authService } from '../../components/auth/services/authService'

// Enhanced navigation with new sections
const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: BarChart3,
    group: 'Overview'
  },
  { 
    name: 'Products', 
    href: '/admin/products', 
    icon: Package,
    group: 'Management'
  },
  { 
    name: 'Categories', 
    href: '/admin/categories', 
    icon: Tag,
    group: 'Management'
  },
  { 
    name: 'Clients', 
    href: '/admin/clients', 
    icon: Users,
    group: 'Management'
  },
  { 
    name: 'Orders', 
    href: '/admin/orders', 
    icon: ShoppingCart,
    group: 'Sales'
  },
  { 
    name: 'Purchases', 
    href: '/admin/purchases', 
    icon: ShoppingBag,
    group: 'Sales'
  },
  { 
    name: 'Subscriptions', 
    href: '/admin/subscriptions', 
    icon: CreditCard,
    group: 'Sales'
  },
  { 
    name: 'Pharmacies', 
    href: '/admin/pharmacies', 
    icon: Building2,
    group: 'Business'
  },
  { 
    name: 'Pharmacy Business', 
    href: '/admin/pharmacy-business', 
    icon: Database,
    group: 'Business'
  },
  { 
    name: 'Pages', 
    href: '/admin/pages', 
    icon: FileText,
    group: 'Content'
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: BarChart3,
    group: 'Insights'
  },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: Settings,
    group: 'System'
  },
]

// Group navigation items by category
const groupedNavigation = navigation.reduce((groups, item) => {
  const group = item.group;
  if (!groups[group]) {
    groups[group] = [];
  }
  groups[group].push(item);
  return groups;
}, {} as Record<string, typeof navigation>);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check authentication and admin role
    const checkAuth = async () => {
      try {
        const user = authService.getCurrentUser()
        if (!user || user.role !== 'ADMINISTRATORCLIENT') {
          router.push('/login')
          return
        }
        setCurrentUser(user)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  const getPageTitle = () => {
    const currentNav = navigation.find(item => item.href === pathname)
    return currentNav?.name || 'Dashboard'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-green-600">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-white">PharmaAdmin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {Object.entries(groupedNavigation).map(([groupName, groupItems]) => (
            <div key={groupName} className="mb-6">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {groupName}
              </h3>
              <nav className="space-y-1 px-2">
                {groupItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${
                        isActive ? 'text-teal-600' : 'text-gray-400'
                      }`} />
                      <span className="truncate">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-teal-600 rounded-full"></div>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Section */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.firstname} {currentUser.lastname}
                </p>
                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Header */}
        <header className="flex-shrink-0 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Welcome to your admin dashboard
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-gray-900 font-semibold">1,245</div>
                  <div className="text-gray-500 text-xs">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-900 font-semibold">567</div>
                  <div className="text-gray-500 text-xs">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-900 font-semibold">89</div>
                  <div className="text-gray-500 text-xs">Orders</div>
                </div>
              </div>

              {/* User Profile Quick Info */}
              <div className="hidden lg:flex items-center space-x-3 border-l border-gray-200 pl-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser.firstname} {currentUser.lastname}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50/30 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              © 2024 PharmaAdmin. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span>v1.0.0</span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>System Online</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}