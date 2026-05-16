// Mock data for NormaAI - Argentine Tax/Regulatory Assistant
// Data is derived from normativas.ts - the source of truth for regulations

import { normativas, type NormativaDoc } from "./normativas"

export interface Client {
  id: string
  name: string
  cuit: string
  category: "Monotributo" | "Responsable Inscripto" | "Exento" | "Sociedad"
  subcategory?: string // e.g., "Cat. H" for Monotributo
  // Financial data for analysis
  ingresosBrutosAnuales?: number // Annual gross income
  superficieAfectada?: number // m2
  energiaElectrica?: number // Kw anual
  alquileresDevengados?: number // Annual rent
  tipoActividad?: "Servicios" | "Venta de Bienes"
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
  normativaId: string // References normativas.ts
  regulationTitle: string
  articuloRef: string // e.g., "Art. 8°", "Arts. 85-94°"
  date: string
  impact: "high" | "medium" | "low"
  summary: string
  suggestedAction?: string
  deadline?: string
  citaTextual?: string // Direct quote from the normativa
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
  articulos?: { numero: string; titulo: string; texto: string }[]
}

export interface Alert {
  id: string
  clientId: string
  clientName: string
  normativaId: string
  regulationTitle: string
  articuloRef: string
  impact: "high" | "medium" | "low"
  message: string
  suggestedAction: string
  deadline?: string
  createdAt: string
  isRead: boolean
  citaTextual?: string
}

