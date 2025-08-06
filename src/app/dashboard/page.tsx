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
      className="space-y-8 pb-8"
    >
      {/* Stats Cards */}
      {metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCards metrics={metrics} />
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column - Revenue Chart (Takes more space) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-3"
        >
          <RevenueChart />
        </motion.div>

        {/* Right Column - AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-1"
        >
          <AIInsights />
        </motion.div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ServiceBreakdownChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <PerformanceMetricsChart />
        </motion.div>
      </div>

      {/* Full Width Financial Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <FinancialOverviewChart />
      </motion.div>

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </motion.div>
  )
}
