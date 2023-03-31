import React from 'react'
//import success from '../../../assets/images/ilustracao-ok.svg'
import { useHistory, useParams } from 'react-router-dom'
import { Typography, Row, Col, Button } from 'antd'

const types: any = {
  register: {
    title: 'Parabéns!',
    description:
      'Sua conta foi criada com sucesso!',
  },
  password: {
    title: 'Senha Atualizada!',
    description: '',
  },
}

const Success: React.FC = () => {
  const history = useHistory()
  const params = useParams<any>()

  return (
    <>
      <Row
        gutter={[24, 24]}
        style={{ width: '100%', margin: '0px', textAlign: 'center' }}
      >
        {/*<Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Image src={success} height={100} />
        </Col>*/}
      </Row>
      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Typography.Title style={{ textAlign: 'center' }}>
            {types[params.type].title}
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: 'center' }}>
            {types[params.type].description}
          </Typography.Paragraph>
            <Button
              type='primary'
              className='login-form-button'
              size='large'
              onClick={() => {
                history.push('/login')
              }}
              style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
            >
              Voltar para o login
            </Button>
        </Col>
      </Row>
    </>
  )
}

export default Success
