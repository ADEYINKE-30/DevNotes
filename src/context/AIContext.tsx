import { createContext, useContext, useState, type ReactNode } from "react";

interface AIContextType {
  showAIChat: boolean;
  toggleAIChat: () => void;
  closeAIChat: () => void;
  openAIChat: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [showAIChat, setShowAIChat] = useState(false);

  const toggleAIChat = () => setShowAIChat((prev) => !prev);
  const closeAIChat = () => setShowAIChat(false);
  const openAIChat = () => setShowAIChat(true);

  return (
    <AIContext.Provider value={{ showAIChat, toggleAIChat, closeAIChat, openAIChat }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = (): AIContextType => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used within an AIProvider");
  }
  return context;
};