'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { SidebarProvider, useSidebar } from '@/context/sidebar-context'

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      
      {/* Main Content Area - Dynamic margin based on sidebar state */}
      <div 
        className="transition-all duration-300 lg:ml-[280px] lg:data-[collapsed=true]:ml-[80px]"
        data-collapsed={isCollapsed}
        style={{
          marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 
            ? isCollapsed ? '80px' : '280px' 
            : '0px'
        }}
      >
        <Header />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <DashboardContent>
          {children}
        </DashboardContent>
      </SidebarProvider>
    </AuthGuard>
  )
}
