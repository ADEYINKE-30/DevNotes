import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

const ChatInput = ({ onSend, disabled, placeholder = "Ask anything..." }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? (
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-white delay-100" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-white delay-200" />
          </span>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
};

export default ChatInput;
