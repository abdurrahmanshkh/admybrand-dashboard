'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserStatsCards } from '@/components/users/user-stats-cards'
import { UserActions } from '@/components/users/user-actions'
import { UsersTable } from '@/components/users/users-table'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  joinDate: string
  lastActive: string
  location?: string
  phone?: string
  projects: number
  department?: string
}

function generateUsers(count: number = 50): User[] {
  const users: User[] = []
  for (let i = 0; i < count; i++) {
    users.push({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@company.com`,
      role: 'User',
      status: 'active',
      joinDate: '2024-01-01',
      lastActive: '2024-12-20',
      projects: Math.floor(Math.random() * 15) + 1,
      department: 'Marketing'
    })
  }
  return users
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const generatedUsers = generateUsers(50)
      setUsers(generatedUsers)
      setFilteredUsers(generatedUsers)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleUserAction = (action: string, user: User) => {
    toast.info(`Action: ${action} on ${user.name}`)
  }

  const handleBulkAction = (action: string, users: User[]) => {
    toast.info(`Bulk action: ${action} on ${users.length} users`)
  }

  const handleCreateUser = () => {
    toast.info('Create user dialog opened')
  }

  const handleExport = (format: string) => {
    toast.success(`Users exported as ${format}`)
  }

  const handleImport = () => {
    toast.info('Import dialog opened')
  }

  const selectedUserObjects = selectedUsers.map(id => users.find(u => u.id === id)).filter(Boolean) as User[]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-8"
    >
      <div className="flex flex-col space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          User Management
        </motion.h1>
      </div>

      <UserStatsCards />

      <UserActions
        selectedUsers={selectedUserObjects}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterChange={() => {}}
        onBulkAction={handleBulkAction}
        onCreateUser={handleCreateUser}
        onExport={handleExport}
        onImport={handleImport}
      />

      <UsersTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onUserAction={handleUserAction}
        isLoading={isLoading}
      />
    </motion.div>
  )
}
