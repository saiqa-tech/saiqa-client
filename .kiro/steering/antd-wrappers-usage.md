---
inclusion: always
---

# Ant Design Wrappers Usage Guidelines

## CRITICAL: Always Use Wrappers

When working with Ant Design components, you MUST use the wrapper components from `@/components/antd-wrappers` instead of importing directly from `antd`.

### Correct Usage ✅

```tsx
import { Button, Form, Input, Table, Modal, message } from "@/components/antd-wrappers";
```

### Incorrect Usage ❌

```tsx
import { Button, Form, Input } from "antd"; // NEVER DO THIS
```

### Exceptions

Only these imports are allowed directly from `antd`:
- `theme` - For accessing theme tokens via `theme.useToken()`
- Icons should be imported from `@ant-design/icons` (not from antd)

**Example of allowed direct imports:**
```tsx
import { theme } from "antd"; // OK - for theme tokens
import { UserOutlined, EditOutlined } from "@ant-design/icons"; // OK - icons
```

## Why Use Wrappers?

1. **Enhanced type safety** - Better TypeScript support
2. **Sensible defaults** - Form vertical layout, Select with search enabled
3. **Test-friendly** - All components support `data-testid` prop
4. **Consistent behavior** - Standardized across the application
5. **Loading text support** - Buttons can show loading text
6. **Centered modals** - Modals are centered by default
7. **Better pagination** - Shows total count and size changer

## Available Components

All major Ant Design components are available through wrappers:

### Configuration
- `App` - Global context provider
- `ConfigProvider` - Theme and locale configuration
- Theme utilities: `defaultTheme`, `darkTheme`, `compactTheme`, `mergeTheme`

### General
- `Button` - Enhanced with loading text
- `Typography` - With Title, Text, Paragraph, Link

### Layout
- `Space`, `Flex` - Spacing and flexbox
- `Layout` - With Header, Content, Footer, Sider
- `Grid` - With useBreakpoint hook
- `Row`, `Col` - Grid system
- `Divider` - Horizontal and vertical dividers

### Data Entry
- `Form` - Default vertical layout, with Item, List, useForm, useWatch
- `Input` - With Password, TextArea, Search, Group
- `Select` - Default showSearch enabled, with Option, OptGroup
- `Checkbox` - With Checkbox.Group
- `Radio` - With Radio.Group, Radio.Button
- `DatePicker` - With RangePicker, TimePicker
- `Switch` - Toggle switch

### Data Display
- `Table` - Enhanced pagination
- `Card` - With Card.Grid, Card.Meta
- `Tag` - With CheckableTag
- `Tabs` - With TabPane
- `Avatar` - With Avatar.Group
- `Badge` - With Badge.Ribbon
- `List` - With List.Item
- `Statistic` - Display statistics
- `Result` - Display operation results
- `Descriptions` - Display detailed information

### Feedback
- `Modal` - Centered by default, with confirm, info, success, error, warning
- `Alert` - With Alert.ErrorBoundary
- `Drawer` - Side panel
- `message` - Global message notifications
- `notification` - Global notification system
- `Spin` - Loading spinner
- `Progress` - Progress indicators

### Navigation
- `Menu` - With Item, SubMenu, ItemGroup, Divider
- `Dropdown` - With Dropdown.Button
- `Breadcrumb` - With Item, Separator
- `Pagination` - Enhanced with size changer
- `Steps` - With Steps.Step

## When Creating New Components

Always import from wrappers in new files:

```tsx
import { 
  Form, 
  Input, 
  Button, 
  Select,
  Table,
  Modal,
  message 
} from "@/components/antd-wrappers";
```

## When Updating Existing Components

If you find a file importing directly from `antd`, update it to use wrappers:

**Before:**
```tsx
import { Button, Form } from "antd";
```

**After:**
```tsx
import { Button, Form } from "@/components/antd-wrappers";
```

## Missing Components

If you need a component that's not yet in the wrappers:

1. Create a wrapper file in the appropriate category directory
2. Export it from the category's index
3. Add it to the main `index.ts`
4. Follow the existing pattern for consistency

**Example:**
```tsx
// src/components/antd-wrappers/data-display/NewComponent.tsx
export { NewComponent } from 'antd';
export type { NewComponentProps } from 'antd';
```

## Testing

All wrapper components support `data-testid` for easy testing:

```tsx
<Button data-testid="submit-button">Submit</Button>
<Input data-testid="username-input" />
<Table data-testid="users-table" />
```

## Type Safety

The wrappers maintain full TypeScript support:

```tsx
import type { ButtonProps, FormProps, TableProps } from "@/components/antd-wrappers";

// Use types for props
const buttonProps: ButtonProps = {
  type: "primary",
  loading: true,
  loadingText: "Processing...",
};
```

## Common Patterns

### Forms
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

### Tables
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

### Modals
```tsx
import { Modal, Button } from "@/components/antd-wrappers";

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
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

## Remember

- ✅ Always use `@/components/antd-wrappers`
- ✅ Only import `theme` directly from `antd` when needed
- ✅ Import icons from `@ant-design/icons`
- ❌ Never import components directly from `antd`
- ❌ Don't create duplicate wrappers
