import React, { FC, useState } from 'react'

import { Layout, Button, Menu, Dropdown, Image, Drawer } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from '@ant-design/icons'

import './PrivateLayout.less'
import Logo from '../assets/logos/gestio_azul.png'
import LogoSmall from '../assets/logos/g_azul.png'
import Avatar from 'antd/lib/avatar/avatar'
import { removeAuthToken, getProfile, getRoles } from '../utils/authentication'
import { useHistory, useLocation } from 'react-router-dom'
import VaccineIcon from '../components/Icons/VaccineIcon'

const { Header, Sider, Content } = Layout

const PrivateLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const history = useHistory()
  const location = useLocation()

  const profile = getProfile()
  const roles = getRoles()

  const isMobile = window.innerWidth < 720
  const menuProfile = () => (
    <Menu>
      <Menu.Item
        key='1'
        icon={<UserOutlined />}
        onClick={() => {
          history.push('/profile')
        }}
      >
        Perfil
      </Menu.Item>
      {roles.length > 0 && (
        <Menu.Item
          key='2'
          icon={<UserOutlined />}
          onClick={() => {
            history.push('/selecionar-modulo')
          }}
        >
          Selecionar Módulo
        </Menu.Item>
      )}
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
              <Image width={75} height={75} src={Logo} preview={false} />
            </div>
          }
          placement='left'
          closable={false}
          onClose={() => setCollapsed(!collapsed)}
          visible={!collapsed}
          key='left'
        >
          <Menu theme='light' mode='inline'>
            <Menu.Item
              key='1'
              icon={<AppstoreOutlined style={{ color: '#1e3978' }} />}
              className={
                selectedMenuNav('/cidadao/inicio')
                  ? 'ant-menu-item ant-menu-item-selected'
                  : 'ant-menu-item'
              }
              onClick={() => {
                history.push('/cidadao/inicio')
              }}
            >
              Início
            </Menu.Item>
            <Menu.Item
              key='2'
              icon={<VaccineIcon color={false} />}
              className={
                selectedMenuNav('/cidadao/agendamentos')
                  ? 'ant-menu-item ant-menu-item-selected'
                  : 'ant-menu-item'
              }
              onClick={() => {
                history.push('/cidadao/agendamentos')
              }}
            >
              Meus agendamentos
            </Menu.Item>
          </Menu>
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
            <Image
              src={collapsed ? LogoSmall : Logo}
              height={collapsed ? 45 : 75}
              width={collapsed ? 45 : 75}
              preview={false}
              style={{ opacity: '0.6' }}
            />
          </div>
          <Menu theme='light' mode='inline'>
            <Menu.Item
              key='1'
              icon={<AppstoreOutlined />}
              className={
                selectedMenuNav('/cidadao/inicio')
                  ? 'ant-menu-item ant-menu-item-selected'
                  : 'ant-menu-item'
              }
              onClick={() => {
                history.push('/cidadao/inicio')
              }}
            >
              Início
            </Menu.Item>

            <Menu.Item
              key='2'
              icon={<CalendarOutlined />}
              className={
                selectedMenuNav('/cidadao/agendamentos')
                  ? 'ant-menu-item ant-menu-item-selected'
                  : 'ant-menu-item'
              }
              onClick={() => {
                history.push('/cidadao/agendamentos')
              }}
            >
              Meus agendamentos
            </Menu.Item>
          </Menu>
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

export default PrivateLayout
