import React, { FC, useState } from 'react'

import { Layout, Button, Menu, Dropdown, Drawer, Image } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  // AppstoreOutlined,
  SettingOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import Logo from '../../src/assets/marqueai.svg'

import iconLogo from '../../src/assets/icon.svg'

import './PrivateLayout.less'
import Avatar from 'antd/lib/avatar/avatar'
import { removeAuthToken, getProfile } from '../utils/authentication'
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
          history.push('/manager/professional/profile')
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
      {/* <Menu.Item
        key='1'
        icon={<AppstoreOutlined />}
        className={
          selectedMenuNav('/manager/professional/home')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/manager/professional/home')
        }}
      >
        Início
      </Menu.Item> */}
      <Menu.Item
        key='1'
        icon={<ClockCircleOutlined />}
        className={
          selectedMenuNav('/manager/professional/appointments')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/manager/professional/appointments')
        }}
      >
        Agendamentos
      </Menu.Item>

      <Menu.Item
        key='2'
        icon={<SettingOutlined />}
        className={
          selectedMenuNav('/manager/professional/services')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/manager/professional/services')
        }}
      >
        Serviços
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<ClockCircleOutlined />}
        className={
          selectedMenuNav('/manager/professional/schedules')
            ? 'ant-menu-item ant-menu-item-selected'
            : 'ant-menu-item'
        }
        onClick={() => {
          history.push('/manager/professional/schedules')
        }}
      >
        Horários
      </Menu.Item>

      {/* <Menu.Item
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
      </Menu.Item> */}
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
              <Image src={Logo} preview={false} />
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
            {collapsed ? (
              <Image src={iconLogo} preview={false} />
            ) : (
              <Image src={Logo} preview={false} />
            )}
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
                  backgroundColor: '#FF7A00',
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
