import { Outlet } from "@tanstack/react-router";
import { Layout as AntLayout } from "antd";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const { Content } = AntLayout;

export default function Layout({ children }: { children?: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<AntLayout style={{ minHeight: "100vh" }}>
			<Sidebar collapsed={collapsed} />
			<AntLayout>
				<Header collapsed={collapsed} setCollapsed={setCollapsed} />
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: "#fff",
					}}
				>
					{children || <Outlet />}
				</Content>
			</AntLayout>
		</AntLayout>
	);
}
