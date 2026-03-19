"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type UI_CONTEXT_TYPE = {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleCart(): void;
  handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void;
  toggleMobileNavigation(): void;
};

const UIContext = createContext<UI_CONTEXT_TYPE | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  const toggleMobileNavigation = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <UIContext.Provider
      value={{
        handleOverlayClick,
        isCartOpen,
        toggleCart,
        toggleMobileNavigation,
        isMobileMenuOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("UIContext must be used inside UIProvider");

  return context;
};
