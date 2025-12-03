import { Button, Result } from "antd";
import { useAuth } from "../hooks/useAuth";
import type { User } from "../types/auth";

interface RoleBasedRouteProps {
	children: React.ReactNode;
	allowedRoles: User["role"][];
}

export default function RoleBasedRoute({
	children,
	allowedRoles,
}: RoleBasedRouteProps) {
	const { user } = useAuth();

	if (!user || !allowedRoles.includes(user.role)) {
		return (
			<Result
				status="403"
				title="403"
				subTitle="Sorry, you are not authorized to access this page."
				extra={
					<Button type="primary" href="/">
						Back Home
					</Button>
				}
			/>
		);
	}

	return <>{children}</>;
}
