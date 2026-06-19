"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquareText, X, Send, Bot } from "lucide-react";
import {
  WELCOME,
  getResponse,
  matchFreeText,
  type QuickReply,
} from "@/lib/chatbot";
import { COMPANY } from "@/lib/constants";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  quickReplies?: QuickReply[];
}

let messageId = 0;
const nextId = () => ++messageId;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
    if (startedRef.current) return;

    startedRef.current = true;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages([
        {
          id: nextId(),
          sender: "bot",
          text: WELCOME.text,
          quickReplies: WELCOME.quickReplies,
        },
      ]);
    }, 700);
  };

  const pushUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text },
    ]);
  };

  const pushBotResponse = (text: string, quickReplies?: QuickReply[]) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), sender: "bot", text, quickReplies },
      ]);
    }, 650);
  };

  const handleQuickReply = (reply: QuickReply) => {
    pushUserMessage(reply.label);

    // Special actions
    if (reply.id === "whatsapp") {
      const resp = getResponse("whatsapp");
      pushBotResponse(resp.text, resp.quickReplies);
      window.open(
        `https://wa.me/${COMPANY.whatsapp}?text=Hello%20Elfakal%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.`,
        "_blank"
      );
      return;
    }
    if (reply.id === "goto-contact") {
      pushBotResponse(
        "Opening our contact form now. Our team will respond within 24 hours!",
        [{ id: "menu", label: "Main Menu" }]
      );
      setTimeout(() => {
        window.location.href = "/contact";
      }, 800);
      return;
    }

    const resp = getResponse(reply.id);
    pushBotResponse(resp.text, resp.quickReplies);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    pushUserMessage(text);
    setInput("");
    const resp = matchFreeText(text);
    pushBotResponse(resp.text, resp.quickReplies);
  };

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-md transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[34rem] max-h-[70vh]">
          {/* Header */}
          <div className="hero-gradient px-5 py-4 flex items-center gap-3 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
            <div className="relative w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center">
              <Bot size={22} className="text-gold" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-navy" />
            </div>
            <div className="relative flex-1">
              <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-plus-jakarta)]">
                Elfa — Elfakal Assistant
              </h3>
              <p className="text-gray-300 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Online now
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="relative text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50"
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-2 shrink-0 self-end">
                      <Bot size={16} className="text-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-blue text-white rounded-2xl rounded-br-md"
                        : "bg-white text-gray-700 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Quick replies */}
                {msg.sender === "bot" && msg.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-10">
                    {msg.quickReplies.map((reply) => (
                      <button
                        key={reply.id}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs font-medium px-3.5 py-2 bg-white text-blue border border-blue/30 rounded-full hover:bg-blue hover:text-white transition-colors"
                      >
                        {reply.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center mr-2 shrink-0">
                  <Bot size={16} className="text-gold" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue text-white rounded-full flex items-center justify-center hover:bg-blue-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-blue text-white rounded-full flex items-center justify-center shadow-lg shadow-blue/40 hover:scale-110 transition-transform duration-300"
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? (
          <X size={26} />
        ) : (
          <>
            <MessageSquareText size={26} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </>
  );
}
