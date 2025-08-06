'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  FileText, 
  Settings, 
  Mail, 
  Shield, 
  Download, 
  Upload,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  type: 'user_action' | 'system_event' | 'security' | 'data' | 'report'
  action: string
  description: string
  user: {
    name: string
    email: string
    avatar?: string
  }
  timestamp: Date
  metadata?: {
    ip?: string
    location?: string
    device?: string
    duration?: string
  }
  status: 'success' | 'warning' | 'error' | 'info'
}

// Generate sample activity data
const generateActivities = (): ActivityItem[] => {
  const users = [
    { name: 'John Smith', email: 'john@company.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c37?w=40&h=40&fit=crop&crop=face' },
    { name: 'Mike Davis', email: 'mike@company.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Emily Wilson', email: 'emily@company.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
  ]

  const activities = [
    { type: 'user_action', action: 'Login', description: 'User logged into the system', status: 'success' },
    { type: 'user_action', action: 'Created Report', description: 'Generated quarterly analytics report', status: 'success' },
    { type: 'user_action', action: 'Updated Profile', description: 'Modified user profile information', status: 'info' },
    { type: 'user_action', action: 'Deleted Campaign', description: 'Removed "Summer Sale" campaign', status: 'warning' },
    { type: 'system_event', action: 'System Update', description: 'Applied security patches and updates', status: 'success' },
    { type: 'security', action: 'Failed Login', description: 'Multiple failed login attempts detected', status: 'error' },
    { type: 'data', action: 'Data Export', description: 'Exported user data to CSV format', status: 'success' },
    { type: 'report', action: 'Report Scheduled', description: 'Set up weekly performance report', status: 'info' },
    { type: 'user_action', action: 'Password Changed', description: 'Updated account password', status: 'success' },
    { type: 'system_event', action: 'Backup Completed', description: 'Daily backup process completed successfully', status: 'success' }
  ]

  return Array.from({ length: 50 }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)]
    const activity = activities[Math.floor(Math.random() * activities.length)]
    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Last 7 days

    return {
      id: `activity-${i + 1}`,
      type: activity.type as any,
      action: activity.action,
      description: activity.description,
      user,
      timestamp,
      metadata: {
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX'][Math.floor(Math.random() * 4)],
        device: ['Chrome on Windows', 'Safari on macOS', 'Firefox on Linux', 'Edge on Windows'][Math.floor(Math.random() * 4)],
        duration: `${Math.floor(Math.random() * 30) + 1}m`
      },
      status: activity.status as any
    }
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

interface ActivityFeedProps {
  searchQuery: string
  typeFilter: string
  statusFilter: string
}

export function ActivityFeed({ searchQuery, typeFilter, statusFilter }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const generatedActivities = generateActivities()
      setActivities(generatedActivities)
      setIsLoading(false)
    }, 1000)

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new activity
        const user = { 
          name: 'Live User', 
          email: 'live@company.com', 
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face' 
        }
        const newActivity: ActivityItem = {
          id: `live-${Date.now()}`,
          type: 'user_action',
          action: 'Live Action',
          description: 'Real-time activity detected',
          user,
          timestamp: new Date(),
          status: 'success'
        }
        setActivities(prev => [newActivity, ...prev.slice(0, 49)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = activities

    if (searchQuery) {
      filtered = filtered.filter(activity =>
        activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === typeFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(activity => activity.status === statusFilter)
    }

    setFilteredActivities(filtered)
  }, [activities, searchQuery, typeFilter, statusFilter])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_action': return User
      case 'system_event': return Settings
      case 'security': return Shield
      case 'data': return Download
      case 'report': return FileText
      default: return Eye
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800'
      case 'error': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Activity Feed
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Real-time tracking of system activities and user actions
        </p>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="max-h-[600px] overflow-y-auto">
          <AnimatePresence>
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No activities found
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  const colorClass = getActivityColor(activity.status)
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Activity Icon */}
                        <div className={cn('p-2 rounded-full', colorClass)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        {/* User Avatar */}
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {activity.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* Activity Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                <span className="font-semibold">{activity.user.name}</span>
                                <span className="text-gray-600 dark:text-gray-400 ml-1">
                                  {activity.action.toLowerCase()}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {activity.description}
                              </p>
                              
                              {/* Metadata */}
                              {activity.metadata && (
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
                                  {activity.metadata.ip && (
                                    <span>IP: {activity.metadata.ip}</span>
                                  )}
                                  {activity.metadata.location && (
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{activity.metadata.location}</span>
                                    </div>
                                  )}
                                  {activity.metadata.device && (
                                    <span>{activity.metadata.device}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2 ml-4">
                              <Badge className={cn('text-xs border', getStatusBadgeColor(activity.status))}>
                                {activity.status.toUpperCase()}
                              </Badge>
                              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{formatTime(activity.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
