import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Select, Button, Card, Typography, message, Space } from "@/components/antd-wrappers";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { createUser } from "@/api/endpoints/users";
import { useAuth } from "@/hooks/useAuth";
import { isAdmin } from "@/utils/rbac";
import type { CreateUserRequest } from "@/types/user";

const { Title } = Typography;
const { Option } = Select;

export const Route = createFileRoute("/_layout/users/create")({
    component: CreateUserPage,
});

function CreateUserPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [form] = Form.useForm();

    const createMutation = useMutation({
        mutationFn: (data: CreateUserRequest) => createUser(data),
        onSuccess: () => {
            message.success("User created successfully");
            navigate({ to: "/users" });
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message || "Failed to create user";
            message.error(errorMessage);

            // Handle validation errors
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const formErrors = Object.keys(errors).map((key) => ({
                    name: key,
                    errors: errors[key],
                }));
                form.setFields(formErrors);
            }
        },
    });

    const onFinish = (values: CreateUserRequest) => {
        createMutation.mutate(values);
    };

    if (!isAdmin(user)) {
        return (
            <div style={{ padding: "24px" }}>
                <Card>
                    <Typography.Text type="danger">
                        You do not have permission to create users.
                    </Typography.Text>
                </Card>
            </div>
        );
    }

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "24px" }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate({ to: "/users" })}
                >
                    Back to Users
                </Button>
            </div>

            <Card>
                <Title level={2}>Create New User</Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter email" },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input placeholder="user@example.com" />
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: "Please enter first name" }]}
                    >
                        <Input placeholder="John" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please enter last name" }]}
                    >
                        <Input placeholder="Doe" />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: "Please select a role" }]}
                    >
                        <Select placeholder="Select role">
                            <Option value="admin">Admin</Option>
                            <Option value="manager">Manager</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input.Password placeholder="Leave empty for auto-generated password" />
                    </Form.Item>

                    <Form.Item label="Unit ID" name="unitId">
                        <Input placeholder="Optional" />
                    </Form.Item>

                    <Form.Item label="Designation ID" name="designationId">
                        <Input placeholder="Optional" />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={createMutation.isPending}
                            >
                                Create User
                            </Button>
                            <Button onClick={() => form.resetFields()}>Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
