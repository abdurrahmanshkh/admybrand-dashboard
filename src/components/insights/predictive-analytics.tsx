'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Target, AlertTriangle, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChartContainer } from '@/components/charts/chart-container'
import { RechartsLineChart } from '@/components/charts/line-chart'

// Generate predictive data
function generatePredictiveData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const historical = months.slice(0, 8).map((month, index) => ({
    name: month,
    value: 100000 + (index * 15000) + (Math.random() * 10000),
    predicted: false
  }))
  
  const predicted = months.slice(8).map((month, index) => ({
    name: month,
    value: 220000 + (index * 18000) + (Math.random() * 12000),
    predicted: true
  }))

  return [...historical, ...predicted]
}

interface PredictiveMetric {
  id: string
  title: string
  currentValue: string
  predictedValue: string
  change: number
  confidence: number
  timeframe: string
  icon: React.ComponentType<any>
  color: string
  trend: 'up' | 'down' | 'stable'
}

const predictiveMetrics: PredictiveMetric[] = [
  {
    id: '1',
    title: 'Revenue Forecast',
    currentValue: '$284K',
    predictedValue: '$347K',
    change: 22.2,
    confidence: 94,
    timeframe: 'Next 3 months',
    icon: TrendingUp,
    color: 'text-green-600',
    trend: 'up'
  },
  {
    id: '2',
    title: 'Customer Acquisition',
    currentValue: '1,247',
    predictedValue: '1,689',
    change: 35.4,
    confidence: 87,
    timeframe: 'Next quarter',
    icon: Target,
    color: 'text-blue-600',
    trend: 'up'
  },
  {
    id: '3',
    title: 'Churn Risk',
    currentValue: '12.4%',
    predictedValue: '8.7%',
    change: -29.8,
    confidence: 91,
    timeframe: 'With intervention',
    icon: AlertTriangle,
    color: 'text-red-600',
    trend: 'down'
  },
  {
    id: '4',
    title: 'Engagement Rate',
    currentValue: '24.6%',
    predictedValue: '31.2%',
    change: 26.8,
    confidence: 82,
    timeframe: 'Next 60 days',
    icon: Zap,
    color: 'text-purple-600',
    trend: 'up'
  }
]

export function PredictiveAnalytics() {
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setChartData(generatePredictiveData())
      setIsLoading(false)
    }, 1200)
  }, [])

  return (
    <div className="space-y-6">
      {/* Predictive Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {predictiveMetrics.map((metric, index) => {
          const Icon = metric.icon
          const isPositive = metric.change > 0
          const isImprovement = (metric.trend === 'up' && metric.change > 0) || (metric.trend === 'down' && metric.change < 0)
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg border-0 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <Badge className={`text-xs ${isImprovement ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'} dark:bg-opacity-20`}>
                      {isPositive ? '+' : ''}{metric.change.toFixed(1)}%
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    {metric.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Current</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {metric.currentValue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Predicted</span>
                      <span className={`text-sm font-bold ${isImprovement ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.predictedValue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Confidence</span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {metric.confidence}%
                      </span>
                    </div>
                    <Progress value={metric.confidence} className="h-2" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {metric.timeframe}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Predictive Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChartContainer
          title="Revenue Prediction Model"
          subtitle="AI-powered revenue forecasting with 94% accuracy"
          badge="Predictive"
          isLoading={isLoading}
          chartId="predictive-revenue"
        >
          {!isLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Historical Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">AI Prediction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Confidence Band</span>
                </div>
              </div>
              <RechartsLineChart 
                data={chartData} 
                color="#8b5cf6" 
                showArea={true}
                height={350}
              />
            </div>
          )}
        </ChartContainer>
      </motion.div>
    </div>
  )
}
