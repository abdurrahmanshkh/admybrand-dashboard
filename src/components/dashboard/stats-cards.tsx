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
      <Card className="relative overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    'text-xs font-medium',
                    isPositive && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
                    !isPositive && !isNeutral && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
                    isNeutral && 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  )}
                >
                  <div className="flex items-center space-x-1">
                    {isPositive && <TrendingUp className="h-3 w-3" />}
                    {!isPositive && !isNeutral && <TrendingDown className="h-3 w-3" />}
                    <span>{formatPercentage(Math.abs(change))}</span>
                  </div>
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs last month
                </span>
              </div>
            </div>
            <div className={cn(
              'flex items-center justify-center w-12 h-12 rounded-lg',
              color
            )}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div className={cn('w-full h-full rounded-full', color.replace('bg-', 'bg-'))} />
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
      color: 'bg-brand-500'
    },
    {
      title: 'Active Users',
      value: metrics.users.current,
      change: metrics.users.change,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Conversions',
      value: metrics.conversions.current,
      change: metrics.conversions.change,
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Growth Rate',
      value: formatPercentage(metrics.growth.current),
      change: metrics.growth.change,
      icon: Activity,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
