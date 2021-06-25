import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Select } from 'antd';

import { Notification } from '../../../../components/Notification';
import { api } from '../../../../services/api';

const { Option } = Select;

interface IProps {
  modalVisible: boolean;
  modalState: () => void;
  dataForEdit: Object;
}

export function ModalUnityMeasure({
  modalVisible,
  modalState,
  dataForEdit,
}: IProps) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(dataForEdit);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      if (id === 0) {
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
        } catch (error) {}
      }
    } catch (error) {}
    console.log(data);
  }

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
          onChange={(e) => {
            setAbbreviation(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 23 }}
        label="Ativo:"
        labelAlign={'left'}
        style={{ backgroundColor: 'white', fontWeight: 'bold' }}
        required
      >
        <Select
          onChange={(e) => {
            setActive(Number(e));
          }}
          size="large"
          style={{ width: 400 }}
        >
          <Option value={1}>Sim</Option>
          <Option value={0}>Não</Option>
        </Select>
      </Form.Item>
    </Modal>
  );
}

export default ModalUnityMeasure;
