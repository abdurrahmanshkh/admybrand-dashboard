'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Users, Eye, MousePointer, ShoppingCart, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FunnelStage {
  name: string
  users: number
  percentage: number
  icon: React.ComponentType<any>
  color: string
  description: string
}

const funnelData: FunnelStage[] = [
  {
    name: 'Visitors',
    users: 100000,
    percentage: 100,
    icon: Users,
    color: 'bg-blue-500',
    description: 'Total unique visitors'
  },
  {
    name: 'Page Views',
    users: 75000,
    percentage: 75,
    icon: Eye,
    color: 'bg-indigo-500',
    description: 'Viewed product pages'
  },
  {
    name: 'Interactions',
    users: 45000,
    percentage: 45,
    icon: MousePointer,
    color: 'bg-purple-500',
    description: 'Clicked on products'
  },
  {
    name: 'Add to Cart',
    users: 18000,
    percentage: 18,
    icon: ShoppingCart,
    color: 'bg-orange-500',
    description: 'Added items to cart'
  },
  {
    name: 'Purchases',
    users: 8500,
    percentage: 8.5,
    icon: CreditCard,
    color: 'bg-green-500',
    description: 'Completed transactions'
  }
]

export function ConversionFunnel() {
  const [animatedData, setAnimatedData] = useState<FunnelStage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnimatedData(funnelData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Conversion Funnel Analysis
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track user journey from visitor to customer
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {animatedData.map((stage, index) => {
            const nextStage = animatedData[index + 1]
            const dropOffRate = nextStage ? 
              ((stage.users - nextStage.users) / stage.users * 100).toFixed(1) : 0

            return (
              <div key={stage.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative"
                >
                  {/* Stage Card */}
                  <div className={`relative overflow-hidden rounded-xl ${stage.color} p-6 text-white shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/20 rounded-lg">
                          <stage.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{stage.name}</h3>
                          <p className="text-white/80 text-sm">{stage.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {stage.users.toLocaleString()}
                        </div>
                        <div className="text-white/80 text-sm">
                          {stage.percentage}% of total
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/80">Conversion Rate</span>
                        <span className="text-xs text-white font-semibold">
                          {stage.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.percentage}%` }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                          className="bg-white h-2 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                  </div>

                  {/* Drop-off indicator */}
                  {nextStage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                      className="flex items-center justify-center py-3"
                    >
                      <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                        <ArrowDown className="h-4 w-4 text-red-500" />
                        <span className="text-xs font-medium text-red-600 dark:text-red-400">
                          {dropOffRate}% drop-off
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                8.5%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Overall Conversion Rate
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                91,500
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Drop-offs
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                $2.1M
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Revenue from Conversions
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
