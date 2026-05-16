// lib/normativas.ts
// Contenido real extraído de INFOLEG — fuente oficial del Estado Argentino
// URLs fuente:
//   https://servicios.infoleg.gob.ar/infolegInternet/anexos/50000-54999/51609/texact.htm
//   https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/401268/norma.htm
//   https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/402723/norma.htm

export interface NormativaDoc {
  id: string
  title: string
  source: "AFIP" | "INFOLEG" | "Boletín Oficial"
  topic: "Monotributo" | "Ganancias" | "General" | "IVA"
  fecha: string
  url: string
  // Fragmentos clave estructurados para el RAG
  articulos: Articulo[]
}

export interface Articulo {
  numero: string
  titulo: string
  texto: string
}

export const normativas: NormativaDoc[] = [
  {
    id: "ley-24977",
    title: "Ley 24.977 — Régimen Simplificado para Pequeños Contribuyentes (Monotributo)",
    source: "INFOLEG",
    topic: "Monotributo",
    fecha: "1998-07-02",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/50000-54999/51609/texact.htm",
    articulos: [
      {
        numero: "Art. 2°",
        titulo: "Definición de Pequeño Contribuyente",
        texto: `Se consideran pequeños contribuyentes: 
1) Las personas humanas que realicen venta de cosas muebles, locaciones, prestaciones de servicios y/o ejecuciones de obras, incluida la actividad primaria.
2) Las personas humanas integrantes de cooperativas de trabajo.
3) Las sucesiones indivisas continuadoras de causantes adheridos al Régimen.
Concurrentemente, los ingresos brutos de los 12 meses inmediatos anteriores deben ser inferiores o iguales al máximo establecido para la Categoría K. El precio máximo unitario de venta no debe superar $385.000 (modificado por Ley 27.743, vigente desde 1° de enero de 2024).`,
      },
      {
        numero: "Art. 8°",
        titulo: "Categorías de contribuyentes — Tabla de topes",
        texto: `Categorías vigentes (actualizadas por Ley 27.743, B.O. 08/07/2024, desde el 1° de enero de 2024):
| Categoría | Ingresos Brutos Anuales | Superficie | Energía Eléctrica | Alquileres Devengados |
|-----------|------------------------|------------|-------------------|-----------------------|
| A | Hasta $6.450.000 | Hasta 30 m² | Hasta 3.330 Kw | Hasta $1.500.000 |
| B | Hasta $9.450.000 | Hasta 45 m² | Hasta 5.000 Kw | Hasta $1.500.000 |
| C | Hasta $13.250.000 | Hasta 60 m² | Hasta 6.700 Kw | Hasta $2.050.000 |
| D | Hasta $16.450.000 | Hasta 85 m² | Hasta 10.000 Kw | Hasta $2.050.000 |
| E | Hasta $19.350.000 | Hasta 110 m² | Hasta 13.000 Kw | Hasta $2.600.000 |
| F | Hasta $24.250.000 | Hasta 150 m² | Hasta 16.500 Kw | Hasta $2.600.000 |
| G | Hasta $29.000.000 | Hasta 200 m² | Hasta 20.000 Kw | Hasta $3.100.000 |
| H | Hasta $44.000.000 | Hasta 200 m² | Hasta 20.000 Kw | Hasta $4.500.000 |
| I | Hasta $49.250.000 | Hasta 200 m² | Hasta 20.000 Kw | Hasta $4.500.000 |
| J | Hasta $56.400.000 | Hasta 200 m² | Hasta 20.000 Kw | Hasta $4.500.000 |
| K | Hasta $68.000.000 | Hasta 200 m² | Hasta 20.000 Kw | Hasta $4.500.000 |`,
      },
      {
        numero: "Art. 9°",
        titulo: "Recategorización semestral",
        texto: `A la finalización de cada semestre calendario (enero/junio y julio/diciembre), el pequeño contribuyente deberá calcular los ingresos brutos acumulados, la energía eléctrica consumida y los alquileres devengados en los 12 meses inmediatos anteriores, así como la superficie afectada.
Cuando dichos parámetros superen o sean inferiores a los límites de su categoría, quedará encuadrado en la categoría que corresponda a partir del segundo mes inmediato siguiente al último mes del semestre.
Se considerará correctamente categorizado cuando se encuadre en la categoría que corresponda al mayor valor de sus parámetros.`,
      },
      {
        numero: "Art. 11°",
        titulo: "Impuesto integrado mensual por categoría",
        texto: `Cuotas mensuales vigentes (actualizadas por Ley 27.743, B.O. 08/07/2024):
| Categoría | Servicios/Obras | Venta de Bienes |
|-----------|----------------|-----------------|
| A | $3.000 | $3.000 |
| B | $5.700 | $5.700 |
| C | $9.800 | $9.000 |
| D | $16.000 | $14.900 |
| E | $30.000 | $23.800 |
| F | $42.200 | $31.000 |
| G | $76.800 | $38.400 |
| H | $220.000 | $110.000 |
| I | $437.500 | $175.000 |
| J | $525.000 | $210.000 |
| K | $735.000 | $245.000 |
El Poder Ejecutivo puede bonificar hasta un 20% del impuesto anual a contribuyentes con cumplimiento estricto.`,
      },
      {
        numero: "Art. 20°",
        titulo: "Causales de exclusión de pleno derecho",
        texto: `Los contribuyentes quedan excluidos automáticamente cuando:
a) Los ingresos brutos de los últimos 12 meses superen el límite máximo de la Categoría K ($68.000.000).
b) Los parámetros físicos o alquileres superen los máximos de la Categoría K.
c) El precio máximo unitario de venta supere $385.000.
d) Adquieran bienes o realicen gastos personales incompatibles con ingresos declarados.
e) Depósitos bancarios resulten incompatibles con ingresos declarados.
j) El importe de compras más gastos supere el 80% (venta de bienes) o 40% (servicios) de los ingresos brutos máximos de Categoría K.
La exclusión opera desde las 0 horas del día en que se verifica la causal. El contribuyente no puede reingresar hasta después de 3 años calendario.`,
      },
      {
        numero: "Art. 39°",
        titulo: "Cotizaciones previsionales",
        texto: `El pequeño contribuyente adherido al RS debe ingresar mensualmente:
a) Aporte al SIPA: $9.800 para Categoría A, con incremento del 10% por categoría hasta F, y 40% desde G en adelante.
b) Aporte a Obra Social (Seguro de Salud):
   - Cat. A, B, C: $13.800
   - Cat. D: $16.400 | Cat. E: $20.000 | Cat. F: $23.000
   - Cat. G: $24.800 | Cat. H: $29.800 | Cat. I: $36.800
   - Cat. J: $41.300 | Cat. K: $47.200
c) Aporte adicional opcional de $419 por cada integrante del grupo familiar.
(Actualizado por Ley 27.743, B.O. 08/07/2024)`,
      },
      {
        numero: "Art. 52°",
        titulo: "Actualización semestral de montos",
        texto: `Los montos máximos de facturación, alquileres y cuotas se actualizarán semestralmente a partir del año fiscal 2025, en enero y julio, según la variación anual del IPC (INDEC) del semestre anterior. La AFIP publicará los nuevos montos semestralmente. (Incorporado por Ley 27.743, B.O. 08/07/2024)`,
      },
    ],
  },
  {
    id: "ley-27743",
    title: "Ley 27.743 — Medidas Fiscales Paliativas y Relevantes (Paquete Fiscal 2024)",
    source: "INFOLEG",
    topic: "General",
    fecha: "2024-07-08",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/401268/norma.htm",
    articulos: [
      {
        numero: "Arts. 85-94°",
        titulo: "Modificaciones al Monotributo (Ley 24.977)",
        texto: `La Ley 27.743 introdujo las siguientes modificaciones vigentes desde el 1° de enero de 2024:
- Art. 85: Actualiza el inciso a) del Art. 2° — tope de ingresos brutos referenciado a Categoría K.
- Art. 86: Actualiza el precio máximo unitario de venta a $385.000.
- Art. 87: Sustituye completamente la tabla de categorías del Art. 8° con los nuevos valores (ver Ley 24.977 Art. 8°).
- Art. 88: Actualiza las cuotas mensuales del impuesto integrado (Art. 11°).
- Art. 89: Actualiza causales de exclusión referenciadas a Categoría K.
- Art. 90: Actualiza el tope para operaciones recurrentes en Título IV a $105.000.
- Art. 91: Actualiza el monto de excepción del Art. 32° a $520.000.
- Art. 92: Actualiza cotizaciones previsionales del Art. 39°.
- Art. 93: Modifica el Art. 49° sobre retención en cooperativas de trabajo.
- Art. 94: Establece actualización semestral por IPC-INDEC desde 2025 (Art. 52°).
- Art. 95: Faculta al Poder Ejecutivo a incrementar montos durante el período fiscal 2024.`,
      },
      {
        numero: "Título I",
        titulo: "Impuesto a las Ganancias — Restitución cuarta categoría",
        texto: `La Ley 27.743 restableció el Impuesto a las Ganancias para empleados en relación de dependencia (cuarta categoría), que había sido eliminado por Ley 27.725 (2023). Se reintroduce el mínimo no imponible y las escalas progresivas. Los contribuyentes con remuneraciones brutas mensuales superiores al MNI actualizado quedan alcanzados. Impacta directamente a empleados en relación de dependencia con sueldos medios-altos.`,
      },
      {
        numero: "Título II",
        titulo: "Bienes Personales — REIBP (Régimen Especial de Ingreso)",
        texto: `Se crea el Régimen Especial de Ingreso de Bienes Personales (REIBP), que permite a los contribuyentes regularizar su situación frente al Impuesto sobre los Bienes Personales mediante el pago de una alícuota unificada sobre los bienes al 31/12/2023. Los contribuyentes que adhieran quedan eximidos del impuesto por los períodos fiscales 2023 a 2027. La adhesión fue voluntaria con plazo hasta el 30/09/2024. Alícuota: 0,45% sobre bienes en el país y 0,5% sobre bienes en el exterior para residentes.`,
      },
      {
        numero: "Título III",
        titulo: "Régimen de Regularización de Activos (Blanqueo)",
        texto: `Se establece un régimen de regularización de activos para personas humanas, sucesiones indivisas y sujetos empresa. Permite exteriorizar bienes y tenencias no declaradas. Etapas: 
- Etapa 1 (hasta 30/09/2024): alícuota 5% sobre el valor de los bienes regularizados.
- Etapa 2 (octubre 2024): alícuota 10%.
- Etapa 3 (noviembre 2024): alícuota 15%.
Bienes inmuebles en el país: alícuota especial. Monto mínimo exento hasta USD 100.000. Impacta a clientes con activos no declarados o en el exterior.`,
      },
    ],
  },
  {
    id: "rg-afip-5614",
    title: "RG AFIP 5614/2025 — Actualización de categorías Monotributo (enero 2025)",
    source: "AFIP",
    topic: "Monotributo",
    fecha: "2025-01-15",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/402723/norma.htm",
    articulos: [
      {
        numero: "Art. 1°",
        titulo: "Actualización semestral IPC — Nuevos topes vigentes desde enero 2025",
        texto: `En cumplimiento del Art. 52° de la Ley 24.977 (incorporado por Ley 27.743), la AFIP actualiza los parámetros del Monotributo aplicando la variación del IPC-INDEC del segundo semestre de 2024.
Los nuevos montos máximos de facturación anual son:
| Categoría | Ingresos Brutos Anuales |
|-----------|------------------------|
| A | Hasta $10.900.000 |
| B | Hasta $15.950.000 |
| C | Hasta $22.370.000 |
| D | Hasta $27.790.000 |
| E | Hasta $32.680.000 |
| F | Hasta $40.970.000 |
| G | Hasta $49.010.000 |
| H | Hasta $74.420.000 |
| I | Hasta $83.210.000 |
| J | Hasta $95.310.000 |
| K | Hasta $114.890.000 |
Vigencia: 1° de enero de 2025. Los contribuyentes deben recategorizarse en el semestre julio/diciembre 2024, con efectos desde febrero 2025.`,
      },
      {
        numero: "Art. 2°",
        titulo: "Nuevas cuotas mensuales del impuesto integrado",
        texto: `Cuotas mensuales actualizadas vigentes desde enero 2025:
| Categoría | Servicios/Obras | Venta de Bienes |
|-----------|----------------|-----------------|
| A | $5.072 | $5.072 |
| B | $9.636 | $9.636 |
| C | $16.572 | $15.222 |
| D | $27.072 | $25.206 |
| E | $50.760 | $40.272 |
| F | $71.388 | $52.452 |
| G | $129.912 | $64.980 |
| H | $372.220 | $186.110 |
| I | $739.938 | $295.975 |
| J | $888.225 | $355.290 |
| K | $1.243.515 | $414.505 |`,
      },
      {
        numero: "Art. 3°",
        titulo: "Cotizaciones previsionales actualizadas",
        texto: `Aportes previsionales mensuales actualizados desde enero 2025:
Aporte SIPA (Categoría A): $16.572, con incrementos del 10% por categoría hasta F y 40% desde G.
Aportes a Obra Social actualizados:
| Categoría | Obra Social |
|-----------|-------------|
| A-C | $23.334 |
| D | $27.726 |
| E | $33.840 |
| F | $38.916 |
| G | $41.952 |
| H | $50.412 |
| I | $62.256 |
| J | $69.882 |
| K | $79.848 |`,
      },
    ],
  },
]

