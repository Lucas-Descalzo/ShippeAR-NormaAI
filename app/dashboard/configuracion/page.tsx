"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Bell, 
  HardDrive, 
  CreditCard,
  Shield,
  ExternalLink,
  Check
} from "lucide-react"

export default function ConfiguracionPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    highImpact: true,
    weeklyDigest: true,
  })

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">
          Administrá tu cuenta y preferencias de NormaAI.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Perfil</CardTitle>
          </div>
          <CardDescription>Tu información profesional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" defaultValue="Contador Demo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="demo@estudio.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="matricula">Matrícula profesional</Label>
              <Input id="matricula" defaultValue="CPCECABA T° 123 F° 456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input id="phone" type="tel" placeholder="+54 11 1234-5678" />
            </div>
          </div>
          <Button>Guardar cambios</Button>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Notificaciones</CardTitle>
          </div>
          <CardDescription>Configurá cómo y cuándo querés recibir alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas por email</Label>
              <p className="text-sm text-muted-foreground">
                Recibí notificaciones cuando se detecten impactos en tus clientes
              </p>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(n => ({ ...n, email: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Solo impactos altos</Label>
              <p className="text-sm text-muted-foreground">
                Recibí alertas inmediatas solo para impactos de alta prioridad
              </p>
            </div>
            <Switch 
              checked={notifications.highImpact}
              onCheckedChange={(checked) => setNotifications(n => ({ ...n, highImpact: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Resumen semanal</Label>
              <p className="text-sm text-muted-foreground">
                Recibí un digest cada lunes con las novedades de la semana
              </p>
            </div>
            <Switch 
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => setNotifications(n => ({ ...n, weeklyDigest: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Google Drive Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Google Drive</CardTitle>
          </div>
          <CardDescription>Gestión de conexión con tu Google Drive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium">Conectado</p>
                <p className="text-sm text-muted-foreground">demo@gmail.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Gestionar permisos
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            NormaAI tiene acceso de solo lectura a la carpeta &quot;Expedientes NormaAI&quot; de tu Drive.
          </p>
        </CardContent>
      </Card>

      {/* Plan Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Plan y facturación</CardTitle>
          </div>
          <CardDescription>Tu suscripción actual y opciones de upgrade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">Plan Gratuito</p>
                <Badge variant="secondary">Activo</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                3 de 3 expedientes usados
              </p>
            </div>
            <Button>Actualizar plan</Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-1">Profesional</p>
              <p className="text-2xl font-bold">$9.990 <span className="text-sm font-normal text-muted-foreground">/mes</span></p>
              <p className="text-sm text-muted-foreground mt-2">Hasta 20 expedientes</p>
            </div>
            <div className="p-4 border rounded-lg border-secondary">
              <p className="font-medium mb-1">Estudio</p>
              <p className="text-2xl font-bold">$24.990 <span className="text-sm font-normal text-muted-foreground">/mes</span></p>
              <p className="text-sm text-muted-foreground mt-2">Expedientes ilimitados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Seguridad</CardTitle>
          </div>
          <CardDescription>Protegé tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Cambiar contraseña</Button>
          <Separator />
          <div>
            <Button variant="destructive" size="sm">
              Cerrar sesión en todos los dispositivos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
