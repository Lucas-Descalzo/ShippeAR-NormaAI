"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  FileText, 
  Calendar,
  Building2,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { 
  mockClients, 
  getImpactColor, 
  formatDate 
} from "@/lib/mock-data"

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id as string
  const client = mockClients.find(c => c.id === clientId)
  
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)

  if (!client) {
    return (
      <div className="p-4 lg:p-6">
        <Card className="p-12 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Cliente no encontrado</h3>
          <p className="text-muted-foreground mb-4">
            El cliente que buscás no existe o fue eliminado.
          </p>
          <Button asChild>
            <Link href="/dashboard/clientes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a clientes
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    // TODO: Connect to Python RAG backend for AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGeneratingReport(false)
  }

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true)
    // TODO: Connect to AI service for plain-language summary
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGeneratingSummary(false)
  }

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case "tax_return": return "Declaración jurada"
      case "contract": return "Contrato"
      case "incorporation": return "Constitución"
      default: return "Documento"
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/dashboard/clientes">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a clientes
        </Link>
      </Button>

      {/* Client Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Badge variant="secondary">
              {client.category}
              {client.subcategory && ` - ${client.subcategory}`}
            </Badge>
            <span className="text-sm text-muted-foreground font-mono">
              CUIT: {client.cuit}
            </span>
            {client.industry && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {client.industry}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
          >
            {isGeneratingSummary ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <MessageSquare className="h-4 w-4 mr-2" />
            )}
            Traducir para cliente
          </Button>
          <Button 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Generar informe
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="files">Archivos ({client.files.length})</TabsTrigger>
          <TabsTrigger value="history">Historial de impactos</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información del cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Categoría fiscal</p>
                    <p className="font-medium">{client.category}</p>
                    {client.subcategory && (
                      <p className="text-sm text-muted-foreground">{client.subcategory}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CUIT</p>
                    <p className="font-medium font-mono">{client.cuit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expedientes</p>
                    <p className="font-medium">{client.files.length} archivos</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Último análisis</p>
                    <p className="font-medium">
                      {client.lastAnalysis ? formatDate(client.lastAnalysis) : "Pendiente"}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Impactos detectados</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm">
                        {client.impactHistory.filter(i => i.impact === "high").length} altos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-sm">
                        {client.impactHistory.filter(i => i.impact === "medium").length} medios
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">
                        {client.impactHistory.filter(i => i.impact === "low").length} bajos
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Impacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impactos recientes</CardTitle>
                <CardDescription>Últimas normativas que afectan a este cliente</CardDescription>
              </CardHeader>
              <CardContent>
                {client.impactHistory.length > 0 ? (
                  <div className="space-y-4">
                    {client.impactHistory.slice(0, 3).map((impact) => (
                      <div key={impact.id} className="flex items-start gap-3">
                        <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                          impact.impact === "high" ? "bg-red-500" : 
                          impact.impact === "medium" ? "bg-amber-500" : "bg-green-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{impact.regulationTitle}</p>
                          <p className="text-xs text-muted-foreground mt-1">{impact.summary}</p>
                          {impact.deadline && (
                            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Vence: {formatDate(impact.deadline)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Sin impactos detectados</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis Result Preview */}
          {(isGeneratingReport || isGeneratingSummary) && (
            <Card className="border-secondary/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-secondary" />
                  <div>
                    <p className="font-medium">Analizando información...</p>
                    <p className="text-sm text-muted-foreground">
                      {isGeneratingReport 
                        ? "Generando informe completo con análisis de impacto"
                        : "Creando resumen en lenguaje simple para compartir"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Archivos del expediente</CardTitle>
                  <CardDescription>
                    Documentos cargados desde Google Drive
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir en Drive
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {client.files.map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {getFileTypeLabel(file.type)}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(file.uploadedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de impactos regulatorios</CardTitle>
              <CardDescription>
                Línea temporal de normativas que han afectado a este cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              {client.impactHistory.length > 0 ? (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  
                  <div className="space-y-6">
                    {client.impactHistory.map((impact, index) => (
                      <div key={impact.id} className="relative pl-10">
                        {/* Timeline dot */}
                        <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 border-background ${
                          impact.impact === "high" ? "bg-red-500" : 
                          impact.impact === "medium" ? "bg-amber-500" : "bg-green-500"
                        }`} />
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className={getImpactColor(impact.impact)}>
                                    {impact.impact === "high" ? "Impacto alto" : 
                                     impact.impact === "medium" ? "Impacto medio" : "Impacto bajo"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(impact.date)}
                                  </span>
                                </div>
                                <h4 className="font-medium mb-1">{impact.regulationTitle}</h4>
                                <p className="text-sm text-muted-foreground">{impact.summary}</p>
                                
                                {impact.suggestedAction && (
                                  <div className="mt-3 p-3 bg-muted rounded-lg">
                                    <p className="text-xs font-medium text-muted-foreground mb-1">
                                      Acción sugerida:
                                    </p>
                                    <p className="text-sm">{impact.suggestedAction}</p>
                                  </div>
                                )}
                                
                                {impact.deadline && (
                                  <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    Fecha límite: {formatDate(impact.deadline)}
                                  </p>
                                )}
                                
                                <p className="mt-3 text-xs text-muted-foreground italic">
                                  Basado en: {impact.regulationTitle}, análisis automático NormaAI
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-medium mb-1">Sin historial de impactos</h3>
                  <p className="text-sm">
                    Todavía no se detectaron normativas que afecten a este cliente.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
