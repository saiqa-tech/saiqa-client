import { Layout as AntLayout, type LayoutProps } from 'antd';

/**
 * Enhanced Layout wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Layout API
 * - Preserves all sub-components (Header, Content, Footer, Sider)
 * 
 * @example
 * ```tsx
 * <Layout>
 *   <Layout.Header>Header</Layout.Header>
 *   <Layout.Content>Content</Layout.Content>
 *   <Layout.Footer>Footer</Layout.Footer>
 * </Layout>
 * ```
 */
export const Layout: typeof AntLayout = ((props: LayoutProps) => {
    return <AntLayout {...props} />;
}) as any;

// Preserve sub-components
Layout.Header = AntLayout.Header;
Layout.Content = AntLayout.Content;
Layout.Footer = AntLayout.Footer;
Layout.Sider = AntLayout.Sider;

export type { LayoutProps };
