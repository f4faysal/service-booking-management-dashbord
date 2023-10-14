"use client";

import { Table } from "antd";

type UMTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filters: any, sorter: any) => void;
  showPagination?: boolean;
};

const SBTable = ({
  loading,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger,
  onPaginationChange,
  onTableChange,
  showPagination,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: ["5", "10", "15", "20"],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  );
};

export default SBTable;
