import { message } from "antd";
import { type ReactNode, useCallback, useState } from "react";
import { ErrorContext } from "./ErrorContext";

export function ErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<string | null>(null);

    const showError = useCallback((msg: string) => {
        setError(msg);
        message.error(msg);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return (
        <ErrorContext.Provider value={{ error, showError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}
