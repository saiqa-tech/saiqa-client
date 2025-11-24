import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography, Select, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { unitsAPI } from '../../api/endpoints/units';
import { formRules } from '../../utils/validators';

const { Title } = Typography;
const { TextArea } = Input;

const UnitEditPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setFetching(true);
    try {
      const [unitData, unitsData] = await Promise.all([
        unitsAPI.getUnit(id),
        unitsAPI.getUnits(),
      ]);

      // Filter out current unit and its descendants to prevent circular reference
      const filteredUnits = (unitsData.units || []).filter((unit) => unit.id !== id);
      setUnits(filteredUnits);

      form.setFieldsValue({
        name: unitData.unit.name,
        parentUnitId: unitData.unit.parentUnitId,
        description: unitData.unit.description,
      });
    } catch (error) {
      message.error('Failed to fetch unit data');
      navigate('/units');
    } finally {
      setFetching(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await unitsAPI.updateUnit(id, values);
      message.success('Unit updated successfully!');
      navigate('/units');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update unit');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Edit Unit</Title>

      <Card style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Unit Name"
            name="name"
            rules={formRules.name}
          >
            <Input placeholder="Enter unit name" />
          </Form.Item>

          <Form.Item
            label="Parent Unit"
            name="parentUnitId"
            help="Leave empty for root unit"
          >
            <Select
              placeholder="Select parent unit (optional)"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {units.map((unit) => (
                <Select.Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={4} placeholder="Enter description (optional)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Unit
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate('/units')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UnitEditPage;