// Sample Clients with realistic Argentine tax data
export const mockClients: Client[] = [
  {
    id: "1",
    name: "García & Asociados SRL",
    cuit: "30-71234567-8",
    category: "Sociedad",
    industry: "Servicios profesionales",
    ingresosBrutosAnuales: 85000000, // Exceeds Monotributo K limit
    files: [
      { id: "f1", name: "DDJJ Ganancias 2024.pdf", type: "tax_return", uploadedAt: "2025-01-15" },
      { id: "f2", name: "Contrato Social.pdf", type: "incorporation", uploadedAt: "2024-01-10" },
      { id: "f3", name: "Balance 2024.pdf", type: "other", uploadedAt: "2025-01-10" },
    ],
    impactHistory: [
      {
        id: "i1",
        normativaId: "ley-27743",
        regulationTitle: "Ley 27.743 — Medidas Fiscales Paliativas y Relevantes",
        articuloRef: "Título I",
        date: "2024-07-08",
        impact: "high",
        summary: "La Ley 27.743 restableció el Impuesto a las Ganancias para empleados en relación de dependencia (cuarta categoría). Los empleados de García & Asociados con sueldos superiores al MNI quedan alcanzados nuevamente.",
        suggestedAction: "Recalcular retenciones de Ganancias para empleados con remuneraciones brutas superiores al mínimo no imponible actualizado. Notificar al área de RRHH.",
        citaTextual: "La Ley 27.743 restableció el Impuesto a las Ganancias para empleados en relación de dependencia (cuarta categoría), que había sido eliminado por Ley 27.725 (2023).",
      },
      {
        id: "i1b",
        normativaId: "ley-27743",
        regulationTitle: "Ley 27.743 — Medidas Fiscales Paliativas y Relevantes",
        articuloRef: "Título III",
        date: "2024-07-08",
        impact: "medium",
        summary: "El Régimen de Regularización de Activos (Blanqueo) permite exteriorizar bienes no declarados con alícuotas preferenciales. Evaluar si los socios de García & Asociados podrían beneficiarse.",
        suggestedAction: "Consultar con los socios sobre potencial adhesión al blanqueo. La Etapa 1 con alícuota del 5% venció el 30/09/2024, pero etapas posteriores siguen vigentes.",
        citaTextual: "Etapa 1 (hasta 30/09/2024): alícuota 5% sobre el valor de los bienes regularizados. Monto mínimo exento hasta USD 100.000.",
      },
    ],
    createdAt: "2024-01-10",
    lastAnalysis: "2025-01-15",
  },
  {
    id: "2",
    name: "María Fernández",
    cuit: "27-28456789-4",
    category: "Monotributo",
    subcategory: "Categoría H",
    tipoActividad: "Servicios",
    ingresosBrutosAnuales: 42000000, // Near H limit of $44M (Ley 24.977) / $74.4M (RG 5614)
    superficieAfectada: 85,
    energiaElectrica: 12000,
    industry: "Diseño gráfico",
    files: [
      { id: "f4", name: "Constancia Monotributo.pdf", type: "tax_return", uploadedAt: "2025-01-12" },
      { id: "f5", name: "Recategorizacion Julio 2024.pdf", type: "other", uploadedAt: "2024-07-20" },
    ],
    impactHistory: [
      {
        id: "i2",
        normativaId: "rg-afip-5614",
        regulationTitle: "RG AFIP 5614/2025 — Actualización de categorías Monotributo",
        articuloRef: "Art. 1°",
        date: "2025-01-15",
        impact: "high",
        summary: "La RG 5614 actualiza los topes de facturación por IPC. El nuevo límite de Categoría H es $74.420.000 (antes $44.000.000). María Fernández con ingresos de $42M mantiene su categoría H sin cambios.",
        suggestedAction: "Verificar recategorización semestral. El nuevo tope de Cat. H ($74.420.000) le da margen de crecimiento. Próxima recategorización: febrero 2025.",
        deadline: "2025-02-20",
        citaTextual: "Categoría H: Hasta $74.420.000 de ingresos brutos anuales. Vigencia: 1° de enero de 2025.",
      },
      {
        id: "i2b",
        normativaId: "rg-afip-5614",
        regulationTitle: "RG AFIP 5614/2025 — Actualización de categorías Monotributo",
        articuloRef: "Art. 2°",
        date: "2025-01-15",
        impact: "medium",
        summary: "Las cuotas mensuales del impuesto integrado aumentaron. Para Categoría H Servicios, la nueva cuota es $372.220 (antes $220.000).",
        suggestedAction: "Actualizar débito automático. La nueva cuota de $372.220 aplica desde enero 2025. Diferencia mensual: +$152.220.",
        citaTextual: "Categoría H Servicios/Obras: $372.220 mensuales. Categoría H Venta de Bienes: $186.110 mensuales.",
      },
      {
        id: "i2c",
        normativaId: "ley-24977",
        regulationTitle: "Ley 24.977 — Régimen Simplificado para Pequeños Contribuyentes",
        articuloRef: "Art. 9°",
        date: "2025-01-20",
        impact: "medium",
        summary: "Según Art. 9° de la Ley 24.977, María debe recategorizarse al finalizar el semestre julio/diciembre 2024. La recategorización tiene efectos desde febrero 2025.",
        suggestedAction: "Calcular ingresos brutos acumulados de los últimos 12 meses y verificar si corresponde mantener Categoría H o subir/bajar de categoría antes del 20/02/2025.",
        deadline: "2025-02-20",
        citaTextual: "A la finalización de cada semestre calendario, el pequeño contribuyente deberá calcular los ingresos brutos acumulados... quedará encuadrado en la categoría que corresponda a partir del segundo mes inmediato siguiente.",
      },
    ],
    createdAt: "2024-01-12",
    lastAnalysis: "2025-01-20",
  },
  {
    id: "3",
    name: "Martín Rodríguez",
    cuit: "20-35678901-5",
    category: "Monotributo",
    subcategory: "Categoría K",
    tipoActividad: "Venta de Bienes",
    ingresosBrutosAnuales: 95000000, // Near old K limit $68M, but below new $114.89M
    superficieAfectada: 180,
    energiaElectrica: 18000,
    industry: "Comercio minorista",
    files: [
      { id: "f6", name: "Constancia Monotributo.pdf", type: "tax_return", uploadedAt: "2025-01-08" },
      { id: "f7", name: "Contrato de alquiler local.pdf", type: "contract", uploadedAt: "2024-06-15" },
    ],
    impactHistory: [
      {
        id: "i3",
        normativaId: "rg-afip-5614",
        regulationTitle: "RG AFIP 5614/2025 — Actualización de categorías Monotributo",
        articuloRef: "Art. 1°",
        date: "2025-01-15",
        impact: "high",
        summary: "IMPORTANTE: Con la RG 5614, Martín evita la exclusión del Monotributo. Sus ingresos de $95M superaban el viejo tope K de $68M, pero el nuevo tope es $114.890.000. Puede permanecer en el régimen.",
        suggestedAction: "Mantener Categoría K. Con ingresos de $95M está dentro del nuevo límite de $114.89M. Sin embargo, monitorear facturación mensual para no superar el tope.",
        citaTextual: "Categoría K: Hasta $114.890.000 de ingresos brutos anuales. Vigencia: 1° de enero de 2025.",
      },
      {
        id: "i3b",
        normativaId: "ley-24977",
        regulationTitle: "Ley 24.977 — Régimen Simplificado para Pequeños Contribuyentes",
        articuloRef: "Art. 20°",
        date: "2025-01-15",
        impact: "medium",
        summary: "El Art. 20° establece causales de exclusión. Martín debe monitorear que sus ingresos no superen $114.89M ni que el precio unitario de venta supere $385.000.",
        suggestedAction: "Implementar control de facturación mensual. Alertar si algún producto supera $385.000 de precio unitario o si ingresos acumulados superan $114.89M.",
        citaTextual: "Los contribuyentes quedan excluidos cuando: a) Los ingresos brutos de los últimos 12 meses superen el límite máximo de la Categoría K. c) El precio máximo unitario de venta supere $385.000.",
      },
      {
        id: "i3c",
        normativaId: "rg-afip-5614",
        regulationTitle: "RG AFIP 5614/2025 — Actualización de categorías Monotributo",
        articuloRef: "Art. 2°",
        date: "2025-01-15",
        impact: "low",
        summary: "La cuota mensual de Categoría K Venta de Bienes aumentó a $414.505 (antes $245.000). Incremento significativo pero proporcional al ajuste de topes.",
        suggestedAction: "Actualizar débito automático. Nueva cuota: $414.505. Considerar el mayor costo en la proyección de flujo de caja.",
        citaTextual: "Categoría K Venta de Bienes: $414.505 mensuales.",
      },
    ],
    createdAt: "2024-06-15",
    lastAnalysis: "2025-01-20",
  },
  {
    id: "4",
    name: "Importadora Del Sur SA",
    cuit: "30-70987654-2",
    category: "Responsable Inscripto",
    industry: "Comercio exterior",
    ingresosBrutosAnuales: 250000000,
    files: [
      { id: "f8", name: "DDJJ Ganancias 2024.pdf", type: "tax_return", uploadedAt: "2025-01-08" },
      { id: "f9", name: "Registro Importador.pdf", type: "other", uploadedAt: "2024-01-08" },
      { id: "f10", name: "Balance 2024.pdf", type: "other", uploadedAt: "2025-01-10" },
      { id: "f11", name: "DDJJ Bienes Personales Socios.pdf", type: "tax_return", uploadedAt: "2024-06-30" },
    ],
    impactHistory: [
      {
        id: "i4",
        normativaId: "ley-27743",
        regulationTitle: "Ley 27.743 — Medidas Fiscales Paliativas y Relevantes",
        articuloRef: "Título II",
        date: "2024-07-08",
        impact: "high",
        summary: "El REIBP (Régimen Especial de Ingreso de Bienes Personales) permite a los socios de Importadora Del Sur regularizar su situación pagando 0,45% sobre bienes al 31/12/2023 y quedar eximidos hasta 2027.",
        suggestedAction: "Evaluar adhesión de socios al REIBP. Beneficio: exención de Bienes Personales 2023-2027. El plazo de adhesión venció 30/09/2024 - verificar si hubo prórrogas.",
        citaTextual: "Los contribuyentes que adhieran quedan eximidos del impuesto por los períodos fiscales 2023 a 2027. Alícuota: 0,45% sobre bienes en el país.",
      },
      {
        id: "i4b",
        normativaId: "ley-27743",
        regulationTitle: "Ley 27.743 — Medidas Fiscales Paliativas y Relevantes",
        articuloRef: "Título III",
        date: "2024-07-08",
        impact: "medium",
        summary: "El Régimen de Regularización de Activos (Blanqueo) permite exteriorizar bienes en el exterior. Relevante para operaciones de comercio exterior de la empresa.",
        suggestedAction: "Revisar si existen activos en el exterior no declarados. Alícuota del blanqueo varía según etapa (5% a 15%).",
        citaTextual: "Permite exteriorizar bienes y tenencias no declaradas. Monto mínimo exento hasta USD 100.000.",
      },
    ],
    createdAt: "2024-01-08",
    lastAnalysis: "2025-01-15",
  },
  {
    id: "5",
    name: "Laura Gómez",
    cuit: "27-32145678-9",
    category: "Monotributo",
    subcategory: "Categoría D",
    tipoActividad: "Servicios",
    ingresosBrutosAnuales: 15500000, // Near D limit
    superficieAfectada: 60,
    energiaElectrica: 7500,
    industry: "Consultoría",
    files: [
      { id: "f12", name: "Constancia Monotributo.pdf", type: "tax_return", uploadedAt: "2025-01-10" },
    ],
    impactHistory: [
      {
        id: "i5",
        normativaId: "rg-afip-5614",
        regulationTitle: "RG AFIP 5614/2025 — Actualización de categorías Monotributo",
        articuloRef: "Art. 1°",
        date: "2025-01-15",
        impact: "medium",
        summary: "Con la actualización de la RG 5614, el tope de Categoría D subió a $27.790.000 (antes $16.450.000). Laura con $15.5M puede considerar bajar a Categoría C ($22.37M) ahorrando en cuota.",
        suggestedAction: "Evaluar recategorización a Cat. C. Nuevo tope C: $22.37M vs sus $15.5M de ingresos. Ahorro potencial en cuota mensual.",
        deadline: "2025-02-20",
        citaTextual: "Categoría C: Hasta $22.370.000. Categoría D: Hasta $27.790.000. Vigencia: 1° de enero de 2025.",
      },
      {
        id: "i5b",
        normativaId: "ley-24977",
        regulationTitle: "Ley 24.977 — Régimen Simplificado para Pequeños Contribuyentes",
        articuloRef: "Art. 39°",
        date: "2025-01-15",
        impact: "low",
        summary: "Las cotizaciones previsionales se actualizaron. Para Cat. D, el aporte a Obra Social es $27.726 mensuales según RG 5614.",
        suggestedAction: "Verificar que el débito automático refleje las nuevas cotizaciones previsionales actualizadas.",
        citaTextual: "Aporte a Obra Social - Cat. D: $27.726 mensuales.",
      },
    ],
    createdAt: "2024-09-01",
    lastAnalysis: "2025-01-18",
  },
]

