'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {name}
        </p>
        <p className="text-base font-bold" style={{ color }}>
          {value}%
        </p>
      </motion.div>
    )
  }
  return null
}

interface CustomLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  value: number
}

function CustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: CustomLabelProps) {
  if (percent < 0.05) return null

  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-semibold fill-gray-700 dark:fill-gray-300"
      fontSize={11}
      fontWeight={600}
    >
      {`${value}%`}
    </text>
  )
}

interface LegendItem {
  name: string
  value: number
  color: string
}

interface CustomLegendProps {
  data: LegendItem[]
}

function CustomLegend({ data }: CustomLegendProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2">
      {data.map((entry, i) => (
        <div
          key={i}
          className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700"
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
            {entry.name}
          </span>
          <span className="text-[10px] font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900 px-1 py-0.5 rounded-full">
            {entry.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

interface RechartsPieChartProps {
  data: LegendItem[]
  /** height of the chart area (excluding legend) */
  chartHeight?: number
  innerRadius?: number
  outerRadius?: number
  showLabels?: boolean
  showLegend?: boolean
}

export function RechartsPieChart({
  data,
  chartHeight = 300,
  innerRadius = 55,
  outerRadius = 100,
  showLabels = true,
  showLegend = true,
}: RechartsPieChartProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Pie Chart */}
      <div style={{ width: '100%', height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 5, right: 15, bottom: 15, left: 15 }}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              labelLine={false}
              label={showLabels ? CustomLabel : undefined}
              stroke="white"
              strokeWidth={2}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-5 w-full">
          <CustomLegend data={data} />
        </div>
      )}
    </div>
  )
}
