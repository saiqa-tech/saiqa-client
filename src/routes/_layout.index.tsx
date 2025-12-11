import {
	SolutionOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Card, Typography, Col, Row, Statistic } from "@/components/antd-wrappers";

const { Title, Paragraph } = Typography;

export const Route = createFileRoute("/_layout/")({ component: Dashboard });

function Dashboard() {
	return (
		<div style={{ padding: "24px" }}>
			<Title level={2}>Dashboard</Title>
			<Paragraph>Welcome to Saiqa Client.</Paragraph>

			<Row gutter={16} style={{ marginTop: "24px" }}>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Users"
							value={0}
							prefix={<UserOutlined />}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Units"
							value={0}
							prefix={<TeamOutlined />}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Designations"
							value={0}
							prefix={<SolutionOutlined />}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
