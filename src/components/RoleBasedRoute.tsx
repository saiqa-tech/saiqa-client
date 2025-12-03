import { Button, Result } from "antd";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../types/auth";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

interface RoleBasedRouteProps {
	children: React.ReactNode;
	allowedRoles: User["role"][];
}

export default function RoleBasedRoute({
	children,
	allowedRoles,
}: RoleBasedRouteProps) {
	const { user } = useAuth();
	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!user || !allowedRoles.includes(user.role)) {
			resultRef.current?.focus();
		}
	}, [user, allowedRoles]);

	if (!user || !allowedRoles.includes(user.role)) {
		return (
			<div ref={resultRef} tabIndex={-1} style={{ outline: "none" }}>
				<Result
					status="403"
					title="403"
					subTitle="Sorry, you are not authorized to access this page."
					extra={
						<Link to="/">
							<Button type="primary">
								Back Home
							</Button>
						</Link>
					}
				/>
			</div>
		);
	}

	return <>{children}</>;
}
