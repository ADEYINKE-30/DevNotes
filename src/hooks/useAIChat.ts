import { useState, useCallback, useRef } from "react";
import type { ChatMessage } from "../services/aiService";
import { aiService } from "../services/aiService";

interface UseAIChatReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export const useAIChat = (): UseAIChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI learning assistant. Ask me anything about web development!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const abortRef = useRef<boolean>(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || abortRef.current) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await aiService.sendMessage(content, conversationId);
      setConversationId(response.conversationId);
      setMessages((prev) => [...prev, response.message]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [conversationId]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI learning assistant. Ask me anything about web development!",
        timestamp: new Date(),
      },
    ]);
    setConversationId(undefined);
  }, []);

  return { messages, isTyping, sendMessage, clearMessages };
};
