import { Modal, Button, Typography } from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

interface SessionTimeoutModalProps {
    isOpen: boolean;
    onRefresh: () => void;
    onLogout: () => void;
    expiresAt: number | null;
}

export function SessionTimeoutModal({
    isOpen,
    onRefresh,
    onLogout,
    expiresAt,
}: SessionTimeoutModalProps) {
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        if (!isOpen || !expiresAt) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, expiresAt - Date.now());
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, expiresAt]);

    return (
        <Modal
            title="Session Timeout Warning"
            open={isOpen}
            onCancel={onLogout}
            footer={[
                <Button key="logout" danger onClick={onLogout}>
                    Logout Now
                </Button>,
                <Button key="refresh" type="primary" onClick={onRefresh}>
                    Continue Session
                </Button>,
            ]}
            closable={false}
            maskClosable={false}
        >
            <Text>
                Your session will expire in <strong>{timeLeft}</strong>. Would you like to
                continue?
            </Text>
        </Modal>
    );
}
