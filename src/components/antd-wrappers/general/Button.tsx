import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import type { FC } from 'react';

export interface ButtonProps extends AntButtonProps {
    /** Add loading text during async operations */
    loadingText?: string;
}

/**
 * Enhanced Button wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Button API
 * - Loading text support during async operations
 * - Preserves all sub-components (Button.Group)
 * 
 * @example
 * ```tsx
 * <Button type="primary" loading loadingText="Saving...">
 *   Save
 * </Button>
 * ```
 */
export const Button = ((props: ButtonProps) => {
    const { loadingText, children, loading, ...rest } = props;
    return (
        <AntButton loading={loading} {...rest}>
            {loading && loadingText ? loadingText : children}
        </AntButton>
    );
}) as FC<ButtonProps> & {
    Group: typeof AntButton.Group;
};

// Preserve sub-components
Button.Group = AntButton.Group;
