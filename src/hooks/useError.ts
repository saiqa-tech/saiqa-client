import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

export function useError() {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
}
