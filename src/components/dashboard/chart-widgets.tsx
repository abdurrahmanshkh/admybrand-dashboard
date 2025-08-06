'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChartContainer } from '@/components/charts/chart-container'
import { RechartsLineChart } from '@/components/charts/line-chart'
import { RechartsBarChart } from '@/components/charts/bar-chart'
import { RechartsPieChart } from '@/components/charts/pie-chart'
import { MultiSeriesChart } from '@/components/charts/multi-series-chart'
import { 
  generateTimeSeriesData, 
  generateRevenueBreakdown, 
  generatePerformanceMetrics,
  generateMultiSeriesData,
  simulateRealTimeData
} from '@/lib/data'
import { ChartDataPoint } from '@/types'

export function RevenueChart() {
  const [data, setData] = useState<ChartDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateTimeSeriesData(30))
      setIsLoading(false)
    }, 1000)

    const cleanup = simulateRealTimeData((newPoint) => {
      setData(prevData => {
        const newData = [...prevData.slice(1), newPoint]
        return newData
      })
    })

    return cleanup
  }, [])

  const handleRefresh = () => {
    setData(generateTimeSeriesData(30))
  }

  return (
    <ChartContainer
      title="Revenue Trend"
      subtitle="Daily revenue over the last 30 days"
      onRefresh={handleRefresh}
      badge="Live"
      isLoading={isLoading}
      chartId="revenue-trend"
    >
      {!isLoading && (
        <RechartsLineChart 
          data={data} 
          color="#3b82f6" 
          showArea={true}
          height={350}
        />
      )}
    </ChartContainer>
  )
}

export function ServiceBreakdownChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateRevenueBreakdown())
      setIsLoading(false)
    }, 1200)
  }, [])

  const handleRefresh = () => {
    setData(generateRevenueBreakdown())
  }

  return (
    <ChartContainer
      title="Service Revenue Breakdown"
      subtitle="Revenue distribution by service type"
      onRefresh={handleRefresh}
      isLoading={isLoading}
      chartId="service-breakdown"
    >
      {!isLoading && (
        <RechartsPieChart 
          data={data} 
          height={400}
          innerRadius={70}
          outerRadius={120}
        />
      )}
    </ChartContainer>
  )
}

export function PerformanceMetricsChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generatePerformanceMetrics())
      setIsLoading(false)
    }, 800)
  }, [])

  const handleRefresh = () => {
    setData(generatePerformanceMetrics())
  }

  return (
    <ChartContainer
      title="Performance Metrics"
      subtitle="Current vs previous period comparison"
      onRefresh={handleRefresh}
      isLoading={isLoading}
      chartId="performance-metrics"
    >
      {!isLoading && (
        <RechartsBarChart 
          data={data} 
          dataKey="current"
          height={400}
        />
      )}
    </ChartContainer>
  )
}

export function FinancialOverviewChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setData(generateMultiSeriesData(12))
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleRefresh = () => {
    setData(generateMultiSeriesData(12))
  }

  return (
    <ChartContainer
      title="Financial Overview"
      subtitle="Monthly revenue, expenses, and profit analysis"
      onRefresh={handleRefresh}
      isLoading={isLoading}
      chartId="financial-overview"
    >
      {!isLoading && (
        <MultiSeriesChart 
          data={data} 
          height={400}
        />
      )}
    </ChartContainer>
  )
}
