'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { AIInsights } from '@/components/dashboard/ai-insights'
import { 
  RevenueChart, 
  ServiceBreakdownChart, 
  PerformanceMetricsChart,
  FinancialOverviewChart 
} from '@/components/dashboard/chart-widgets'
import { StatsCardsSkeleton } from '@/components/ui/loading-skeleton'
import { InstallPrompt } from '@/components/ui/install-prompt'
import { generateDashboardMetrics } from '@/lib/data'
import { DashboardMetrics } from '@/types'

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <AIInsights />
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceBreakdownChart />
        <PerformanceMetricsChart />
      </div>

      {/* Full Width Chart */}
      <div>
        <FinancialOverviewChart />
      </div>

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </motion.div>
  )
}
