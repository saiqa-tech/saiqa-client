import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Button, Form, Input, message } from "antd";
import { useState } from "react";
import { login as apiLogin } from "../api/endpoints/auth";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onFinish = async (values: any) => {
		setLoading(true);
		setError(null);
		try {
			const response = await apiLogin(values);
			// Assuming response.data contains the user object and tokens
			// The backend contract says: { accessToken, refreshToken, user: { ... } }

			if (response.data && response.data.user) {
				login({
					user: response.data.user,
					expiresAt: response.data.expiresAt,
				});
				message.success("Login successful");
				navigate({ to: "/" });
			} else {
				// Fallback or error
				setError("Invalid response from server");
			}
		} catch (err: any) {
			console.error(err);
			setError(
				err.response?.data?.message ||
				"Login failed. Please check your credentials.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout title="Sign in to your account">
			{error && (
				<Alert
					message={error}
					type="error"
					showIcon
					style={{ marginBottom: 24 }}
				/>
			)}
			<Form
				name="login"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				layout="vertical"
				size="large"
			>
				<Form.Item
					name="email"
					rules={[
						{ required: true, message: "Please input your Email!" },
						{ type: "email", message: "Please enter a valid email!" },
					]}
				>
					<Input prefix={<UserOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input.Password prefix={<LockOutlined />} placeholder="Password" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign in
					</Button>
				</Form.Item>
			</Form>
		</AuthLayout>
	);
}
