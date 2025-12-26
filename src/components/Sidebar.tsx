import {
	HomeOutlined,
	SolutionOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "@tanstack/react-router";
import { Layout, Menu } from "@/components/antd-wrappers";
import { useAuth } from "../hooks/useAuth";
import { canManageUsers } from "../utils/rbac";
import { useMemo } from "react";

const { Sider } = Layout;

interface SidebarProps {
	collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
	const location = useLocation();
	const { user } = useAuth();

	const items = useMemo(() => {
		const baseItems = [
			{
				key: "/",
				icon: <HomeOutlined />,
				label: <Link to="/">Dashboard</Link>,
			},
		];

		if (canManageUsers(user)) {
			baseItems.push(
				{
					key: "/users",
					icon: <UserOutlined />,
					label: <Link to="/users">Users</Link>,
				},
				{
					key: "/units",
					icon: <TeamOutlined />,
					label: <Link to="/units">Units</Link>,
				},
				{
					key: "/designations",
					icon: <SolutionOutlined />,
					label: <Link to="/designations">Designations</Link>,
				},
			);
		}
		return baseItems;
	}, [user]);

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div
				className="demo-logo-vertical"
				aria-label="Application Logo"
				style={{
					height: 32,
					margin: 16,
					background: "rgba(255, 255, 255, 0.2)",
				}}
			/>
			<Menu
				theme="dark"
				mode="inline"
				aria-label="Main navigation"
				selectedKeys={[location.pathname]}
				items={items}
			/>
		</Sider>
	);
}
