import React, { FormEvent, useState } from 'react';

import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from 'antd';

import Highlighter from 'react-highlight-words';
import styles from '../../../../styles/app.module.scss';

import { Notification } from '../../../../components/Notification';
import { api } from '../../../../services/api';
import { GetServerSideProps } from 'next';

const { Option } = Select;

interface IRawMaterial {
  id: string;
  name: string;
  code: string;
  category_name: string;
}

interface IReaceivment {
  id: string;
  quantity: Number;
  grade_value: Number;
  unitary_value: Number;
}

interface IProp {
  rawMaterial: IRawMaterial[];
}

export default function Receivment({ rawMaterial }: IProp) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [fiscalKey, setFiscalKey] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState('');
  const [rawMaterials, setRawMaterials] = useState(rawMaterial);
  const [rawMaterialsAdded, setRawMaterialsAdded] = useState([{}]);

  console.log('rawMaterial: ', rawMaterial);

  async function handleRegister(e: FormEvent) {}
  async function handleClose() {}

  return (
    <div>
      <Layout>
        <Row justify="end">
          <Col>
            <Button
              size={'large'}
              className={styles.button}
              icon={<PlusOutlined style={{ fontSize: '16px' }} />}
              onClick={() => setIsModalOpen(true)}
            >
              Cadastrar Insumo
            </Button>
          </Col>
        </Row>
        {/* <SearchTable /> */}
      </Layout>
      <Modal
        width={1200}
        title="Cadastro de Insumos"
        visible={true}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose} type="default">
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleRegister}
          >
            Salvar
          </Button>,
        ]}
      >
        <Row gutter={5}>
          <Col span={8}>
            <Form.Item
              key="insFormItem"
              labelCol={{ span: 23 }}
              label="Nome da Entrada"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="insName"
                size="large"
                style={{ width: 400, marginBottom: '10px' }}
                placeholder="Digite o código INS, ex: "
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              key=""
              labelCol={{ span: 23 }}
              label="Descrição:"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="descriptionIns"
                size="large"
                style={{ width: 400, marginBottom: '10px' }}
                placeholder="Descrição do INS"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              key="descriptionFormItem"
              labelCol={{ span: 23 }}
              label="Descrição:"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="descriptionIns"
                size="large"
                style={{ width: 400, marginBottom: '10px' }}
                placeholder="Descrição do INS"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={12}>
            <Form.Item
              key="formItemRawMaterials"
              labelCol={{ span: 23 }}
              label="Insumo: "
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Select
                showSearch
                size="large"
                style={{ width: 400, marginBottom: '10px' }}
                placeholder="Selecion o insumo"
                optionFilterProp="children"
                onChange={(e) => {
                  console.log(e);
                }}
              >
                {rawMaterials.map((item) => (
                  <>
                    <Option key={item.id} value={item.id}>
                      {item.code + ' - ' + item.name}
                    </Option>
                  </>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Form.Item
            key="fatorDeConversão"
            labelCol={{ span: 23 }}
            label="Fator de Conversão:"
            labelAlign={'left'}
            style={{ backgroundColor: 'white', fontWeight: 'bold' }}
            required
          >
            <Input
              key="descriptionIns"
              size="large"
              style={{ width: 400, marginBottom: '10px' }}
              placeholder="Digite o Fator"
              onChange={(e) => {
                console.log(e);
              }}
              pattern="[0-9]+$"
            />
          </Form.Item>
        </Row>
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const rawMaterialResponse = await api.get('/warehouse/raw-material');

    const rawMaterialData = rawMaterialResponse.data;

    return {
      props: {
        rawMaterial: rawMaterialData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        rawMaterial: [{}],
      },
    };
  }
};
