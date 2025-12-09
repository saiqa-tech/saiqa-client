# Ant Design 6.0 Wrapper Components

## Overview

This package provides enhanced TypeScript wrappers for Ant Design 6.0 components with:
- ✅ Full compatibility with Ant Design 6.0 API
- 🎯 Enhanced type safety
- 🧪 Test-friendly with data-testid support
- ⚙️ Sensible default configurations
- 📦 Preserved sub-components and static methods
- 🎨 CSS Variables architecture support

## Installation

The wrappers are already set up in your project. Simply import components from the wrappers directory:

```tsx
import { Button, Form, Table } from '@/components/antd-wrappers';
```

## Quick Start

### Basic Usage

```tsx
import { Button, Form, Input, Select } from '@/components/antd-wrappers';

function MyForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input placeholder="Enter username" />
      </Form.Item>
      
      <Form.Item name="role" label="Role">
        <Select placeholder="Select role">
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}
```

### Using ConfigProvider for Global Configuration

```tsx
import { ConfigProvider, defaultTheme, mergeTheme } from '@/components/antd-wrappers';
import { App } from './App';

const customTheme = mergeTheme({
  token: {
    colorPrimary: '#00b96b',
    borderRadius: 8,
  },
});

function Root() {
  return (
    <ConfigProvider theme={customTheme}>
      <App />
    </ConfigProvider>
  );
}
```

## Component Categories

### General Components
- **Button**: Enhanced with loading text and auto-focus
- **Typography**: Full typography support with Title, Text, Paragraph, Link

### Layout Components
- **Space**: Default small gap for consistent spacing
- **Flex**: Default gap and flexible layout
- **Layout**: Complete layout system with Header, Content, Footer, Sider
- **Grid**: Responsive grid system with breakpoints
- **Divider**: Horizontal and vertical dividers

### Data Entry Components
- **Form**: Default vertical layout with full form management
- **Input**: Text input with Password, TextArea, Search variants
- **Select**: Default showSearch enabled for better UX
- **Checkbox**: Checkbox with Group support
- **Radio**: Radio buttons with Group support
- **DatePicker**: Date selection with RangePicker
- **Switch**: Toggle switch component

### Data Display Components
- **Table**: Enhanced pagination with total count display
- **Card**: Card container with Grid and Meta
- **Tag**: Tags with CheckableTag support
- **Tabs**: Tab navigation component
- **Avatar**: User avatars with Group support
- **Badge**: Badges with Ribbon variant
- **List**: List display with Item.Meta

### Feedback Components
- **Modal**: Centered by default with all static methods
- **Alert**: Alert messages with ErrorBoundary
- **Drawer**: Drawer with v6 resizing support
- **message**: Global message notifications
- **notification**: Global notification system
- **Spin**: Loading spinner
- **Progress**: Progress indicators

### Navigation Components
- **Menu**: Navigation menu with items API
- **Dropdown**: Dropdown menus with Button variant
- **Breadcrumb**: Breadcrumb navigation
- **Pagination**: Enhanced pagination with size changer
- **Steps**: Step-by-step navigation

## Enhanced Features

### 1. Loading Text for Buttons

```tsx
<Button 
  type="primary" 
  loading={isLoading}
  loadingText="Saving..."
>
  Save
</Button>
```

### 2. Test-Friendly Components

All components support `data-testid` prop for easy testing:

```tsx
<Button data-testid="submit-button">Submit</Button>
<Input data-testid="username-input" />
```

### 3. Sensible Defaults

Components come with sensible defaults:

```tsx
// Form with vertical layout by default
<Form> {/* layout="vertical" by default */}
  <Form.Item name="field" label="Field">
    <Input />
  </Form.Item>
</Form>

// Select with search enabled
<Select> {/* showSearch={true} by default */}
  <Select.Option value="1">Option 1</Select.Option>
</Select>

// Pagination with size changer and total display
<Pagination total={100} /> {/* showSizeChanger and showTotal enabled */}
```

### 4. Modal Centered by Default

```tsx
<Modal title="Title" open={isOpen}> {/* centered={true} by default */}
  <p>Content</p>
</Modal>
```

## Advanced Usage

### Using Form with TypeScript

```tsx
interface FormValues {
  username: string;
  email: string;
  role: 'admin' | 'user';
}

function MyForm() {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    console.log('Typed values:', values);
  };

  return (
    <Form<FormValues> form={form} onFinish={handleSubmit}>
      <Form.Item name="username" label="Username">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input type="email" />
      </Form.Item>
      <Form.Item name="role" label="Role">
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
}
```

