'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber, formatPercentage, cn } from '@/lib/utils'
import { DashboardMetrics } from '@/types'

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ComponentType<any>
  color: string
  index: number
}

function StatsCard({ title, value, change, icon: Icon, color, index }: StatsCardProps) {
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 truncate">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-none">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              <div className="flex items-center space-x-2">
                <Badge
                  className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full border-0',
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
                  vs last month
                </span>
              </div>
            </div>
            
            <div className={cn(
              'flex items-center justify-center w-14 h-14 rounded-xl shadow-lg flex-shrink-0',
              color
            )}>
              <Icon className="h-7 w-7 text-white" />
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10 pointer-events-none">
            <div className={cn('w-full h-full rounded-full', color)} />
          </div>
          
          {/* Progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
            <div 
              className={cn('h-full transition-all duration-1000 rounded', color)}
              style={{ width: `${Math.min(Math.abs(change) * 2, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface StatsCardsProps {
  metrics: DashboardMetrics
}

export function StatsCards({ metrics }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.revenue.current),
      change: metrics.revenue.change,
      icon: DollarSign,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: metrics.users.current,
      change: metrics.users.change,
      icon: Users,
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'Conversions',
      value: metrics.conversions.current,
      change: metrics.conversions.change,
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Growth Rate',
      value: formatPercentage(metrics.growth.current),
      change: metrics.growth.change,
      icon: Activity,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <StatsCard
          key={card.title}
          {...card}
          index={index}
        />
      ))}
    </div>
  )
}
