import { Table as AntTable, type TableProps as AntTableProps } from 'antd';

export type TableProps<RecordType = any> = AntTableProps<RecordType>;

/**
 * Enhanced Table wrapper for Ant Design 6.0
 * 
 * Features:
 * - Full compatibility with AntD Table API
 * - Default pagination with size changer and total display
 * - Preserves all sub-components (Table.Column, Table.ColumnGroup, Table.Summary)
 * 
 * @example
 * ```tsx
 * <Table 
 *   dataSource={data} 
 *   columns={columns}
 *   rowKey="id"
 * />
 * ```
 */
export const Table: typeof AntTable = ((props: TableProps) => {
    const { pagination = { showSizeChanger: true, showTotal: (total) => `Total ${total} items` }, ...rest } = props;
    return <AntTable pagination={pagination} {...rest} />;
}) as any;

// Preserve sub-components
Table.Column = AntTable.Column;
Table.ColumnGroup = AntTable.ColumnGroup;
Table.Summary = AntTable.Summary;
Table.SELECTION_COLUMN = AntTable.SELECTION_COLUMN;
Table.EXPAND_COLUMN = AntTable.EXPAND_COLUMN;
Table.SELECTION_ALL = AntTable.SELECTION_ALL;
Table.SELECTION_INVERT = AntTable.SELECTION_INVERT;
Table.SELECTION_NONE = AntTable.SELECTION_NONE;
