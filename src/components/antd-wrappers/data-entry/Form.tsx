import { Form as AntForm, type FormProps as AntFormProps } from 'antd';

export type FormProps<Values = any> = AntFormProps<Values>;

/**
 * Enhanced Form wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Form API
 * - Default vertical layout
 * - Preserves all sub-components and hooks (Form.Item, Form.List, useForm, etc.)
 * 
 * @example
 * ```tsx
 * <Form onFinish={handleSubmit}>
 *   <Form.Item name="username" label="Username">
 *     <Input />
 *   </Form.Item>
 * </Form>
 * ```
 */
export const Form = (<Values = any,>(props: FormProps<Values>) => {
    const { layout = 'vertical', ...rest } = props;
    return <AntForm<Values> layout={layout} {...rest as any} />;
}) as typeof AntForm;

// Preserve sub-components and hooks
Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.Provider = AntForm.Provider;
Form.useForm = AntForm.useForm;
Form.useFormInstance = AntForm.useFormInstance;
Form.useWatch = AntForm.useWatch;

export type { FormInstance } from 'antd';
