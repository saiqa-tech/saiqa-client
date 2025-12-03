import { createFileRoute, Outlet } from "@tanstack/react-router";
import Layout from "../components/Layout";

import ProtectedRoute from "../components/ProtectedRoute";

export const Route = createFileRoute("/_layout")({
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<ProtectedRoute>
			<Layout>
				<Outlet />
			</Layout>
		</ProtectedRoute>
	);
}
