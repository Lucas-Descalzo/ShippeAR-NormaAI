"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Users, 
  Plus, 
  Search,
  FileText,
  ArrowRight,
  AlertCircle,
  Trash2,
  RotateCcw,
  Upload,
  FolderUp
} from "lucide-react"
import { type Client, mockClients as initialClients, formatDate } from "@/lib/mock-data"

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    name: "",
    cuit: "",
    category: "Monotributo" as Client["category"],
    subcategory: "",
    tipoActividad: "Servicios" as Client["tipoActividad"],
    industry: "",
    ingresosBrutosAnuales: "",
  })

  // Load clients from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("normaai-clients")
    if (stored) {
      try {
        setClients(JSON.parse(stored))
      } catch {
        setClients(initialClients)
        localStorage.setItem("normaai-clients", JSON.stringify(initialClients))
      }
    } else {
      setClients(initialClients)
      localStorage.setItem("normaai-clients", JSON.stringify(initialClients))
    }
  }, [])

  // Save clients to localStorage whenever they change
  const saveClients = (newClients: Client[]) => {
    setClients(newClients)
    localStorage.setItem("normaai-clients", JSON.stringify(newClients))
  }

  // Add new client
  const handleAddClient = () => {
    if (!newClient.name || !newClient.cuit) return

    const client: Client = {
      id: `client-${Date.now()}`,
      name: newClient.name,
      cuit: newClient.cuit,
      category: newClient.category,
      subcategory: newClient.subcategory || undefined,
      tipoActividad: newClient.tipoActividad,
      industry: newClient.industry || undefined,
      ingresosBrutosAnuales: newClient.ingresosBrutosAnuales 
        ? parseInt(newClient.ingresosBrutosAnuales.replace(/\D/g, "")) 
        : undefined,
      files: [],
      impactHistory: [],
      createdAt: new Date().toISOString().split("T")[0],
      lastAnalysis: null,
    }

    saveClients([...clients, client])
    setIsAddDialogOpen(false)
    setNewClient({
      name: "",
      cuit: "",
      category: "Monotributo",
      subcategory: "",
      tipoActividad: "Servicios",
      industry: "",
      ingresosBrutosAnuales: "",
    })
  }

  // Remove client
  const handleRemoveClient = (clientId: string) => {
    saveClients(clients.filter(c => c.id !== clientId))
  }

  // Reset to initial data
  const handleReset = () => {
    saveClients(initialClients)
  }

  // Filter clients by search
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cuit.includes(searchQuery)
  )

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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Resetear datos
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Agregar cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agregar nuevo cliente</DialogTitle>
                <DialogDescription>
                  Completá los datos del cliente para agregarlo a tu cartera.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre / Razón Social *</Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="Ej: Juan Pérez o Empresa SA"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cuit">CUIT *</Label>
                  <Input
                    id="cuit"
                    value={newClient.cuit}
                    onChange={(e) => setNewClient({ ...newClient, cuit: e.target.value })}
                    placeholder="XX-XXXXXXXX-X"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Categoría Tributaria</Label>
                    <Select
                      value={newClient.category}
                      onValueChange={(value) => setNewClient({ ...newClient, category: value as Client["category"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monotributo">Monotributo</SelectItem>
                        <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                        <SelectItem value="Sociedad">Sociedad</SelectItem>
                        <SelectItem value="Exento">Exento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newClient.category === "Monotributo" && (
                    <div className="grid gap-2">
                      <Label>Categoría Monotributo</Label>
                      <Select
                        value={newClient.subcategory}
                        onValueChange={(value) => setNewClient({ ...newClient, subcategory: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].map(cat => (
                            <SelectItem key={cat} value={`Categoría ${cat}`}>
                              Categoría {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Tipo de Actividad</Label>
                    <Select
                      value={newClient.tipoActividad}
                      onValueChange={(value) => setNewClient({ ...newClient, tipoActividad: value as Client["tipoActividad"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Servicios">Servicios</SelectItem>
                        <SelectItem value="Venta de Bienes">Venta de Bienes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Rubro</Label>
                    <Input
                      id="industry"
                      value={newClient.industry}
                      onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                      placeholder="Ej: Consultoría"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ingresos">Ingresos Brutos Anuales (estimado)</Label>
                  <Input
                    id="ingresos"
                    value={newClient.ingresosBrutosAnuales}
                    onChange={(e) => setNewClient({ ...newClient, ingresosBrutosAnuales: e.target.value })}
                    placeholder="Ej: 15000000"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddClient} disabled={!newClient.name || !newClient.cuit}>
                  Agregar Cliente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar por nombre o CUIT..." 
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Upload Zone - Demo */}
      <Card className="border-dashed border-2 border-muted-foreground/25 bg-muted/30 hover:border-secondary/50 hover:bg-muted/50 transition-colors cursor-pointer">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <FolderUp className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Cargar expedientes de clientes
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Arrastra archivos PDF, Excel o imágenes de documentos fiscales para agregar nuevos clientes automáticamente.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>PDF, XLSX, JPG, PNG - Máx. 10MB por archivo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => {
          const hasHighImpact = client.impactHistory.some(i => i.impact === "high")
          const pendingActions = client.impactHistory.filter(i => i.deadline).length

          return (
            <Card key={client.id} className="hover:border-secondary/50 transition-colors relative group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{client.name}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      CUIT: {client.cuit}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasHighImpact && (
                      <div className="h-2 w-2 rounded-full bg-red-500" title="Impacto alto detectado" />
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar cliente</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará a {client.name} de tu cartera. Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveClient(client.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">
                    {client.category}
                    {client.subcategory && ` - ${client.subcategory}`}
                  </Badge>
                  {client.ingresosBrutosAnuales && (
                    <Badge variant="outline" className="text-xs">
                      ${client.ingresosBrutosAnuales.toLocaleString("es-AR")}/año
                    </Badge>
                  )}
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
      {filteredClients.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No se encontraron clientes" : "No tenés clientes cargados"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "Intentá con otro término de búsqueda." 
                : "Agregá tu primer cliente para comenzar a monitorear su situación regulatoria."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer cliente
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Client count */}
      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {clients.length} cliente{clients.length !== 1 && "s"} en tu cartera
              </p>
              <p className="text-xs text-muted-foreground">
                Los cambios se guardan automáticamente
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
