import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';

export type SelectProps<ValueType = any> = AntSelectProps<ValueType>;

/**
 * Enhanced Select wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Select API
 * - Default showSearch enabled for better UX
 * - Preserves all sub-components (Select.Option, Select.OptGroup)
 * 
 * @example
 * ```tsx
 * <Select placeholder="Select an option">
 *   <Select.Option value="1">Option 1</Select.Option>
 *   <Select.Option value="2">Option 2</Select.Option>
 * </Select>
 * ```
 */
export const Select: typeof AntSelect = ((props: SelectProps) => {
    const { showSearch = true, ...rest } = props;
    return <AntSelect showSearch={showSearch} {...rest} />;
}) as any;

// Preserve sub-components
Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;
