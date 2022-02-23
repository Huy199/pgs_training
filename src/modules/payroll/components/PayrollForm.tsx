import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';

export interface Props {
  loading: boolean;
  page: number;
  pageSize: number;
  handlePage(page: number): void;
  handlePageSize(pageSize: number): void;
  columns: any;
  payrolls: any;
}
const PayrollForm = (props: Props) => {
  const { loading, page, pageSize, handlePage, handlePageSize, columns, payrolls } = props;

  return (
    <Table
      loading={loading}
      pagination={{
        current: page,
        total: 200,
        pageSize: pageSize,
        onChange: (page, pageSize) => {
          handlePage(page);
          handlePageSize(pageSize);
        },
      }}
      columns={columns}
      dataSource={payrolls}
    ></Table>
  );
};

export default PayrollForm;