// Generate Regulations from normativas.ts - Single source of truth
export const mockRegulations: Regulation[] = normativas.map((norm: NormativaDoc) => {
  // Count how many clients are affected by this normativa
  const affectedCount = mockClients.filter(client => 
    client.impactHistory.some(impact => impact.normativaId === norm.id)
  ).length

  return {
    id: norm.id,
    title: norm.title,
    source: norm.source,
    date: norm.fecha,
    topic: norm.topic,
    summary: norm.articulos.slice(0, 2).map(a => a.titulo).join(". ") + ".",
    affectedClientCount: affectedCount,
    url: norm.url,
    articulos: norm.articulos,
  }
})

// Generate Alerts from client impact history - citing real normativas
export const mockAlerts: Alert[] = [
  {
    id: "a1",
    clientId: "2",
    clientName: "María Fernández",
    normativaId: "rg-afip-5614",
    regulationTitle: "RG AFIP 5614/2025",
    articuloRef: "Art. 1° y Art. 2°",
    impact: "high",
    message: "La RG 5614 actualizó los topes y cuotas del Monotributo. María (Cat. H Servicios) debe pagar la nueva cuota de $372.220 desde enero 2025.",
    suggestedAction: "Actualizar débito automático con la nueva cuota de $372.220 (antes $220.000). Verificar recategorización semestral antes del 20/02/2025.",
    deadline: "2025-02-20",
    createdAt: "2025-01-16",
    isRead: false,
    citaTextual: "Categoría H Servicios: $372.220 mensuales. Los contribuyentes deben recategorizarse con efectos desde febrero 2025.",
  },
  {
    id: "a2",
    clientId: "3",
    clientName: "Martín Rodríguez",
    normativaId: "rg-afip-5614",
    regulationTitle: "RG AFIP 5614/2025",
    articuloRef: "Art. 1°",
    impact: "high",
    message: "URGENTE: Martín con $95M de ingresos superaba el viejo tope K ($68M) pero el nuevo tope es $114.89M. Evita exclusión del Monotributo gracias a la RG 5614.",
    suggestedAction: "Confirmar permanencia en Monotributo Cat. K. Monitorear facturación mensual para no superar el nuevo tope de $114.890.000.",
    createdAt: "2025-01-16",
    isRead: false,
    citaTextual: "Categoría K: Hasta $114.890.000 de ingresos brutos anuales.",
  },
  {
    id: "a3",
    clientId: "1",
    clientName: "García & Asociados SRL",
    normativaId: "ley-27743",
    regulationTitle: "Ley 27.743 — Paquete Fiscal 2024",
    articuloRef: "Título I",
    impact: "medium",
    message: "La Ley 27.743 restableció Ganancias 4ta categoría. Los empleados de García & Asociados con sueldos superiores al MNI deben tributar nuevamente.",
    suggestedAction: "Recalcular retenciones de Ganancias para empleados. Notificar al área de RRHH sobre la restitución del impuesto.",
    createdAt: "2024-07-10",
    isRead: true,
    citaTextual: "Se reintroduce el mínimo no imponible y las escalas progresivas para empleados en relación de dependencia.",
  },
  {
    id: "a4",
    clientId: "4",
    clientName: "Importadora Del Sur SA",
    normativaId: "ley-27743",
    regulationTitle: "Ley 27.743 — Paquete Fiscal 2024",
    articuloRef: "Título II",
    impact: "medium",
    message: "El REIBP permite a los socios quedar eximidos de Bienes Personales hasta 2027 pagando 0,45% sobre bienes al 31/12/2023.",
    suggestedAction: "Evaluar si los socios adhirieron al REIBP antes del vencimiento. Verificar estado de la adhesión.",
    createdAt: "2024-07-12",
    isRead: true,
    citaTextual: "Alícuota: 0,45% sobre bienes en el país. Exención de Bienes Personales períodos 2023-2027.",
  },
  {
    id: "a5",
    clientId: "5",
    clientName: "Laura Gómez",
    normativaId: "rg-afip-5614",
    regulationTitle: "RG AFIP 5614/2025",
    articuloRef: "Art. 1°",
    impact: "low",
    message: "Laura podría optimizar su situación fiscal. Con $15.5M de ingresos y el nuevo tope de Cat. C en $22.37M, podría bajar de categoría y ahorrar en cuota.",
    suggestedAction: "Analizar recategorización de Cat. D a Cat. C. Comparar cuotas y verificar cumplimiento de parámetros físicos.",
    deadline: "2025-02-20",
    createdAt: "2025-01-18",
    isRead: false,
    citaTextual: "Categoría C: Hasta $22.370.000. Categoría D: Hasta $27.790.000.",
  },
]

