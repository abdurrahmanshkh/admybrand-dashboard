import { DashboardMetrics, ChartDataPoint, TableUser } from '@/types'

// Generate realistic dashboard metrics
export function generateDashboardMetrics(): DashboardMetrics {
  const currentRevenue = Math.floor(Math.random() * 100000) + 50000
  const previousRevenue = Math.floor(currentRevenue * (0.8 + Math.random() * 0.4))
  
  const currentUsers = Math.floor(Math.random() * 10000) + 5000
  const previousUsers = Math.floor(currentUsers * (0.85 + Math.random() * 0.3))
  
  const currentConversions = Math.floor(Math.random() * 1000) + 500
  const previousConversions = Math.floor(currentConversions * (0.9 + Math.random() * 0.2))
  
  const currentGrowth = ((currentRevenue - previousRevenue) / previousRevenue) * 100
  const previousGrowth = Math.floor(Math.random() * 20) - 10

  return {
    revenue: {
      current: currentRevenue,
      previous: previousRevenue,
      change: parseFloat(((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1))
    },
    users: {
      current: currentUsers,
      previous: previousUsers,
      change: parseFloat(((currentUsers - previousUsers) / previousUsers * 100).toFixed(1))
    },
    conversions: {
      current: currentConversions,
      previous: previousConversions,
      change: parseFloat(((currentConversions - previousConversions) / previousConversions * 100).toFixed(1))
    },
    growth: {
      current: parseFloat(currentGrowth.toFixed(1)),
      previous: previousGrowth,
      change: parseFloat((currentGrowth - previousGrowth).toFixed(1))
    }
  }
}

// Generate chart data
export function generateChartData(points: number = 12, label: string = 'Month'): ChartDataPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data: ChartDataPoint[] = []
  
  for (let i = 0; i < points; i++) {
    data.push({
      name: label === 'Month' ? months[i] || `Point ${i + 1}` : `${label} ${i + 1}`,
      value: Math.floor(Math.random() * 10000) + 1000,
      date: new Date(2024, i, 1).toISOString()
    })
  }
  
  return data
}

// Generate realistic user data for tables
export function generateTableUsers(count: number = 50): TableUser[] {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'Robert', 'Maria']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const roles = ['Admin', 'Manager', 'Analyst', 'Viewer', 'Editor']
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending']
  
  const users: TableUser[] = []
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const joinDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const lastActive = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    
    users.push({
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      joinDate: joinDate.toISOString().split('T')[0],
      lastActive: lastActive.toISOString().split('T')[0]
    })
  }
  
  return users
}

// Simulate real-time data updates
export function createRealTimeDataStream(callback: (data: any) => void, interval: number = 5000) {
  const intervalId = setInterval(() => {
    const newData = {
      timestamp: new Date().toISOString(),
      revenue: Math.floor(Math.random() * 1000) + 500,
      users: Math.floor(Math.random() * 100) + 50,
      conversions: Math.floor(Math.random() * 50) + 10
    }
    callback(newData)
  }, interval)
  
  return () => clearInterval(intervalId)
}

// Generate time series data for charts
export function generateTimeSeriesData(days: number = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Generate realistic trending data
    const baseValue = 1000
    const trend = (days - i) * 50 // Upward trend
    const randomVariation = (Math.random() - 0.5) * 200
    const value = Math.max(0, baseValue + trend + randomVariation)
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
      date: date.toISOString()
    })
  }
  
  return data
}

// Generate revenue breakdown data
export function generateRevenueBreakdown() {
  return [
    { name: 'Digital Marketing', value: 45, color: '#3b82f6' },
    { name: 'SEO Services', value: 25, color: '#10b981' },
    { name: 'Social Media', value: 15, color: '#f59e0b' },
    { name: 'Content Creation', value: 10, color: '#ef4444' },
    { name: 'Consulting', value: 5, color: '#8b5cf6' }
  ]
}

