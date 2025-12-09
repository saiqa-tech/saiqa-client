import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { App, ConfigProvider } from "@/components/antd-wrappers";

import { AuthProvider } from "../context/AuthContext";
import { ErrorProvider } from "../context/ErrorProvider";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";
import type { User } from "../types/auth";

interface MyRouterContext {
	queryClient: QueryClient;
	auth: {
		user: User | null;
		isAuthenticated: boolean;
	};
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Saiqa Client",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ConfigProvider>
					<App>
						<AuthProvider>
							<ErrorProvider>
								{children}
							</ErrorProvider>
						</AuthProvider>
						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
						<Scripts />
					</App>
				</ConfigProvider>
			</body>
		</html>
	);
}
