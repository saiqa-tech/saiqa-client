import { notification as antNotification } from 'antd';

/**
 * Enhanced notification wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD notification API
 * - Preserves all methods (success, error, info, warning, open)
 * 
 * @example
 * ```tsx
 * notification.success({
 *   message: 'Success',
 *   description: 'Operation completed successfully'
 * });
 * ```
 */
export const notification = antNotification;
