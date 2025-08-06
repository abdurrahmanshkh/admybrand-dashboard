'use client'

import { motion } from 'framer-motion'
import { Users, UserPlus, UserCheck, UserX, Crown, Activity } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { formatNumber, cn } from '@/lib/utils'

interface UserStatsCardProps {
  title: string
  value: number | string
  change: number
  icon: React.ComponentType<any>
  color: string
  index: number
  trend?: 'up' | 'down' | 'stable'
  progress?: number
}

function UserStatsCard({ title, value, change, icon: Icon, color, index, trend = 'stable', progress }: UserStatsCardProps) {
  const isPositive = change > 0
  const isNegative = change < 0

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
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 truncate">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-none">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              
              {/* Change indicator */}
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
                  vs last month
                </span>
              </div>

              {/* Progress bar if provided */}
              {progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Engagement</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
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
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function UserStatsCards() {
  const statsData = [
    {
      title: 'Total Users',
      value: 12847,
      change: 8.2,
      icon: Users,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      progress: 75
    },
    {
      title: 'New Users (30d)',
      value: 234,
      change: 12.5,
      icon: UserPlus,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      progress: 82
    },
    {
      title: 'Active Users',
      value: 9532,
      change: 5.8,
      icon: UserCheck,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      progress: 68
    },
    {
      title: 'Inactive Users',
      value: 3315,
      change: -2.1,
      icon: UserX,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      progress: 25
    },
    {
      title: 'Premium Users',
      value: 1847,
      change: 15.3,
      icon: Crown,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      progress: 92
    },
    {
      title: 'Daily Active',
      value: 4326,
      change: 7.4,
      icon: Activity,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      progress: 85
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
      {statsData.map((stat, index) => (
        <UserStatsCard
          key={stat.title}
          {...stat}
          index={index}
        />
      ))}
    </div>
  )
}
