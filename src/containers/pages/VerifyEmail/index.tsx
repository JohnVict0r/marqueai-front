import React, { useEffect, useState } from 'react'
import success from '../../../assets/images/ilustracao-ok.svg'
import { useHistory, useParams } from 'react-router-dom'
import { Image, Typography, Row, Col, Button } from 'antd'
import api from '../../../services/api'

const VerifyEmail: React.FC = () => {
  const history = useHistory()
  const params = useParams<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .put('/users/verify-email', {
        token: params.token,
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [params.token])

  return (
    <>
      {!loading && <Image src={success} height={100} />}
      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Typography.Title style={{ textAlign: 'center' }}>
            {loading ? 'Verificando e-mail...' : 'E-mail validado com sucesso!'}
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: 'center' }}>
            {loading
              ? ''
              : 'Obrigado pela confiança na Ymmunos e aproveite o seu Ymmucard!'}
          </Typography.Paragraph>

          {!loading && (
            <Button
              type='primary'
              className='login-form-button'
              size='large'
              onClick={() => {
                history.push('/login')
              }}
            >
              Logar na minha conta
            </Button>
          )}
        </Col>
      </Row>
    </>
  )
}

export default VerifyEmail
