import React, { useEffect, useState } from 'react';
import { Table, Select, Row, Col, DatePicker, Input, Button, Modal, Form } from 'antd';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';
import { UploadOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { LIST_PAYROLL } from '../intl/mock_data';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { deletePayrolls, setPayrolls } from '../redux/payrollReducer';
import { IPayroll } from '../../../models/Payroll';

const { Title } = Typography;
const { Option } = Select;

const { RangePicker } = DatePicker;
const ProductPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState<IPayroll[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState(new Date('2022/02/10'));
  const payrolls = useSelector((state: AppState) => state.payroll?.payrolls);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [client, setClient] = useState('');
  const [currency, setCurrency] = useState('');
  const [total, setTotal] = useState();
  const [key, setKey] = useState(0);
  const [status, setStatus] = useState('');
  const showModal = (data: IPayroll, key: any) => {
    setClient(data.company_id);
    setCurrency(data.currency);
    setKey(key);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newData = Array.from(datas);
    const newClient = { ...newData[key], company_id: client, currency: currency };
    newData[key] = newClient;
    dispatch(setPayrolls(newData));
    setIsModalVisible(false);
  };

  const deletePayroll = (key: number) => {
    setKey(key);
    const newData = Array.from(datas);
    const deleteData = newData.filter((data, index) => {
      return index !== key;
    });

    dispatch(deletePayrolls(deleteData));
  };
  // useEffect(() => {

  // }, [datas]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    setLoading(true);
    if (LIST_PAYROLL.payrolls) {
      dispatch(setPayrolls(LIST_PAYROLL.payrolls));
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setDatas([...payrolls]);
  }, [payrolls]);

  const columns = [
    {
      key: '1',
      title: 'Status',
      dataIndex: 'id',
      render: (row: any, data: IPayroll) => {
        if (data.fulfilled) {
          return <p style={{ color: 'rgb(0 246 4)' }}>Fulfilled</p>;
        } else if (data.received) {
          return <p style={{ color: 'rgb(0 198 247)' }}>Receive</p>;
        } else if (data.date_processed) {
          return <p style={{ color: 'rgb(246 246 50)' }}>Processing</p>;
        } else if (!data.approved) {
          return <p style={{ color: 'rgb(123 126 126)' }}>Pending</p>;
        }
      },
    },
    {
      key: '2',
      title: 'Date',
      dataIndex: 'time_created',
    },
    {
      key: '3',
      title: 'Client',
      dataIndex: 'company_id',
    },
    {
      key: '4',
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      key: '5',
      title: 'Total',
      dataIndex: 'number_of_recipients',
    },
    {
      key: '6',
      title: 'Invoice #',
      dataIndex: 'payroll_id',
    },
    {
      key: '7',
      render: (index: any, data: IPayroll, key: any) => {
        return (
          <div>
            <Button
              onClick={() => showModal(data, key)}
              style={{ width: '150px', height: '40px' }}
              type="primary"
              ghost
            >
              View Detail
            </Button>
            <DeleteOutlined
              type="button"
              onClick={() => deletePayroll(key)}
              style={{ color: 'red', fontSize: '25px', marginLeft: '16px', marginBottom: '-10px' }}
            />
          </div>
        );
      },
    },
  ];

  function onChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onChangeStatus(value: string) {
    setStatus(value);
  }

  function onChangeCurrent(value: any) {
    setCurrency(value);
  }

  function onSearch(val: any) {
    console.log('search:', val);
  }
  const handleDate = (e: any) => {
    console.log(e);
  };

  const handleInputClient = (e: any) => {
    setClient(e.target.value);
  };

  return (
    <div
      style={{
        width: '100%',
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        height: '90vh',
      }}
    >
      <Row style={{ marginBottom: '32px' }}>
        <Col span={21}>
          <Title level={3}>Payroll Transactions List</Title>
        </Col>
        <Button style={{ width: '150px' }} type="primary" icon={<UploadOutlined />}>
          export
        </Button>
      </Row>
      <Row style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Row>
            <Col span={12}>
              <Select
                style={{ width: '100px' }}
                showSearch
                placeholder="Status"
                optionFilterProp="children"
                onChange={onChangeStatus}
              >
                <Option value="Processing">Processing</Option>
                <Option value="Fullfilled">Fullfilled</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Received">Received</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Select
                style={{ width: '100px' }}
                showSearch
                placeholder="Client"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={18}>
              <RangePicker onChange={handleDate} showTime />
            </Col>

            <Col span={4}>
              <Input placeholder="Invoice #" />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={12}>
              <Button type="primary" ghost>
                Apply
              </Button>
            </Col>
            <Col span={6}>
              <Button danger>Clear</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        loading={loading}
        pagination={{
          current: page,
          total: 200,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        columns={columns}
        dataSource={payrolls}
      ></Table>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h6>Client</h6>
        <Input className="mb-3" value={client} onChange={handleInputClient} />
        <h6>Currency</h6>
        <Select
          style={{ width: '100px' }}
          showSearch
          optionFilterProp="children"
          onChange={onChangeCurrent}
          value={currency}
        >
          <Option value="USD">USD</Option>
          <Option value="VND">VND</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ProductPage;