// Dashboard summary stats - computed from actual data
export const dashboardStats = {
  newRegulations: normativas.length,
  affectedClients: mockClients.filter(c => c.impactHistory.length > 0).length,
  pendingActions: mockAlerts.filter(a => !a.isRead && a.deadline).length,
  lastSync: "2025-01-20T10:30:00Z",
}

// Helper function to get source badge color
export function getSourceColor(source: Regulation["source"]): string {
  switch (source) {
    case "AFIP":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "INFOLEG":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
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

// Helper function to get normativa by ID
export function getNormativaById(id: string): NormativaDoc | undefined {
  return normativas.find(n => n.id === id)
}

// Helper function to get category limits from normativas
export function getCategoryLimits(categoria: string): { ingresos: number; cuotaServicios: number; cuotaBienes: number } | null {
  const rg5614 = normativas.find(n => n.id === "rg-afip-5614")
  if (!rg5614) return null
  
  // Parse from Art. 1° texto
  const limitsMap: Record<string, { ingresos: number; cuotaServicios: number; cuotaBienes: number }> = {
    "A": { ingresos: 10900000, cuotaServicios: 5072, cuotaBienes: 5072 },
    "B": { ingresos: 15950000, cuotaServicios: 9636, cuotaBienes: 9636 },
    "C": { ingresos: 22370000, cuotaServicios: 16572, cuotaBienes: 15222 },
    "D": { ingresos: 27790000, cuotaServicios: 27072, cuotaBienes: 25206 },
    "E": { ingresos: 32680000, cuotaServicios: 50760, cuotaBienes: 40272 },
    "F": { ingresos: 40970000, cuotaServicios: 71388, cuotaBienes: 52452 },
    "G": { ingresos: 49010000, cuotaServicios: 129912, cuotaBienes: 64980 },
    "H": { ingresos: 74420000, cuotaServicios: 372220, cuotaBienes: 186110 },
    "I": { ingresos: 83210000, cuotaServicios: 739938, cuotaBienes: 295975 },
    "J": { ingresos: 95310000, cuotaServicios: 888225, cuotaBienes: 355290 },
    "K": { ingresos: 114890000, cuotaServicios: 1243515, cuotaBienes: 414505 },
  }
  
  return limitsMap[categoria] || null
}
