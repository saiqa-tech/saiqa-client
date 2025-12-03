import { Spin } from "antd";

export default function LoadingSpinner() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
				minHeight: "200px",
			}}
		>
			<Spin size="large" />
		</div>
	);
}
