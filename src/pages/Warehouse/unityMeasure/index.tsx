import React, { useState } from 'react';

import TableUnityMeasure from './components/TableUnityMeasure';
import { Button, Col, Layout, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from './styles/style.module.scss';
import ModalUnityMeasure from './components/ModalUnityMeasure';

export default function index() {
  const data = [
    {
      id: 1,
      name: 'Jim Red',
      abbreviation: 32,
      active: 1,
    },
    {
      id: 2,
      name: 'Kiriku',
      abbreviation: 21,
      active: 0,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  function modalState() {
    setIsModalOpen(!isModalOpen);
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
        <ModalUnityMeasure modalVisible={isModalOpen} modalState={modalState} />
        <TableUnityMeasure data={data} />
      </Layout>
    </div>
  );
}
