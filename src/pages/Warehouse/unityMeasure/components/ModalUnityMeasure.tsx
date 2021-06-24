import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

interface IProps {
  modalVisible: boolean;
  modalState: () => void;
}

function ModalUnityMeasure({ modalVisible, modalState }: IProps) {
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [active, setActive] = useState('');

  const data = {};
  return (
    <Modal
      title="Cadastro de Unidade de Medida"
      visible={modalVisible}
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
        <Button key="submit" type="primary">
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
        />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 23 }}
        label="Ativo:"
        labelAlign={'left'}
        style={{ backgroundColor: 'white', fontWeight: 'bold' }}
        required
      >
        <Select size="large" style={{ width: 400 }}>
          <Option value={1}>Sim</Option>
          <Option value={0}>Não</Option>
        </Select>
      </Form.Item>
    </Modal>
  );
}

export default ModalUnityMeasure;
