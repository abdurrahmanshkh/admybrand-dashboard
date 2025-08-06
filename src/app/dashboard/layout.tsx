import { AuthGuard } from '@/components/auth/auth-guard'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        
        {/* Main Content Area - Fixed spacing */}
        <div className="lg:ml-[280px] transition-all duration-300">
          <Header />
          
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
