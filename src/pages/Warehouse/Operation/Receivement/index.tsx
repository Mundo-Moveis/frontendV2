import React, { FormEvent, useState } from 'react';

import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
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
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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

export default function Receivment({
      rawMaterial,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [fiscalKey, setFiscalKey] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState('');
  const [rawMaterials, setRawMaterials] = useState(rawMaterial);
  const [rawMaterialsAdded, setRawMaterialsAdded] = useState([
    { id: '', quantity: '', grade_value: '', unitary_value: '' },
  ]);

  async function handleRegister(e: FormEvent) {}
  async function handleClose() {}

  function addNewReceivement() {
    const newArray = [
      ...rawMaterialsAdded,
      { id: '', quantity: '', grade_value: '', unitary_value: '' },
    ];
    setRawMaterialsAdded(newArray);
  }

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
        width={900}
        title="Cadastro de Entradas"
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
              key="receivedNameFormItem"
              labelCol={{ span: 23 }}
              label="Nome da Entrada"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="receivedName"
                size="large"
                placeholder="Digite o código INS, ex: "
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              key="InsDescription"
              labelCol={{ span: 23 }}
              label="Descrição:"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="descriptionIns"
                size="large"
                placeholder="Descrição do INS"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {rawMaterialsAdded.map((itens, index) => (
          <>
            <Row gutter={24}>
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
                    style={{ width: '140%', marginBottom: '10px' }}
                    placeholder="Selecion o insumo"
                    optionFilterProp="children"
                    onChange={(e) => {
                      console.log(e);
                    }}
                  >
                    {rawMaterials.map((item) => (
                      <>
                        <Option key={item.id} value={item.id}>
                          {item.code +
                            ' - ' +
                            item.name +
                            ` (${item.unit_measurement_name})`}
                        </Option>
                      </>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  key="formFiscalKey"
                  labelCol={{ span: 23 }}
                  label="Quantidade: "
                  labelAlign={'left'}
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    marginRight: '5%',
                  }}
                  required
                >
                  <Input
                    type="number"
                    key="fiscalKey"
                    size="large"
                    placeholder="Número da Nota"
                    onChange={(e) => {
                      console.log(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  key="formQuantity"
                  labelCol={{ span: 28 }}
                  label="Valor Unitário do Insumo: "
                  labelAlign={'left'}
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    marginRight: '5%',
                  }}
                  required
                >
                  <Input
                    type="number"
                    key="descriptionIns"
                    size="large"
                    placeholder="Descrição do INS"
                    onChange={(e) => {
                      console.log(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  key="formQuantity"
                  labelCol={{ span: 23 }}
                  label="Total: "
                  labelAlign={'left'}
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  <Input
                    type="number"
                    key="descriptionIns"
                    size="large"
                    placeholder="Digite o Número da nota fiscal"
                    onChange={(e) => {
                      console.log(e);
                    }}
                    disabled={true}
                    style={{ width: '80%', marginRight: '5%' }}
                  />
                  <MinusCircleOutlined
                    onClick={() => {
                      console.log('a');
                    }}
                  />
                </Form.Item>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col>
                {rawMaterialsAdded.length - 1 === index && (
                  <Button
                    key="primary"
                    title="Novo insumo"
                    style={{ width: '150%' }}
                    onClick={addNewReceivement}
                  >
                    <PlusOutlined />
                    Adicionar insumo
                  </Button>
                )}
              </Col>
            </Row>
          </>
        ))}
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
