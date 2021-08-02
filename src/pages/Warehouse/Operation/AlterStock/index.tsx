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
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface IRawMaterial {
  raw_material_id: string;
  raw_material_name: string;
  unit_of_measurement_abbreviation: string;
  raw_material_code: string;
}

interface IPosition {
  id: string;
  name: string;
}

interface IAlteredIten {
  id: string;
  movedQuantity: string;
  raw_material_name: string;
  user_name: string;
  s;
}

interface IProp {
  rawMaterial: IRawMaterial[];
  position: IPosition[];
  alteredIten: [];
}

export default function AlterSotock({
  rawMaterial,
  position,
  alteredIten,
}: IProp) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cargo, setCargo] = useState('');
  const [movedQuantity, setMovedQuantity] = useState(0);
  const [newPositionId, setNewPositionId] = useState('');
  const [newPositionName, setNewPositionName] = useState('');
  const [oldPositionId, setOldPositionId] = useState('');
  const [oldPositionName, setOldPositionName] = useState('');
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [rawMaterialName, setRawMaterialName] = useState<any>();
  const [reason, setReason] = useState('');
  const [alteredItens, setAlteredItens] = useState(alteredIten);
  const [positions, setPositions] = useState(position);
  const [rawMaterials, setRawMaterials] = useState(rawMaterial);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      if (
        movedQuantity === 0 ||
        newPositionId === '' ||
        oldPositionId === '' ||
        rawMaterialId === ''
      ) {
        Notification({
          type: 'error',
          title: 'Erro',
          description: 'Nenhum campo pode ser vazio',
        });
        return;
      }
      const data = {
        cargo: cargo,
        moved_quantity: movedQuantity,
        new_position_id: newPositionId,
        old_position_id: oldPositionId,
        raw_material_id: rawMaterialId,
        reason: reason,
      };

      const response = await api.post('/warehouse/alter-stock', data);

      Notification({
        type: 'success',
        title: 'Alterado',
        description: 'Mudança efetuada com sucesso',
      });
      handleClose();
    } catch (error) {

      Notification({
        type: 'error',
        title: 'Erro',
        description: `${error.response.message}`,
      });
    }
  }

  function handleClose() {
    setCargo('');
    setMovedQuantity(0);
    setNewPositionId('');
    setOldPositionId('');
    setReason('');

    setIsModalOpen(false);
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
          title: 'Usuário',
          dataIndex: 'user_name',
          key: 'user_name',
          width: '30%',
          ...this.getColumnSearchProps('user_name'),
          sorter: (a, b) => a.user_name.length - b.user_name.length,
        },
        {
          title: 'Insumo',
          dataIndex: 'raw_material_name',
          key: 'raw_material_name',
          width: '30%',
          ...this.getColumnSearchProps('raw_material_name'),
          sorter: (a, b) =>
            a.raw_material_name.length - b.raw_material_name.length,
        },
        {
          title: 'Quantidade Movida',
          dataIndex: 'moved_quantity',
          key: 'moved_quantity',
          width: '20%',
          ...this.getColumnSearchProps('moved_quantity'),
          sorter: (a, b) => a.moved_quantity.length - b.moved_quantity.length,
        },
        {
          title: 'Criado Em',
          dataIndex: 'created_at',
          key: 'created_at',
          width: '40%',
          ...this.getColumnSearchProps('created_at'),
          sorter: (a, b) => a.created_at.length - b.created_at.length,
        },
      ];
      return <Table columns={columns} dataSource={alteredItens} />;
    }
  }

  return (
    <>
      <Layout>
        <Row justify="end">
          <Col>
            <Button
              size={'large'}
              className={styles.button}
              icon={<PlusOutlined style={{ fontSize: '16px' }} />}
              onClick={() => setIsModalOpen(true)}
            >
              Realizar Alteração
            </Button>
          </Col>
        </Row>
        <SearchTable />
      </Layout>
      <Modal
        width={700}
        title="Alterar Estoque"
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
          <Col span={13}>
            <Form.Item
              key="CargoFormItem"
              labelCol={{ span: 23 }}
              label="Nome do Lote"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
            >
              <Input
                key="Cargo"
                size="large"
                placeholder="Digite aqui o nome do lote"
                value={cargo}
                onChange={(e) => {
                  setCargo(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={19}>
            <Form.Item
              key="CargoFormItem"
              labelCol={{ span: 23 }}
              label="Insumo"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Select
                showSearch
                size="large"
                placeholder="Selecione o Insumo"
                optionFilterProp="children"
                value={rawMaterialName}
                onChange={(e) => {
                  setRawMaterialId(e[0]);
                  setRawMaterialName(`${e[3]} |
                  ${e[1]} / 
                  (${e[2]})`);
                }}
              >
                {rawMaterials.map((item) => (
                  <>
                    <Option
                      key={item.raw_material_id}
                      value={[
                        item.raw_material_id,
                        item.raw_material_name,
                        item.unit_of_measurement_abbreviation,
                        item.raw_material_code,
                      ]}
                    >
                      {`${item.raw_material_code} |
                          ${item.raw_material_name} / 
                          (${item.unit_of_measurement_abbreviation})`}
                    </Option>
                  </>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={6}>
            <Form.Item
              key="formItemPositions"
              labelCol={{ span: 23 }}
              label="Posição Atual: "
              labelAlign={'left'}
              style={{
                backgroundColor: 'white',
                fontWeight: 'bold',
              }}
              required
            >
              <Select
                showSearch
                size="large"
                placeholder="Selecione a Posição"
                optionFilterProp="children"
                value={oldPositionName}
                onChange={(e) => {
                  setOldPositionId(e[0]);
                  setOldPositionName(e[1]);
                }}
              >
                {positions.map((item) => (
                  <>
                    <Option key={item.id} value={[item.id, item.name]}>
                      {item.name}
                    </Option>
                  </>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              key="formItemNewPositions"
              labelCol={{ span: 23 }}
              label="Nova Posição: "
              labelAlign={'left'}
              style={{
                backgroundColor: 'white',
                fontWeight: 'bold',
              }}
              required
            >
              <Select
                showSearch
                size="large"
                style={{ width: '100%' }}
                placeholder="Selecione a Posição"
                optionFilterProp="children"
                value={newPositionName}
                //disabled={isLockInsChange}
                onChange={(e) => {
                  setNewPositionId(e[0]);
                  setNewPositionName(e[1]);
                }}
              >
                {positions.map((item) => (
                  <>
                    <Option key={item.id} value={[item.id, item.name]}>
                      {item.name}
                    </Option>
                  </>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              key="QuantityFormItem"
              labelCol={{ span: 23 }}
              label="Quantidade"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <Input
                key="Cargo"
                size="large"
                placeholder="Digite aqui a quantidade"
                value={movedQuantity}
                onChange={(e) => {
                  setMovedQuantity(Number(e.target.value));
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={13}>
            <Form.Item
              key="ReasonFormItem"
              labelCol={{ span: 23 }}
              label="Nome do Lote"
              labelAlign={'left'}
              style={{ backgroundColor: 'white', fontWeight: 'bold' }}
              required
            >
              <TextArea
                key="Reason"
                size="large"
                placeholder="Digite o motivo (Caso houver um...)"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const rawMaterialResponse = await api.get('/warehouse/stock');
    const positionResesponse = await api.get('/warehouse/position');
    const responseAlteredData = await api.get('/warehouse/alter-stock');

    const rawMaterialData = rawMaterialResponse.data;
    const positionData = positionResesponse.data;
    const alteredItenData = responseAlteredData.data;

    return {
      props: {
        rawMaterial: rawMaterialData,
        position: positionData,
        alteredIten: alteredItenData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        rawMaterial: [],
        warehouse: [],
      },
    };
  }
};
