import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bell, FileSearch, Users, Shield, Zap, BarChart3, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-xl font-semibold text-foreground">NormaAI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Precios
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nosotros
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/dashboard">Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/onboarding">
                Empezar gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30">
                Inteligencia regulatoria con IA
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance leading-tight">
                Tu estudio contable, siempre actualizado. Sin esfuerzo.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
                Dejá de perder horas leyendo el Boletín Oficial. NormaAI monitorea AFIP, INFOLEG y CNV automáticamente y te avisa qué impacta a cada uno de tus clientes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/onboarding">
                    Empezá gratis — 3 expedientes incluidos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="#demo">Ver demostración</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/60">
                Sin tarjeta de crédito · Configuración en 5 minutos
              </p>
            </div>
          </div>
        </section>

        {/* Pain Point Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">Los contadores argentinos pierden en promedio 8 horas semanales</span> revisando normativas manualmente. Mientras tanto, los cambios críticos que afectan a sus clientes pasan desapercibidos hasta que es demasiado tarde.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Todo lo que necesitás, automatizado
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dejá que la IA haga el trabajo pesado mientras vos te enfocás en tus clientes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="relative overflow-hidden border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <FileSearch className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Monitor automático</CardTitle>
                  <CardDescription>
                    Escaneo diario de AFIP, INFOLEG, Boletín Oficial y CNV. Nunca más te pierdas una resolución importante.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Actualización cada 24 horas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Resumen con IA de cada normativa
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Filtros por tema e impuesto
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Análisis por cliente</CardTitle>
                  <CardDescription>
                    Cruzamos cada normativa con el perfil de tus clientes para decirte exactamente quién se ve afectado.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Lectura automática de expedientes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Detección de impacto personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Historial de cambios por cliente
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Alertas proactivas</CardTitle>
                  <CardDescription>
                    Recibí notificaciones cuando una normativa requiere acción inmediata para alguno de tus clientes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Alertas por email y dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Acciones sugeridas con plazos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Resumen para compartir con clientes
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Configuralo en minutos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conectá tu Google Drive y dejá que NormaAI haga el resto.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { step: "1", title: "Creá tu cuenta", desc: "Registrate con tu email y matrícula profesional" },
                { step: "2", title: "Conectá Drive", desc: "Autorizá acceso a la carpeta con expedientes" },
                { step: "3", title: "Subí expedientes", desc: "NormaAI lee y clasifica automáticamente" },
                { step: "4", title: "Recibí alertas", desc: "Te avisamos cuando algo impacte a tus clientes" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Datos seguros</h3>
                <p className="text-sm text-muted-foreground">
                  Encriptación de extremo a extremo. Tus expedientes nunca salen de tu Drive.
                </p>
              </div>
              <div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Siempre actualizado</h3>
                <p className="text-sm text-muted-foreground">
                  Monitoreo 24/7 de todas las fuentes oficiales argentinas.
                </p>
              </div>
              <div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Citaciones precisas</h3>
                <p className="text-sm text-muted-foreground">
                  Cada análisis incluye referencias exactas a artículos y resoluciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Empezá hoy, sin compromiso
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Probá NormaAI gratis con hasta 3 expedientes de clientes. Sin límite de tiempo.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/onboarding">
                Crear cuenta gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-primary-foreground/60">
              Después, planes desde $9.990 ARS/mes para estudios en crecimiento.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-lg font-semibold text-foreground">NormaAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 NormaAI. Hecho en Argentina para contadores argentinos.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Términos
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
