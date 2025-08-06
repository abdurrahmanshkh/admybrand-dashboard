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

  const getDateRangeLabel = (value: string) => {
    switch (value) {
      case 'last7days': return 'Last 7 days'
      case 'last30days': return 'Last 30 days'
      case 'last90days': return 'Last 90 days'
      case 'last6months': return 'Last 6 months'
      case 'lastyear': return 'Last year'
      case 'custom': return 'Custom range'
      default: return 'Last 30 days'
    }
  }

  const getCampaignLabel = (value: string) => {
    switch (value) {
      case 'all': return 'All Campaigns'
      case 'summer-sale': return 'Summer Sale'
      case 'black-friday': return 'Black Friday'
      case 'holiday-special': return 'Holiday Special'
      case 'new-year': return 'New Year Promo'
      default: return 'All Campaigns'
    }
  }

  const getChannelLabel = (value: string) => {
    switch (value) {
      case 'all': return 'All Channels'
      case 'email': return 'Email'
      case 'social': return 'Social Media'
      case 'google-ads': return 'Google Ads'
      case 'facebook-ads': return 'Facebook Ads'
      case 'linkedin': return 'LinkedIn'
      default: return 'All Channels'
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white dark:bg-gray-900 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Side - Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Date Range Filter */}
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-40 bg-white dark:bg-gray-800">
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

              {/* Campaign Filter */}
              <Select value={campaign} onValueChange={setCampaign}>
                <SelectTrigger className="w-full sm:w-40 bg-white dark:bg-gray-800">
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

              {/* Channel Filter */}
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger className="w-full sm:w-40 bg-white dark:bg-gray-800">
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

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live Data
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            {/* Fixed Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
      </CardContent>
    </Card>
  )
}
