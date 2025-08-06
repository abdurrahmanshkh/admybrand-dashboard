'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          {data.name}
        </p>
        <p className="text-lg font-bold" style={{ color: data.color }}>
          {data.value}%
        </p>
      </motion.div>
    )
  }
  return null
}

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) {
  // Only show labels for segments larger than 8%
  if (percent < 0.08) return null

  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 1.3
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="currentColor" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-sm font-semibold fill-gray-700 dark:fill-gray-300"
      fontSize={13}
      fontWeight={600}
    >
      {`${value}%`}
    </text>
  )
}

function CustomLegend(props: any) {
  const { payload } = props
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
      {payload.map((entry: any, index: number) => (
        <div
          key={`legend-${index}`}
          className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {entry.value}
          </span>
          <span className="text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900 px-2 py-1 rounded-full">
            {entry.payload.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

interface RechartsPieChartProps {
  data: any[]
  height?: number
  innerRadius?: number
  outerRadius?: number
  showLabels?: boolean
  showLegend?: boolean
}

export function RechartsPieChart({ 
  data, 
  height = 450,
  innerRadius = 70,
  outerRadius = 130,
  showLabels = true,
  showLegend = true
}: RechartsPieChartProps) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={showLabels ? CustomLabel : false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend 
              content={<CustomLegend />}
              wrapperStyle={{ paddingBottom: '10px' }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
