import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink,
  Clock
} from "lucide-react"
import { 
  mockRegulations, 
  mockAlerts, 
  dashboardStats, 
  getSourceColor, 
  getImpactColor,
  formatDate,
  formatRelativeTime
} from "@/lib/mock-data"

export default function DashboardPage() {
  const unreadAlerts = mockAlerts.filter(a => !a.isRead)
  const recentRegulations = mockRegulations.slice(0, 5)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resumen del día</h1>
        <p className="text-muted-foreground">
          Mantenete al día con las últimas normativas y su impacto en tus clientes.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Nuevas normativas
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.newRegulations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              En los últimos 7 días
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes afectados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.affectedClients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Acciones pendientes
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{dashboardStats.pendingActions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Con plazos próximos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Regulatory Bulletin */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Boletín Normativo</CardTitle>
              <CardDescription>Últimas normativas publicadas</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/normativas">
                Ver todas
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {recentRegulations.map((regulation) => (
                  <div key={regulation.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className={getSourceColor(regulation.source)}>
                            {regulation.source}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(regulation.date)}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                          {regulation.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {regulation.summary}
                        </p>
                        {regulation.affectedClientCount > 0 && (
                          <p className="text-xs text-secondary mt-2 font-medium">
                            {regulation.affectedClientCount} cliente{regulation.affectedClientCount !== 1 && "s"} afectado{regulation.affectedClientCount !== 1 && "s"}
                          </p>
                        )}
                      </div>
                      {regulation.url && (
                        <Button variant="ghost" size="icon" className="shrink-0" asChild>
                          <a href={regulation.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Ver normativa</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Client Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Alertas de Clientes</CardTitle>
              <CardDescription>Impactos detectados que requieren acción</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/clientes">
                Ver clientes
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {mockAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 hover:bg-muted/50 transition-colors ${!alert.isRead ? "bg-secondary/5" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                        alert.impact === "high" ? "bg-red-500" : 
                        alert.impact === "medium" ? "bg-amber-500" : "bg-green-500"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link 
                            href={`/dashboard/clientes/${alert.clientId}`}
                            className="font-medium text-sm text-foreground hover:text-secondary transition-colors"
                          >
                            {alert.clientName}
                          </Link>
                          <Badge variant="outline" className={getImpactColor(alert.impact)}>
                            {alert.impact === "high" ? "Alto" : alert.impact === "medium" ? "Medio" : "Bajo"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-secondary font-medium">
                            {alert.regulationTitle}
                          </span>
                          {alert.deadline && (
                            <span className="flex items-center gap-1 text-destructive">
                              <Clock className="h-3 w-3" />
                              Vence: {formatDate(alert.deadline)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                          <span className="font-medium">Acción sugerida:</span> {alert.suggestedAction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {mockAlerts.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No hay alertas pendientes</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
