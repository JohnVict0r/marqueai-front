import React from 'react'
import Backgroud from '../../../assets/images/Fundo.svg'
import WelcomeBanner from '../../../assets/images/ilustra.svg'
import { useHistory } from 'react-router-dom'
import { isFirstAccess, setFirstAccess } from '../../../utils/authentication'
import { Image, Row, Col, Button, Typography } from 'antd'

const Welcome: React.FC = () => {
  const history = useHistory()

  if (!isFirstAccess()) {
    // history.push('/selecionar-modulo')
    history.push('/manager/professional/appointments')
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Backgroud})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <Image src={WelcomeBanner} />
      </div>
      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        <Col>
          <Typography.Paragraph style={{ textAlign: 'center' }}>
            Agora podemos te ajudar a gerenciar melhor os serviços com hora
            marcada!
          </Typography.Paragraph>
          <Button
            type='primary'
            className='login-form-button'
            size='large'
            onClick={() => {
              setFirstAccess()
              history.push('/manager/professional/appointments')
            }}
          >
            Continuar
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Welcome
