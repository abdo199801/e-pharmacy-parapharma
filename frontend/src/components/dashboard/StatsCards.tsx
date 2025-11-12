// src/components/dashboard/StatsCards.tsx
import { TrendingUp, Users, Package, ShoppingCart, DollarSign } from 'lucide-react'

const stats = [
  {
    name: 'Chiffre d\'affaires',
    value: '24,580 MAD',
    change: '+12.4%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500'
  },
  {
    name: 'Commandes',
    value: '1,428',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'bg-blue-500'
  },
  {
    name: 'Clients actifs',
    value: '892',
    change: '+5.1%',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    name: 'Produits vendus',
    value: '3,241',
    change: '-2.3%',
    trend: 'down',
    icon: Package,
    color: 'bg-orange-500'
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className={`flex items-center mt-2 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  stat.trend === 'down' ? 'transform rotate-180' : ''
                }`} />
                <span className="text-sm font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
              </div>
            </div>
            <div className={`${stat.color} p-3 rounded-xl`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}