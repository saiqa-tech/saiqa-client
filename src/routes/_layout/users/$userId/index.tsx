import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Card,
  Descriptions,
  Button,
  Space,
  Modal,
  Typography,
  Spin,
  Alert,
  message,
  Input,
} from "@/components/antd-wrappers";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { getUser, deleteUser, resetPassword } from "@/api/endpoints/users";
import { useAuth } from "@/hooks/useAuth";
import { canManageUsers, isAdmin } from "@/utils/rbac";

const { Title, Text } = Typography;

export const Route = createFileRoute("/_layout/users/$userId/")({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      message.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate({ to: "/users" });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to delete user");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: () => resetPassword(userId),
    onSuccess: (response: any) => {
      message.success(
        `Password reset successfully. New password: ${response.data.newPassword}`,
        10,
      );
      setResetModalVisible(false);
    },
    onError: (error: any) => {
      message.error(
        error.response?.data?.message || "Failed to reset password",
      );
    },
  });

  const handleDelete = () => {
    if (deleteEmail === user?.email) {
      deleteMutation.mutate();
      setDeleteModalVisible(false);
      setDeleteEmail("");
    } else {
      message.error("Email does not match");
    }
  };

  const handleResetPassword = () => {
    resetPasswordMutation.mutate();
  };

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
          onClick={() => navigate({ to: "/users" })}
        >
          Back to Users
        </Button>
      </div>

      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Title level={2}>
            {user?.firstName} {user?.lastName}
          </Title>
          <Space>
            {canManageUsers(currentUser) && (
              <Button
                icon={<EditOutlined />}
                onClick={() =>
                  navigate({ to: "/users/$userId/edit", params: { userId } })
                }
              >
                Edit
              </Button>
            )}
            {isAdmin(currentUser) && currentUser?.id !== userId && (
              <Button
                icon={<KeyOutlined />}
                onClick={() => setResetModalVisible(true)}
              >
                Reset Password
              </Button>
            )}
            {isAdmin(currentUser) && currentUser?.id !== userId && (
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => setDeleteModalVisible(true)}
              >
                Delete
              </Button>
            )}
          </Space>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">
            <Text style={{ textTransform: "capitalize" }}>{user?.role}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Unit">
            {user?.unit?.name || "Not assigned"}
          </Descriptions.Item>
          <Descriptions.Item label="Designation">
            {user?.designation?.title || "Not assigned"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Text
              style={{
                color: user?.status === "active" ? "green" : "red",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {user?.status}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Last Login">
            {user?.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "Never logged in"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm User Deletion"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteEmail("");
        }}
        okButtonProps={{ danger: true }}
        okText="Delete"
        confirmLoading={deleteMutation.isPending}
      >
        <Alert
          message="Warning"
          description="This action is permanent and cannot be undone."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <p>Are you sure you want to delete this user?</p>
        <p>
          Please type the user's email (<strong>{user?.email}</strong>) to
          confirm:
        </p>
        <Input
          value={deleteEmail}
          onChange={(e) => setDeleteEmail(e.target.value)}
          placeholder="Enter user's email"
        />
      </Modal>

      {/* Reset Password Confirmation Modal */}
      <Modal
        title="Reset Password"
        open={resetModalVisible}
        onOk={handleResetPassword}
        onCancel={() => setResetModalVisible(false)}
        okText="Reset Password"
        confirmLoading={resetPasswordMutation.isPending}
      >
        <p>
          Are you sure you want to reset the password for{" "}
          <strong>
            {user?.firstName} {user?.lastName}
          </strong>
          ?
        </p>
        <p>A new temporary password will be generated and displayed.</p>
      </Modal>
    </div>
  );
}
