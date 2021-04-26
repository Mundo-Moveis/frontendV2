import { Col, Form, Input, Row, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import BarcodeReader from 'react-barcode-reader';
import { useContext, useEffect, useState } from 'react';
import { LaunchContext } from '../../context/Production/LaunchContext';
import { api } from '../../services/api';
import styles from '../../styles/Components/Production/LaunchModal.module.scss';

const { Option } = Select;

export function LaunchModal() {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { launchModalToggle, employees } = useContext(LaunchContext);
  const [employeeId, setEmployeeId] = useState(0);
  const [barcode, setBarcode] = useState('');

  async function launchBarcode(Barcode: string) {
    try {
      const response = await api.put(`production/barcode/release/${barcode}`, {
        employee_id: employeeId,
      });
      console.log(response);
    } catch (error) {
      console.log(error, 'eees');
    }
  }

  async function onRead(e) {
    if (employeeId === 0) {
      setEmployeeId(e);
    } else {
      await launchBarcode(e);
      setBarcode(e);
    }
  }

  return (
    <Modal
      title="Lançamento de produção"
      visible={true}
      confirmLoading={confirmLoading}
      width={650}
      onCancel={launchModalToggle}
      key="1"
      onOk={launchModalToggle}
    >
      <Form name="dynamic_form_nest_item" autoComplete="off">
        <Row gutter={5} key="1">
          <Col span={12} key={'2'}>
            <Form.Item
              labelCol={{ span: 23 }}
              label="Funcionário:"
              labelAlign={'left'}
              name={'employee'}
            >
              <Select
                showSearch
                placeholder="Selecione"
                size="large"
                value={employeeId}
                onChange={(e) => {
                  setEmployeeId(e);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {employees.map((option) => {
                  return (
                    <>
                      <Option key={option.id} value={option.id}>
                        {option.name}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12} key={'1'}>
            <Form.Item
              name={'tag'}
              labelCol={{ span: 23 }}
              label="Digite o código (apenas numero):"
              labelAlign={'left'}
            >
              <Input placeholder="placeholder" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <section className={styles.table}>
            <h2>Todos Sofá</h2>
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>PCP</th>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((episode, index) => {
                  return (
                    <tr key={episode.id}>
                      <td>algo sofa do caralho pqp aaaaaa</td>
                      <td>oba</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <BarcodeReader onScan={onRead} onError={onRead} />
        </Row>
      </Form>
    </Modal>
  );
}