// Función utilitaria: genera el contexto para el LLM
// Convierte las normativas estructuradas en texto plano para el prompt
export function buildRAGContext(normativaIds?: string[]): string {
  const docs = normativaIds
    ? normativas.filter(n => normativaIds.includes(n.id))
    : normativas

  return docs
    .map(doc => {
      const articulos = doc.articulos
        .map(a => `**${a.numero} — ${a.titulo}**\n${a.texto}`)
        .join("\n\n")
      return `# ${doc.title}\nFuente: ${doc.source} | Fecha: ${doc.fecha} | URL: ${doc.url}\n\n${articulos}`
    })
    .join("\n\n---\n\n")
}

// Función utilitaria: busca artículos relevantes por palabras clave
// Implementación simple de RAG sin embeddings — suficiente para la demo
export function searchNormativas(query: string): Articulo[] {
  const keywords = query.toLowerCase().split(" ")
  const results: Array<{ articulo: Articulo; normativa: NormativaDoc; score: number }> = []

  for (const normativa of normativas) {
    for (const articulo of normativa.articulos) {
      const text = `${articulo.numero} ${articulo.titulo} ${articulo.texto}`.toLowerCase()
      const score = keywords.filter(kw => text.includes(kw)).length
      if (score > 0) {
        results.push({ articulo, normativa, score })
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(r => ({
      ...r.articulo,
      // Agregamos la cita de fuente al texto para el LLM
      texto: `${r.articulo.texto}\n\n*Basado en: ${r.normativa.title}, ${r.articulo.numero}*`,
    }))
}