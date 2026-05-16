import { streamText } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { mockClients } from "@/lib/mock-data"
import { buildRAGContext } from "@/lib/normativas"

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

═══════════════════════════════
CLIENTES DEL ESTUDIO
═══════════════════════════════
${clientesTexto}

═══════════════════════════════
NORMATIVAS VIGENTES
═══════════════════════════════
${normativasTexto}`
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: gateway("anthropic/claude-sonnet-4-20250514"),
    system: buildSystemPrompt(),
    messages,
  })

  return result.toDataStreamResponse()
}
