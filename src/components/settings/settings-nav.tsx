'use client'

import { motion } from 'framer-motion'
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Key, 
  Users,
  Download,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SettingsNavItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  description: string
}

const settingsNavItems: SettingsNavItem[] = [
  { id: 'profile', label: 'Profile', icon: User, description: 'Personal information and account details' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Password, 2FA, and security settings' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email and push notification preferences' },
  { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme and display customization' },
  { id: 'api', label: 'API & Integrations', icon: Key, description: 'API keys and third-party integrations' },
  { id: 'team', label: 'Team Management', icon: Users, description: 'Manage team members and permissions' },
  { id: 'data', label: 'Data & Privacy', icon: Download, description: 'Export data and privacy controls' },
  { id: 'support', label: 'Help & Support', icon: HelpCircle, description: 'Documentation and support resources' }
]

interface SettingsNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
  return (
    <div className="w-full lg:w-80 space-y-2">
      {settingsNavItems.map((item, index) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={isActive ? "default" : "ghost"}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full justify-start text-left p-4 h-auto transition-all duration-200",
                isActive 
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
            >
              <div className="flex items-start space-x-3">
                <Icon className={cn(
                  "h-5 w-5 mt-0.5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                )} />
                <div className="text-left min-w-0 flex-1">
                  <div className={cn(
                    "font-semibold text-sm mb-1",
                    isActive ? "text-white" : "text-gray-900 dark:text-white"
                  )}>
                    {item.label}
                  </div>
                  <div className={cn(
                    "text-xs leading-tight",
                    isActive ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}
