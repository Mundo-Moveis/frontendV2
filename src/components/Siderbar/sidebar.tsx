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
                key="PCP"
                title="PCP"
                icon={
                  <span className="anticon anticon-bank">
                    <FaCouch color="#fff" size={16} />
                  </span>
                }
              >
                <Menu.Item key="producao" icon={<PlusOutlined />}>
                  <Link href="/pcp">Produção</Link>
                </Menu.Item>
                <SubMenu
                  key="pcpReport"
                  title="Relatórios"
                  icon={<RightSquareOutlined />}
                >
                  <Menu.Item
                    key="productionReport"
                    icon={<FileExcelOutlined />}
                  >
                    <Link href="/production/report">Produzidos </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="notProductionReport"
                    icon={<FileExcelOutlined />}
                  >
                    <Link href="/not/production/report">Não Produzidos </Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu
                key="pcpCadastros"
                title="Cadastros"
                icon={<PlusOutlined />}
              >
                <Menu.Item key="productionLine" icon={<RightSquareOutlined />}>
                  <Link href="/production-line">Linha de Produção</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<RightSquareOutlined />}>
                  <Link href="/sub-product">Subproduto</Link>
                </Menu.Item>

                <Menu.Item key="8" icon={<RightSquareOutlined />}>
                  <Link href="/color">Cores</Link>
                </Menu.Item>

                <Menu.Item key="9" icon={<RightSquareOutlined />}>
                  <Link href="/client">Clientes</Link>
                </Menu.Item>

                <Menu.Item key="10" icon={<RightSquareOutlined />}>
                  <Link href="/product">Produtos</Link>
                </Menu.Item>
              </SubMenu>

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
                  <Menu.Item key="15" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/unityMeasure">Un. Medidas</Link>
                  </Menu.Item>
                  <Menu.Item key="11" icon={<RightSquareOutlined />}>
                    <Link href="/Warehouse/categories">Categoria</Link>
                  </Menu.Item>

                  <Menu.Item key="12" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawSupplier">Fornecedores</Link>
                  </Menu.Item>

                  <Menu.Item key="13" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawMaterial">Insumos</Link>
                  </Menu.Item>

                  <Menu.Item key="14" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawPosition">Posições</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="WnsInsumosOperacao"
                  title="Operações"
                  icon={<ShoppingCartOutlined />}
                >
                  <Menu.Item key="16" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawEntry">Entradas</Link>
                  </Menu.Item>

                  <Menu.Item key="17" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawStorage">Armazenagens</Link>
                  </Menu.Item>

                  <Menu.Item key="18" icon={<RightSquareOutlined />}>
                    <Link href="/wmsRawExit">Saídas</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="WnsInsumosSearches"
                  title="Consultas"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item key="estoque" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawStorage/Search">Estoque</Link>
                  </Menu.Item>

                  <Menu.Item key="relat-saida" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawExit/Resume">Rel. Saídas</Link>
                  </Menu.Item>
                  <Menu.Item key="rowMaterial" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawMaterial/Search/entry">
                      Rel. entrada
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="33" icon={<FileExcelOutlined />}>
                    <Link href="/wmsRawMaterial/pcp">PCP's</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu
                key="expedition"
                title="Expedição"
                icon={
                  <span className="anticon anticon-bank">
                    <FaWarehouse size={16} color="#fff" />
                  </span>
                }
              >
                <SubMenu
                  key="expeditionCadastro"
                  title="Cadastros"
                  icon={<PlusOutlined />}
                >
                  <Menu.Item key="22" icon={<RightSquareOutlined />}>
                    <Link href="/expedition/warehouse">Almoxarifado</Link>
                  </Menu.Item>
                  <Menu.Item key="23" icon={<RightSquareOutlined />}>
                    <Link href="/expedition/street">Rua</Link>
                  </Menu.Item>
                  <Menu.Item key="31" icon={<RightSquareOutlined />}>
                    <Link href="/drop">Agenda do Drop</Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="24" icon={<BarcodeOutlined />}>
                  <Link href="/expedition/launch">Lançamento</Link>
                </Menu.Item>

                <SubMenu
                  key="ExpeditionSearches"
                  title="Consultas"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item key="25" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/stock">Estoque</Link>
                  </Menu.Item>

                  <Menu.Item key="36" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/input">Entradas</Link>
                  </Menu.Item>

                  <Menu.Item key="34" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/output">Saídas</Link>
                  </Menu.Item>
                  <Menu.Item key="35" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/change">Troca de estoque</Link>
                  </Menu.Item>
                  <Menu.Item key="41" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/drop">Drop</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="ExpeditionDefectSearches"
                  title="PD"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item key="stockDefect" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/stock/defect">Estoque</Link>
                  </Menu.Item>

                  <Menu.Item key="inputDefect" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/input/defect">Entradas</Link>
                  </Menu.Item>

                  <Menu.Item key="outputDefect" icon={<FileExcelOutlined />}>
                    <Link href="/expedition/output/defect">Saídas</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu
                key="quality"
                title="Qualidade"
                icon={<SignalFilled size={16} color="#fff" />}
              >
                <SubMenu
                  key="defectLevelInsert"
                  title="Cadastros"
                  icon={<PlusOutlined />}
                >
                  <Menu.Item key="4" icon={<RightSquareOutlined />}>
                    <Link href="/quality/defectLevel">Nível de Defeito</Link>
                  </Menu.Item>

                  <Menu.Item key="3" icon={<RightSquareOutlined />}>
                    <Link href="/quality/defect">Defeito</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="defectReport"
                  title="Relatórios"
                  icon={<FileExcelOutlined />}
                >
                  <Menu.Item
                    key="defectReportItem"
                    icon={<RightSquareOutlined />}
                  >
                    <Link href="/quality/defectReport">Defeitos</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu key="rh" title="RH" icon={<UserOutlined />}>
                <SubMenu
                  key="RhCadastros"
                  title="Cadastros"
                  icon={<PlusOutlined />}
                >
                  <Menu.Item key="shift" icon={<RightSquareOutlined />}>
                    <Link href="/shift">Turno </Link>
                  </Menu.Item>
                  <Menu.Item key="26" icon={<RightSquareOutlined />}>
                    <Link href="/company">Empresa</Link>
                  </Menu.Item>

                  <Menu.Item key="27" icon={<RightSquareOutlined />}>
                    <Link href="/factory/sector">Setor </Link>
                  </Menu.Item>
                  <Menu.Item key="28" icon={<RightSquareOutlined />}>
                    <Link href="/factory/area">Area </Link>
                  </Menu.Item>
                  <Menu.Item key="29" icon={<RightSquareOutlined />}>
                    <Link href="/factory/function">Função </Link>
                  </Menu.Item>
                  <Menu.Item key="30" icon={<RightSquareOutlined />}>
                    <Link href="/RH/Employee">Funcionário </Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item
                  key="Chamada"
                  icon={
                    <span className="anticon anticon-bank">
                      <BsListCheck color="#fff" size={16} />
                    </span>
                  }
                >
                  <Link href="/call/employee">Chamada </Link>
                </Menu.Item>
                <SubMenu
                  key="ResportCallList"
                  title="Relatórios"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item
                    key="reportFault"
                    icon={
                      <span className="anticon anticon-bank">
                        <FileExcelOutlined color="#fff" size={16} />
                      </span>
                    }
                  >
                    <Link href="/call/report">Falta</Link>
                  </Menu.Item>

                  <Menu.Item
                    key="ReportPoint"
                    icon={
                      <span className="anticon anticon-bank">
                        <FileExcelOutlined color="#fff" size={16} />
                      </span>
                    }
                  >
                    <Link href="/call/reportPoint">Ponto</Link>
                  </Menu.Item>

                  <Menu.Item
                    key="transferReport"
                    icon={
                      <span className="anticon anticon-bank">
                        <FileExcelOutlined color="#fff" size={16} />
                      </span>
                    }
                  >
                    <Link href="/call/transferReport">Movimentação</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu
                key="cover"
                title="Controle de capas"
                icon={<RightSquareOutlined />}
              >
                <SubMenu
                  key="registerCover"
                  title="Cadastros"
                  icon={<PlusOutlined />}
                >
                  <Menu.Item key="subproduto" icon={<RightSquareOutlined />}>
                    <Link href="/sub-product">Subproduto</Link>
                  </Menu.Item>
                  <Menu.Item key="stockCover" icon={<RightSquareOutlined />}>
                    <Link href="/cover/warehouse">Estoques</Link>
                  </Menu.Item>
                  <Menu.Item key="streetCover" icon={<RightSquareOutlined />}>
                    <Link href="/cover/street">Rua</Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="37" icon={<BarcodeOutlined />}>
                  <Link href="/cover/launch">Lançamento</Link>
                </Menu.Item>

                <SubMenu
                  key="ExpeditionSearches"
                  title="Consultas"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item
                    key="singleCoverStock"
                    icon={<FileExcelOutlined />}
                  >
                    <Link href="/single/cover/stock">Capas</Link>
                  </Menu.Item>
                  <Menu.Item key="38" icon={<FileExcelOutlined />}>
                    <Link href="/cover/stock">Estoque</Link>
                  </Menu.Item>
                  <Menu.Item key="coverInput" icon={<FileExcelOutlined />}>
                    <Link href="/cover/input">Entrada</Link>
                  </Menu.Item>
                  <Menu.Item key="coverOutput" icon={<FileExcelOutlined />}>
                    <Link href="/cover/output">Saida</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu key="planting" title="Chaparia" icon={<UserOutlined />}>
                <Menu.Item
                  key="mountSeccionadora"
                  icon={<RightSquareOutlined />}
                >
                  <Link href="/seccionadora/mount">Seccionadora </Link>
                </Menu.Item>
                <Menu.Item key="planting1" icon={<RightSquareOutlined />}>
                  <Link href="/mount">Linha</Link>
                </Menu.Item>
                <Menu.Item
                  key="platingStockMount"
                  icon={<RightSquareOutlined />}
                >
                  <Link href="/plating/mount/stock">Estoque montes</Link>
                </Menu.Item>
                <Menu.Item
                  key="platingOutputStockMount"
                  icon={<RightSquareOutlined />}
                >
                  <Link href="/plating/mount/output/stock">
                    Remover do estoque de montes
                  </Link>
                </Menu.Item>

                <SubMenu
                  key="platingSearches"
                  title="Consultas"
                  icon={<SearchOutlined />}
                >
                  {/* <Menu.Item key="mountStock" icon={<RightSquareOutlined />}>
                    <Link href="/stock/mount">Na Linha</Link>
                  </Menu.Item> */}
                  <Menu.Item
                    key="mountProduction"
                    icon={<RightSquareOutlined />}
                  >
                    <Link href="/day/production/mount">produzido</Link>
                  </Menu.Item>
                  <Menu.Item key="mountDefect" icon={<RightSquareOutlined />}>
                    <Link href="/day/defect/mount">Defeitos</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="mountProductionByPCP"
                    icon={<RightSquareOutlined />}
                  >
                    <Link href="/mount/pcp/production">Produção por lote</Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="platingCad"
                  title="Cadastros"
                  icon={<PlusOutlined />}
                >
                  <Menu.Item key="platingDefect" icon={<RightSquareOutlined />}>
                    <Link href="/plating/defect">Defeitos</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="platingWarehouse"
                    icon={<RightSquareOutlined />}
                  >
                    <Link href="/plating/warehouse">Armazém</Link>
                  </Menu.Item>
                  <Menu.Item key="platingStreet" icon={<RightSquareOutlined />}>
                    <Link href="/plating/street">Rua</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu key="machines" title="Maquinas" icon={<ToolOutlined />}>
                <Menu.Item key="machineCreate" icon={<RightSquareOutlined />}>
                  <Link href="/machine">Cadastro</Link>
                </Menu.Item>
                <Menu.Item
                  key="reasonStopMachine"
                  icon={<RightSquareOutlined />}
                >
                  <Tooltip title="motivo de parada">
                    <Link href="/reason-stop">Motivos de parada</Link>
                  </Tooltip>
                </Menu.Item>
                <SubMenu
                  key="machineSearches"
                  title="Consultas"
                  icon={<SearchOutlined />}
                >
                  <Menu.Item key="machineKey" icon={<RightSquareOutlined />}>
                    <Link href="/machine-stop">Parada de Maquina</Link>
                  </Menu.Item>
                </SubMenu>
              </SubMenu>

              <Menu.Item key="40" icon={<ExportOutlined />}>
                <Link href="/">Sair</Link>
              </Menu.Item>
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
