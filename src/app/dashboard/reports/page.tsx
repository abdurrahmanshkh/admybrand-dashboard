'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ReportFilters } from '@/components/reports/report-filters'
import { ReportKPICards } from '@/components/reports/report-kpi-cards'
import { 
  RevenueOverTimeChart,
  ChannelPerformanceChart,
  CampaignROIChart,
  GeographicDistributionChart
} from '@/components/reports/report-charts'
import { ConversionFunnel } from '@/components/reports/conversion-funnel'
import { toast } from 'sonner'

export default function ReportsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters)
    toast.info('Reports updated with new filters')
  }

  const handleExport = (format: string) => {
    console.log('Exporting as:', format)
    // Here you would implement actual export functionality
    toast.success(`Report exported as ${format.toUpperCase()}`)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    return Promise.resolve()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-8"
    >
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Analytics Reports
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Comprehensive insights and performance analytics for data-driven decisions
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ReportFilters 
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
        />
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ReportKPICards />
      </motion.div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Chart - Spans 2 columns */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2"
        >
          <RevenueOverTimeChart />
        </motion.div>

        {/* Channel Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChannelPerformanceChart />
        </motion.div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CampaignROIChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GeographicDistributionChart />
        </motion.div>
      </div>

      {/* Conversion Funnel - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ConversionFunnel />
      </motion.div>
    </motion.div>
  )
}
