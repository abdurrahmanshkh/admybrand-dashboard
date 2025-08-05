'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { StatsCardsSkeleton, ChartSkeleton } from '@/components/ui/loading-skeleton'
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
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <StatsCardsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <ChartSkeleton height={300} />
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

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ChartSkeleton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ChartSkeleton />
        </motion.div>
      </div>

      {/* Large Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChartSkeleton height={300} />
      </motion.div>
    </motion.div>
  )
}
