'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DataTable } from '@/components/tables/data-table'
import { userColumns, campaignColumns } from '@/components/tables/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { generateDetailedTableUsers, generateAnalyticsData, exportToCSV } from '@/lib/data'
import { TableUser, CampaignData } from '@/types'
import { toast } from 'sonner'

export default function TablesPage() {
  const [users, setUsers] = useState<TableUser[]>([])
  const [campaigns, setCampaigns] = useState<CampaignData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUsers(generateDetailedTableUsers(50))
      setCampaigns(generateAnalyticsData(30))
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleExportUsers = (data: TableUser[]) => {
    exportToCSV(data, 'users-export')
    toast.success('Users data exported successfully!')
  }

  const handleExportCampaigns = (data: CampaignData[]) => {
    exportToCSV(data, 'campaigns-export')
    toast.success('Campaigns data exported successfully!')
  }

  const handleDeleteUsers = (users: TableUser[]) => {
    toast.success(`${users.length} user(s) deleted successfully!`)
    // In a real app, you would make an API call here
  }

  const handleDeleteCampaigns = (campaigns: CampaignData[]) => {
    toast.success(`${campaigns.length} campaign(s) deleted successfully!`)
    // In a real app, you would make an API call here
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-96"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Data Tables
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Advanced data tables with sorting, filtering, and export functionality
        </p>
      </div>

      {/* Tables */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <DataTable
            columns={userColumns}
            data={users}
            searchPlaceholder="Search users..."
            onExport={handleExportUsers}
            onDelete={handleDeleteUsers}
            title="Users Management"
            description="Manage user accounts, roles, and permissions"
          />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <DataTable
            columns={campaignColumns}
            data={campaigns}
            searchPlaceholder="Search campaigns..."
            onExport={handleExportCampaigns}
            onDelete={handleDeleteCampaigns}
            title="Campaign Analytics"
            description="Monitor and analyze marketing campaign performance"
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
