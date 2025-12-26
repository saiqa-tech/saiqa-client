import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

export interface ButtonProps extends AntButtonProps {
    /** Add loading text during async operations */
    loadingText?: string;
    /** Test ID for testing purposes */
    'data-testid'?: string;
}

/**
 * Enhanced Button wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Button API
 * - Loading text support during async operations
 * - Ref forwarding support
 * - data-testid support for testing
 * - Preserves all sub-components (Button.Group)
 * 
 * @example
 * ```tsx
 * <Button type="primary" loading loadingText="Saving..." data-testid="save-btn">
 *   Save
 * </Button>
 * ```
 */
const ButtonComponent = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (props, ref) => {
        const { loadingText, children, loading, 'data-testid': testId, ...rest } = props;
        return (
            <AntButton
                ref={ref as any}
                loading={loading}
                data-testid={testId}
                {...rest}
            >
                {loading && loadingText ? loadingText : children}
            </AntButton>
        );
    }
);

ButtonComponent.displayName = 'Button';

// Export with proper typing and sub-components
export const Button = ButtonComponent as ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement | HTMLAnchorElement>> & {
    Group: typeof AntButton.Group;
};

// Preserve sub-components
Button.Group = AntButton.Group;
