# Quick Reference Guide

## Ant Design Wrappers

### ✅ Correct Usage
```tsx
import { Button, Form, Input, Table, Modal } from "@/components/antd-wrappers";
```

### ❌ Incorrect Usage
```tsx
import { Button, Form } from "antd"; // DON'T DO THIS
```

### Exceptions (Allowed)
```tsx
import { theme } from "antd"; // OK - for theme tokens
import { UserOutlined } from "@ant-design/icons"; // OK - icons
```

## Route Organization

### Feature-Based Structure
```
src/routes/_layout/
└── users/                     # Feature directory
    ├── index.tsx              # List view
    ├── create.tsx             # Create form
    └── $userId/
        ├── index.tsx          # Detail view
        └── edit.tsx           # Edit form
```

### Route Component Template
```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Button, Form, Input } from "@/components/antd-wrappers";

export const Route = createFileRoute("/_layout/feature/path")({
  component: ComponentName,
});

function ComponentName() {
  return (
    <div>
      {/* Your component */}
    </div>
  );
}
```

## Common Patterns

### Form
```tsx
import { Form, Input, Button } from "@/components/antd-wrappers";

function MyForm() {
  const [form] = Form.useForm();
  
  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="field" label="Field">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
}
```

### Table
```tsx
import { Table } from "@/components/antd-wrappers";

function MyTable() {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
    />
  );
}
```

### Modal
```tsx
import { Modal, Button } from "@/components/antd-wrappers";

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        title="Title"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        Content
      </Modal>
    </>
  );
}
```

## Available Components

**Config:** App, ConfigProvider, Theme utilities

**General:** Button, Typography

**Layout:** Space, Flex, Layout, Grid, Divider, Row, Col

**Data Entry:** Form, Input, Select, Checkbox, Radio, DatePicker, Switch

**Data Display:** Table, Card, Tag, Tabs, Avatar, Badge, List, Statistic, Result, Descriptions

**Feedback:** Modal, Alert, Drawer, message, notification, Spin, Progress

**Navigation:** Menu, Dropdown, Breadcrumb, Pagination, Steps

## Testing

```tsx
<Button data-testid="submit-button">Submit</Button>
<Input data-testid="username-input" />
```

## More Information

- Full guidelines: `.kiro/steering/antd-wrappers-usage.md`
- Route organization: `.kiro/steering/route-organization.md`
- Migration plan: `ANTD_WRAPPERS_MIGRATION_PLAN.md`
- Completion summary: `ANTD_WRAPPERS_MIGRATION_COMPLETE.md`
