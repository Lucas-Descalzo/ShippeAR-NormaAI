import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai"
import { mockClients } from "@/lib/mock-data"
import { buildRAGContext } from "@/lib/normativas"

export const maxDuration = 30

function buildSystemPrompt() {
  const clientesTexto = mockClients
    .map(c => {
      const alertas = c.impactHistory
        .map(i => `  - [${i.impact.toUpperCase()}] ${i.regulationTitle} (${i.articuloRef}): ${i.summary} Acción: ${i.suggestedAction ?? "—"}${i.deadline ? ` | Vencimiento: ${i.deadline}` : ""}`)
        .join("\n")
      return `Cliente: ${c.name} | CUIT: ${c.cuit} | Régimen: ${c.category}${c.subcategory ? " " + c.subcategory : ""} | Actividad: ${c.industry ?? "—"} | Ingresos anuales: $${c.ingresosBrutosAnuales?.toLocaleString("es-AR") ?? "—"}
Alertas activas:
${alertas}`
    })
    .join("\n\n")

  const normativasTexto = buildRAGContext()

  return `Sos NormaAI, asistente fiscal inteligente para contadores públicos argentinos.
Tenés acceso exclusivo a los datos del estudio contable del usuario autenticado.
Respondé siempre en español rioplatense, de forma precisa y profesional.
Cuando uses información de una normativa, citá la fuente. Formato: "Basado en: RG AFIP 5614/2025, Art. 1°".
Si no tenés información suficiente para responder con certeza, decilo claramente. No inventes datos ni normativas.

IMPORTANTE: Solo podés responder usando la información de CLIENTES y NORMATIVAS que te proporciono abajo. No inventes información.

═══════════════════════════════
CLIENTES DEL ESTUDIO
═══════════════════════════════
${clientesTexto}

═══════════════════════════════
NORMATIVAS VIGENTES
═══════════════════════════════
${normativasTexto}

═══════════════════════════════
INSTRUCCIONES ADICIONALES
═══════════════════════════════
- Si te preguntan por el "resumen del día", listá las alertas pendientes de los clientes.
- Si te preguntan por "cambios" o "actualizaciones", enfocate en la RG AFIP 5614/2025.
- Siempre citá el artículo específico de la normativa.
- Usá formato de moneda argentina ($X.XXX.XXX).`
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4-20250514",
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
