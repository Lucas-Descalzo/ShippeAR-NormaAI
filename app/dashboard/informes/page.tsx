import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Calendar, Download } from "lucide-react"

export default function InformesPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Informes</h1>
        <p className="text-muted-foreground">
          Generá reportes personalizados para tus clientes y tu estudio.
        </p>
      </div>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-secondary/50 transition-colors">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle>Boletín Semanal</CardTitle>
            <CardDescription>
              Resumen de todas las normativas de la semana con análisis de impacto general.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Generar PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-secondary/50 transition-colors">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle>Informe por Cliente</CardTitle>
            <CardDescription>
              Reporte detallado de impactos regulatorios para un cliente específico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Seleccionar cliente
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-secondary/50 transition-colors">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle>Calendario Fiscal</CardTitle>
            <CardDescription>
              Vencimientos y obligaciones próximas para toda tu cartera de clientes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Ver calendario
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for future report history */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de informes</CardTitle>
          <CardDescription>
            Los informes que generes aparecerán aquí para descargarlos nuevamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Todavía no generaste ningún informe.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
