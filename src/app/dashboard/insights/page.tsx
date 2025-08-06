'use client'

import { motion } from 'framer-motion'
import { InsightsHeader } from '@/components/insights/insights-header'
import { AIRecommendations } from '@/components/insights/ai-recommendations'
import { PredictiveAnalytics } from '@/components/insights/predictive-analytics'
import { AnomalyDetection } from '@/components/insights/anomaly-detection'
import { toast } from 'sonner'

export default function InsightsPage() {
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return Promise.resolve()
  }

  const handleExport = (format: string) => {
    console.log(`Exporting insights as ${format}`)
  }

  const handleSettings = () => {
    toast.info('AI settings panel opened')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-8"
    >
      <InsightsHeader 
        onRefresh={handleRefresh}
        onExport={handleExport}
        onSettings={handleSettings}
      />

      <AIRecommendations />

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Predictive Analytics
        </h2>
      </div>
      
      <PredictiveAnalytics />
      <AnomalyDetection />
    </motion.div>
  )
}
