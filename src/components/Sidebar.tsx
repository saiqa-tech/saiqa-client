import {
	HomeOutlined,
	SolutionOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "@tanstack/react-router";
import { Layout, Menu } from "antd";
import { useAuth } from "../hooks/useAuth";
import { canManageUsers } from "../utils/rbac";

const { Sider } = Layout;

interface SidebarProps {
	collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
	const location = useLocation();
	const { user } = useAuth();

	const items = [
		{
			key: "/",
			icon: <HomeOutlined />,
			label: <Link to="/">Dashboard</Link>,
		},
	];

	if (canManageUsers(user)) {
		items.push(
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

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div
				className="demo-logo-vertical"
				style={{
					height: 32,
					margin: 16,
					background: "rgba(255, 255, 255, 0.2)",
				}}
			/>
			<Menu
				theme="dark"
				mode="inline"
				selectedKeys={[location.pathname]}
				items={items}
			/>
		</Sider>
	);
}
