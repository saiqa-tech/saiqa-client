import { Pagination as AntPagination, type PaginationProps as AntPaginationProps } from 'antd';

export type PaginationProps = AntPaginationProps;

/**
 * Enhanced Pagination wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Pagination API
 * - Default showSizeChanger and showTotal enabled
 * 
 * @example
 * ```tsx
 * <Pagination 
 *   total={100} 
 *   current={currentPage}
 *   onChange={handlePageChange}
 * />
 * ```
 */
export const Pagination: typeof AntPagination = ((props: PaginationProps) => {
    const { showSizeChanger = true, showTotal = (total, range) => `${range[0]}-${range[1]} of ${total} items`, ...rest } = props;
    return <AntPagination showSizeChanger={showSizeChanger} showTotal={showTotal} {...rest} />;
}) as any;
