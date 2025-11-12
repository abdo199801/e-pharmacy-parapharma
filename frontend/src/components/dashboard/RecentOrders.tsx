// src/components/dashboard/RecentOrders.tsx
import { Clock, CheckCircle, XCircle, Truck } from 'lucide-react'

const orders = [
  {
    id: '#ORD-7841',
    customer: 'Ahmed Benali',
    product: 'Doliprane 1000mg',
    amount: '45.00 MAD',
    status: 'delivered',
    time: 'Il y a 2 min'
  },
  {
    id: '#ORD-7840',
    customer: 'Fatima Zahra',
    product: 'Vitamine C + Multivitamines',
    amount: '128.00 MAD',
    status: 'processing',
    time: 'Il y a 15 min'
  },
  {
    id: '#ORD-7839',
    customer: 'Karim Alami',
    product: 'Bepanthen Pommade',
    amount: '35.00 MAD',
    status: 'shipped',
    time: 'Il y a 1h'
  },
  {
    id: '#ORD-7838',
    customer: 'Sara Mourad',
    product: 'Smecta x 2',
    amount: '56.00 MAD',
    status: 'cancelled',
    time: 'Il y a 2h'
  },
]

const statusConfig = {
  delivered: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Livrée' },
  processing: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'En traitement' },
  shipped: { icon: Truck, color: 'text-orange-600 bg-orange-50', label: 'Expédiée' },
  cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Annulée' },
}

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Commandes récentes</h3>
        <button className="text-primary-600 hover:text-primary-500 font-medium text-sm">
          Voir tout
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          const statusColor = statusConfig[order.status as keyof typeof statusConfig].color
          const statusLabel = statusConfig[order.status as keyof typeof statusConfig].label

          return (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusColor}`}>
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{order.id}</p>
                    <p className="text-sm text-gray-500 truncate">{order.customer}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{order.product}</p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">{order.amount}</p>
                <p className="text-sm text-gray-500">{order.time}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}