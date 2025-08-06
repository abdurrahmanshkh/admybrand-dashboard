'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Settings,
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface InsightsHeaderProps {
  onRefresh?: () => void
  onExport?: (format: string) => void
  onSettings?: () => void
}

export function InsightsHeader({ onRefresh, onExport, onSettings }: InsightsHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [aiProcessing, setAiProcessing] = useState(78) // AI processing progress

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh?.()
    setTimeout(() => setIsRefreshing(false), 2000)
    toast.success('AI insights refreshed successfully!')
  }

  const handleExport = (format: string) => {
    onExport?.(format)
    toast.success(`Insights exported as ${format.toUpperCase()}`)
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Left Side - Title and Description */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 mb-4"
            >
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Insights</h1>
                <p className="text-white/90 text-lg">
                  Powered by Advanced Machine Learning
                </p>
              </div>
              <Badge className="bg-yellow-400 text-yellow-900 border-0 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-base max-w-2xl"
            >
              Get intelligent recommendations, predictive analytics, and automated insights 
              to optimize your marketing performance and drive better business outcomes.
            </motion.p>
          </div>

          {/* Right Side - AI Status and Actions */}
          <div className="lg:w-80">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4"
            >
              {/* AI Processing Status */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/90">AI Processing Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/70">Active</span>
                  </div>
                </div>
                <Progress value={aiProcessing} className="h-2 bg-white/20" />
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Data Analysis Complete</span>
                  <span>{aiProcessing}%</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">847</div>
                  <div className="text-xs text-white/70">Insights</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">23</div>
                  <div className="text-xs text-white/70">Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">94%</div>
                  <div className="text-xs text-white/70">Accuracy</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-3 border-t border-white/20">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')}>
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onSettings}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </CardContent>
    </Card>
  )
}
