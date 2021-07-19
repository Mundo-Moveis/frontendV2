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
  Tooltip,
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
  coefficient: Number;
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
    {
      id: '',
      quantity: '',
      grade_value: 0,
      unitary_value: '',
      rawMaterialName: '',
    },
  ]);

  async function handleRegister(e: FormEvent) {
    try {
      let data = {
        description: description,
        fiscal_key: fiscalKey,
        fiscal_number: fiscalNumber,
      };
      let response = await api.post('/warehouse/receipt', data);

      let data2 = {
        raw_materials: rawMaterialsAdded,
      };

      let response2 = api.post(`/warehouse/receipt/${response.data.id}`, data2);
    } catch (error) {}
  }
  async function handleClose() {}

  function addNewReceivement() {
    const newArray = [
      ...rawMaterialsAdded,
      {
        id: '',
        quantity: '',
        grade_value: 0,
        unitary_value: '',
        rawMaterialName: '',
      },
    ];
    setRawMaterialsAdded(newArray);
  }

  function removeReceivement(indexOfItem: number) {
    let newArray = [...rawMaterialsAdded];
    newArray.splice(indexOfItem, 1);
    setRawMaterialsAdded(newArray);
  }

  function handleChangeRawMaterial(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].id = value[0];
    newArray[
      index
    ].rawMaterialName = `${value[3]} | ${value[1]} / (${value[2]})`;

    setRawMaterialsAdded(newArray);
    console.log(rawMaterialsAdded);
  }

  function handleChangeUnitaryValue(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].unitary_value = value;
    newArray[index].grade_value =
      parseFloat(value) * parseFloat(newArray[index].quantity);
    setRawMaterialsAdded(newArray);
  }

  function handleChangeQuantity(value, index) {
    let newArray = [...rawMaterialsAdded];
    newArray[index].quantity = value;
    newArray[index].grade_value = value;

    setRawMaterialsAdded(newArray);
  }

  function handleChangeGradeValue(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].grade_value = value;
    newArray[index].grade_value =
      parseFloat(value) * parseFloat(newArray[index].quantity);
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
              Cadastrar Recebimento
            </Button>
          </Col>
        </Row>
        {/* <SearchTable /> */}
      </Layout>
      <Modal
        width={800}
        title="Cadastro de Entradas"
        visible={isModalOpen}
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
                  setDescription(e.target.value);
                }}
                placeholder="Ex: EUCATEX 21/04/21"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              key="fiscalNumberFormItem"
              labelCol={{ span: 23 }}
              label="Número da NF-e:"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="fiscalNumber"
                size="large"
                placeholder=""
                onChange={(e) => {
                  setFiscalNumber(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              key="fiscalNumberFormItem"
              labelCol={{ span: 23 }}
              label="Chave da Nota:"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="fiscalKey"
                size="large"
                placeholder=""
                onChange={(e) => {
                  setFiscalKey(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {rawMaterialsAdded.map((itens, index) => (
          <>
            <Row gutter={24}>
              <Col span={15}>
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
                    value={itens.rawMaterialName}
                    onChange={(e) => {
                      console.log(e);

                      handleChangeRawMaterial(e, index);
                    }}
                  >
                    {rawMaterials.map((item) => (
                      <>
                        <Option
                          key={item.id}
                          value={[
                            item.id,
                            item.name,
                            item.unit_measurement_name,
                            item.code,
                            item.coefficient,
                          ]}
                        >
                          {`${item.code} |
                            ${item.name} / 
                            (${item.unit_measurement_name})`}
                        </Option>
                      </>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={5}>
                <Form.Item
                  key="formQuantity"
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
                    key="quantiyKey"
                    size="large"
                    onChange={(e) => {
                      handleChangeQuantity(e.target.value, index);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  key="formUnitaryValue"
                  labelCol={{ span: 28 }}
                  label="Valor Unitário do Insumo: "
                  labelAlign={'left'}
                  style={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    marginRight: '5%',
                  }}
                >
                  <Input
                    type="number"
                    key="unitaryValue"
                    size="large"
                    onChange={(e) => {
                      handleChangeUnitaryValue(e.target.value, index);
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  key="formTotal"
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
                    key="totalKey"
                    size="large"
                    placeholder="0"
                    disabled={true}
                    value={itens.grade_value}
                    style={{ width: '80%', marginRight: '5%' }}
                  />
                  {rawMaterialsAdded.length != 1 && (
                    <MinusCircleOutlined
                      style={{ color: 'red' }}
                      onClick={() => removeReceivement(index)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col span={24}>
                {rawMaterialsAdded.length - 1 === index && (
                  <Button
                    key="primary"
                    title="Novo insumo"
                    style={{
                      width: '100%',
                      color: 'white',
                      backgroundColor: 'rgb(5, 155, 50)',
                    }}
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
