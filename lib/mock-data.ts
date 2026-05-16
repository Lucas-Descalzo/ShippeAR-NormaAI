// Mock data for NormaAI - Argentine Tax/Regulatory Assistant
// TODO: Replace with real data from Python RAG backend

export interface Client {
  id: string
  name: string
  cuit: string
  category: "Monotributo" | "Responsable Inscripto" | "Exento" | "Sociedad"
  subcategory?: string // e.g., "Cat. H" for Monotributo
  industry?: string
  files: ClientFile[]
  impactHistory: ImpactEvent[]
  createdAt: string
  lastAnalysis: string | null
}

export interface ClientFile {
  id: string
  name: string
  type: "tax_return" | "contract" | "incorporation" | "other"
  uploadedAt: string
  driveUrl?: string
}

export interface ImpactEvent {
  id: string
  regulationId: string
  regulationTitle: string
  date: string
  impact: "high" | "medium" | "low"
  summary: string
  suggestedAction?: string
  deadline?: string
}

export interface Regulation {
  id: string
  title: string
  source: "AFIP" | "INFOLEG" | "CNV" | "Boletín Oficial"
  date: string
  topic: "Monotributo" | "Ganancias" | "IVA" | "Bienes Personales" | "Sociedades" | "General"
  summary: string
  fullText?: string
  affectedClientCount: number
  url?: string
}

export interface Alert {
  id: string
  clientId: string
  clientName: string
  regulationId: string
  regulationTitle: string
  impact: "high" | "medium" | "low"
  message: string
  suggestedAction: string
  deadline?: string
  createdAt: string
  isRead: boolean
}

// Sample Clients
export const mockClients: Client[] = [
  {
    id: "1",
    name: "García & Asociados SRL",
    cuit: "30-71234567-8",
    category: "Sociedad",
    industry: "Servicios profesionales",
    files: [
      { id: "f1", name: "DDJJ Ganancias 2023.pdf", type: "tax_return", uploadedAt: "2024-01-15" },
      { id: "f2", name: "Contrato Social.pdf", type: "incorporation", uploadedAt: "2024-01-10" },
      { id: "f3", name: "DDJJ IVA Enero 2024.pdf", type: "tax_return", uploadedAt: "2024-02-05" },
    ],
    impactHistory: [
      {
        id: "i1",
        regulationId: "r1",
        regulationTitle: "RG AFIP 5424/2024",
        date: "2024-01-20",
        impact: "high",
        summary: "Nuevos requisitos de facturación electrónica para sociedades",
        suggestedAction: "Actualizar sistema de facturación antes del 01/03/2024",
        deadline: "2024-03-01",
      },
    ],
    createdAt: "2024-01-10",
    lastAnalysis: "2024-01-25",
  },
  {
    id: "2",
    name: "María Fernández",
    cuit: "27-28456789-4",
    category: "Monotributo",
    subcategory: "Categoría H",
    industry: "Diseño gráfico",
    files: [
      { id: "f4", name: "Constancia Monotributo.pdf", type: "tax_return", uploadedAt: "2024-01-12" },
      { id: "f5", name: "Recategorizacion 2023.pdf", type: "other", uploadedAt: "2023-07-20" },
    ],
    impactHistory: [
      {
        id: "i2",
        regulationId: "r2",
        regulationTitle: "RG AFIP 5523/2024",
        date: "2024-01-18",
        impact: "high",
        summary: "Actualización de topes de facturación para Monotributo",
        suggestedAction: "Verificar si corresponde recategorización antes del 20/01",
        deadline: "2024-01-20",
      },
    ],
    createdAt: "2024-01-12",
    lastAnalysis: "2024-01-24",
  },
  {
    id: "3",
    name: "Importadora Del Sur SA",
    cuit: "30-70987654-2",
    category: "Responsable Inscripto",
    industry: "Comercio exterior",
    files: [
      { id: "f6", name: "DDJJ Ganancias 2023.pdf", type: "tax_return", uploadedAt: "2024-01-08" },
      { id: "f7", name: "Registro Importador.pdf", type: "other", uploadedAt: "2024-01-08" },
      { id: "f8", name: "Balance 2023.pdf", type: "other", uploadedAt: "2024-01-10" },
    ],
    impactHistory: [
      {
        id: "i3",
        regulationId: "r3",
        regulationTitle: "RG CNV 1002/2024",
        date: "2024-01-22",
        impact: "medium",
        summary: "Nuevos requisitos de información para operadores de comercio exterior",
        suggestedAction: "Revisar cumplimiento de nuevos formularios",
      },
    ],
    createdAt: "2024-01-08",
    lastAnalysis: "2024-01-23",
  },
]

