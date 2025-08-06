'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users, 
  Zap,
  ChevronRight,
  X,
  ThumbsUp,
  ThumbsDown,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface AIRecommendation {
  id: string
  type: 'revenue' | 'engagement' | 'optimization' | 'targeting' | 'automation'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  priority: number
  expectedGain: string
  timeToImplement: string
  category: string
  actionSteps: string[]
  metrics?: {
    currentValue: string
    projectedValue: string
    improvement: string
  }
}

const generateRecommendations = (): AIRecommendation[] => [
  {
    id: '1',
    type: 'revenue',
    title: 'Optimize Email Campaign Timing',
    description: 'AI detected that emails sent on Tuesday at 2:00 PM generate 34% higher conversion rates compared to your current schedule.',
    impact: 'high',
    confidence: 92,
    priority: 1,
    expectedGain: '+$15,000/month',
    timeToImplement: '2 hours',
    category: 'Email Marketing',
    actionSteps: [
      'Analyze current email send times',
      'Implement Tuesday 2 PM scheduling',
      'A/B test the new timing',
      'Monitor performance for 30 days'
    ],
    metrics: {
      currentValue: '2.4%',
      projectedValue: '3.2%',
      improvement: '+34%'
    }
  },
  {
    id: '2',
    type: 'engagement',
    title: 'Enhance Social Media Content Strategy',
    description: 'Video content performs 5x better than static posts. Increasing video content by 40% could boost engagement significantly.',
    impact: 'high',
    confidence: 87,
    priority: 2,
    expectedGain: '+127% engagement',
    timeToImplement: '1 week',
    category: 'Social Media',
    actionSteps: [
      'Audit current content mix',
      'Create video content calendar',
      'Invest in video creation tools',
      'Track engagement metrics'
    ],
    metrics: {
      currentValue: '3.2K',
      projectedValue: '7.3K',
      improvement: '+127%'
    }
  },
  {
    id: '3',
    type: 'optimization',
    title: 'Improve Landing Page Conversion',
    description: 'AI analysis shows that simplifying your landing page form from 7 to 3 fields could increase conversions by 28%.',
    impact: 'medium',
    confidence: 84,
    priority: 3,
    expectedGain: '+28% conversions',
    timeToImplement: '4 hours',
    category: 'Website Optimization',
    actionSteps: [
      'Identify essential form fields',
      'Redesign simplified form',
      'Implement progressive profiling',
      'Test and optimize'
    ],
    metrics: {
      currentValue: '12.4%',
      projectedValue: '15.9%',
      improvement: '+28%'
    }
  },
  {
    id: '4',
    type: 'targeting',
    title: 'Refine Audience Segmentation',
    description: 'Machine learning identified 3 high-value customer segments that are currently under-targeted in your campaigns.',
    impact: 'high',
    confidence: 91,
    priority: 4,
    expectedGain: '+$8,500/month',
    timeToImplement: '3 days',
    category: 'Audience Targeting',
    actionSteps: [
      'Review AI-identified segments',
      'Create targeted campaigns',
      'Develop personalized content',
      'Launch and monitor performance'
    ]
  }
]

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [dismissedIds, setDismissedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setRecommendations(generateRecommendations())
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => [...prev, id])
  }

  const handleFeedback = (id: string, positive: boolean) => {
    // Handle AI feedback
    console.log(`Feedback for ${id}: ${positive ? 'positive' : 'negative'}`)
  }

  const visibleRecommendations = recommendations.filter(rec => !dismissedIds.includes(rec.id))

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue': return DollarSign
      case 'engagement': return Users
      case 'optimization': return Target
      case 'targeting': return TrendingUp
      case 'automation': return Zap
      default: return Lightbulb
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'revenue': return 'from-green-500 to-green-600'
      case 'engagement': return 'from-blue-500 to-blue-600'
      case 'optimization': return 'from-purple-500 to-purple-600'
      case 'targeting': return 'from-orange-500 to-orange-600'
      case 'automation': return 'from-red-500 to-red-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="animate-pulse w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <span>AI-Powered Recommendations</span>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-0">
              {visibleRecommendations.length} Active
            </Badge>
          </CardTitle>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Intelligent suggestions to optimize your marketing performance
        </p>
      </CardHeader>
      
      <CardContent>
        <AnimatePresence>
          {visibleRecommendations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">
                All recommendations reviewed!
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                New AI insights will appear as we analyze your data.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {visibleRecommendations.map((recommendation, index) => {
                const Icon = getTypeIcon(recommendation.type)
                const typeColor = getTypeColor(recommendation.type)
                
                return (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    {/* Priority Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className={cn('text-xs border', getImpactColor(recommendation.impact))}>
                        {recommendation.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>

                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={cn('p-3 rounded-xl bg-gradient-to-r shadow-lg', typeColor)}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {recommendation.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {recommendation.description}
                        </p>
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {recommendation.category}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Priority #{recommendation.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    {recommendation.metrics && (
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {recommendation.metrics.currentValue}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Projected</div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {recommendation.metrics.projectedValue}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Improvement</div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {recommendation.metrics.improvement}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Gain</div>
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          {recommendation.expectedGain}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time to Implement</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {recommendation.timeToImplement}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Confidence Score</div>
                        <div className="flex items-center justify-center space-x-2">
                          <Progress value={recommendation.confidence} className="w-16 h-2" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {recommendation.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleFeedback(recommendation.id, true)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFeedback(recommendation.id, false)}
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Not Helpful
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDismiss(recommendation.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          Implement
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
