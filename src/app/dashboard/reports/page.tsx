'use client'

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

interface FilterData {
  dateRange: string
  campaign: string
  channel: string
}

export default function ReportsPage() {
  const handleFiltersChange = (filters: FilterData) => {
    console.log('Filters changed:', filters)
    toast.info('Reports updated with new filters')
  }

  const handleExport = (format: string) => {
    console.log('Exporting as:', format)
    toast.success(`Report exported as ${format.toUpperCase()}`)
  }

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return Promise.resolve()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-8"
    >
      <div className="flex flex-col space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Analytics Reports
        </motion.h1>
      </div>

      <ReportFilters 
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />

      <ReportKPICards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RevenueOverTimeChart />
        </div>
        <div>
          <ChannelPerformanceChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CampaignROIChart />
        <GeographicDistributionChart />
      </div>

      <ConversionFunnel />
    </motion.div>
  )
}
