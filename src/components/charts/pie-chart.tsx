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

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }: any) {
  // Only show labels for segments larger than 5%
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
      className="text-sm font-medium fill-gray-700 dark:fill-gray-300"
      fontSize={12}
    >
      {`${value}%`}
    </text>
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
  height = 350,
  innerRadius = 60,
  outerRadius = 110,
  showLabels = true,
  showLegend = true
}: RechartsPieChartProps) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={showLabels ? CustomLabel : false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300" style={{ color: entry.color }}>
                  {value}
                </span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
