## Agent Specification: AntD 6.0 Component Wrapper Generator

### Agent Purpose
Create TypeScript-based wrapper components for all major Ant Design 6.0 components that provide enhanced type safety, default configurations, and project-specific customizations while maintaining full compatibility with the underlying AntD API.[4]

### Key Ant Design 6.0 Features to Consider

**Technical Changes:**
- Pure CSS Variables architecture with zero-runtime support
- React 18+ requirement (no React 17 support)
- Semantic structure with `classNames` and `styles` props for all components
- Deprecated API replacements (e.g., `iconPosition` → `iconPlacement`, `bordered` → `variant`)
- New components: Masonry, Drawer with resizing, InputNumber spinner mode[1][4]

**Component Categories to Wrap:**
- **General**: Button, Icon, Typography
- **Layout**: Divider, Grid, Layout, Space, Flex, Splitter
- **Navigation**: Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps
- **Data Entry**: AutoComplete, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload
- **Data Display**: Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, Statistic, Table, Tabs, Tag, Timeline, Tooltip, Tree, Masonry
- **Feedback**: Alert, Drawer, Message, Modal, Notification, Progress, Result, Skeleton, Spin
- **Other**: Affix, App, ConfigProvider, FloatButton, Watermark[5][6]

### Wrapper Implementation Strategy

```typescript
// Core wrapper pattern structure
import { ComponentName as AntComponentName, ComponentNameProps } from 'antd';
import { FC, forwardRef } from 'react';

export interface CustomComponentNameProps extends ComponentNameProps {
  // Add custom props here
}

export const ComponentName = forwardRef<HTMLElement, CustomComponentNameProps>(
  (props, ref) => {
    // Add custom logic, default props, transformations
    const enhancedProps = {
      // Apply defaults
      ...props,
    };
    
    return <AntComponentName ref={ref} {...enhancedProps} />;
  }
);

// Preserve sub-components (e.g., Card.Meta, Card.Grid)
ComponentName.Meta = AntComponentName.Meta;
ComponentName.Grid = AntComponentName.Grid;
```

### Agent Tool List
- **File System Operations**: Read/write TypeScript files, create directory structures
- **AST Parser**: Analyze AntD type definitions and component APIs
- **Code Generator**: Generate wrapper components with proper TypeScript types
- **Dependency Manager**: Track @ant-design/icons@6+ compatibility
- **Documentation Generator**: Create usage examples and API docs

### Agent Workflow

**Phase 1: Setup & Analysis**
1. Verify environment: React 18+, antd@6, @ant-design/icons@6
2. Parse AntD component type definitions from node_modules
3. Create project structure: `/components/antd-wrappers/`

**Phase 2: Component Generation**
For each component:
1. Extract base component props and sub-components
2. Generate wrapper with:
   - TypeScript interface extending base props
   - forwardRef implementation for ref forwarding
   - Default prop injection logic
   - Preservation of sub-components (Card.Meta, Form.Item, etc.)
3. Handle deprecated APIs with migration comments[1]

**Phase 3: Configuration & Exports**
1. Create `index.ts` barrel export file
2. Generate ConfigProvider wrapper for global defaults
3. Create theme configuration helper
4. Set up Webpack/Vite alias configuration for automatic import replacement[3]

**Phase 4: Documentation**
1. Generate usage examples for each wrapper
2. Create migration guide from direct AntD imports
3. Document custom props and enhancements

### Style Guide

**Code Standards:**
- Use TypeScript strict mode
- Maintain 100% type coverage
- Use named exports (not default exports)
- Follow AntD naming conventions
- Preserve all original component functionality

**Wrapper Enhancements:**
- Add sensible defaults without breaking existing usage
- Support theme tokens via CSS variables
- Implement semantic classNames/styles structure
- Add data-testid props for testing
- Support controlled/uncontrolled modes properly[2]

**File Organization:**
```
/components/antd-wrappers/
├── index.ts                    # Main exports
├── config/
│   ├── ConfigProvider.tsx      # Global config wrapper
│   └── theme.ts                # Theme utilities
├── general/
│   ├── Button.tsx
│   └── Typography.tsx
├── layout/
│   ├── Space.tsx
│   └── Grid.tsx
├── data-entry/
│   ├── Form.tsx
│   ├── Input.tsx
│   └── Select.tsx
└── ...other categories
```

### Example Implementation

```typescript
// components/antd-wrappers/general/Button.tsx
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { forwardRef } from 'react';

export interface ButtonProps extends AntButtonProps {
  /** Add loading text during async operations */
  loadingText?: string;
  /** Auto-focus on mount */
  autoFocus?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loadingText, autoFocus, children, loading, ...props }, ref) => {
    return (
      <AntButton
        ref={ref}
        loading={loading}
        autoFocus={autoFocus}
        {...props}
      >
        {loading && loadingText ? loadingText : children}
      </AntButton>
    );
  }
);

Button.Group = AntButton.Group; // Preserve sub-component
```

### Webpack/Vite Alias Configuration

To automatically use wrappers instead of direct AntD imports:[3]

```typescript
// webpack.config.js
resolve: {
  alias: {
    'antd': path.resolve(__dirname, 'components/antd-wrappers')
  }
}

// vite.config.ts
resolve: {
  alias: {
    'antd': '/src/components/antd-wrappers'
  }
}
```
