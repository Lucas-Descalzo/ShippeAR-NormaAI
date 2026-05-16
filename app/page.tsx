import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Bell, FileSearch, Users, Shield, Lock, Globe, CheckCircle2, Clock, DollarSign } from "lucide-react"

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
            <Link href="#problema" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              El problema
            </Link>
            <Link href="#solucion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Solución
            </Link>
            <Link href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cómo funciona
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/dashboard">Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/onboarding">
                Probalo gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance leading-tight">
                {"Cada día cambian las reglas. ¿Sabés cómo le afecta a cada uno de tus clientes?"}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
                NormaAI monitorea ARCA, INFOLEG y CNV por vos, cruza cada cambio con el perfil de tus clientes y te dice exactamente qué hacer y cuándo. Todo automático.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                  <Link href="/onboarding">
                    {"Probalo gratis — sin tarjeta de crédito"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="#como-funciona">Ver cómo funciona</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/60">
                {"Configuración en 5 minutos · 3 expedientes gratuitos · Sin permanencia"}
              </p>
            </div>
          </div>
        </section>

        {/* Bloque Problema */}
        <section id="problema" className="py-20 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center text-balance">
                El problema que ningún contador debería tener en 2026
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Un estudio contable promedio pierde 8 horas semanales leyendo normativas manualmente. Eso son 400 horas al año que no se facturan, no se delegan y no descansan. Y aun así, los cambios críticos se escapan: una recategorización de Monotributo fuera de término, una modificación en Ganancias que nadie vio, una resolución de la CNV que impacta a tu cliente más grande.
              </p>
              <p className="text-lg text-foreground font-medium mt-4">
                No es falta de atención. Es que el volumen es imposible de seguir solo.
              </p>
            </div>
          </div>
        </section>

        {/* Bloque Solución */}
        <section id="solucion" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                NormaAI hace el trabajo que te consume tiempo y te cobra caro cuando falla
              </h2>
              <p className="text-lg text-muted-foreground">
                No es un buscador de normativas. Es un sistema que entiende a tus clientes y te dice qué cambia para cada uno.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <FileSearch className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Nunca más te enterés tarde</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Escaneamos ARCA, INFOLEG, Boletín Oficial y CNV cada 24 horas. Cada resolución nueva es analizada por IA y resumida en lenguaje claro. Vos llegás a la mañana y ya sabés qué pasó.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">No todas las normativas te afectan. Sabemos cuáles sí.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    NormaAI cruza cada cambio regulatorio con el perfil fiscal de cada uno de tus clientes: su régimen, sus ingresos, su actividad. Si la RG 5614 impacta a María Fernández pero no a García & Asociados, te lo decimos así de claro.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Te avisamos antes de que sea un problema</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Cuando una normativa requiere acción urgente, recibís una alerta con la acción sugerida y el plazo exacto. Sin ambigüedades. Con la cita del artículo que lo respalda.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bloque Eficiencia */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="h-8 w-8 text-primary-foreground/70" />
                <DollarSign className="h-8 w-8 text-primary-foreground/70" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
                {"¿Cuánto vale recuperar 8 horas semanales?"}
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-6">
                {"Si facturás $5.000 la hora, son $40.000 por semana que hoy se van en leer el Boletín Oficial. Con NormaAI, ese tiempo lo convertís en más clientes atendidos, más servicios facturados o simplemente en no llevarte el trabajo a tu casa."}
              </p>
              <p className="text-primary-foreground font-medium">
                {"Los estudios que automatizan el monitoreo regulatorio pueden incorporar hasta un 30% más de clientes sin sumar personal."}
              </p>
            </div>
          </div>
        </section>

        {/* Bloque Cómo Funciona */}
        <section id="como-funciona" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                De cero a protegido en 5 minutos
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { step: "1", title: "Creá tu cuenta", desc: "Con tu email y matrícula profesional" },
                { step: "2", title: "Conectá tu Google Drive", desc: "Autorizás acceso a la carpeta con expedientes. Tus archivos nunca salen de tu Drive." },
                { step: "3", title: "Subí los expedientes de tus clientes", desc: "NormaAI los lee, los clasifica y arma el perfil fiscal de cada uno automáticamente" },
                { step: "4", title: "Recibí alertas personalizadas", desc: "Cada vez que algo cambia y afecta a alguno de tus clientes, te avisamos con la acción recomendada" },
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

        {/* Bloque Confianza */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Construido para el contador argentino
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Citaciones exactas</h3>
                <p className="text-sm text-muted-foreground">
                  Cada análisis referencia el artículo y la resolución específica. Nada de interpretaciones vagas.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Tus datos, en tu Drive</h3>
                <p className="text-sm text-muted-foreground">
                  Encriptación de extremo a extremo. Nosotros no almacenamos tus expedientes.
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fuentes oficiales únicamente</h3>
                <p className="text-sm text-muted-foreground">
                  ARCA, INFOLEG, Boletín Oficial, CNV. Sin rumores, sin terceros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              {"Tu competencia ya está automatizando. ¿Vos cuándo empezás?"}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Probá NormaAI gratis con 3 expedientes, sin límite de tiempo y sin tarjeta de crédito. Si no te ahorra tiempo en la primera semana, no te cobramos nada.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/onboarding">
                Crear cuenta gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-primary-foreground/60">
              {"Después, planes desde $9.990 ARS/mes. Sin contratos anuales."}
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
              {"© 2025 NormaAI. Hecho en Argentina para contadores argentinos."}
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
