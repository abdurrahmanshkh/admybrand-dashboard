'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SettingsNav } from '@/components/settings/settings-nav'
import { ProfileSettings } from '@/components/settings/profile-settings'
// Import other settings components as needed
import { Card, CardContent } from '@/components/ui/card'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />
      case 'security':
        return (
          <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Security settings will be implemented with 2FA, password management, and session controls.
              </p>
            </CardContent>
          </Card>
        )
      case 'notifications':
        return (
          <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Notification preferences for email, push notifications, and system alerts.
              </p>
            </CardContent>
          </Card>
        )
      default:
        return (
          <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">{activeSection} Settings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                This settings section is ready for implementation.
              </p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-8"
    >
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Settings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Manage your account preferences and system configurations
        </motion.p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-80 flex-shrink-0"
        >
          <SettingsNav 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          {renderSettingsContent()}
        </motion.div>
      </div>
    </motion.div>
  )
}
