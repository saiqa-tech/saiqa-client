import { Flex as AntFlex, type FlexProps as AntFlexProps } from 'antd';
import { forwardRef } from 'react';

export interface FlexProps extends AntFlexProps {
    /** Add data-testid for testing */
    'data-testid'?: string;
}

/**
 * Enhanced Flex wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Flex API
 * - Default gap for consistent spacing
 * - Test-friendly with data-testid
 * 
 * @example
 * ```tsx
 * <Flex justify="space-between" align="center">
 *   <div>Left</div>
 *   <div>Right</div>
 * </Flex>
 * ```
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
    ({ 'data-testid': testId, gap = 'small', ...props }, ref) => {
        return (
            <AntFlex
                ref={ref}
                gap={gap}
                data-testid={testId}
                {...props}
            />
        );
    }
);

Flex.displayName = 'Flex';
