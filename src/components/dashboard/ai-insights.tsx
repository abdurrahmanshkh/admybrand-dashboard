'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const insights = [
  {
    icon: Lightbulb,
    title: 'Revenue Peak Detected',
    description: 'Revenue spiked last Friday—likely from the Black Friday campaign!',
    badge: 'Prediction'
  },
  {
    icon: Lightbulb,
    title: 'User Conversion Rate Up',
    description: 'Conversion rate climbed 4.3% this week after launch of new landing page.',
    badge: 'AI Insight'
  },
  {
    icon: Lightbulb,
    title: 'Engagement Drop',
    description: 'Engagement dipped on weekends. Try scheduling campaigns for midweek.',
    badge: 'Suggestion'
  }
]

export function AIInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {insights.map((insight, idx) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
        >
          <Card className="bg-gradient-to-r from-brand-50 to-purple-100 dark:from-brand-900/60 dark:to-purple-900/60 shadow-medium outline outline-1 outline-brand-500/10 hover:scale-[1.02] transition-transform">
            <CardContent className="flex flex-col items-start p-6">
              <div className="mb-3 flex items-center gap-2">
                <insight.icon className="w-6 h-6 text-purple-500" />
                <span className="ml-2 text-xs text-purple-700 dark:text-purple-300 font-semibold">{insight.badge}</span>
              </div>
              <div>
                <div className="font-bold text-brand-700 dark:text-brand-50 mb-1">{insight.title}</div>
                <div className="text-gray-700 dark:text-gray-200">{insight.description}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
