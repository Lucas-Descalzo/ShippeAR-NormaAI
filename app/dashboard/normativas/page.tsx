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
import { 
  Search, 
  Filter,
  ExternalLink,
  ChevronDown,
  Users,
  Calendar
} from "lucide-react"
import { 
  mockRegulations, 
  getSourceColor, 
  formatDate,
  type Regulation
} from "@/lib/mock-data"

const sources = ["Todos", "AFIP", "INFOLEG", "CNV", "Boletín Oficial"] as const
const topics = ["Todos", "Monotributo", "Ganancias", "IVA", "Bienes Personales", "Sociedades", "General"] as const

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
          Explorá las últimas regulaciones de AFIP, INFOLEG, CNV y Boletín Oficial.
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
              {/* Full Summary */}
              <div>
                <h4 className="text-sm font-medium mb-2">Resumen completo</h4>
                <p className="text-sm text-muted-foreground">
                  {regulation.summary}
                </p>
              </div>

              {/* Affected Clients */}
              {regulation.affectedClientCount > 0 && (
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium text-secondary">
                      {regulation.affectedClientCount} cliente{regulation.affectedClientCount !== 1 && "s"}
                    </span>{" "}
                    de tu cartera podrían verse afectados por esta normativa.
                  </p>
                </div>
              )}

              {/* Citation */}
              <p className="text-xs text-muted-foreground italic">
                Basado en: {regulation.title}, Art. 1-5 · Análisis generado por NormaAI
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                {regulation.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={regulation.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver texto completo
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Ver clientes afectados
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
