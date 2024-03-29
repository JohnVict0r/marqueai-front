import React, { FC, useState } from 'react'
import { Image, Row, Col, Button, Avatar, List, Select } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

import './index.less'
import { useHistory } from 'react-router-dom'
import Logo from '../../../assets/marqueai.png'
import Viana from '../../../assets/images/viana.jpeg'
import Lucas from '../../../assets/images/lucas.jpeg'
import RejaneViana from '../../../assets/images/rejaneviana.jpeg'
import Manoel from '../../../assets/images/manoel.jpeg'
import Alaide from '../../../assets/images/alaide.jpeg'

const professionais = [
  {
    username: 'viana',
    name: 'Ricardo Viana',
    jobDescription: 'Barbeiro',
    city: 'Santo Antônio',
    state: 'RN',
    avatar: Viana,
  },
  {
    username: 'lucas',
    name: 'Lucas Campelo',
    jobDescription: 'Barbeiro',
    city: 'Santo Antônio',
    state: 'RN',
    avatar: Lucas,
  },
  {
    username: 'rejaneviana',
    name: 'Rejane Viana',
    jobDescription: 'Dermatofuncional',
    city: 'Santo Antônio',
    state: 'RN',
    avatar: RejaneViana,
  },
  {
    username: 'manoelbarber',
    name: 'Manoel Barber',
    jobDescription: 'Barbeiro',
    city: 'Major Sales',
    state: 'RN',
    avatar: Manoel,
  },
  {
    username: 'alaiderafaela',
    name: 'Alaíde Rafaela',
    jobDescription: 'Manicure e Pedicure',
    city: 'Major Sales',
    state: 'RN',
    avatar: Alaide,
  },
]

const Landing: FC = () => {
  const history = useHistory()
  const [city, setCity] = useState('')

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
          <Image src={Logo} width='240px' preview={false} />
        </div>
        {/* <Typography.Title
          level={4}
          style={{ justifyItems: 'center', textAlign: 'center' }}
        >
          Seu serviço com hora marcada!
        </Typography.Title> */}

        <Row>
          <Col span={16} offset={4}>
            <Select
              style={{ width: '100%' }}
              placeholder={'Selecione uma cidade'}
              onChange={(value: any) => setCity(value)}
              options={[
                { label: 'Santo Antônio/RN', value: 'Santo Antônio' },
                { label: 'Major Sales/RN', value: 'Major Sales' },
              ]}
            />
          </Col>
        </Row>

        <List
          itemLayout='horizontal'
          dataSource={
            city !== ''
              ? professionais.filter(item => item.city === city)
              : professionais
          }
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  type='primary'
                  onClick={() => history.push(`/${item.username}`)}
                >
                  Agendar
                  <ArrowRightOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} size='large' />}
                title={item.name}
                description={
                  <div>
                    <div>
                      {item.city}/{item.state}
                    </div>
                    <div>{item.jobDescription}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <div className='login-form-register' style={{ margin: '14px' }}>
          Você é um profissional?
          <a href='https://app.marqueai.com.br/admin/login'> Realize o login</a>
        </div>
      </Col>
    </Row>
  )
}

export default Landing
