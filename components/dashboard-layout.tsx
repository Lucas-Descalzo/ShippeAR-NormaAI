"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  RefreshCw,
  Bell
} from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const sidebarLinks = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/dashboard/clientes", label: "Mis Clientes", icon: Users },
  { href: "/dashboard/normativas", label: "Normativas", icon: FileText },
  { href: "/dashboard/informes", label: "Informes", icon: BarChart3 },
  { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  lastSync?: string
  unreadAlerts?: number
}

export function DashboardLayout({ children, lastSync, unreadAlerts = 0 }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSyncing, setIsSyncing] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    // TODO: Trigger actual sync with Python RAG backend
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSyncing(false)
  }

  const formatLastSync = (dateString?: string) => {
    if (!dateString) return "Nunca"
    const date = new Date(dateString)
    return date.toLocaleString("es-AR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <span className="text-sm font-bold text-sidebar-primary-foreground">N</span>
        </div>
        <span className="text-xl font-semibold">NormaAI</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || 
              (link.href !== "/dashboard" && pathname.startsWith(link.href))
            const Icon = link.icon
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-medium">CP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Contador Demo</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">demo@estudio.com</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>

            {/* Last sync info */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Última sincronización:</span>
              <span className="font-medium text-foreground">{formatLastSync(lastSync)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/dashboard">
                <Bell className="h-5 w-5" />
                {unreadAlerts > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadAlerts}
                  </Badge>
                )}
                <span className="sr-only">Notificaciones</span>
              </Link>
            </Button>

            {/* Sync button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={isSyncing}
              className="hidden sm:flex"
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isSyncing && "animate-spin")} />
              {isSyncing ? "Sincronizando..." : "Sincronizar ahora"}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
