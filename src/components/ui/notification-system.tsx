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
  }
]

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setNotifications(generateNotifications())
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
      case 'info': return <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      case 'update': return <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      default: return <Bell className="w-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 z-50"
          >
            <Card className="shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No notifications yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    You&apos;ll see updates about your campaigns here
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
