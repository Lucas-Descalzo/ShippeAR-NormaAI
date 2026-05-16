"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat",
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
          style={{ width: "400px", height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: "#1B2A4A" }}>
            <div>
              <h3 className="font-semibold">NormaAI Asistente</h3>
              <p className="text-xs text-white/70">Consultá sobre tus clientes y normativas</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar chat</span>
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-sm text-muted-foreground italic px-6">
                  Hola, soy tu asistente NormaAI. Podés preguntarme sobre tus clientes, normativas vigentes o cualquier duda fiscal.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                      message.role === "user"
                        ? "ml-auto text-white"
                        : "mr-auto bg-muted text-foreground"
                    )}
                    style={message.role === "user" ? { backgroundColor: "#2D7DD2" } : undefined}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mr-auto max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    <span className="animate-pulse">Analizando...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="¿Qué necesitás consultar?"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !input.trim()}
                style={{ backgroundColor: "#2D7DD2" }}
                className="hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: "#1B2A4A" }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Asistente</span>
      </button>
    </>
  )
}
