import {
    ConfigProvider as AntConfigProvider,
    type ConfigProviderProps as AntConfigProviderProps,
} from 'antd';
import { type FC, type ReactNode } from 'react';
import { defaultTheme } from './theme';

export interface ConfigProviderProps extends AntConfigProviderProps {
    children: ReactNode;
}

/**
 * Enhanced ConfigProvider wrapper for Ant Design 6.0
 * Provides default theme configuration and global settings
 */
export const ConfigProvider: FC<ConfigProviderProps> = ({
    children,
    theme = defaultTheme,
    ...props
}) => {
    return (
        <AntConfigProvider
            theme={theme}
            {...props}
        >
            {children}
        </AntConfigProvider>
    );
};