// Sample Regulations
export const mockRegulations: Regulation[] = [
  {
    id: "r1",
    title: "RG AFIP 5424/2024 — Actualización de categorías Monotributo",
    source: "AFIP",
    date: "2024-01-15",
    topic: "Monotributo",
    summary: "Se actualizan los parámetros de categorización del Régimen Simplificado para Pequeños Contribuyentes (Monotributo), incluyendo nuevos topes de facturación y valores de cuota mensual. Los monotributistas deberán verificar su categoría y, de corresponder, recategorizarse antes del 20 de enero.",
    affectedClientCount: 1,
    url: "https://www.afip.gob.ar/rg5424",
  },
  {
    id: "r2",
    title: "Ley 27.743 — Paquete Fiscal 2024",
    source: "INFOLEG",
    date: "2024-01-10",
    topic: "General",
    summary: "Ley ómnibus que modifica diversos aspectos del régimen tributario argentino, incluyendo cambios en Ganancias, Bienes Personales, y régimen de regularización de activos. Incluye blanqueo de capitales y modificaciones a escalas de alícuotas.",
    affectedClientCount: 3,
    url: "https://www.infoleg.gob.ar/ley27743",
  },
  {
    id: "r3",
    title: "RG CNV 1002 — Nuevos requisitos de información",
    source: "CNV",
    date: "2024-01-18",
    topic: "Sociedades",
    summary: "Se establecen nuevos requisitos de información periódica para sociedades que realicen operaciones de comercio exterior superiores a USD 100.000 anuales. Incluye obligación de presentar declaración jurada trimestral.",
    affectedClientCount: 1,
    url: "https://www.cnv.gob.ar/rg1002",
  },
  {
    id: "r4",
    title: "RG AFIP 5520/2024 — Régimen de retención IVA",
    source: "AFIP",
    date: "2024-01-20",
    topic: "IVA",
    summary: "Modificación del régimen de retención del Impuesto al Valor Agregado aplicable a operaciones realizadas mediante tarjetas de crédito y débito. Se actualizan los montos mínimos no sujetos a retención.",
    affectedClientCount: 2,
    url: "https://www.afip.gob.ar/rg5520",
  },
  {
    id: "r5",
    title: "Decreto 50/2024 — Actualización Bienes Personales",
    source: "Boletín Oficial",
    date: "2024-01-22",
    topic: "Bienes Personales",
    summary: "Se actualiza el mínimo no imponible del Impuesto sobre los Bienes Personales y se modifican las alícuotas aplicables para el período fiscal 2024. Beneficia a contribuyentes con patrimonios hasta $100.000.000.",
    affectedClientCount: 2,
    url: "https://www.boletinoficial.gob.ar/decreto50-2024",
  },
]

// Sample Alerts
export const mockAlerts: Alert[] = [
  {
    id: "a1",
    clientId: "2",
    clientName: "María Fernández",
    regulationId: "r1",
    regulationTitle: "RG AFIP 5424/2024",
    impact: "high",
    message: "La RG 5424 modifica los topes de facturación del Monotributo. María Fernández (Cat. H) debe verificar si corresponde recategorización.",
    suggestedAction: "Verificar facturación acumulada de los últimos 12 meses y comparar con nuevos topes. Si supera $7.996.484,12, iniciar trámite de recategorización.",
    deadline: "2024-01-20",
    createdAt: "2024-01-16",
    isRead: false,
  },
  {
    id: "a2",
    clientId: "1",
    clientName: "García & Asociados SRL",
    regulationId: "r2",
    regulationTitle: "Ley 27.743 — Paquete Fiscal 2024",
    impact: "medium",
    message: "La nueva ley modifica las escalas de Ganancias para sociedades. García & Asociados SRL podría beneficiarse de la reducción de alícuota.",
    suggestedAction: "Revisar proyección de resultado fiscal 2024 y evaluar impacto de nuevas alícuotas. Considerar planificación fiscal.",
    createdAt: "2024-01-12",
    isRead: true,
  },
  {
    id: "a3",
    clientId: "3",
    clientName: "Importadora Del Sur SA",
    regulationId: "r3",
    regulationTitle: "RG CNV 1002",
    impact: "medium",
    message: "Nuevos requisitos de información para operadores de comercio exterior. Importadora Del Sur SA debe comenzar a presentar DDJJ trimestral.",
    suggestedAction: "Implementar proceso de recopilación de información trimestral. Primera presentación vence el 15/04/2024.",
    deadline: "2024-04-15",
    createdAt: "2024-01-19",
    isRead: false,
  },
]

// Dashboard summary stats
export const dashboardStats = {
  newRegulations: 5,
  affectedClients: 3,
  pendingActions: 2,
  lastSync: "2024-01-25T10:30:00Z",
}

// Helper function to get source badge color
export function getSourceColor(source: Regulation["source"]): string {
  switch (source) {
    case "AFIP":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "INFOLEG":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "CNV":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Boletín Oficial":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

// Helper function to get impact badge color
export function getImpactColor(impact: "high" | "medium" | "low"): string {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "medium":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

// Helper function to format dates in Argentine Spanish
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

// Helper function to format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return "Hace menos de 1 hora"
  if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`
  if (diffDays < 7) return `Hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`
  return formatDate(dateString)
}
