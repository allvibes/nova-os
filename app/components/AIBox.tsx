'use client'

import { useState, useRef, useEffect, useCallback } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AIBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "Generate proposal",
    "Improve my pitch",
    "Summarize client brief",
  ];

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = useCallback(async (customPrompt?: string) => {
    const promptToSend = customPrompt || input;

    if (!promptToSend.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: promptToSend,
    };

    // ✅ Add user message (with limit)
    setMessages((prev) => [...prev.slice(-11), userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt: promptToSend }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "ai",
        content: data.result,
      };

      // ✅ Add AI response (with limit)
      setMessages((prev) => [...prev.slice(-11), aiMessage]);

    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(-11),
        { role: "ai", content: "⚠️ Something went wrong." },
      ]);
    }

    setLoading(false);
  }, [input]);

  return (
    <div className="nova-card p-6 flex flex-col h-[500px]">

      {/* 💬 CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 nova-scrollbar">

        {messages.length === 0 && (
          <div className="space-y-4">

            <div className="text-sm text-gray-500">
              NOVA helps you write, think, and execute faster.
            </div>

            {/* 💡 SUGGESTIONS */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((text, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (loading) return;
                    setInput(text);
                    setTimeout(() => handleAsk(text), 100);
                  }}
                  className="
                    px-3 py-1.5
                    text-xs
                    rounded-full
                    bg-white/5
                    border border-white/10
                    text-gray-300
                    hover:bg-white/10
                    hover:scale-[1.03]
                    transition
                  "
                >
                  {text}
                </button>
              ))}
            </div>

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
          onClick={() => handleAsk()}
          disabled={loading}
          className="
            nova-btn-primary
            px-5 py-3
            rounded-xl
            text-sm font-medium
            active:scale-95
            disabled:opacity-50
          "
        >
          {loading ? "..." : messages.length === 0 ? "Generate" : "Send"}
        </button>

      </div>

    </div>
  );
}