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
import { GetServerSideProps } from 'next';

const { Option } = Select;

interface IRawMaterial {
  id: string;
  name: string;
  unit_measurement_name: string;
  code: string;
}
interface IStorage {
  id: string;
  quantity: number;
  cargo: string;
  position_name: string;
  position_id: string;
  raw_material_name: string;
}

interface IStorageProps {
  rawMaterial: IRawMaterial[];
  storage: IStorage[];
}

export default function Storage({ rawMaterial, storage }: IStorageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawMaterials, setRawMaterials] = useState(rawMaterial);
  const [storages, setStorages] = useState(storage);
  const [receipts, setReceipts] = useState([
    {
      warehouse_receipt_description: '',
      warehouse_raw_material_name: '',
      raw_material_id: '',
      receipt_id: '',
      unitary_value: 0,
      grade_value: 0,
    },
  ]);

  const [rawMaterialsAdded, setRawMaterialsAdded] = useState([
    {
      raw_material_id: '',
      quantity: 0,
      cargo: '',
      position_id: '',
      raw_material_receipt_id: '',
      rawMaterialName: '',
      receiptName: '',
      maxQuantity: 0,
    },
  ]);

  async function handleRegister(e) {
    e.preventDefault();
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleEdit(data: IStorage) {}

  function handleChangeCargo(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].cargo = value;

    setRawMaterialsAdded(newArray);
  }

  function handleChangeRawMaterial(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].raw_material_id = value[0];
    newArray[
      index
    ].rawMaterialName = `${value[3]} | ${value[1]} / (${value[2]})`;

    setRawMaterialsAdded(newArray);
    console.log(rawMaterialsAdded);
  }

  async function handleClickReceipt(index) {
    const newArray = [...rawMaterialsAdded];
    const response = await api.get(`/warehouse/receipt/raw-material`, {
      params: { raw_material_id: newArray[index].raw_material_id },
    });

    setReceipts(response.data);
    console.log(receipts);
  }

  function handleChangeReceipt(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].raw_material_receipt_id = value[0];
    newArray[index].receiptName = value[2];
    newArray[index].raw_material_receipt_id = value[5];
    newArray[index].maxQuantity = value[3];

    setRawMaterialsAdded(newArray);
  }

  function handleChangeQuantity(value, index) {
    let newArray = [...rawMaterialsAdded];

    newArray[index].quantity = value;

    setRawMaterialsAdded(newArray);
  }

  class SearchTable extends React.Component {
    state = {
      searchText: '',
      searchedColumn: '',
    };

    getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() =>
                this.handleSearch(selectedKeys, confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Limpar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: (text) =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };

    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    render() {
      const columns = [
        {
          title: 'Descrição',
          dataIndex: 'description',
          key: 'description',
          width: '30%',
          ...this.getColumnSearchProps('description'),
          sorter: (a, b) => a.description.length - b.description.length,
        },
        {
          title: 'Número da Nota',
          dataIndex: 'fiscal_number',
          key: 'fiscal_number',
          width: '30%',
          ...this.getColumnSearchProps('fiscal_number'),
          sorter: (a, b) => a.fiscal_number.length - b.fiscal_number.length,
        },
        {
          title: 'Chave da Nota',
          dataIndex: 'fiscal_key',
          key: 'fiscal_key',
          width: '30%',
          ...this.getColumnSearchProps('fiscal_key'),
          sorter: (a, b) => a.fiscal_key.length - b.fiscal_key.length,
        },
        {
          title: 'Criado Em',
          dataIndex: 'created_at',
          key: 'created_at',
          width: '40%',
          ...this.getColumnSearchProps('created_at'),
          sorter: (a, b) => a.created_at.length - b.created_at.length,
        },
        {
          title: 'Operação',
          key: 'operation',
          render: (record) => {
            return (
              <>
                <EditFilled
                  style={{ cursor: 'pointer', fontSize: '16px' }}
                  onClick={() => handleEdit(record)}
                />
              </>
            );
          },
        },
      ];
      return <Table columns={columns} dataSource={storages} />;
    }
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
              Realizar Armazenagem
            </Button>
          </Col>
        </Row>
        <SearchTable />
      </Layout>
      <Modal
        width={800}
        title="Armazenagem"
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
        {rawMaterialsAdded.map((selectedIten, index) => (
          <>
            <Row gutter={5}>
              <Col span={8}>
                <Form.Item
                  key="storageCargoFormItem"
                  labelCol={{ span: 23 }}
                  label="Lote"
                  labelAlign={'left'}
                  style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                  required
                >
                  <Input
                    key="storageCargo"
                    size="large"
                    placeholder="Digite o nome do lote "
                    value={selectedIten.cargo}
                    onChange={(e) => {
                      handleChangeCargo(e.target.value, index);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={17}>
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
                    value={selectedIten.rawMaterialName}
                    //disabled={isLockInsChange}
                    onChange={(e) => {
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
            <Row gutter={24}>
              <Col span={7}>
                <Form.Item
                  key="formItemReceipts"
                  labelCol={{ span: 23 }}
                  label="Entrada: "
                  labelAlign={'left'}
                  style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                  required
                >
                  <Select
                    showSearch
                    size="large"
                    style={{ width: '140%', marginBottom: '10px' }}
                    placeholder="Selecion a entrada"
                    optionFilterProp="children"
                    value={selectedIten.receiptName}
                    disabled={selectedIten.rawMaterialName != '' ? false : true}
                    onClick={() => {
                      handleClickReceipt(index);
                    }}
                    onChange={(e) => {
                      handleChangeReceipt(e, index);
                    }}
                  >
                    {receipts.map((item) => (
                      <>
                        <Option
                          key={item.receipt_id}
                          value={[
                            item.receipt_id,
                            item.warehouse_raw_material_name,
                            item.warehouse_receipt_description,
                          ]}
                        >
                          {item.warehouse_receipt_description}
                        </Option>
                      </>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={7} style={{ marginRight: '0.5rem' }}>
                <Form.Item
                  key="formItemReceipts"
                  labelCol={{ span: 23 }}
                  label="Almoxarifado: "
                  labelAlign={'left'}
                  style={{ backgroundColor: 'white', fontWeight: 'bold' }}
                  required
                >
                  <Select
                    showSearch
                    size="large"
                    style={{ width: '100%', marginRight: '10px' }}
                    placeholder="Selecion a entrada"
                    optionFilterProp="children"
                    value={selectedIten.receiptName}
                    disabled={selectedIten.rawMaterialName != '' ? false : true}
                    onClick={() => {
                      handleClickReceipt(index);
                    }}
                    onChange={(e) => {
                      handleChangeReceipt(e, index);
                    }}
                  >
                    {receipts.map((item) => (
                      <>
                        <Option
                          key={item.receipt_id}
                          value={[
                            item.receipt_id,
                            item.warehouse_raw_material_name,
                            item.warehouse_receipt_description,
                          ]}
                        >
                          {item.warehouse_receipt_description}
                        </Option>
                      </>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
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
                    value={selectedIten.quantity}
                    disabled={selectedIten.rawMaterialName != '' ? false : true}
                    onChange={(e) => {
                      handleChangeQuantity(e.target.value, index);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
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
                    value={itens.quantity}
                    disabled={itens.rawMaterialName != '' ? false : true}
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
                    disabled={itens.quantity != '' ? false : true}
                    value={itens.unitary_value}
                    onChange={(e) => {
                      handleChangeUnitaryValue(
                        e.target.value,
                        itens.coefficient,
                        index
                      );
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
                    disabled={itens.unitary_value != '' ? false : true}
                    onClick={addNewReceivement}
                  >
                    <PlusOutlined />
                    Adicionar insumo
                  </Button>
                )}
              </Col>
            </Row> */}
          </>
        ))}
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const rawMaterialResponse = await api.get('/warehouse/raw-material');
    const storageResponse = await api.get('/warehouse/storage');

    const rawMaterialData = rawMaterialResponse.data;
    const storageData = storageResponse.data;

    return {
      props: {
        rawMaterial: rawMaterialData,
        storage: storageData,
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
