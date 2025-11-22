import { useState, useMemo, useEffect } from 'react'
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown,
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Search,
  RefreshCw,
  X
} from 'lucide-react'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: any) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface DataTableProps {
  columns: Column[]
  data: any[]
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  onView?: (item: any) => void
  onSelect?: (selectedItems: any[]) => void
  onSearch?: (searchTerm: string) => void
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  onFilter?: (key: string, value: string) => void
  onPageChange?: (page: number) => void
  selectable?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  pagination?: boolean
  pageSize?: number
  currentPage?: number
  totalItems?: number
  totalPages?: number
  loading?: boolean
  emptyMessage?: string
  actionColumn?: boolean
  className?: string
  rowClassName?: (item: any) => string
  // Server-side control props
  serverSide?: boolean
  externalSearchTerm?: string
  externalSortConfig?: { key: string; direction: 'asc' | 'desc' } | null
  externalFilters?: Record<string, string>
  onRefresh?: () => void
  // New props for enhanced functionality
  getRowId?: (item: any) => string | number
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  showTotal?: boolean
  filterOptions?: Record<string, { label: string; options: string[] }>
}

export function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView,
  onSelect,
  onSearch,
  onSort,
  onFilter,
  onPageChange,
  selectable = false,
  searchable = false,
  searchPlaceholder = "Search...",
  pagination = false,
  pageSize = 10,
  currentPage: externalCurrentPage = 1,
  totalItems: externalTotalItems,
  totalPages: externalTotalPages,
  loading = false,
  emptyMessage = "No data available",
  actionColumn = true,
  className = "",
  rowClassName,
  // Server-side props
  serverSide = false,
  externalSearchTerm = '',
  externalSortConfig = null,
  externalFilters = {},
  onRefresh,
  // Enhanced functionality props
  getRowId = (item: any) => item.id,
  striped = false,
  hoverable = true,
  compact = false,
  showTotal = true,
  filterOptions = {}
}: DataTableProps) {
  // Client-side state (only used when serverSide is false)
  const [clientSelectedRows, setClientSelectedRows] = useState<Set<string>>(new Set())
  const [clientCurrentPage, setClientCurrentPage] = useState(1)
  const [clientSearchTerm, setClientSearchTerm] = useState('')
  const [clientSortConfig, setClientSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [clientFilters, setClientFilters] = useState<Record<string, string>>({})
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Use server-side or client-side values
  const selectedRows = serverSide ? new Set() : clientSelectedRows
  const currentPage = serverSide ? externalCurrentPage : clientCurrentPage
  const searchTerm = serverSide ? externalSearchTerm : clientSearchTerm
  const sortConfig = serverSide ? externalSortConfig : clientSortConfig
  const filters = serverSide ? externalFilters : clientFilters

  // Reset to first page when filters or search change
  useEffect(() => {
    if (!serverSide) {
      setClientCurrentPage(1)
    }
  }, [clientSearchTerm, clientFilters, serverSide])

  // Handle row selection (client-side only)
  const handleSelectRow = (id: string) => {
    if (serverSide) return
    
    const newSelected = new Set(clientSelectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setClientSelectedRows(newSelected)
    onSelect?.(Array.from(newSelected).map(id => data.find(item => getRowId(item).toString() === id)))
  }

  // Handle select all (client-side only)
  const handleSelectAll = () => {
    if (serverSide) return
    
    if (clientSelectedRows.size === paginatedData.length) {
      setClientSelectedRows(new Set())
      onSelect?.([])
    } else {
      const allIds = new Set(paginatedData.map(item => getRowId(item).toString()))
      setClientSelectedRows(allIds)
      onSelect?.(paginatedData)
    }
  }

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    
    if (serverSide) {
      onSort?.(key, direction)
    } else {
      setClientSortConfig({ key, direction })
    }
  }

  // Handle filtering
  const handleFilter = (key: string, value: string) => {
    if (serverSide) {
      onFilter?.(key, value)
    } else {
      const newFilters = { ...clientFilters, [key]: value }
      setClientFilters(newFilters)
    }
    setActiveFilter(null)
  }

  // Clear specific filter
  const clearFilter = (key: string) => {
    if (serverSide) {
      onFilter?.(key, '')
    } else {
      const newFilters = { ...clientFilters }
      delete newFilters[key]
      setClientFilters(newFilters)
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    if (serverSide) {
      Object.keys(filters).forEach(key => onFilter?.(key, ''))
    } else {
      setClientFilters({})
    }
  }

  // Handle search
  const handleSearch = (value: string) => {
    if (serverSide) {
      onSearch?.(value)
    } else {
      setClientSearchTerm(value)
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    if (serverSide) {
      onPageChange?.(page)
    } else {
      setClientCurrentPage(page)
    }
  }

  // Client-side data processing (only used when serverSide is false)
  const processedData = useMemo(() => {
    if (serverSide) {
      return data // Server already processed the data
    }

    let result = [...data]

    // Apply search
    if (searchTerm) {
      result = result.filter(item =>
        columns.some(column => {
          const value = item[column.key]
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => 
          item[key]?.toString().toLowerCase().includes(value.toLowerCase())
        )
      }
    })

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [data, searchTerm, filters, sortConfig, columns, serverSide])

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return serverSide ? data : processedData
    
    if (serverSide) {
      return data // Server already paginated the data
    }
    
    const startIndex = (currentPage - 1) * pageSize
    return processedData.slice(startIndex, startIndex + pageSize)
  }, [processedData, currentPage, pageSize, pagination, serverSide, data])

  const totalPages = serverSide 
    ? (externalTotalPages || 1)
    : Math.ceil(processedData.length / pageSize)
  
  const totalItems = serverSide 
    ? (externalTotalItems || data.length)
    : processedData.length

  // Get sort icon
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronsUpDown className="h-4 w-4" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />
  }

  // Generate page numbers for pagination with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      pages.push(totalPages)
    }
    
    return pages
  }

  // Table density classes
  const tableDensityClass = compact ? 'py-2' : 'py-3'
  const headerDensityClass = compact ? 'py-2' : 'py-3'

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {/* Search and Controls Bar */}
      {(searchable || onRefresh || Object.keys(filters).length > 0) && (
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            {searchable && (
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {/* Active Filters */}
            {Object.keys(filters).length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(filters).map(([key, value]) => (
                  value && (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-800"
                    >
                      {columns.find(col => col.key === key)?.label}: {value}
                      <button
                        onClick={() => clearFilter(key)}
                        className="ml-1 hover:text-teal-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* Select All Checkbox (client-side only) */}
              {selectable && !serverSide && (
                <th className={`px-4 ${headerDensityClass} text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12`}>
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                </th>
              )}

              {/* Column Headers */}
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`px-4 ${headerDensityClass} text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 'text-left'
                  } ${column.className || ''}`}
                  style={{ width: column.width }}
                >
                  <div className={`flex items-center ${
                    column.align === 'center' ? 'justify-center' : 
                    column.align === 'right' ? 'justify-end' : 'justify-start'
                  } space-x-1`}>
                    <span>{column.label}</span>
                    
                    {/* Sort Icon */}
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={loading}
                      >
                        {getSortIcon(column.key)}
                      </button>
                    )}

                    {/* Filter Dropdown */}
                    {column.filterable && (
                      <div className="relative">
                        <button
                          onClick={() => setActiveFilter(activeFilter === column.key ? null : column.key)}
                          className={`text-gray-400 hover:text-gray-600 transition-colors ${
                            filters[column.key] ? 'text-teal-600' : ''
                          }`}
                          disabled={loading}
                        >
                          <Filter className="h-3 w-3" />
                        </button>
                        
                        {activeFilter === column.key && (
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="p-2">
                              {filterOptions[column.key] ? (
                                <select
                                  value={filters[column.key] || ''}
                                  onChange={(e) => handleFilter(column.key, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm"
                                >
                                  <option value="">All {column.label}</option>
                                  {filterOptions[column.key].options.map(option => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  placeholder={`Filter ${column.label}...`}
                                  value={filters[column.key] || ''}
                                  onChange={(e) => handleFilter(column.key, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm"
                                  autoFocus
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}

              {/* Actions Column Header */}
              {actionColumn && (
                <th className={`px-4 ${headerDensityClass} text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => {
              const rowId = getRowId(item).toString()
              return (
                <tr 
                  key={rowId}
                  className={`
                    transition-colors
                    ${hoverable ? 'hover:bg-gray-50' : ''}
                    ${striped && index % 2 === 0 ? 'bg-gray-50' : ''}
                    ${selectedRows.has(rowId) ? 'bg-blue-50' : ''}
                    ${rowClassName ? rowClassName(item) : ''}
                  `}
                >
                  {/* Row Checkbox (client-side only) */}
                  {selectable && !serverSide && (
                    <td className={`px-4 ${tableDensityClass} whitespace-nowrap`}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(rowId)}
                        onChange={() => handleSelectRow(rowId)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                  )}

                  {/* Data Cells */}
                  {columns.map((column) => (
                    <td 
                      key={column.key}
                      className={`px-4 ${tableDensityClass} whitespace-nowrap text-sm ${
                        column.align === 'center' ? 'text-center' : 
                        column.align === 'right' ? 'text-right' : 'text-left'
                      } ${column.className || ''}`}
                    >
                      {column.render 
                        ? column.render(item[column.key], item)
                        : (
                          <div className={`text-gray-900 ${
                            column.align === 'center' ? 'text-center' : 
                            column.align === 'right' ? 'text-right' : 'text-left'
                          }`}>
                            {item[column.key]}
                          </div>
                        )
                      }
                    </td>
                  ))}

                  {/* Action Buttons */}
                  {actionColumn && (
                    <td className={`px-4 ${tableDensityClass} whitespace-nowrap text-right text-sm font-medium`}>
                      <div className="flex items-center justify-end space-x-1">
                        {onView && (
                          <button
                            onClick={() => onView(item)}
                            className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded"
                            title="View Details"
                            disabled={loading}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-gray-400 hover:text-teal-600 transition-colors p-1 rounded"
                            title="Edit"
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded"
                            title="Delete"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {paginatedData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
            <p className="text-gray-500">{emptyMessage}</p>
            {(searchTerm || Object.keys(filters).length > 0) && (
              <button
                onClick={() => {
                  if (!serverSide) {
                    setClientSearchTerm('')
                    setClientFilters({})
                  }
                }}
                className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Clear filters and search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer with Pagination and Summary */}
      {(pagination || showTotal) && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Results Summary */}
            {showTotal && (
              <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalItems)}
                </span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </div>
            )}
            
            {/* Pagination */}
            {pagination && totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === '...' ? (
                        <span className="px-3 py-1 text-gray-500">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page as number)}
                          disabled={loading}
                          className={`px-3 py-1 border text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'border-teal-500 bg-teal-50 text-teal-600'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {page}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selection Summary (client-side only) */}
      {selectable && !serverSide && selectedRows.size > 0 && (
        <div className="px-4 py-2 bg-teal-50 border-t border-teal-200">
          <div className="text-sm text-teal-800">
            {selectedRows.size} item(s) selected
            <button
              onClick={() => setClientSelectedRows(new Set())}
              className="ml-2 text-teal-600 hover:text-teal-800 text-xs underline"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  )
}