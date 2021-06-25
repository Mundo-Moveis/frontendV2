import React, { useState } from 'react';

import {
  Layout,
  Table,
  Button,
  Row,
  Col,
  Input,
  Space,
  Modal,
  Select,
  Popconfirm,
  notification,
  Form,
  Divider,
  DatePicker,
  Result,
} from 'antd';
import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  DeleteFilled,
  DownloadOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { ModalUnityMeasure } from './ModalUnityMeasure';

export default function TableUnityMeasure({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});
  function modalState() {
    setIsModalOpen(!isModalOpen);
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
            setDataForEdit(record);
            return (
              <React.Fragment>
                <EditFilled
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
          <ModalUnityMeasure
            modalVisible={isModalOpen}
            modalState={modalState}
            dataForEdit={dataForEdit}
          />
          <Table columns={columns} dataSource={data} />
        </>
      );
    }
  }

  return (
    <>
      <SearchTable />
      {/* 
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      /> */}
    </>
  );
}
