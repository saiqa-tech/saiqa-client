import { Spin } from "@/components/antd-wrappers";

export default function LoadingSpinner() {
	return (
		<div
			role="status"
			aria-live="polite"
			aria-label="Loading content"
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
