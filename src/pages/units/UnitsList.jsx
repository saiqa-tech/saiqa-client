import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  message,
  Typography,
  Card,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { unitsAPI } from '../../api/endpoints/units';
import { PAGINATION } from '../../utils/constants';

const { Title } = Typography;
const { Search } = Input;

const UnitsListPage = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const fetchUnits = async () => {
    setLoading(true);
    try {
      const response = await unitsAPI.getUnits({ search: searchText });
      setUnits(response.units || []);
    } catch (error) {
      message.error('Failed to fetch units');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [searchText]);

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete Unit',
      content: `Are you sure you want to delete "${record.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await unitsAPI.deleteUnit(record.id);
          message.success('Unit deleted successfully');
          fetchUnits();
        } catch (error) {
          message.error(
            error.response?.data?.message || 'Failed to delete unit. It may have child units or assigned users.'
          );
        }
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Parent Unit',
      dataIndex: ['parentUnit', 'name'],
      key: 'parentUnit',
      render: (text) => text || 'Root',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/units/${record.id}/edit` })}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Units</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/units/create')}
        >
          Create Unit
        </Button>
      </div>

      <Card>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Search
            placeholder="Search by unit name"
            allowClear
            onSearch={setSearchText}
            style={{ width: 300 }}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchUnits}>
            Refresh
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={units}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default UnitsListPage;
