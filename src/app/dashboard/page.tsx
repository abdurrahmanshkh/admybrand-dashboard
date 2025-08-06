'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { StatsCardsSkeleton } from '@/components/ui/loading-skeleton'
import { generateDashboardMetrics } from '@/lib/data'
import { DashboardMetrics } from '@/types'
import { WidgetArea } from '@/components/dashboard/widget-area'
import { AIInsights } from '@/components/dashboard/ai-insights'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setMetrics(generateDashboardMetrics())
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <StatsCardsSkeleton />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Stats Cards */}
      {metrics && <StatsCards metrics={metrics} />}

      {/* AI Insights */}
      <AIInsights />

      {/* Drag-and-drop Widgets */}
      <WidgetArea />
    </motion.div>
  )
}
