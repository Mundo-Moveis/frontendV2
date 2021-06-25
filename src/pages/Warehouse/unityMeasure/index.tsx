import {
  DeleteFilled, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined
} from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Modal, Popconfirm, Row, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { api } from '../../../services/api';
import styles from './styles/style.module.scss';
import { Notification } from '../../../components/Notification';

const { Option } = Select;

interface IUnitMeasurement {
  id: string
  abbreviation: string
  name: string
}
export default function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitsMeasurement, setUnitMeasurement] = useState([{}])
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');

  useEffect(() => {
    api.get('/warehouse/unit-measurement').then((response) => {
      setUnitMeasurement(response.data)
    })
  })
  function modalState(data?: IUnitMeasurement) {
    console.log(data);

    setName(data.name)
    setAbbreviation(data.abbreviation)
    setId(data.id)
    setIsModalOpen(!isModalOpen);
  }

  async function handleRegister(e) {
    e.preventDefault();


    if (id) {
      try {

      } catch (error) { }
    } else {
      try {
        const data = {
          name: name,
          abbreviation: abbreviation,
          active: active,
        };
        setLoading(true);
        await api.post('/warehouse/unit-measurement', data);
        setLoading(false);
        Notification({
          type: 'success',
          title: 'Enviado',
          description: 'Usuário Cadastrado com sucesso',
        });
      } catch (error) {

      }
    }


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
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: '10%',
          ...this.getColumnSearchProps('id'),
          sorter: (a, b) => a.id.length - b.id.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Descrição',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          ...this.getColumnSearchProps('name'),
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Unidade',
          dataIndex: 'abbreviation',
          key: 'abbreviation',
          ...this.getColumnSearchProps('abbreviation'),
          sorter: (a, b) => a.abbreviation.length - b.abbreviation.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Ativo',
          dataIndex: 'active',
          key: 'active',
          ...this.getColumnSearchProps('active'),
          sorter: (a, b) => a.active.length - b.active.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Operação',
          render: (record) => {

            return (
              <React.Fragment>
                <EditOutlined
                  style={{ cursor: 'pointer', fontSize: '16px' }}
                  onClick={() => modalState()}
                />
                {/* onClick={() => handleEdit(record)} */}
                <Popconfirm title="Confirmar remoção?">
                  <a href="#" style={{ marginLeft: 20 }}>
                    <DeleteFilled
                      style={{ color: '#ff0000', fontSize: '16px' }}
                    />
                  </a>
                </Popconfirm>
              </React.Fragment>
            );
          },
        },
      ];
      return (
        <>

          <Table columns={columns} dataSource={unitsMeasurement} />
        </>
      );
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
              onClick={() => {
                modalState();
              }}
            >
              Cadastrar Unidade
            </Button>
          </Col>
        </Row>
        <SearchTable />
      </Layout>
      <Modal
        title="Cadastro de Unidade de Medida"
        visible={isModalOpen}
        onCancel={() => {
          modalState();
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              modalState();
            }}
            type="default"
          >
            {' '}
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleRegister}
          >
            {' '}
            Salvar
          </Button>,
        ]}
      >
        <Form.Item
          labelCol={{ span: 23 }}
          label="Descrição"
          labelAlign={'left'}
          style={{ backgroundColor: 'white', fontWeight: 'bold' }}
          required
        >
          <Input
            size="large"
            style={{ width: 400, marginBottom: '10px' }}
            placeholder="Descrição da unidade, ex: Litro, Metros Quadrados, ..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 23 }}
          label="Abreviação:"
          labelAlign={'left'}
          style={{ backgroundColor: 'white', fontWeight: 'bold' }}
          required

        >
          <Input
            size="large"
            style={{ width: 400, marginBottom: '10px' }}
            placeholder="Digite a Abreviação, ex: L, M²"
            value={abbreviation}
            onChange={(e) => {
              setAbbreviation(e.target.value);
            }}
          />
        </Form.Item>


      </Modal>
    </div>
  );
}
