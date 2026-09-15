import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAIChat } from "../../hooks/useAIChat";
import { aiService } from "../../services/aiService";
import type { AISuggestion } from "../../services/aiService";

interface AIChatProps {
  isFullPage?: boolean;
  onClose?: () => void;
}

const AIChat = ({ isFullPage = false, onClose }: AIChatProps) => {
  const { messages, isTyping, sendMessage, clearMessages } = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestions = aiService.getSuggestions();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const containerClasses = isFullPage
    ? "mx-auto max-w-3xl px-6 py-12"
    : "fixed bottom-24 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl";

  const headerClasses = isFullPage
    ? "mb-6"
    : "flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-4 py-3";

  const messagesClasses = isFullPage
    ? "flex-1 space-y-4"
    : "flex-1 space-y-4 overflow-y-auto p-4";

  if (isFullPage) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Assistant</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Ask me anything about web development!
          </p>
        </div>

        <div className="flex h-[600px] flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm">
                🤖
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">DevNotes AI</span>
            </div>
            <button
              onClick={clearMessages}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              Clear chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length <= 1 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s: AISuggestion) => (
                    <button
                      key={s.id}
                      onClick={() => sendMessage(s.text)}
                      className="rounded-full border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 text-xs text-purple-700 dark:text-purple-300 transition hover:bg-purple-100 dark:hover:bg-purple-900/30"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500 delay-100" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500 delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
      </section>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={headerClasses}>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm">
            🤖
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearMessages}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            title="Clear chat"
          >
            ✕
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className={messagesClasses}>
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Suggested
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((s: AISuggestion) => (
                <button
                  key={s.id}
                  onClick={() => sendMessage(s.text)}
                  className="rounded-full border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 text-xs text-purple-700 dark:text-purple-300 transition hover:bg-purple-100 dark:hover:bg-purple-900/30"
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500 delay-100" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500 delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={isTyping} placeholder="Ask about React, TypeScript..." />
    </div>
  );
};

export default AIChat;
