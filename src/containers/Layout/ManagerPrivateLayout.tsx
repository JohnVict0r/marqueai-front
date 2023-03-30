import React, { FC, useState } from 'react'

import { Layout, Button, Menu, Dropdown, Image, Drawer } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

import './PrivateLayout.less'
import Logo from '../../assets/logos/gestio_azul.png'
import LogoSmall from '../../assets/logos/g_azul.png'
import Avatar from 'antd/lib/avatar/avatar'
import { removeAuthToken, getProfile } from '../../utils/authentication'
import { useHistory, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const ManagerPrivateLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const history = useHistory()
  const location = useLocation()

  const profile = getProfile()
  // const roles = getRoles()

  // const isGestor = roles.includes("GESTOR")
  // const isOperador = roles.includes("OPERADOR")
  // const isProfessional = roles.includes("PROFESSIONAL")

  const isMobile = window.innerWidth < 720
  const menuProfile = () => (
    <Menu>
      <Menu.Item
        key='1'
        icon={<UserOutlined />}
        onClick={() => {
          history.push('/gestao/perfil')
        }}
      >
        Perfil
      </Menu.Item>
      {/* {roles.length > 0 &&
        <Menu.Item
          key='2'
          icon={<UserOutlined />}
          onClick={() => {
            history.push('/selecionar-modulo')
          }}
        >
          Selecionar Módulo
        </Menu.Item>
      } */}
      <Menu.Item
        key='3'
        icon={<LogoutOutlined />}
        onClick={() => {
          history.push('/login')
          removeAuthToken()
        }}
        style={{ color: '#FF0000' }}
      >
        Sair
      </Menu.Item>
    </Menu>
  )

  const MenuManager = () => (
    <Menu theme='light' mode='inline'>
      <Menu.Item
        key='1'
        icon={<AppstoreOutlined />}
        className={
          selectedMenuNav('/gestao/inicio')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/inicio')
        }}
      >
        Início
      </Menu.Item>
      <Menu.Item
        key='2'
        icon={<SettingOutlined />}
        className={
          selectedMenuNav('/gestao/modulos')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/modulos')
        }}
      >
        Módulos
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<ClockCircleOutlined />}
        className={
          selectedMenuNav('/gestao/horarios')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/horarios')
        }}
      >
        Horários
      </Menu.Item>
      <Menu.Item
        key='4'
        icon={<ClockCircleOutlined />}
        className={
          selectedMenuNav('/gestao/agendamentos')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/agendamentos')
        }}
      >
        Agendamentos
      </Menu.Item>
      {/*       <Menu.Item
        key='2'
        icon={<VaccineIcon color={false} />}
        className={
          selectedMenuNav('/gestao/vacinas')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/vacinas')
        }}
      >
        Vacinação
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<VaccineIcon />}
        className={
          selectedMenuNav('vaccines')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/agendamentos')
        }}
      >
        Agendamentos
      </Menu.Item>
      {isGestor && <Menu.Item
        key='3'
        icon={<UserOutlined />}
        className={
          selectedMenuNav('/gestao/cidadaos')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/cidadaos')
        }}
      >
        Cidadãos
      </Menu.Item>
      }
      {isGestor && <Menu.Item
        key='3'
        icon={<UserOutlined />}
        className={
          selectedMenuNav('/gestao/estabelecimentos')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/estabelecimentos')
        }}
      >
        Estabelecimentos
      </Menu.Item>
      }
      {isGestor && <Menu.Item
        key='4'
        icon={<SettingOutlined />}
        className={
          selectedMenuNav('/gestao/operadores')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/operadores')
        }}
      >
        Operadores
      </Menu.Item>
      }
      {isGestor && <Menu.Item
        key='5'
        icon={<UsergroupAddOutlined />}
        className={
          selectedMenuNav('/gestao/profissionais')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/profissionais')
        }}
      >
        Profissionais
      </Menu.Item>
      } */}
      <Menu.Item
        key='5'
        icon={<UserOutlined />}
        className={
          selectedMenuNav('/gestao/profissionais')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/gestao/profissionais')
        }}
      >
        Profissionais
      </Menu.Item>
    </Menu>
  )

  const selectedMenuNav = (menuName: string) => {
    const pathName = location.pathname

    if (pathName !== `${menuName}`) {
      return false
    }
    return true
  }

  return (
    <Layout>
      {isMobile ? (
        <Drawer
          title={
            <div className='logo'>
              {/* <Image src={Logo} preview={false} /> */}
              Agendita
            </div>
          }
          placement='left'
          closable={false}
          onClose={() => setCollapsed(!collapsed)}
          visible={!collapsed}
          key='left'
        >
          <MenuManager />
        </Drawer>
      ) : (
        <Sider
          theme='light'
          style={{ height: '100vh' }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className='logo'>
            {/* <Image
              src={collapsed ? LogoSmall : Logo}
              height={collapsed ? 45 : 75}
              width={collapsed ? 45 : 75}
              preview={false}
              style={{ opacity: '0.6' }}
            /> */}
            {collapsed ? 'A' : 'Agendita'}
          </div>
          <MenuManager />
        </Sider>
      )}

      <Layout>
        <Header className='header'>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => {
                setCollapsed(!collapsed)
              },
            }
          )}
          <Dropdown overlay={menuProfile} className='profile'>
            <Button style={{ border: 'none' }}>
              <Avatar
                style={{
                  color: '#FCFCFC',
                  backgroundColor: '#1e3978',
                  marginRight: '10px',
                }}
              >
                {profile?.name[0]}
              </Avatar>
              {profile?.name.split(' ')[0]}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default ManagerPrivateLayout
