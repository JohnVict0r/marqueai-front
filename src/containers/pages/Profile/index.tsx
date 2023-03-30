import React from 'react'
/* import api from "../../services/api";*/

import './style.css'
import Panel from '../../../components/Panel'
import { Row, Col, Tabs } from 'antd'
import { ProfileForm, PasswordAccountForm } from '../../../components/Forms'

function Profile() {
  return (
    <Panel title='Perfil'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Tabs defaultActiveKey='1' centered>
            <Tabs.TabPane tab='Editar dados pessoais' key='1'>
              <ProfileForm />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Alterar senha' key='2'>
              <PasswordAccountForm />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Panel>
  )
}

export default Profile
