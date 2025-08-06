'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { InsightsHeader } from '@/components/insights/insights-header'
import { AIRecommendations } from '@/components/insights/ai-recommendations'
import { PredictiveAnalytics } from '@/components/insights/predictive-analytics'
import { AnomalyDetection } from '@/components/insights/anomaly-detection'
import { toast } from 'sonner'

export default function InsightsPage() {
  const handleRefresh = async () => {
    // Simulate AI processing
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
      {/* AI Insights Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <InsightsHeader 
          onRefresh={handleRefresh}
          onExport={handleExport}
          onSettings={handleSettings}
        />
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AIRecommendations />
      </motion.div>

      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Predictive Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered forecasting and trend predictions for strategic planning
          </p>
        </div>
        <PredictiveAnalytics />
      </motion.div>

      {/* Anomaly Detection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <AnomalyDetection />
      </motion.div>
    </motion.div>
  )
}
