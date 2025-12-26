import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Form, Input, message, Tabs, Typography } from "@/components/antd-wrappers";
import { useState } from "react";
import { changePassword } from "../../api/endpoints/auth";
import { updateUser } from "../../api/endpoints/users";
import { useAuth } from "../../hooks/useAuth";

const { Title } = Typography;

export const Route = createFileRoute("/_layout/profile")({
	component: Profile,
});

function Profile() {
	const { user, checkAuth } = useAuth();
	const [loading, setLoading] = useState(false);

	if (!user) return null;

	const onUpdateProfile = async (values: any) => {
		setLoading(true);
		try {
			await updateUser(user.id, values);
			message.success("Profile updated successfully");
			await checkAuth(); // Refresh user data
		} catch (error: any) {
			message.error(
				error.response?.data?.message || "Failed to update profile",
			);
		} finally {
			setLoading(false);
		}
	};

	const onChangePassword = async (values: any) => {
		setLoading(true);
		try {
			await changePassword(values);
			message.success("Password changed successfully");
		} catch (error: any) {
			message.error(
				error.response?.data?.message || "Failed to change password",
			);
		} finally {
			setLoading(false);
		}
	};

	const items = [
		{
			key: "1",
			label: "Profile Details",
			children: (
				<Form
					layout="vertical"
					initialValues={{
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					}}
					onFinish={onUpdateProfile}
				>
					<Form.Item label="Email" name="email">
						<Input disabled prefix={<UserOutlined />} />
					</Form.Item>
					<Form.Item
						label="First Name"
						name="firstName"
						rules={[
							{ required: true, message: "Please input your first name!" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Last Name"
						name="lastName"
						rules={[
							{ required: true, message: "Please input your last name!" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading}>
							Update Profile
						</Button>
					</Form.Item>
				</Form>
			),
		},
		{
			key: "2",
			label: "Security",
			children: (
				<Form layout="vertical" onFinish={onChangePassword}>
					<Form.Item
						label="Current Password"
						name="currentPassword"
						rules={[
							{
								required: true,
								message: "Please input your current password!",
							},
						]}
					>
						<Input.Password prefix={<LockOutlined />} />
					</Form.Item>
					<Form.Item
						label="New Password"
						name="newPassword"
						rules={[
							{ required: true, message: "Please input your new password!" },
							{ min: 8, message: "Password must be at least 8 characters" },
						]}
					>
						<Input.Password prefix={<LockOutlined />} />
					</Form.Item>
					<Form.Item
						label="Confirm New Password"
						name="confirmPassword"
						dependencies={["newPassword"]}
						rules={[
							{ required: true, message: "Please confirm your new password!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("newPassword") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											"The two passwords that you entered do not match!",
										),
									);
								},
							}),
						]}
					>
						<Input.Password prefix={<LockOutlined />} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading}>
							Change Password
						</Button>
					</Form.Item>
				</Form>
			),
		},
	];

	return (
		<div style={{ maxWidth: 800, margin: "0 auto" }}>
			<Title level={2}>My Profile</Title>
			<Card>
				<Tabs defaultActiveKey="1" items={items} />
			</Card>
		</div>
	);
}
