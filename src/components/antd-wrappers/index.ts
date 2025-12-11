/**
 * Ant Design 6.0 Wrapper Components
 * 
 * This module provides enhanced TypeScript wrappers for Ant Design components
 * with improved type safety, default configurations, and testing support.
 * 
 * Usage:
 * ```tsx
 * import { Button, Form, Table } from '@/components/antd-wrappers';
 * ```
 */

// Configuration
export { ConfigProvider } from './config/ConfigProvider';
export { App } from './config/App';
export { defaultTheme, darkTheme, compactTheme, mergeTheme } from './config/theme';
export type { ConfigProviderProps } from './config/ConfigProvider';
export type { AppProps } from './config/App';

// General
export { Button } from './general/Button';
export { Typography } from './general/Typography';
export type { ButtonProps } from './general/Button';
export type { TypographyProps } from 'antd';

// Layout
export { Space } from './layout/Space';
export { Flex } from './layout/Flex';
export { Layout } from './layout/Layout';
export { Grid } from './layout/Grid';
export { Divider } from './layout/Divider';
export { Row } from './layout/Row';
export { Col } from './layout/Col';
export type { SpaceProps } from './layout/Space';
export type { FlexProps } from './layout/Flex';
export type { LayoutProps } from './layout/Layout';
export type { DividerProps } from 'antd';
export type { RowProps } from './layout/Row';
export type { ColProps } from './layout/Col';

// Data Entry
export { Form } from './data-entry/Form';
export { Input } from './data-entry/Input';
export { Select } from './data-entry/Select';
export { Checkbox } from './data-entry/Checkbox';
export { Radio } from './data-entry/Radio';
export { DatePicker } from './data-entry/DatePicker';
export { Switch } from './data-entry/Switch';
export type { FormProps } from './data-entry/Form';
export type { InputProps } from './data-entry/Input';
export type { SelectProps } from './data-entry/Select';
export type { CheckboxProps } from './data-entry/Checkbox';
export type { RadioProps } from './data-entry/Radio';
export type { DatePickerProps } from './data-entry/DatePicker';
export type { SwitchProps } from './data-entry/Switch';

// Data Display
export { Table } from './data-display/Table';
export { Card } from './data-display/Card';
export { Tag } from './data-display/Tag';
export { Tabs } from './data-display/Tabs';
export { Avatar } from './data-display/Avatar';
export { Badge } from './data-display/Badge';
export { List } from './data-display/List';
export { Statistic } from './data-display/Statistic';
export { Result } from './data-display/Result';
export { Descriptions } from './data-display/Descriptions';
export type { TableProps } from './data-display/Table';
export type { CardProps } from './data-display/Card';
export type { TagProps } from './data-display/Tag';
export type { TabsProps } from './data-display/Tabs';
export type { AvatarProps } from './data-display/Avatar';
export type { BadgeProps } from './data-display/Badge';
export type { ListProps } from './data-display/List';
export type { StatisticProps } from './data-display/Statistic';
export type { ResultProps } from './data-display/Result';
export type { DescriptionsProps } from './data-display/Descriptions';

// Feedback
export { Modal } from './feedback/Modal';
export { Alert } from './feedback/Alert';
export { Drawer } from './feedback/Drawer';
export { message } from './feedback/message';
export { notification } from './feedback/notification';
export { Spin } from './feedback/Spin';
export { Progress } from './feedback/Progress';
export type { ModalProps } from './feedback/Modal';
export type { AlertProps } from './feedback/Alert';
export type { DrawerProps } from './feedback/Drawer';
export type { SpinProps } from './feedback/Spin';
export type { ProgressProps } from './feedback/Progress';

// Navigation
export { Menu } from './navigation/Menu';
export { Dropdown } from './navigation/Dropdown';
export { Breadcrumb } from './navigation/Breadcrumb';
export { Pagination } from './navigation/Pagination';
export { Steps } from './navigation/Steps';
export type { MenuProps } from 'antd';
export type { DropdownProps } from 'antd';
export type { BreadcrumbProps } from 'antd';
export type { PaginationProps } from './navigation/Pagination';
export type { StepsProps } from 'antd';

// Re-export commonly used types from antd
export type { FormInstance, Rule } from 'antd/es/form';
export type { ColumnType, TablePaginationConfig } from 'antd/es/table';
export type { GetProps, GetProp, GetRef } from 'antd';
