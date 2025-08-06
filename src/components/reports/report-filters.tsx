'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Filter, Download, Share2, RefreshCw, TrendingUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface ReportFiltersProps {
  onFiltersChange?: (filters: any) => void
  onExport?: (format: string) => void
  onRefresh?: () => void
}

export function ReportFilters({ onFiltersChange, onExport, onRefresh }: ReportFiltersProps) {
  const [dateRange, setDateRange] = useState('last30days')
  const [campaign, setCampaign] = useState('all')
  const [channel, setChannel] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh?.()
    setTimeout(() => setIsRefreshing(false), 1000)
    toast.success('Reports data refreshed successfully!')
  }

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    onExport?.(format)
    toast.success(`Report exported as ${format.toUpperCase()}`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Report link copied to clipboard!')
  }

  return (
    <Card className="shadow-lg border-0 bg-white dark:bg-gray-900 mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Title Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Filters & Actions</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          </div>

          {/* Filters Row */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Filter Data:
            </div>
            
            {/* Filter Controls - Stacked on mobile, inline on larger screens */}
            <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
              {/* Date Range Filter */}
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:items-center">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 lg:whitespace-nowrap">
                  Date Range:
                </label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full lg:w-44 bg-white dark:bg-gray-800">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                    <SelectItem value="last6months">Last 6 months</SelectItem>
                    <SelectItem value="lastyear">Last year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign Filter */}
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:items-center">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 lg:whitespace-nowrap">
                  Campaign:
                </label>
                <Select value={campaign} onValueChange={setCampaign}>
                  <SelectTrigger className="w-full lg:w-44 bg-white dark:bg-gray-800">
                    <SelectValue placeholder="All Campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    <SelectItem value="summer-sale">Summer Sale</SelectItem>
                    <SelectItem value="black-friday">Black Friday</SelectItem>
                    <SelectItem value="holiday-special">Holiday Special</SelectItem>
                    <SelectItem value="new-year">New Year Promo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Channel Filter */}
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:items-center">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 lg:whitespace-nowrap">
                  Channel:
                </label>
                <Select value={channel} onValueChange={setChannel}>
                  <SelectTrigger className="w-full lg:w-44 bg-white dark:bg-gray-800">
                    <SelectValue placeholder="All Channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="google-ads">Google Ads</SelectItem>
                    <SelectItem value="facebook-ads">Facebook Ads</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Actions:
            </div>
            
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center sm:justify-between">
              {/* Left side - Primary actions */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh Data
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </div>

              {/* Right side - Export */}
              <div className="w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
