"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowRight, 
  ArrowLeft,
  User,
  HardDrive,
  FileUp,
  CheckCircle2,
  Loader2,
  Shield,
  FolderOpen
} from "lucide-react"

const steps = [
  { id: 1, title: "Crear cuenta", icon: User },
  { id: 2, title: "Conectar Drive", icon: HardDrive },
  { id: 3, title: "Subir expediente", icon: FileUp },
  { id: 4, title: "Listo", icon: CheckCircle2 },
]

function OnboardingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepParam = searchParams.get("step")
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
  })

  useEffect(() => {
    if (stepParam) {
      const step = parseInt(stepParam)
      if (step >= 1 && step <= 4) {
        setCurrentStep(step)
      }
    }
  }, [stepParam])

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate form
      if (!formData.name || !formData.email || !formData.matricula) {
        return
      }
    }

    if (currentStep === 2) {
      // Simulate OAuth connection
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsLoading(false)
    }

    if (currentStep === 3) {
      // Simulate file upload and analysis
      setIsAnalyzing(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsAnalyzing(false)
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      router.push(`/onboarding?step=${currentStep + 1}`, { scroll: false })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      router.push(`/onboarding?step=${currentStep - 1}`, { scroll: false })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-xl font-semibold text-foreground">NormaAI</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">Cancelar</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isActive 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : isCompleted 
                        ? "bg-secondary border-secondary text-secondary-foreground"
                        : "bg-background border-muted-foreground/30 text-muted-foreground"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-2 transition-colors ${
                      isCompleted ? "bg-secondary" : "bg-muted-foreground/30"
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Step Content */}
        <Card>
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Creá tu cuenta</CardTitle>
                <CardDescription>
                  Ingresá tus datos profesionales para comenzar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Ej: Juan Pérez"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email profesional</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@estudio.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricula">Matrícula profesional</Label>
                  <Input 
                    id="matricula"
                    name="matricula"
                    placeholder="Ej: CPCECABA T° 123 F° 456"
                    value={formData.matricula}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tu matrícula nos ayuda a validar tu identidad profesional.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Conectá tu Google Drive</CardTitle>
                <CardDescription>
                  Autorizá el acceso para que NormaAI pueda leer tus expedientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Tus datos están seguros</p>
                      <p className="text-xs text-muted-foreground">
                        Solo accedemos a la carpeta que selecciones. No podemos modificar ni eliminar archivos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FolderOpen className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Acceso limitado</p>
                      <p className="text-xs text-muted-foreground">
                        Podés revocar el acceso en cualquier momento desde la configuración de tu cuenta Google.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Conectar con Google Drive
                    </>
                  )}
                </Button>
                {/* TODO: Implement actual Google OAuth flow */}
                <p className="text-xs text-center text-muted-foreground">
                  Al conectar, aceptás nuestros{" "}
                  <Link href="/terms" className="underline">Términos de Servicio</Link>
                  {" "}y{" "}
                  <Link href="/privacy" className="underline">Política de Privacidad</Link>.
                </p>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle>Subí tu primer expediente</CardTitle>
                <CardDescription>
                  Seleccioná un archivo PDF de tu Drive para comenzar el análisis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FileUp className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium mb-1">Arrastrá un archivo o hacé clic para seleccionar</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDF de hasta 10MB (declaraciones juradas, contratos, balances)
                  </p>
                  <Button variant="outline">
                    Seleccionar archivo
                  </Button>
                </div>

                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-sm text-center">
                    <span className="font-medium">1 de 3</span> expedientes gratuitos
                  </p>
                </div>
                {/* TODO: Implement actual file picker from Google Drive */}
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader className="text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl">¡Todo listo!</CardTitle>
                <CardDescription>
                  Tu cuenta está configurada y el primer análisis está en proceso.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isAnalyzing ? (
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-secondary" />
                    <p className="font-medium mb-1">Analizando tu expediente...</p>
                    <p className="text-sm text-muted-foreground">
                      Estamos leyendo el documento y cruzándolo con las normativas vigentes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Qué sigue:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Recibirás un email cuando el análisis esté listo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Te notificaremos cada vez que una normativa impacte a tu cliente</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Podés agregar hasta 2 expedientes más en el plan gratuito</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg" asChild>
                  <Link href="/dashboard">
                    Ir al Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </>
          )}

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="px-6 pb-6 pt-2 flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
              
              {currentStep !== 2 && (
                <Button onClick={handleNext} disabled={isLoading || isAnalyzing}>
                  {currentStep === 3 ? "Completar" : "Siguiente"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}
