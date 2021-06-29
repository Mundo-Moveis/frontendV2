import React, { FormEvent, useState } from 'react';

import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import Highlighter from 'react-highlight-words';
import styles from './styles/style.module.scss';

import { Notification } from '../../../components/Notification';
import { api } from '../../../services/api';
import { GetServerSideProps } from 'next';

const { Option } = Select;

function index() {
  return <div>AAAA</div>;
}

export default index;