### Using Table with TypeScript

```tsx
interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

function MyTable() {
  const [data, setData] = useState<DataType[]>([]);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      rowKey="id"
    />
  );
}
```

### Using Modal Static Methods

```tsx
import { Modal, message } from '@/components/antd-wrappers';

function showConfirm() {
  Modal.confirm({
    title: 'Do you want to delete this item?',
    content: 'This action cannot be undone.',
    onOk() {
      message.success('Deleted successfully');
    },
    onCancel() {
      message.info('Cancelled');
    },
  });
}
```

### Custom Theme Configuration

```tsx
import { ConfigProvider, mergeTheme } from '@/components/antd-wrappers';

const myTheme = mergeTheme({
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
  },
});

function App() {
  return (
    <ConfigProvider theme={myTheme}>
      {/* Your app components */}
    </ConfigProvider>
  );
}
```

## Enabling Automatic Import Replacement (Optional)

To automatically use wrappers when importing from 'antd', uncomment the alias in `vite.config.ts`:

```typescript
resolve: {
  alias: {
    'antd': path.resolve(__dirname, './src/components/antd-wrappers'),
  },
}
```

With this enabled:
```tsx
// This will use your wrappers
import { Button, Form } from 'antd';
```

**Note:** This is commented out by default to allow explicit imports.

## Migration Guide

### From Direct AntD Imports

**Before:**
```tsx
import { Button, Form, Input } from 'antd';
```

**After:**
```tsx
import { Button, Form, Input } from '@/components/antd-wrappers';
```

### Breaking Changes from AntD 5.x to 6.0

The wrappers handle most AntD 6.0 changes, but be aware of:

1. **iconPosition → iconPlacement**: Wrapper uses the new API
2. **bordered → variant**: Use `variant` prop for styling
3. **CSS Variables**: Pure CSS Variables architecture (no runtime)
4. **React 18+ Required**: React 17 is no longer supported

## Testing

All components support `data-testid` for easy testing:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/antd-wrappers';

test('renders button', () => {
  render(<Button data-testid="my-button">Click me</Button>);
  expect(screen.getByTestId('my-button')).toBeInTheDocument();
});
```

## Type Safety

The wrappers maintain full TypeScript support:

```tsx
import type { ButtonProps, FormProps, TableProps } from '@/components/antd-wrappers';

// Use types for props
const buttonProps: ButtonProps = {
  type: 'primary',
  loading: true,
  loadingText: 'Processing...',
};

// Use utility types
import type { GetProps, GetProp, GetRef } from '@/components/antd-wrappers';

type InputRef = GetRef<typeof Input>;
type InputProps = GetProps<typeof Input>;
type InputSize = GetProp<InputProps, 'size'>;
```

## Available Components

### Complete List

**Config:**
- ConfigProvider
- Theme utilities (defaultTheme, darkTheme, compactTheme, mergeTheme)

**General:**
- Button (+ Button.Group)
- Typography (+ Title, Text, Paragraph, Link)

**Layout:**
- Space (+ Space.Compact)
- Flex
- Layout (+ Header, Content, Footer, Sider)
- Grid (+ useBreakpoint hook)
- Divider

**Data Entry:**
- Form (+ Form.Item, Form.List, Form.useForm, Form.useWatch)
- Input (+ Password, TextArea, Search, Group)
- Select (+ Option, OptGroup)
- Checkbox (+ Checkbox.Group)
- Radio (+ Radio.Group, Radio.Button)
- DatePicker (+ RangePicker, TimePicker)
- Switch

**Data Display:**
- Table (+ Column, ColumnGroup, Summary)
- Card (+ Card.Grid, Card.Meta)
- Tag (+ CheckableTag)
- Tabs (+ TabPane)
- Avatar (+ Avatar.Group)
- Badge (+ Badge.Ribbon)
- List (+ List.Item)

**Feedback:**
- Modal (+ confirm, info, success, error, warning)
- Alert (+ Alert.ErrorBoundary)
- Drawer
- message
- notification
- Spin
- Progress

**Navigation:**
- Menu (+ Item, SubMenu, ItemGroup, Divider)
- Dropdown (+ Dropdown.Button)
- Breadcrumb (+ Item, Separator)
- Pagination
- Steps (+ Steps.Step)

## Support

For issues or questions:
1. Check the [Ant Design 6.0 documentation](https://ant.design)
2. Review the wrapper source code in `src/components/antd-wrappers/`
3. Consult the agent specification in `.github/agents/antdwrapper.agent.md`

## License

These wrappers follow the same license as your project and maintain full compatibility with Ant Design 6.0.
