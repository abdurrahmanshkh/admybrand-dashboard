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
