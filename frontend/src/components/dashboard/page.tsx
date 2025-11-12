// src/app/dashboard/page.tsx
import StatsCards from '@/components/dashboard/StatsCards'
import RecentOrders from '@/components/dashboard/RecentOrders'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue sur votre espace E-Pharma</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
            Aujourd'hui
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
            Nouvelle commande
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsCards />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Ajouter produit', icon: '➕', color: 'bg-green-500' },
              { name: 'Nouveau client', icon: '👤', color: 'bg-blue-500' },
              { name: 'Inventaire', icon: '📦', color: 'bg-orange-500' },
              { name: 'Rapports', icon: '📊', color: 'bg-purple-500' },
            ].map((action) => (
              <button
                key={action.name}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-white text-xl mb-2`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {action.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}