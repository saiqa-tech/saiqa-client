/**
 * App Component Wrapper
 * 
 * Re-exports Ant Design App component for providing global context.
 * The App component provides message, notification, and modal static methods.
 * 
 * @example
 * ```tsx
 * import { App } from '@/components/antd-wrappers';
 * 
 * function Root() {
 *   return (
 *     <App>
 *       <YourApp />
 *     </App>
 *   );
 * }
 * ```
 */
export { App } from 'antd';
export type { AppProps } from 'antd';
