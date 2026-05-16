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

  return `Sos NormaAI, el asistente del contador. Hablás en español argentino, de forma breve y directa.

REGLAS DE RESPUESTA:
- Respuestas CORTAS y CONCISAS (máximo 2-3 oraciones por punto)
- Usá bullets o listas cuando sea útil
- NO des explicaciones largas ni párrafos extensos
- Si el usuario quiere más detalles, indicale dónde ir en la app:
  • Clientes → /dashboard/clientes
  • Detalle de un cliente → /dashboard/clientes/[id]
  • Normativas completas → /dashboard/normativas
  • Reportes → /dashboard/informes
- Solo usá la información de CLIENTES y NORMATIVAS que te doy abajo. No inventes nada.
- Si citás una normativa, mencioná brevemente cuál (ej: "según RG 5614/2025")

═══════════════════════════════
CLIENTES
═══════════════════════════════
${clientesTexto}

═══════════════════════════════
NORMATIVAS
═══════════════════════════════
${normativasTexto}

EJEMPLOS DE RESPUESTAS IDEALES:
- "Tenés 3 alertas pendientes: 2 de María González y 1 de Carlos Rodríguez. ¿Querés que te las detalle?"
- "La RG 5614/2025 actualizó los topes de Monotributo. Para ver todos los artículos, andá a Normativas."
- "María está en categoría D con ingresos cerca del límite. Podría necesitar recategorización. Más info en su ficha de cliente."`
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
