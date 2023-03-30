import React from 'react'
import {
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import { Row, Col, Layout, Image, Typography } from 'antd'

import Logo from '../../../assets/logos/gestio_azul.png'


import './index.less'
import { getRoles } from '../../../utils/authentication'
import { useHistory } from 'react-router-dom'

const SelectUser: React.FC = () => {

  const roles = getRoles();
  const history = useHistory()

  if (roles.length === 0) {
    history.push('/cidadao/inicio')
  }

  const isGestor = roles.includes("GESTOR")
  const isOperador = roles.includes("OPERADOR")
  const isProfessional = roles.includes("PROFESSIONAL")

  return (

    <Layout style={{ backgroundColor: '#FCFCFC', height: '100vh' }}>
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        <Image width={200} src={Logo} />

      </div>

      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Typography.Title style={{ textAlign: 'center', fontSize: '22px' }}>
            Selecione um módulo
          </Typography.Title>
        </Col>
      </Row>

      <Row
        gutter={[24, 24]}
        justify='center'
        style={{ width: '100%', margin: '0px', textAlign: 'center' }}
      >
        <Col xs={{ span: 12, offset: 1 }} lg={{ span: 4, offset: 2 }} >
          <div className='card-user' onClick={() => history.push('/cidadao/inicio')}>
            <UserOutlined style={{ fontSize: '30px' }} />
            <p>Cidadão</p>
          </div>
        </Col>

        {(isGestor || isProfessional || isOperador) &&
          <Col xs={{ span: 12, offset: 1 }} lg={{ span: 4, offset: 2 }}>
            <div className='card-user' onClick={() => history.push('/gestao/inicio')}>
              <SettingOutlined style={{ fontSize: '30px' }} />
              <p>Gestão</p>
            </div>
          </Col>
        }
      </Row>
    </Layout>


  )
}

export default SelectUser
