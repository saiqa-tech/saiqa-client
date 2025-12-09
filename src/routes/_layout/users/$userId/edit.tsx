import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    Typography,
    message,
    Space,
    Spin,
    Alert,
} from "@/components/antd-wrappers";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getUser, updateUser } from "@/api/endpoints/users";
import { useAuth } from "@/hooks/useAuth";
import { canManageUsers } from "@/utils/rbac";
import type { UpdateUserRequest } from "@/types/user";
import { useEffect } from "react";

const { Title } = Typography;
const { Option } = Select;

export const Route = createFileRoute("/_layout/users/$userId/edit")({
    component: EditUserPage,
});

function EditUserPage() {
    const { userId } = Route.useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const {
        data: response,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateUserRequest) => updateUser(userId, data),
        onSuccess: () => {
            message.success("User updated successfully");
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate({ to: "/users/$userId", params: { userId } });
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message || "Failed to update user";
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

    // Pre-fill form with user data
    useEffect(() => {
        if (response?.data) {
            form.setFieldsValue({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                role: response.data.role,
                unitId: response.data.unitId,
                designationId: response.data.designationId,
                status: response.data.status,
            });
        }
    }, [response, form]);

    const onFinish = (values: UpdateUserRequest) => {
        updateMutation.mutate(values);
    };

    const handleDiscard = () => {
        navigate({ to: "/users/$userId", params: { userId } });
    };

    if (!canManageUsers(currentUser)) {
        return (
            <div style={{ padding: "24px" }}>
                <Card>
                    <Typography.Text type="danger">
                        You do not have permission to edit users.
                    </Typography.Text>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description="Failed to load user details. User may not exist."
                type="error"
                showIcon
            />
        );
    }

    const user = response?.data;

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "24px" }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate({ to: "/users/$userId", params: { userId } })}
                >
                    Back to User Details
                </Button>
            </div>

            <Card>
                <Title level={2}>
                    Edit User: {user?.firstName} {user?.lastName}
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
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

                    <Form.Item label="Status" name="status">
                        <Select placeholder="Select status">
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
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
                                loading={updateMutation.isPending}
                            >
                                Update User
                            </Button>
                            <Button onClick={handleDiscard}>Discard Changes</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
