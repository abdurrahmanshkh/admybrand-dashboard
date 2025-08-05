'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  Table, 
  Settings, 
  Menu,
  X,
  TrendingUp,
  Users,
  PieChart,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  badge?: string
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, badge: 'New' },
  { name: 'Data Tables', href: '/dashboard/tables', icon: Table },
  { name: 'Reports', href: '/dashboard/reports', icon: TrendingUp },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Insights', href: '/dashboard/insights', icon: PieChart, badge: 'AI' },
]

const secondaryNavigation: NavItem[] = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Activity', href: '/dashboard/activity', icon: Activity },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  }

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-40 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <motion.div
              variants={contentVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    ADmyBRAND
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Insights
                  </p>
                </div>
              )}
            </motion.div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-900/50 dark:text-brand-300'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    )}
                  >
                    <Icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        isActive
                          ? 'text-brand-600 dark:text-brand-400'
                          : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'
                      )}
                    />
                    <motion.span
                      variants={contentVariants}
                      animate={isCollapsed ? 'collapsed' : 'expanded'}
                      className="flex-1"
                    >
                      {item.name}
                    </motion.span>
                    {item.badge && !isCollapsed && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
                          item.badge === 'AI'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        )}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              )
            })}

            <div className="pt-4">
              <Separator className="mb-4" />
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-900/50 dark:text-brand-300'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                      )}
                    >
                      <Icon
                        className={cn(
                          'mr-3 h-5 w-5 flex-shrink-0',
                          isActive
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'
                        )}
                      />
                      <motion.span
                        variants={contentVariants}
                        animate={isCollapsed ? 'collapsed' : 'expanded'}
                        className="flex-1"
                      >
                        {item.name}
                      </motion.span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4">
            <motion.div
              variants={contentVariants}
              animate={isCollapsed ? 'collapsed' : 'expanded'}
              className="bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  System Status: Healthy
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
