import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import {
	Avatar,
	Button,
	Dropdown,
	Layout,
	type MenuProps,
	Space,
	theme,
} from "antd";
import { useAuth } from "../hooks/useAuth";

const { Header: AntHeader } = Layout;

interface HeaderProps {
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
}

export default function Header({ collapsed, setCollapsed }: HeaderProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
	};

	const items: MenuProps["items"] = [
		{
			key: "profile",
			label: "Profile",
			icon: <UserOutlined />,
			onClick: () => navigate({ to: "/profile" }),
		},
		{
			type: "divider",
		},
		{
			key: "logout",
			label: "Logout",
			icon: <LogoutOutlined />,
			onClick: handleLogout,
			danger: true,
		},
	];

	return (
		<AntHeader
			style={{
				padding: 0,
				background: colorBgContainer,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
				style={{
					fontSize: "16px",
					width: 64,
					height: 64,
				}}
			/>
			<div style={{ marginRight: "24px" }}>
				{user && (
					<Dropdown menu={{ items }} placement="bottomRight">
						<Space style={{ cursor: "pointer" }} role="button" tabIndex={0} aria-label="User menu">
							<Avatar icon={<UserOutlined />} />
							<span>
								{user.firstName} {user.lastName}
							</span>
						</Space>
					</Dropdown>
				)}
			</div>
		</AntHeader>
	);
}
