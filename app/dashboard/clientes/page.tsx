import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus, 
  Search,
  FileText,
  ArrowRight,
  AlertCircle
} from "lucide-react"
import { mockClients, formatDate } from "@/lib/mock-data"

export default function ClientesPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona tus expedientes y monitorea impactos regulatorios.
          </p>
        </div>
        <Button asChild>
          <Link href="/onboarding?step=3">
            <Plus className="h-4 w-4 mr-2" />
            Agregar cliente
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar por nombre o CUIT..." 
          className="pl-9"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClients.map((client) => {
          const hasHighImpact = client.impactHistory.some(i => i.impact === "high")
          const pendingActions = client.impactHistory.filter(i => i.deadline).length

          return (
            <Card key={client.id} className="hover:border-secondary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      CUIT: {client.cuit}
                    </CardDescription>
                  </div>
                  {hasHighImpact && (
                    <div className="h-2 w-2 rounded-full bg-red-500" title="Impacto alto detectado" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {client.category}
                    {client.subcategory && ` - ${client.subcategory}`}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{client.files.length} archivos</span>
                  </div>
                  {client.lastAnalysis && (
                    <span className="text-xs">
                      Análisis: {formatDate(client.lastAnalysis)}
                    </span>
                  )}
                </div>

                {pendingActions > 0 && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{pendingActions} acción{pendingActions !== 1 && "es"} pendiente{pendingActions !== 1 && "s"}</span>
                  </div>
                )}

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/clientes/${client.id}`}>
                    Ver detalle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {mockClients.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tenés clientes cargados</h3>
            <p className="text-muted-foreground mb-4">
              Agregá tu primer cliente para comenzar a monitorear su situación regulatoria.
            </p>
            <Button asChild>
              <Link href="/onboarding?step=3">
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer cliente
              </Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Freemium notice */}
      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {mockClients.length} de 3 expedientes gratuitos usados
              </p>
              <p className="text-xs text-muted-foreground">
                Actualizá tu plan para agregar más clientes
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Ver planes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
