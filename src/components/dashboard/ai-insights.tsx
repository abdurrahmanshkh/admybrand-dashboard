'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ChevronRight, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface AIInsight {
  id: string
  type: 'opportunity' | 'warning' | 'recommendation' | 'trend'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  action?: string
  metric?: {
    value: string
    change: number
  }
}

const generateAIInsights = (): AIInsight[] => [
  {
    id: '1',
    type: 'opportunity',
    title: 'Revenue Growth Opportunity',
    description: 'Your email campaigns show 23% higher engagement on Tuesdays. Consider shifting more budget to Tuesday campaigns.',
    impact: 'high',
    confidence: 87,
    action: 'Optimize Campaign Timing',
    metric: { value: '+$12K', change: 23 }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Customer Churn Risk',
    description: 'Users with low engagement in the first week have 67% higher churn rate. Implement early engagement strategies.',
    impact: 'high',
    confidence: 92,
    action: 'Create Onboarding Flow',
    metric: { value: '67%', change: -15 }
  },
  {
    id: '3',
    type: 'trend',
    title: 'Emerging Channel Performance',
    description: 'LinkedIn campaigns are showing 340% growth in lead quality compared to other channels this month.',
    impact: 'medium',
    confidence: 78,
    action: 'Increase LinkedIn Budget',
    metric: { value: '+340%', change: 340 }
  },
  {
    id: '4',
    type: 'recommendation',
    title: 'Content Optimization',
    description: 'Posts with video content generate 5x more engagement. Consider increasing video content production.',
    impact: 'medium',
    confidence: 84,
    action: 'Create Video Strategy',
    metric: { value: '5x', change: 500 }
  }
]

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setInsights(generateAIInsights())
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id])
  }

  const visibleInsights = insights.filter(insight => !dismissedInsights.includes(insight.id))

  if (isLoading) {
    return (
      <Card className="shadow-soft border-0">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full"
            />
            <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
              Processing...
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-soft border-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              AI-Powered
            </Badge>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {visibleInsights.length} insights
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {visibleInsights.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                All insights have been reviewed. New insights will appear as data is analyzed.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {visibleInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {insight.type === 'opportunity' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {insight.type === 'warning' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      {insight.type === 'trend' && <TrendingUp className="w-4 h-4 text-blue-500" />}
                      {insight.type === 'recommendation' && <Lightbulb className="w-4 h-4 text-purple-500" />}
                      
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {insight.title}
                      </h3>
                      
                      <Badge
                        variant="outline"
                        className={
                          insight.impact === 'high' 
                            ? 'border-red-200 text-red-800 bg-red-50 dark:border-red-800 dark:text-red-300 dark:bg-red-900/20'
                            : insight.impact === 'medium'
                            ? 'border-yellow-200 text-yellow-800 bg-yellow-50 dark:border-yellow-800 dark:text-yellow-300 dark:bg-yellow-900/20'
                            : 'border-green-200 text-green-800 bg-green-50 dark:border-green-800 dark:text-green-300 dark:bg-green-900/20'
                        }
                      >
                        {insight.impact} impact
                      </Badge>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissInsight(insight.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Confidence Score
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={insight.confidence} className="w-16 h-2" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {insight.confidence}%
                          </span>
                        </div>
                      </div>
                      
                      {insight.metric && (
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Potential Impact
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {insight.metric.value}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {insight.action && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {insight.action}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
