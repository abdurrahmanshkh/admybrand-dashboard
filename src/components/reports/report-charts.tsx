'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChartContainer } from '@/components/charts/chart-container'
import { RechartsLineChart } from '@/components/charts/line-chart'
import { RechartsBarChart } from '@/components/charts/bar-chart'
import { RechartsPieChart } from '@/components/charts/pie-chart'
import { MultiSeriesChart } from '@/components/charts/multi-series-chart'

// Generate report-specific data
function generateRevenueOverTime() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, index) => ({
    name: month,
    value: Math.floor(Math.random() * 50000) + 100000 + (index * 10000),
    date: new Date(2024, index, 1).toISOString()
  }))
}

function generateChannelPerformance() {
  return [
    { name: 'Email Marketing', value: 35, color: '#3b82f6' },
    { name: 'Google Ads', value: 28, color: '#10b981' },
    { name: 'Social Media', value: 20, color: '#f59e0b' },
    { name: 'Direct Traffic', value: 12, color: '#ef4444' },
    { name: 'Referrals', value: 5, color: '#8b5cf6' }
  ]
}

function generateCampaignROI() {
  const campaigns = ['Summer Sale', 'Black Friday', 'Holiday Special', 'New Year Promo', 'Spring Launch']
  return campaigns.map(campaign => ({
    name: campaign,
    roi: Math.floor(Math.random() * 400) + 100,
    spent: Math.floor(Math.random() * 50000) + 10000,
    revenue: Math.floor(Math.random() * 200000) + 50000
  }))
}

function generateGeographicData() {
  return [
    { name: 'United States', value: 45, users: 65432, color: '#3b82f6' },
    { name: 'United Kingdom', value: 22, users: 32156, color: '#10b981' },
    { name: 'Canada', value: 15, users: 21876, color: '#f59e0b' },
    { name: 'Germany', value: 10, users: 14532, color: '#ef4444' },
    { name: 'Australia', value: 8, users: 11678, color: '#8b5cf6' }
  ]
}

export function RevenueOverTimeChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateRevenueOverTime())
      setIsLoading(false)
    }, 800)
  }, [])

  return (
    <ChartContainer
      title="Revenue Over Time"
      subtitle="Monthly revenue trends and growth patterns"
      isLoading={isLoading}
      chartId="revenue-over-time"
    >
      {!isLoading && (
        <RechartsLineChart 
          data={data} 
          color="#10b981" 
          showArea={true}
          height={350}
        />
      )}
    </ChartContainer>
  )
}

export function ChannelPerformanceChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateChannelPerformance())
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <ChartContainer
      title="Channel Performance"
      subtitle="Traffic distribution across marketing channels"
      isLoading={isLoading}
      chartId="channel-performance"
    >
      {!isLoading && (
        <RechartsPieChart 
          data={data} 
          height={400}
          innerRadius={70}
          outerRadius={130}
        />
      )}
    </ChartContainer>
  )
}

export function CampaignROIChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateCampaignROI())
      setIsLoading(false)
    }, 1200)
  }, [])

  return (
    <ChartContainer
      title="Campaign ROI Analysis"
      subtitle="Return on investment by marketing campaign"
      isLoading={isLoading}
      chartId="campaign-roi"
    >
      {!isLoading && (
        <RechartsBarChart 
          data={data} 
          dataKey="roi"
          height={300}
          colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
        />
      )}
    </ChartContainer>
  )
}

export function GeographicDistributionChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateGeographicData())
      setIsLoading(false)
    }, 1400)
  }, [])

  return (
    <ChartContainer
      title="Geographic Distribution"
      subtitle="User distribution by country/region"
      isLoading={isLoading}
      chartId="geographic-distribution"
    >
      {!isLoading && (
        <div className="space-y-4">
          {data.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: country.color }}
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {country.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {country.users.toLocaleString()} users
                </span>
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${country.value}%`,
                      backgroundColor: country.color 
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">
                  {country.value}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </ChartContainer>
  )
}
