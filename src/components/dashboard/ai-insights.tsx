'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ChevronRight, X, Brain, Zap } from 'lucide-react'
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
    description: 'Email campaigns show 23% higher engagement on Tuesdays.',
    impact: 'high',
    confidence: 87,
    action: 'Optimize Timing',
    metric: { value: '+$12K', change: 23 }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Churn Risk Detection',
    description: 'Low first-week engagement indicates 67% higher churn risk.',
    impact: 'high',
    confidence: 92,
    action: 'Create Flow',
    metric: { value: '67%', change: -15 }
  },
  {
    id: '3',
    type: 'trend',
    title: 'LinkedIn Performance',
    description: 'LinkedIn shows 340% growth in lead quality this month.',
    impact: 'medium',
    confidence: 78,
    action: 'Scale Budget',
    metric: { value: '+340%', change: 340 }
  }
]

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInsights(generateAIInsights())
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id])
  }

  const visibleInsights = insights.filter(insight => !dismissedInsights.includes(insight.id))

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900 h-fit">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
            />
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</CardTitle>
              <Badge className="mt-1 bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-0">
                Processing...
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Insights
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-0 text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {visibleInsights.length} active
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <AnimatePresence>
          {visibleInsights.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">All Caught Up!</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                New insights will appear as we analyze your data.
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
                  className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-shrink-0">
                        {insight.type === 'opportunity' && (
                          <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                        {insight.type === 'warning' && (
                          <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                        )}
                        {insight.type === 'trend' && (
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                        {insight.type === 'recommendation' && (
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                            <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 leading-tight">
                          {insight.title}
                        </h3>
                        <Badge
                          className={`text-xs border-0 ${
                            insight.impact === 'high' 
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                              : insight.impact === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          }`}
                        >
                          {insight.impact} impact
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissInsight(insight.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-1 font-medium">
                          Confidence
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={insight.confidence} className="w-16 h-2" />
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {insight.confidence}%
                          </span>
                        </div>
                      </div>
                      
                      {insight.metric && (
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mb-1 font-medium">
                            Impact
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {insight.metric.value}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {insight.action && (
                    <Button
                      size="sm"
                      className="w-full justify-between bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white border-0 shadow-lg text-xs h-8"
                    >
                      {insight.action}
                      <ChevronRight className="w-4 h-4 ml-2" />
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
