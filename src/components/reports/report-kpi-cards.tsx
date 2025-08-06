'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Eye, MousePointer, Target, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber, formatPercentage, cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  change: number
  icon: React.ComponentType<any>
  color: string
  index: number
  period?: string
}

function KPICard({ title, value, change, icon: Icon, color, index, period = "vs last period" }: KPICardProps) {
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center space-x-2 mb-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 truncate">
                  {title}
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-none">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              <div className="flex items-center space-x-2">
                <Badge
                  className={cn(
                    'text-xs font-semibold px-3 py-1 rounded-full border-0',
                    isPositive && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    !isPositive && !isNeutral && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                    isNeutral && 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  )}
                >
                  <div className="flex items-center space-x-1">
                    {isPositive && <TrendingUp className="h-3 w-3" />}
                    {!isPositive && !isNeutral && <TrendingDown className="h-3 w-3" />}
                    <span>{formatPercentage(Math.abs(change))}</span>
                  </div>
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {period}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className={cn(
                'flex items-center justify-center w-14 h-14 rounded-xl shadow-lg',
                color
              )}>
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-4 -right-4 w-20 h-20 opacity-10 pointer-events-none">
            <div className={cn('w-full h-full rounded-full', color)} />
          </div>
          
          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.abs(change) * 3, 100)}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              className={cn('h-full rounded', color)}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface ReportKPICardsProps {
  data?: any
}

export function ReportKPICards({ data }: ReportKPICardsProps) {
  const kpiData = [
    {
      title: 'Total Revenue',
      value: formatCurrency(2847950),
      change: 12.5,
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      period: 'vs last month'
    },
    {
      title: 'Total Visitors',
      value: 145832,
      change: 8.3,
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      period: 'vs last month'
    },
    {
      title: 'Page Views',
      value: 892456,
      change: -2.1,
      icon: Eye,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      period: 'vs last month'
    },
    {
      title: 'Click-through Rate',
      value: formatPercentage(3.47),
      change: 15.2,
      icon: MousePointer,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      period: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: formatPercentage(2.84),
      change: 5.8,
      icon: Target,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      period: 'vs last month'
    },
    {
      title: 'Avg. Session Duration',
      value: '4m 23s',
      change: -3.2,
      icon: Clock,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      period: 'vs last month'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={kpi.title}
          {...kpi}
          index={index}
        />
      ))}
    </div>
  )
}
