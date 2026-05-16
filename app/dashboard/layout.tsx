import { DashboardLayout } from "@/components/dashboard-layout"
import { ChatWidget } from "@/components/chat-widget"
import { dashboardStats, mockAlerts } from "@/lib/mock-data"

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const unreadAlerts = mockAlerts.filter(a => !a.isRead).length

  return (
    <DashboardLayout 
      lastSync={dashboardStats.lastSync}
      unreadAlerts={unreadAlerts}
    >
      {children}
      <ChatWidget />
    </DashboardLayout>
  )
}
