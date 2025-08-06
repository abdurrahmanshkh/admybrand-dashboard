'use client'

import { motion } from 'framer-motion'
import { Activity, Users, FileText, Shield, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { formatNumber, cn } from '@/lib/utils'

interface ActivityStatProps {
  title: string
  value: number | string
  change: number
  icon: React.ComponentType<any>
  color: string
  index: number
  period?: string
  trend?: number
}

function ActivityStatCard({ title, value, change, icon: Icon, color, index, period = "24h", trend }: ActivityStatProps) {
  const isPositive = change > 0
  const isNegative = change < 0

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
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 truncate">
                {title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-none">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              
              <div className="flex items-center space-x-2 mb-3">
                <Badge
                  className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full border-0',
                    isPositive && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    isNegative && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                    !isPositive && !isNegative && 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  )}
                >
                  {isPositive ? '+' : ''}{change}%
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  last {period}
                </span>
              </div>

              {trend !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Activity Trend</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{trend}%</span>
                  </div>
                  <Progress value={trend} className="h-1.5" />
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0">
              <div className={cn(
                'flex items-center justify-center w-12 h-12 rounded-lg shadow-lg',
                color
              )}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="absolute -top-4 -right-4 w-16 h-16 opacity-10 pointer-events-none">
            <div className={cn('w-full h-full rounded-full', color)} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ActivityStats() {
  const statsData = [
    {
      title: 'Total Activities',
      value: 2847,
      change: 12.3,
      icon: Activity,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: 78
    },
    {
      title: 'User Actions',
      value: 1923,
      change: 8.7,
      icon: Users,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: 65
    },
    {
      title: 'System Events',
      value: 542,
      change: -2.4,
      icon: Shield,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      trend: 42
    },
    {
      title: 'Reports Generated',
      value: 382,
      change: 15.8,
      icon: FileText,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      trend: 89
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: -5.3,
      icon: Clock,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      trend: 92
    },
    {
      title: 'Growth Rate',
      value: '23.4%',
      change: 4.2,
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      trend: 71
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
      {statsData.map((stat, index) => (
        <ActivityStatCard
          key={stat.title}
          {...stat}
          index={index}
        />
      ))}
    </div>
  )
}
