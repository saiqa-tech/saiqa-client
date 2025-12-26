import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

/**
 * Default theme configuration for the application
 * Uses Ant Design 6.0 CSS Variables architecture
 */
export const defaultTheme: ThemeConfig = {
    token: {
        // Primary colors
        colorPrimary: '#1890ff',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#1890ff',

        // Border
        borderRadius: 6,

        // Typography
        fontSize: 14,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {
        Button: {
            // Button-specific tokens can be customized here
            controlHeight: 32,
        },
        Input: {
            controlHeight: 32,
        },
        Select: {
            controlHeight: 32,
        },
    },
};

/**
 * Dark theme configuration
 */
export const darkTheme: ThemeConfig = {
    ...defaultTheme,
    algorithm: theme.darkAlgorithm,
    token: {
        ...defaultTheme.token,
        colorBgBase: '#141414',
    },
};

/**
 * Compact theme configuration
 */
export const compactTheme: ThemeConfig = {
    ...defaultTheme,
    algorithm: theme.compactAlgorithm,
    token: {
        ...defaultTheme.token,
        fontSize: 12,
    },
    components: {
        ...defaultTheme.components,
        Button: {
            controlHeight: 24,
        },
        Input: {
            controlHeight: 24,
        },
        Select: {
            controlHeight: 24,
        },
    },
};

/**
 * Utility function to merge custom theme with default theme
 */
export const mergeTheme = (customTheme: Partial<ThemeConfig>): ThemeConfig => {
    return {
        ...defaultTheme,
        ...customTheme,
        token: {
            ...defaultTheme.token,
            ...customTheme.token,
        },
        components: {
            ...defaultTheme.components,
            ...customTheme.components,
        },
    };
};
