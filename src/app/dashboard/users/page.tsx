'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserStatsCards } from '@/components/users/user-stats-cards'
import { UserActions } from '@/components/users/user-actions'
import { UsersTable } from '@/components/users/users-table'
import { toast } from 'sonner'

// Generate sample user data
function generateUsers(count: number = 50) {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'Robert', 'Maria', 'William', 'Jessica', 'Christopher', 'Ashley', 'Matthew', 'Amanda']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas']
  const roles = ['Admin', 'Manager', 'Analyst', 'Viewer', 'Editor', 'Contributor']
  const statuses = ['active', 'inactive', 'pending']
  const departments = ['Marketing', 'Sales', 'Engineering', 'Design', 'Operations', 'Finance', 'HR', 'Support']
  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA']

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`
    const joinDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const lastActive = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    
    return {
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)] as 'active' | 'inactive' | 'pending',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=80&h=80&fit=crop&crop=face`,
      joinDate: joinDate.toISOString().split('T')[0],
      lastActive: lastActive.toISOString().split('T')[0],
      location: locations[Math.floor(Math.random() * locations.length)],
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      projects: Math.floor(Math.random() * 15) + 1,
      department: departments[Math.floor(Math.random() * departments.length)]
    }
  })
}

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const generatedUsers = generateUsers(50)
      setUsers(generatedUsers)
      setFilteredUsers(generatedUsers)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim()) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchQuery, users])

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = (select: boolean) => {
    setSelectedUsers(select ? filteredUsers.map(user => user.id) : [])
  }

  const handleUserAction = (action: string, user: any) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing profile for ${user.name}`)
        break
      case 'edit':
        toast.info(`Editing ${user.name}`)
        break
      case 'email':
        toast.success(`Email sent to ${user.name}`)
        break
      case 'delete':
        toast.success(`${user.name} has been deleted`)
        setUsers(prev => prev.filter(u => u.id !== user.id))
        break
      default:
        toast.info(`Action: ${action}`)
    }
  }

  const handleBulkAction = (action: string, users: any[]) => {
    console.log(`Bulk action: ${action} on ${users.length} users`)
  }

  const handleCreateUser = () => {
    toast.info('Create user dialog opened')
  }

  const handleExport = (format: string) => {
    console.log(`Exporting users as ${format}`)
  }

  const handleImport = () => {
    console.log('Opening import dialog')
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
          User Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Manage users, roles, permissions, and access across your organization
        </motion.p>
      </div>

      {/* User Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <UserStatsCards />
      </motion.div>

      {/* User Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <UserActions
          selectedUsers={selectedUsers.map(id => users.find(u => u.id === id)).filter(Boolean)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterChange={() => {}}
          onBulkAction={handleBulkAction}
          onCreateUser={handleCreateUser}
          onExport={handleExport}
          onImport={handleImport}
        />
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <UsersTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          onUserAction={handleUserAction}
          isLoading={isLoading}
        />
      </motion.div>
    </motion.div>
  )
}
