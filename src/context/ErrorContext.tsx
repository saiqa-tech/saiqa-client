import { createContext } from "react";

export interface ErrorContextType {
    showError: (message: string) => void;
    clearError: () => void;
    error: string | null;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);
