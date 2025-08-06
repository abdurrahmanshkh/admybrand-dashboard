'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Maximize2, MoreHorizontal, RefreshCw, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ChartContainerProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  showRefresh?: boolean
  showExport?: boolean
  onRefresh?: () => void
  badge?: string
  chartId?: string
}

export function ChartContainer({
  title,
  subtitle,
  children,
  className,
  isLoading = false,
  showRefresh = true,
  showExport = true,
  onRefresh,
  badge,
  chartId
}: ChartContainerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true)
      await onRefresh()
      setTimeout(() => setIsRefreshing(false), 1000)
    }
  }

  const handleExportPNG = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById(`chart-${chartId || title.replace(/\s+/g, '-').toLowerCase()}`)
      if (!element) {
        toast.error('Chart element not found')
        return
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      })

      const link = document.createElement('a')
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('Chart exported as PNG successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export chart')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById(`chart-${chartId || title.replace(/\s+/g, '-').toLowerCase()}`)
      if (!element) {
        toast.error('Chart element not found')
        return
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      
      const imgWidth = 190
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
      pdf.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`)
      
      toast.success('Chart exported as PDF successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export chart')
    } finally {
      setIsExporting(false)
    }
  }

  const handleFullscreen = () => {
    const element = document.getElementById(`chart-${chartId || title.replace(/\s+/g, '-').toLowerCase()}`)
    if (!element) {
      toast.error('Chart element not found')
      return
    }

    if (element.requestFullscreen) {
      element.requestFullscreen()
      toast.success('Chart opened in fullscreen')
    } else {
      toast.info('Fullscreen not supported on this browser')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-900 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {title}
              </h3>
              {badge && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-0">
                  {badge}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {showRefresh && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing || isExporting}
                className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {showExport && (
                  <>
                    <DropdownMenuItem onClick={handleExportPNG} disabled={isExporting}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      {isExporting ? 'Exporting...' : 'Export PNG'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
                      <Download className="mr-2 h-4 w-4" />
                      {isExporting ? 'Exporting...' : 'Export PDF'}
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={handleFullscreen}>
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Fullscreen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div 
            id={`chart-${chartId || title.replace(/\s+/g, '-').toLowerCase()}`}
            className={`relative ${isLoading ? 'opacity-50' : ''}`}
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
