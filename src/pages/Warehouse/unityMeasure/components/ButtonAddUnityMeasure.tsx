import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/style.module.scss';

export default function ButtonAddEmployee() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Button size={'large'} className={styles.button}>
      Cadastrar Unidade
      <PlusOutlined style={{ fontSize: '16px' }} />
    </Button>
  );
}
