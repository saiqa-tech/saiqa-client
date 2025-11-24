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
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { designationsAPI } from '../../api/endpoints/designations';

const { Title } = Typography;
const { Search } = Input;

const DesignationsListPage = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const response = await designationsAPI.getDesignations({ search: searchText });
      setDesignations(response.designations || []);
    } catch (error) {
      message.error('Failed to fetch designations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, [searchText]);

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete Designation',
      content: `Are you sure you want to delete "${record.name}"?`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await designationsAPI.deleteDesignation(record.id);
          message.success('Designation deleted successfully');
          fetchDesignations();
        } catch (error) {
          message.error(
            error.response?.data?.message || 'Failed to delete designation. It may have assigned users.'
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
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
            onClick={() => navigate({ to: `/designations/${record.id}/edit` })}
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
        <Title level={2}>Designations</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/designations/create')}
        >
          Create Designation
        </Button>
      </div>

      <Card>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Search
            placeholder="Search by designation name"
            allowClear
            onSearch={setSearchText}
            style={{ width: 300 }}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchDesignations}>
            Refresh
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={designations}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default DesignationsListPage;
