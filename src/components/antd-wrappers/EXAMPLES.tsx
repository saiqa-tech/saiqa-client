/**
 * Ant Design 6.0 Wrapper Components - Usage Examples
 * 
 * This file demonstrates common patterns and use cases for the wrapper components.
 */

import {
    Button,
    Form,
    Input,
    Select,
    Table,
    Modal,
    message,
    Card,
    Space,
    Typography,
    ConfigProvider,
    mergeTheme,
} from '@/components/antd-wrappers';
import type { ColumnType } from '@/components/antd-wrappers';
import { useState } from 'react';

// ============================================================================
// Example 1: Basic Form with Validation
// ============================================================================

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}

export function LoginFormExample() {
    const [form] = Form.useForm<LoginFormValues>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: LoginFormValues) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Login successful!');
            console.log('Form values:', values);
        } catch (error) {
            message.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Login" style={{ maxWidth: 400, margin: '0 auto' }}>
            <Form<LoginFormValues>
                form={form}
                onFinish={handleSubmit}
                data-testid="login-form"
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        { required: true, message: 'Please enter username' },
                        { min: 3, message: 'Username must be at least 3 characters' }
                    ]}
                >
                    <Input
                        placeholder="Enter username"
                        data-testid="username-input"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Please enter password' },
                        { min: 6, message: 'Password must be at least 6 characters' }
                    ]}
                >
                    <Input.Password
                        placeholder="Enter password"
                        data-testid="password-input"
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    loadingText="Logging in..."
                    block
                    data-testid="login-button"
                >
                    Login
                </Button>
            </Form>
        </Card>
    );
}

// ============================================================================
// Example 2: Data Table with CRUD Operations
// ============================================================================

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
}

export function UserTableExample() {
    const [users, setUsers] = useState<User[]>([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
    ]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm<User>();

    const columns: ColumnType<User>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'User', value: 'user' },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span style={{ color: status === 'active' ? 'green' : 'red' }}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => handleEdit(record)}
                        data-testid={`edit-user-${record.id}`}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record)}
                        data-testid={`delete-user-${record.id}`}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        form.setFieldsValue(user);
        setModalOpen(true);
    };

    const handleDelete = (user: User) => {
        Modal.confirm({
            title: 'Delete User',
            content: `Are you sure you want to delete ${user.name}?`,
            onOk: () => {
                setUsers(users.filter(u => u.id !== user.id));
                message.success('User deleted successfully');
            },
        });
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (selectedUser) {
                // Update existing user
                setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...values } : u));
                message.success('User updated successfully');
            }
            setModalOpen(false);
            form.resetFields();
        } catch (error) {
            message.error('Please check the form fields');
        }
    };

    return (
        <Card title="User Management">
            <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedUser(null);
                        form.resetFields();
                        setModalOpen(true);
                    }}
                >
                    Add User
                </Button>

                <Table<User>
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    data-testid="users-table"
                />
            </Space>

            <Modal
                title={selectedUser ? 'Edit User' : 'Add User'}
                open={modalOpen}
                onOk={handleModalOk}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                }}
                data-testid="user-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter valid email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select role' }]}
                    >
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select>
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}

// ============================================================================
// Example 3: Custom Theme Configuration
// ============================================================================

export function ThemedAppExample() {
    const customTheme = mergeTheme({
        token: {
            colorPrimary: '#722ed1',
            colorSuccess: '#52c41a',
            colorWarning: '#faad14',
            colorError: '#f5222d',
            borderRadius: 8,
            fontSize: 14,
        },
        components: {
            Button: {
                controlHeight: 36,
                borderRadius: 6,
            },
            Input: {
                controlHeight: 36,
                borderRadius: 6,
            },
            Card: {
                borderRadius: 12,
            },
        },
    });

    return (
        <ConfigProvider theme={customTheme}>
            <Space direction="vertical" style={{ width: '100%', padding: 24 }}>
                <Typography.Title level={2}>Themed Components</Typography.Title>

                <Card title="Primary Actions">
                    <Space>
                        <Button type="primary">Primary</Button>
                        <Button>Default</Button>
                        <Button type="dashed">Dashed</Button>
                        <Button type="link">Link</Button>
                    </Space>
                </Card>

                <Card title="Status Colors">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Button type="primary" style={{ backgroundColor: 'var(--ant-color-success)' }}>
                            Success
                        </Button>
                        <Button type="primary" style={{ backgroundColor: 'var(--ant-color-warning)' }}>
                            Warning
                        </Button>
                        <Button type="primary" danger>
                            Error
                        </Button>
                    </Space>
                </Card>
            </Space>
        </ConfigProvider>
    );
}

// ============================================================================
// Example 4: Multi-Step Form
// ============================================================================

interface StepFormValues {
    // Step 1
    firstName: string;
    lastName: string;
    email: string;

    // Step 2
    address: string;
    city: string;
    zipCode: string;

    // Step 3
    agreeToTerms: boolean;
}

export function MultiStepFormExample() {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm<StepFormValues>();

    const steps = [
        { title: 'Personal Info', description: 'Basic information' },
        { title: 'Address', description: 'Contact details' },
        { title: 'Confirmation', description: 'Review and submit' },
    ];

    const handleNext = async () => {
        try {
            await form.validateFields();
            setCurrentStep(currentStep + 1);
        } catch (error) {
            message.error('Please fill in all required fields');
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (values: StepFormValues) => {
        console.log('Final values:', values);
        message.success('Form submitted successfully!');
    };

    return (
        <Card title="Multi-Step Registration">
            <Form form={form} onFinish={handleSubmit}>
                {currentStep === 0 && (
                    <>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Required' },
                                { type: 'email', message: 'Invalid email' }
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                    </>
                )}

                {currentStep === 1 && (
                    <>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Enter address" />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Enter city" />
                        </Form.Item>
                        <Form.Item
                            name="zipCode"
                            label="Zip Code"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input placeholder="Enter zip code" />
                        </Form.Item>
                    </>
                )}

                {currentStep === 2 && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Typography.Text strong>Please review your information:</Typography.Text>
                        <Typography.Text>Name: {form.getFieldValue('firstName')} {form.getFieldValue('lastName')}</Typography.Text>
                        <Typography.Text>Email: {form.getFieldValue('email')}</Typography.Text>
                        <Typography.Text>Address: {form.getFieldValue('address')}</Typography.Text>
                        <Typography.Text>City: {form.getFieldValue('city')}</Typography.Text>
                        <Typography.Text>Zip: {form.getFieldValue('zipCode')}</Typography.Text>
                    </Space>
                )}

                <Space style={{ marginTop: 24 }}>
                    {currentStep > 0 && (
                        <Button onClick={handlePrev}>Previous</Button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={handleNext}>Next</Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type="primary" htmlType="submit">Submit</Button>
                    )}
                </Space>
            </Form>
        </Card>
    );
}

// ============================================================================
// Example 5: Message and Notification Usage
// ============================================================================

export function MessagesExample() {
    const showSuccessMessage = () => {
        message.success('Operation completed successfully!');
    };

    const showErrorMessage = () => {
        message.error('Something went wrong!');
    };

    const showLoadingMessage = () => {
        const hide = message.loading('Processing...', 0);
        setTimeout(() => {
            hide();
            message.success('Done!');
        }, 2000);
    };

    return (
        <Card title="Messages & Notifications">
            <Space wrap>
                <Button onClick={showSuccessMessage}>Success Message</Button>
                <Button onClick={showErrorMessage}>Error Message</Button>
                <Button onClick={showLoadingMessage}>Loading Message</Button>
            </Space>
        </Card>
    );
}
