'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  Eye,
  CheckCircle,
  Clock,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Anomaly {
  id: string
  type: 'spike' | 'drop' | 'pattern' | 'threshold'
  severity: 'critical' | 'warning' | 'info'
  title: string
  description: string
  metric: string
  currentValue: string
  expectedValue: string
  deviation: number
  detectedAt: string
  affectedCampaigns?: string[]
  confidence: number
  status: 'active' | 'investigating' | 'resolved'
}

const generateAnomalies = (): Anomaly[] => [
  {
    id: '1',
    type: 'drop',
    severity: 'critical',
    title: 'Sudden Traffic Drop Detected',
    description: 'Website traffic decreased by 47% in the last 2 hours compared to the same period last week.',
    metric: 'Website Traffic',
    currentValue: '2,341',
    expectedValue: '4,423',
    deviation: -47,
    detectedAt: '2024-12-20T14:30:00Z',
    affectedCampaigns: ['Summer Sale', 'Product Launch'],
    confidence: 94,
    status: 'active'
  },
  {
    id: '2',
    type: 'spike',
    severity: 'warning',
    title: 'Unusual Email Open Rate Spike',
    description: 'Email open rates are 73% higher than normal, indicating potential delivery issues or data anomalies.',
    metric: 'Email Open Rate',
    currentValue: '67.3%',
    expectedValue: '38.9%',
    deviation: 73,
    detectedAt: '2024-12-20T13:15:00Z',
    affectedCampaigns: ['Newsletter Campaign'],
    confidence: 87,
    status: 'investigating'
  },
  {
    id: '3',
    type: 'pattern',
    severity: 'info',
    title: 'Unusual User Behavior Pattern',
    description: 'AI detected an unusual pattern in user session duration - 23% longer than typical user behavior.',
    metric: 'Session Duration',
    currentValue: '4m 32s',
    expectedValue: '3m 41s',
    deviation: 23,
    detectedAt: '2024-12-20T12:45:00Z',
    confidence: 79,
    status: 'active'
  },
  {
    id: '4',
    type: 'threshold',
    severity: 'warning',
    title: 'Cost Per Click Threshold Exceeded',
    description: 'Google Ads CPC has exceeded the set threshold of $2.50, currently at $3.24 (+30%).',
    metric: 'Cost Per Click',
    currentValue: '$3.24',
    expectedValue: '$2.50',
    deviation: 30,
    detectedAt: '2024-12-20T11:20:00Z',
    affectedCampaigns: ['PPC Campaign A', 'Retargeting Campaign'],
    confidence: 96,
    status: 'resolved'
  }
]

export function AnomalyDetection() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [dismissedIds, setDismissedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnomalies(generateAnomalies())
      setIsLoading(false)
    }, 800)
  }, [])

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => [...prev, id])
  }

  const handleStatusChange = (id: string, status: 'active' | 'investigating' | 'resolved') => {
    setAnomalies(prev => 
      prev.map(anomaly => 
        anomaly.id === id ? { ...anomaly, status } : anomaly
      )
    )
  }

  const visibleAnomalies = anomalies.filter(anomaly => !dismissedIds.includes(anomaly.id))

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spike': return TrendingUp
      case 'drop': return TrendingDown
      case 'pattern': return Activity
      case 'threshold': return AlertTriangle
      default: return Eye
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return AlertTriangle
      case 'investigating': return Clock
      case 'resolved': return CheckCircle
      default: return Eye
    }
  }

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Anomaly Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span>Anomaly Detection</span>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-0">
              {visibleAnomalies.filter(a => a.status === 'active').length} Active
            </Badge>
          </CardTitle>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI-powered detection of unusual patterns and performance anomalies
        </p>
      </CardHeader>

      <CardContent>
        <AnimatePresence>
          {visibleAnomalies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                All Clear!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No anomalies detected in your marketing data.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {visibleAnomalies.map((anomaly, index) => {
                const TypeIcon = getTypeIcon(anomaly.type)
                const StatusIcon = getStatusIcon(anomaly.status)
                
                return (
                  <motion.div
                    key={anomaly.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6 border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {anomaly.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {anomaly.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={cn('text-xs border', getSeverityColor(anomaly.severity))}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismiss(anomaly.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current</div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {anomaly.currentValue}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Expected</div>
                        <div className="font-semibold text-gray-700 dark:text-gray-300">
                          {anomaly.expectedValue}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Deviation</div>
                        <div className={`font-bold ${anomaly.deviation > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Confidence</div>
                        <div className="flex items-center space-x-2">
                          <Progress value={anomaly.confidence} className="w-12 h-2" />
                          <span className="text-xs font-semibold">{anomaly.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={cn('text-xs border', getStatusColor(anomaly.status))}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {anomaly.status.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Detected {new Date(anomaly.detectedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {anomaly.status === 'active' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(anomaly.id, 'investigating')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                          >
                            Investigate
                          </Button>
                        )}
                        {anomaly.status === 'investigating' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(anomaly.id, 'resolved')}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs"
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Affected Campaigns */}
                    {anomaly.affectedCampaigns && (
                      <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Affected Campaigns:</div>
                        <div className="flex flex-wrap gap-2">
                          {anomaly.affectedCampaigns.map((campaign, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {campaign}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
