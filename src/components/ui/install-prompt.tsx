'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after user has been active for 30 seconds
      setTimeout(() => {
        setShowPrompt(true)
      }, 30000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for this session
    setDeferredPrompt(null)
  }

  if (!deferredPrompt || !showPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
      >
        <Card className="shadow-xl border-0 bg-gradient-to-r from-brand-500 to-brand-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 rounded-lg p-2 flex-shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">
                  Install ADmyBRAND App
                </h3>
                <p className="text-sm text-white/90 mb-3">
                  Get quick access to your analytics dashboard with our progressive web app
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleInstall}
                    size="sm"
                    className="bg-white text-brand-600 hover:bg-gray-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install
                  </Button>
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    Not now
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20 flex-shrink-0"
              >
                <X className="w-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
