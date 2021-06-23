import React from 'react';
import ButtonAddUnityMeasure from './components/ButtonAddUnityMeasure';

import TableUnityMeasure from './components/TableUnityMeasure';
import { Col, Layout, Row } from 'antd';

export default function index() {
  const data = [
    { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
    {
      key: '5',
      name: 'Kiriku',
      age: 21,
      address: 'Pont que Partiw. 2 Venezuela',
    },
  ];
  return (
    <div>
      <Layout>
        <Row justify="end">
          <Col>
            <ButtonAddUnityMeasure />
          </Col>
        </Row>

        <TableUnityMeasure data={data} />
      </Layout>
    </div>
  );
}
