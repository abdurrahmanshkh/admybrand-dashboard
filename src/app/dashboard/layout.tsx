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
      <div className="h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="lg:ml-80">
          <Header />
          <main className="py-8 px-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
