import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
    Table,
    Button,
    Input,
    Select,
    Space,
    Typography,
    Spin,
    Alert,
    Tag,
} from "@/components/antd-wrappers";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getUsers } from "@/api/endpoints/users";
import { useAuth } from "@/hooks/useAuth";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { canManageUsers } from "@/utils/rbac";
import type { UserDetail } from "@/types/user";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;
const { Option } = Select;

export const Route = createFileRoute("/_layout/users/")({
    component: UsersListPage,
});

function UsersListPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

    // Debounce search input to reduce API calls
    const debouncedSearch = useDebouncedValue(search, 300);

    const {
        data: response,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users", page, limit, debouncedSearch, roleFilter],
        queryFn: () =>
            getUsers({
                page,
                limit,
                search: debouncedSearch || undefined,
                role: roleFilter,
            }),
    });

    const columns: ColumnsType<UserDetail> = useMemo(
        () => [
            {
                title: "Name",
                dataIndex: "firstName",
                key: "name",
                render: (_: string, record: UserDetail) =>
                    `${record.firstName} ${record.lastName}`,
                sorter: (a, b) =>
                    `${a.firstName} ${a.lastName}`.localeCompare(
                        `${b.firstName} ${b.lastName}`,
                    ),
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                sorter: (a, b) => a.email.localeCompare(b.email),
            },
            {
                title: "Role",
                dataIndex: "role",
                key: "role",
                render: (role: string) => (
                    <Tag
                        color={
                            role === "admin" ? "red" : role === "manager" ? "blue" : "green"
                        }
                    >
                        {role.toUpperCase()}
                    </Tag>
                ),
                sorter: (a, b) => a.role.localeCompare(b.role),
            },
            {
                title: "Unit",
                dataIndex: ["unit", "name"],
                key: "unit",
                render: (name: string) => name || "-",
            },
            {
                title: "Designation",
                dataIndex: ["designation", "title"],
                key: "designation",
                render: (title: string) => title || "-",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: "active" | "inactive") => (
                    <Tag color={status === "active" ? "success" : "error"}>
                        {status.toUpperCase()}
                    </Tag>
                ),
                sorter: (a, b) => a.status.localeCompare(b.status),
            },
        ],
        [],
    );

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
                description="Failed to load users. Please try again."
                type="error"
                showIcon
            />
        );
    }

    const data = response?.data;

    return (
        <div style={{ padding: "24px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <Title level={2}>Users</Title>
                {canManageUsers(user) && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate({ to: "/users/create" })}
                    >
                        Create User
                    </Button>
                )}
            </div>

            {/* Filters */}
            <div
                style={{
                    marginBottom: "24px",
                    padding: "16px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                }}
            >
                <Space wrap>
                    <Input
                        placeholder="Search by name or email"
                        prefix={<SearchOutlined />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Select
                        placeholder="Filter by role"
                        value={roleFilter}
                        onChange={setRoleFilter}
                        allowClear
                        style={{ width: 150 }}
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="manager">Manager</Option>
                        <Option value="user">User</Option>
                    </Select>
                </Space>
            </div>

            {/* Users Table */}
            <Table
                dataSource={data?.data || []}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: data?.total || 0,
                    onChange: setPage,
                    showSizeChanger: false,
                }}
                onRow={(record) => ({
                    onClick: () => {
                        navigate({ to: "/users/$userId", params: { userId: record.id } });
                    },
                    style: { cursor: "pointer" },
                })}
            />
        </div>
    );
}
