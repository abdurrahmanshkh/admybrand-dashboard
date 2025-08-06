'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  LayoutDashboard, 
  BarChart3, 
  Table, 
  Settings, 
  Users,
  FileText,
  Calendar,
  Zap,
  ChevronRight
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: React.ComponentType<any>
  action: () => void
  category: string
  keywords: string[]
  badge?: string
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const commands: CommandItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      subtitle: 'View main dashboard',
      icon: LayoutDashboard,
      action: () => router.push('/dashboard'),
      category: 'Navigation',
      keywords: ['dashboard', 'home', 'overview']
    },
    {
      id: 'analytics',
      title: 'Analytics',
      subtitle: 'Advanced analytics and insights',
      icon: BarChart3,
      action: () => router.push('/dashboard/analytics'),
      category: 'Navigation',
      keywords: ['analytics', 'charts', 'insights'],
      badge: 'New'
    },
    {
      id: 'tables',
      title: 'Data Tables',
      subtitle: 'Manage data with advanced tables',
      icon: Table,
      action: () => router.push('/dashboard/tables'),
      category: 'Navigation',
      keywords: ['tables', 'data', 'users', 'campaigns']
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Configure your preferences',
      icon: Settings,
      action: () => router.push('/dashboard/settings'),
      category: 'Navigation',
      keywords: ['settings', 'preferences', 'config']
    },
    {
      id: 'export-data',
      title: 'Export Data',
      subtitle: 'Export dashboard data to CSV',
      icon: FileText,
      action: () => console.log('Export triggered'),
      category: 'Actions',
      keywords: ['export', 'csv', 'download', 'data']
    },
    {
      id: 'refresh-data',
      title: 'Refresh Data',
      subtitle: 'Reload all dashboard data',
      icon: Zap,
      action: () => window.location.reload(),
      category: 'Actions',
      keywords: ['refresh', 'reload', 'update']
    }
  ]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (command: CommandItem) => {
    setOpen(false)
    command.action()
  }

  const groupedCommands = commands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a command or search..." 
          className="h-12 text-base"
        />
        <CommandList className="max-h-96">
          <CommandEmpty>
            <div className="text-center py-6">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No results found.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Try searching for pages, actions, or settings.
              </p>
            </div>
          </CommandEmpty>
          
          {Object.entries(groupedCommands).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => handleSelect(command)}
                  className="flex items-center justify-between py-3 px-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <command.icon className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {command.title}
                      </div>
                      {command.subtitle && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {command.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {command.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {command.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      {/* Keyboard shortcut hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Search className="w-4 h-4" />
            <span>Press</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
              ⌘K
            </kbd>
            <span>to search</span>
          </div>
        </div>
      </motion.div>
    </>
  )
}
