import { message as antMessage } from 'antd';

/**
 * Enhanced message wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD message API
 * - Preserves all methods (success, error, info, warning, loading)
 * 
 * @example
 * ```tsx
 * message.success('Operation successful');
 * message.error('Operation failed');
 * message.loading('Processing...', 0);
 * ```
 */
export const message = antMessage;
