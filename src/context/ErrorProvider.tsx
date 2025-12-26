import { message as messageApi } from "@/components/antd-wrappers";
import { type ReactNode, useCallback, useState, useEffect } from "react";
import { ErrorContext } from "./ErrorContext";
import { useAuth } from "../hooks/useAuth";

const MESSAGE_KEY = "global-error";

export function ErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const showError = useCallback((msg: string) => {
        setError(msg);
        messageApi.error({
            content: msg,
            key: MESSAGE_KEY,
            duration: 4,
        });
    }, []);

    const clearError = useCallback(() => {
        setError(null);
        messageApi.destroy(MESSAGE_KEY);
    }, []);

    useEffect(() => {
        if (!user) {
            clearError();
        }
    }, [user, clearError]);

    return (
        <ErrorContext.Provider value={{ error, showError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}
