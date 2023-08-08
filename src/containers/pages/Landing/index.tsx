import React, { FC } from 'react'
import { Image, Row, Col, Button, Typography, Avatar, List } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

import './index.less'
import { useHistory } from 'react-router-dom'
import Logo from '../../../assets/marqueai.png'
import Viana from '../../../assets/images/viana.jpeg'
import Lucas from '../../../assets/images/lucas.jpeg'

const professionais = [
  {
    username: 'viana',
    name: 'Ricardo Viana',
    jobDescription: 'Barbeiro',
    avatar: Viana,
  },
  {
    username: 'lucas',
    name: 'Lucas Campelo',
    jobDescription: 'Barbeiro',
    avatar: Lucas,
  },
]

const Landing: FC = () => {
  const history = useHistory()

  return (
    <Row
      justify='center'
      align='middle'
      style={{
        height: '100vh',
      }}
    >
      <Col xs={{ span: 20 }} lg={{ span: 8 }}>
        <div
          style={{
            // paddingTop: '20px',
            // paddingBottom: '10px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh',
          }}
        >
          <Image src={Logo} width='240px' />
        </div>
        {/* <Typography.Title
          level={4}
          style={{ justifyItems: 'center', textAlign: 'center' }}
        >
          Seu serviço com hora marcada!
        </Typography.Title> */}
        <Typography.Paragraph
          style={{ justifyItems: 'center', textAlign: 'center' }}
        >
          Selecione um profissional abaixo:
        </Typography.Paragraph>

        <List
          itemLayout='horizontal'
          dataSource={professionais}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  type='primary'
                  onClick={() =>
                    history.push(`https://app.marqueai.com.br/admin/login`)
                  }
                >
                  Agendar
                  <ArrowRightOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} size='large' />}
                title={item.name}
                description={item.jobDescription}
              />
            </List.Item>
          )}
        />
        <div className='login-form-register' style={{ margin: '14px' }}>
          Você é um profissional?
          <a href='/login'> Realize o login</a>
        </div>
      </Col>
    </Row>
  )
}

export default Landing
