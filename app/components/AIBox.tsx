'use client'

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AIBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "ai",
        content: data.result,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="nova-card p-6 flex flex-col h-[500px]">

      {/* 💬 CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 nova-scrollbar">

        {messages.length === 0 && (
          <div className="text-sm text-gray-500">
            Start a conversation with NOVA AI...
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[70%]
                px-4 py-3
                rounded-2xl
                text-sm
                leading-relaxed
                ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-surface border border-white/10 text-gray-300"
                }
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* loading state */}
        {loading && (
          <div className="text-sm text-gray-400 animate-pulse">
            NOVA is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ✏️ INPUT AREA */}
      <div className="mt-4 flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask NOVA anything..."
          className="nova-input flex-1 px-4 py-3"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="
            nova-btn-primary
            px-5 py-3
            rounded-xl
            text-sm font-medium
            disabled:opacity-50
          "
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

    </div>
  );
}