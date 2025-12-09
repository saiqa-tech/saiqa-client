import { Space as AntSpace, type SpaceProps as AntSpaceProps } from 'antd';
import { forwardRef } from 'react';

export interface SpaceProps extends AntSpaceProps {
    /** Add data-testid for testing */
    'data-testid'?: string;
}

/**
 * Enhanced Space wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Space API
 * - Default gap for consistent spacing
 * - Test-friendly with data-testid
 * - Preserves all sub-components (Space.Compact)
 * 
 * @example
 * ```tsx
 * <Space direction="vertical">
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 * </Space>
 * ```
 */
export const Space = forwardRef<HTMLDivElement, SpaceProps>(
    ({ 'data-testid': testId, size = 'small', ...props }, ref) => {
        return (
            <AntSpace
                ref={ref}
                size={size}
                data-testid={testId}
                {...props}
            />
        );
    }
);

Space.displayName = 'Space';

// Preserve sub-components
Space.Compact = AntSpace.Compact;