// Generate performance metrics data
export function generatePerformanceMetrics() {
  const categories = ['Web Traffic', 'Conversions', 'Revenue', 'Engagement', 'ROI']
  return categories.map(category => ({
    name: category,
    current: Math.floor(Math.random() * 100) + 50,
    previous: Math.floor(Math.random() * 100) + 30,
    target: Math.floor(Math.random() * 100) + 80
  }))
}

// Generate multi-series chart data
export function generateMultiSeriesData(months: number = 12) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  return monthNames.slice(0, months).map((month, index) => ({
    name: month,
    revenue: Math.floor(Math.random() * 10000) + 5000,
    expenses: Math.floor(Math.random() * 7000) + 3000,
    profit: 0 // Will be calculated
  })).map(item => ({
    ...item,
    profit: item.revenue - item.expenses
  }))
}

// Generate real-time data updates
export function simulateRealTimeData(callback: (data: ChartDataPoint) => void) {
  const interval = setInterval(() => {
    const newPoint: ChartDataPoint = {
      name: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 1000) + 500,
      date: new Date().toISOString()
    }
    callback(newPoint)
  }, 3000)
  
  return () => clearInterval(interval)
}

// Generate more detailed user data
export function generateDetailedTableUsers(count: number = 100): TableUser[] {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'Robert', 'Maria', 'William', 'Jessica', 'Christopher', 'Ashley', 'Matthew', 'Amanda', 'Daniel', 'Jennifer', 'Anthony', 'Michelle']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin']
  const roles = ['Admin', 'Manager', 'Analyst', 'Viewer', 'Editor', 'Contributor', 'Moderator']
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending']
  const companies = ['TechCorp', 'DataFlow', 'InnovateLab', 'CloudBase', 'NextGen Solutions', 'Digital Dynamics', 'Smart Systems', 'Future Tech', 'Quantum Labs', 'Cyber Solutions']
  const departments = ['Marketing', 'Sales', 'Engineering', 'Design', 'Operations', 'Finance', 'HR', 'Support']

  const users: TableUser[] = []
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const joinDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const lastActive = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    
    users.push({
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(' ', '')}.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      joinDate: joinDate.toISOString().split('T')[0],
      lastActive: lastActive.toISOString().split('T')[0],
      // Additional fields for advanced table
      company: companies[Math.floor(Math.random() * companies.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      salary: Math.floor(Math.random() * 150000) + 40000,
      performance: Math.floor(Math.random() * 5) + 1,
      projects: Math.floor(Math.random() * 10) + 1,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=40&h=40&fit=crop&crop=face`
    })
  }
  
  return users
}

// Export data to CSV format
export function exportToCSV(data: any[], filename: string = 'export') {
  if (!data.length) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Generate sample analytics data
export function generateAnalyticsData(count: number = 50) {
  const campaigns = ['Summer Sale', 'Black Friday', 'New Year Promo', 'Spring Launch', 'Holiday Special', 'Flash Sale', 'Weekend Deal', 'VIP Exclusive']
  const channels = ['Email', 'Social Media', 'Google Ads', 'Facebook Ads', 'LinkedIn', 'Twitter', 'Instagram', 'YouTube']
  const statuses = ['Active', 'Paused', 'Completed', 'Draft']

  return Array.from({ length: count }, (_, i) => ({
    id: `campaign-${i + 1}`,
    name: `${campaigns[Math.floor(Math.random() * campaigns.length)]} ${i + 1}`,
    channel: channels[Math.floor(Math.random() * channels.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    budget: Math.floor(Math.random() * 50000) + 5000,
    spent: Math.floor(Math.random() * 40000) + 2000,
    impressions: Math.floor(Math.random() * 1000000) + 10000,
    clicks: Math.floor(Math.random() * 50000) + 500,
    conversions: Math.floor(Math.random() * 1000) + 10,
    ctr: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    cpc: parseFloat((Math.random() * 10 + 0.5).toFixed(2)),
    startDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    endDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }))
}
