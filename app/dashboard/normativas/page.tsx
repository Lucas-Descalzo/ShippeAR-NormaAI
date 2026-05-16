"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Search, 
  Filter,
  ExternalLink,
  ChevronDown,
  Users,
  Calendar,
  FileText,
  Scale
} from "lucide-react"
import { 
  mockRegulations, 
  mockClients,
  getSourceColor, 
  formatDate,
  type Regulation
} from "@/lib/mock-data"
import { normativas } from "@/lib/normativas"
import Link from "next/link"

const sources = ["Todos", "AFIP", "INFOLEG", "Boletín Oficial"] as const
const topics = ["Todos", "Monotributo", "Ganancias", "IVA", "Bienes Personales", "General"] as const

export default function NormativasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSource, setSelectedSource] = useState<string>("Todos")
  const [selectedTopic, setSelectedTopic] = useState<string>("Todos")
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const filteredRegulations = mockRegulations.filter((reg) => {
    const matchesSearch = searchQuery === "" || 
      reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.summary.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSource = selectedSource === "Todos" || reg.source === selectedSource
    const matchesTopic = selectedTopic === "Todos" || reg.topic === selectedTopic

    return matchesSearch && matchesSource && matchesTopic
  })

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSource("Todos")
    setSelectedTopic("Todos")
  }

  const hasActiveFilters = searchQuery !== "" || selectedSource !== "Todos" || selectedTopic !== "Todos"

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Normativas</h1>
        <p className="text-muted-foreground">
          Explorá las últimas regulaciones de AFIP, INFOLEG y Boletín Oficial con artículos completos.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por título o contenido..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Source Filter */}
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Fuente" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Topic Filter */}
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Tema" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredRegulations.length} normativa{filteredRegulations.length !== 1 && "s"} encontrada{filteredRegulations.length !== 1 && "s"}
        </p>
      </div>

      {/* Regulations List */}
      <div className="space-y-4">
        {filteredRegulations.map((regulation) => (
          <RegulationCard 
            key={regulation.id}
            regulation={regulation}
            isExpanded={expandedIds.has(regulation.id)}
            onToggle={() => toggleExpand(regulation.id)}
          />
        ))}

        {filteredRegulations.length === 0 && (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-semibold mb-2">No se encontraron normativas</h3>
              <p className="text-sm">
                Probá ajustando los filtros o términos de búsqueda.
              </p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Limpiar filtros
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

interface RegulationCardProps {
  regulation: Regulation
  isExpanded: boolean
  onToggle: () => void
}

function RegulationCard({ regulation, isExpanded, onToggle }: RegulationCardProps) {
  // Get full normativa data from normativas.ts
  const fullNormativa = normativas.find(n => n.id === regulation.id)
  
  // Get affected clients
  const affectedClients = mockClients.filter(client => 
    client.impactHistory.some(impact => impact.normativaId === regulation.id)
  )

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <Card className="hover:border-secondary/50 transition-colors">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className={getSourceColor(regulation.source)}>
                    {regulation.source}
                  </Badge>
                  <Badge variant="outline">
                    {regulation.topic}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(regulation.date)}
                  </span>
                </div>
                <CardTitle className="text-lg">{regulation.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">
                  {regulation.summary}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {regulation.affectedClientCount > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {regulation.affectedClientCount}
                  </Badge>
                )}
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="border-t pt-4 space-y-4">
              
              {/* Artículos de la normativa */}
              {fullNormativa && fullNormativa.articulos.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Artículos relevantes ({fullNormativa.articulos.length})
                  </h4>
                  <Accordion type="single" collapsible className="w-full">
                    {fullNormativa.articulos.map((articulo, index) => (
                      <AccordionItem key={index} value={`articulo-${index}`}>
                        <AccordionTrigger className="text-sm hover:no-underline">
                          <div className="flex items-start gap-2 text-left">
                            <Badge variant="outline" className="shrink-0 text-xs">
                              {articulo.numero}
                            </Badge>
                            <span className="font-medium">{articulo.titulo}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 border-l-2 border-secondary/30 ml-2">
                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                              {articulo.texto}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Affected Clients */}
              {affectedClients.length > 0 && (
                <div className="p-4 bg-secondary/5 rounded-lg">
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Clientes afectados ({affectedClients.length})
                  </p>
                  <div className="space-y-2">
                    {affectedClients.map(client => {
                      const relevantImpact = client.impactHistory.find(i => i.normativaId === regulation.id)
                      return (
                        <Link 
                          key={client.id}
                          href={`/dashboard/clientes/${client.id}`}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              relevantImpact?.impact === "high" ? "bg-red-500" :
                              relevantImpact?.impact === "medium" ? "bg-amber-500" : "bg-green-500"
                            }`} />
                            <span className="text-sm font-medium">{client.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {client.category}
                              {client.subcategory && ` - ${client.subcategory}`}
                            </Badge>
                          </div>
                          {relevantImpact && (
                            <span className="text-xs text-muted-foreground">
                              {relevantImpact.articuloRef}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Source link */}
              <div className="flex items-center gap-2 pt-2">
                {regulation.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={regulation.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver texto completo en {regulation.source}
                    </a>
                  </Button>
                )}
              </div>

              {/* Citation */}
              <p className="text-xs text-muted-foreground italic border-t pt-3">
                Fuente: {fullNormativa?.title || regulation.title} · {regulation.source} · {formatDate(regulation.date)}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
