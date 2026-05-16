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

  return `Sos NormaAI, asistente del contador. Español argentino, breve y directo.

REGLAS:
- Respuestas MUY cortas, 1-2 oraciones máximo
- NO uses negritas (**texto**), NO uses emojis
- Usá guiones (-) para listas simples si hace falta
- Para más detalles, indicá la sección de la app: Clientes, Normativas, o Informes
- Solo usá la info de abajo, no inventes

CLIENTES:
${clientesTexto}

NORMATIVAS:
${normativasTexto}

EJEMPLOS:
- "Tenés 3 alertas hoy. 2 de María, 1 de Carlos."
- "RG 5614/2025 actualizó topes de Monotributo. Más info en Normativas."
- "María podría necesitar recategorización. Revisá su ficha en Clientes."`
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
