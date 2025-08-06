'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, AlertTriangle, Info, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'update'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

const generateNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'success',
    title: 'Campaign Performance',
    message: 'Your "Summer Sale" campaign exceeded targets by 23%',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    action: {
      label: 'View Details',
      onClick: () => toast.success('Redirecting to campaign details')
    }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Budget Alert',
    message: 'Marketing budget is 85% utilized for this month',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    action: {
      label: 'Adjust Budget',
      onClick: () => toast.info('Budget adjustment panel opened')
    }
  },
  {
    id: '3',
    type: 'info',
    title: 'New Feature',
    message: 'Advanced AI insights are now available in your dashboard',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    action: {
      label: 'Try Now',
      onClick: () => toast.success('AI Insights activated')
    }
  },
  {
    id: '4',
    type: 'update',
    title: 'Data Refresh',
    message: 'Dashboard data has been updated with latest metrics',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true
  }
]

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setNotifications(generateNotifications())

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const types: Array<'success' | 'warning' | 'info' | 'update'> = ['success', 'warning', 'info', 'update']
      const messages = [
        { title: 'New Lead Generated', message: 'A high-value lead from LinkedIn campaign' },
        { title: 'Performance Alert', message: 'CTR dropped below target for Facebook ads' },
        { title: 'Data Updated', message: 'Latest analytics data is now available' },
        { title: 'Goal Achieved', message: 'Monthly conversion target reached!' }
      ]

      const randomType = types[Math.floor(Math.random() * types.length)]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      const newNotification: Notification = {
        id: Date.now().toString(),
        type: randomType,
        title: randomMessage.title,
        message: randomMessage.message,
        timestamp: new Date(),
        read: false
      }

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep only latest 10
      
      // Show toast notification
      toast(randomMessage.title, {
        description: randomMessage.message,
        duration: 4000,
      })
    }, 30000) // New notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
      case 'update': return <TrendingUp className="w-4 h-4 text-purple-500" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
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

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 z-50"
            >
              <Card className="shadow-xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    <AnimatePresence>
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                              !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {getIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-gray-500 dark:text-gray-500">
                                    {formatTime(notification.timestamp)}
                                  </p>
                                  {notification.action && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        notification.action?.onClick()
                                      }}
                                      className="text-xs h-6"
                                    >
                                      {notification.action.label}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">
                            No notifications yet
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            You'll see updates about your campaigns and performance here
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
