'use client'

import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableUser, CampaignData } from '@/types'
import { formatCurrency, cn } from '@/lib/utils'

// User table columns
export const userColumns: ColumnDef<TableUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-brand-500 text-white text-xs">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => {
      const company = row.getValue('company') as string
      return (
        <div className="font-medium text-gray-900 dark:text-white">
          {company}
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          className={cn(
            'text-xs font-medium',
            status === 'active' && 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            status === 'inactive' && 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
            status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
          )}
        >
          <div className={cn(
            'w-1.5 h-1.5 rounded-full mr-1',
            status === 'active' && 'bg-green-600',
            status === 'inactive' && 'bg-red-600',
            status === 'pending' && 'bg-yellow-600'
          )} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => {
      const department = row.getValue('department') as string
      return (
        <div className="text-gray-900 dark:text-white">
          {department}
        </div>
      )
    },
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
    cell: ({ row }) => {
      const salary = row.getValue('salary') as number
      return (
        <div className="font-medium text-gray-900 dark:text-white">
          {formatCurrency(salary)}
        </div>
      )
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    cell: ({ row }) => {
      const date = row.getValue('joinDate') as string
      return (
        <div className="text-gray-600 dark:text-gray-400">
          {new Date(date).toLocaleDateString()}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit user
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Campaign table columns
export const campaignColumns: ColumnDef<CampaignData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Campaign',
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      const status = row.original.status
      return (
        <div className="space-y-1">
          <div className="font-medium text-gray-900 dark:text-white">
            {name}
          </div>
          <Badge
            variant="outline"
            className={cn(
              'text-xs',
              status === 'Active' && 'border-green-200 text-green-800 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-900/20',
              status === 'Paused' && 'border-yellow-200 text-yellow-800 bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400 dark:bg-yellow-900/20',
              status === 'Completed' && 'border-blue-200 text-blue-800 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-900/20',
              status === 'Draft' && 'border-gray-200 text-gray-800 bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:bg-gray-900/20'
            )}
          >
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'channel',
    header: 'Channel',
    cell: ({ row }) => {
      const channel = row.getValue('channel') as string
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          {channel}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }) => {
      const budget = row.getValue('budget') as number
      return (
        <div className="font-medium text-gray-900 dark:text-white">
          {formatCurrency(budget)}
        </div>
      )
    },
  },
  {
    accessorKey: 'spent',
    header: 'Spent',
    cell: ({ row }) => {
      const spent = row.getValue('spent') as number
      const budget = row.original.budget
      const percentage = (spent / budget) * 100
      
      return (
        <div className="space-y-1">
          <div className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(spent)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div
              className={cn(
                'h-1.5 rounded-full transition-all',
                percentage < 70 ? 'bg-green-500' : percentage < 90 ? 'bg-yellow-500' : 'bg-red-500'
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {percentage.toFixed(1)}% used
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'impressions',
    header: 'Impressions',
    cell: ({ row }) => {
      const impressions = row.getValue('impressions') as number
      return (
        <div className="font-medium text-gray-900 dark:text-white">
          {impressions.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'clicks',
    header: 'Clicks',
    cell: ({ row }) => {
      const clicks = row.getValue('clicks') as number
      return (
        <div className="font-medium text-gray-900 dark:text-white">
          {clicks.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'ctr',
    header: 'CTR',
    cell: ({ row }) => {
      const ctr = row.getValue('ctr') as number
      return (
        <div className={cn(
          'font-medium',
          ctr >= 2 ? 'text-green-600 dark:text-green-400' : 
          ctr >= 1 ? 'text-yellow-600 dark:text-yellow-400' : 
          'text-red-600 dark:text-red-400'
        )}>
          {ctr.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'conversions',
    header: 'Conversions',
    cell: ({ row }) => {
      const conversions = row.getValue('conversions') as number
      return (
        <div className="font-medium text-gray-900 dark:text-white">
          {conversions.toLocaleString()}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit campaign
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete campaign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
