// components/admin/StatsCard.tsx
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
  change?: string
  loading?: boolean
  error?: boolean
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change, 
  loading = false,
  error = false 
}: StatsCardProps) {
  const getChangeColor = () => {
    if (!change) return 'text-gray-600'
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600'
  }

  const getChangeIcon = () => {
    if (!change) return null
    return change.startsWith('+') ? 
      <TrendingUp className="h-3 w-3" /> : 
      <TrendingDown className="h-3 w-3" />
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center space-x-2 mt-1">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300"></div>
              </div>
            ) : error ? (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Error</span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            )}
          </div>
          
          {change && !loading && !error && (
            <div className={`flex items-center space-x-1 text-sm font-medium mt-1 ${getChangeColor()}`}>
              {getChangeIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg flex-shrink-0`}>
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : error ? (
            <AlertCircle className="h-6 w-6 text-white" />
          ) : (
            <Icon className="h-6 w-6 text-white" />
          )}
        </div>
      </div>
    </div>
  )
}