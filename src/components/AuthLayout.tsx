import { Layout as AntLayout, Card, Typography } from "@/components/antd-wrappers";
import type { ReactNode } from "react";

const { Content } = AntLayout;
const { Title } = Typography;

interface AuthLayoutProps {
	children: ReactNode;
	title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
	return (
		<AntLayout style={{ minHeight: "100vh" }}>
			<Content
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: "#f0f2f5",
				}}
			>
				<Card
					style={{
						width: "100%",
						maxWidth: 400,
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
					}}
				>
					<div style={{ textAlign: "center", marginBottom: 24 }}>
						<Title level={1} style={{ margin: 0 }}>
							Login
						</Title>
						{title && (
							<Title level={4} type="secondary" style={{ marginTop: 8 }}>
								{title}
							</Title>
						)}
					</div>
					{children}
				</Card>
			</Content>
		</AntLayout>
	);
}
