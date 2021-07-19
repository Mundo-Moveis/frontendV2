import React, { ReactNode } from 'react';

import {
  RightSquareOutlined,
  DashboardOutlined,
  PlusOutlined,
  ExportOutlined,
  ShoppingCartOutlined,
  BarcodeOutlined,
  FileExcelOutlined,
  UserOutlined,
  SearchOutlined,
  SignalFilled,
  ToolOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  LeftOutlined,
} from '@ant-design/icons';

import Link from 'next/link';

import { Layout, Menu, Result, Button } from 'antd';
import { Header } from '../Header';
import { FaCouch, FaWarehouse } from 'react-icons/fa';
import { FaTshirt } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { Tooltip } from '@material-ui/core';
import { FiPackage } from 'react-icons/fi';
import { BsListCheck } from 'react-icons/bs';

import 'antd/dist/antd.css';
import styles from './sidebar.module.scss';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

interface SidebarProps {
  screen: ReactNode;
  display: boolean;
}

export default function Sidebar({ screen, display }: SidebarProps) {
  return (
    <>
      {display ? (
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{ minHeight: '100vh' }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
                <Link href="/profile">Dashboard</Link>
              </Menu.Item>
              <SubMenu
                key="WnsInsumos"
                title="Almoxarifado"
                icon={
                  <span className="anticon anticon-bank">
                    <FiPackage size={16} color="#fff" />
                  </span>
                }
              >
                <SubMenu
                  key="WnsInsumosCadastros"
                  title="Cadastros"
                  icon={<PlusOutlined />}
                >
                  <Menu.Item key="Almoxarifado" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Register/warehouse">
                      Almoxarifado
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Un.Medidas" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Register/unityMeasure">
                      Un. Medidas
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Categoria" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Register/categories">Categoria</Link>
                  </Menu.Item>

                  <Menu.Item key="Fornecedores" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Register/supplier">
                      Fornecedores
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="Insumos" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Register/rawMaterial">Insumos</Link>
                  </Menu.Item>

                  <Menu.Item key="Posições" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Register/position">Posições</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="WnsInsumosOperacao"
                  title="Operações"
                  icon={<ShoppingCartOutlined />}
                >
                  <Menu.Item key="Entradas" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/Operation/Receivement">
                      Entradas
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="Armazenagens" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawStorage">Armazenagens</Link>
                  </Menu.Item>

                  <Menu.Item key="Saídas" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawExit">Saídas</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="WnsInsumosSearches"
                  title="Consultas"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item key="Estoque" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawStorage/Search">Estoque</Link>
                  </Menu.Item>

                  <Menu.Item key="relat-saida" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawExit/Resume">Rel. Saídas</Link>
                  </Menu.Item>
                  <Menu.Item key="Rel.entrada" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawMaterial/Search/entry">
                      Rel. entrada
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="PCP's" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawMaterial/pcp">PCP's</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout>
            <Header />
            {screen && (
              <Content style={{ margin: '20px 16px 0' }}>
                <div>{screen}</div>
              </Content>
            )}
            {!screen && (
              <Content style={{ margin: '20px 16px 0' }}>
                <Result
                  status="500"
                  title="500"
                  subTitle="Sorry, something went wrong."
                  extra={<Button type="primary">Back Home</Button>}
                />
              </Content>
            )}
          </Layout>
        </Layout>
      ) : (
        <>{screen}</>
      )}
    </>
  );
}
