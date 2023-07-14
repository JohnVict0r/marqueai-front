import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, InputNumber, Spin } from 'antd'

import Panel from '../../../components/Panel'

import api from '../../../services/api'
import { useNotification } from '../../../contexts/notification'
import { useHistory, useParams } from 'react-router-dom'

const validateMessages = {
  // eslint-disable-next-line
  required: '${label} é um campo obrigatório!',
  types: {
    email: 'Por favor, insira um E-mail válido!',
    // eslint-disable-next-line
    number: '${label} is not a validate number!',
  },
  number: {
    // eslint-disable-next-line
    range: '${label} must be between ${min} and ${max}',
  },
}

function ProfessionalServicesCreate() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const { openNotification } = useNotification()
  const history = useHistory()
  const params = useParams<any>()
  const [service, setService] = useState<any>({})

  useEffect(() => {
    if (params.serviceId) {
      api.get(`/me/services/${params.serviceId}`).then(response => {
        setService(response.data)
        setLoadingPage(false)
      })
    } else {
      setLoadingPage(false)
    }
  }, [params.serviceId])

  const createService = (values: any) => {
    setLoading(true)
    api
      .post(`/me/services`, {
        ...values,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
        openNotification({
          type: 'success',
          message: 'Serviço cadastrado com sucesso!',
        })
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response.data) {
          console.log(response.data)

          form.setFields([
            {
              name: 'description',
              errors: [response.data.error],
            },
          ])
        }
      })
  }

  const updateService = (values: any) => {
    setLoading(true)
    api
      .put(`/me/services/${service.id}`, {
        ...values,
      })
      .then(() => {
        setLoading(false)
        openNotification({
          type: 'success',
          message: 'Serviço atualizado com sucesso!',
        })
        history.push('/professional/services')
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response.data) {
          console.log(response.data)

          form.setFields([
            {
              name: 'description',
              errors: [response.data.error],
            },
          ])
        }
      })
  }

  const onFinish = (values: any) => {
    service.id ? updateService(values) : createService(values)
  }

  if (loadingPage) {
    return <Spin />
  }

  return (
    <>
      <Panel title={service.id ? 'Atualizar Serviço' : 'Cadastrar Serviço'}>
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <Form
              name='login-form'
              className='login-form'
              layout='vertical'
              form={form}
              onFinish={onFinish}
              onFinishFailed={err => console.log('erro no finish', err)}
              requiredMark={false}
              scrollToFirstError
              validateMessages={validateMessages}
              initialValues={{
                name: service.name || '',
                description: service.description || '',
                price: service.price || '',
                duration: service.duration || '',
              }}
            >
              <Form.Item
                label='Nome'
                name='name'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o Nome do Serviço!',
                  },
                  {
                    pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
                    message: 'Apenas letras!',
                  },
                ]}
              >
                <Input
                  placeholder='Ex.: Corte de cabelo'
                  size='large'
                  onKeyPress={e => {
                    const specialCharRegex = new RegExp(
                      '[a-zA-Z \u00C0-\u00FF]'
                    )
                    const pressedKey = String.fromCharCode(
                      !e.charCode ? e.which : e.charCode
                    )
                    if (!specialCharRegex.test(pressedKey)) {
                      e.preventDefault()
                      return false
                    }
                    return true
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Descrição'
                name='description'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a descrição do serviço!',
                  },
                  {
                    pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
                    message: 'Apenas letras!',
                  },
                ]}
              >
                <Input
                  placeholder='Ex.: Corte de cabelo na tesoura...'
                  size='large'
                  onKeyPress={e => {
                    const specialCharRegex = new RegExp(
                      '[a-zA-Z \u00C0-\u00FF]'
                    )
                    const pressedKey = String.fromCharCode(
                      !e.charCode ? e.which : e.charCode
                    )
                    if (!specialCharRegex.test(pressedKey)) {
                      e.preventDefault()
                      return false
                    }
                    return true
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Preço'
                name='price'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o preço do serviço!',
                  },
                ]}
              >
                <InputNumber
                  placeholder='R$20,00'
                  size='large'
                  onKeyPress={e => {
                    const specialCharRegex = new RegExp(
                      '[a-zA-Z \u00C0-\u00FF]'
                    )
                    const pressedKey = String.fromCharCode(
                      !e.charCode ? e.which : e.charCode
                    )
                    if (!specialCharRegex.test(pressedKey)) {
                      e.preventDefault()
                      return false
                    }
                    return true
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Tempo de duração (min)'
                name='duration'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message:
                      'Por favor, insira o tempo de duração do serviço em minutos!',
                  },
                ]}
              >
                <InputNumber
                  placeholder='30min'
                  size='large'
                  onKeyPress={e => {
                    const specialCharRegex = new RegExp(
                      '[a-zA-Z \u00C0-\u00FF]'
                    )
                    const pressedKey = String.fromCharCode(
                      !e.charCode ? e.which : e.charCode
                    )
                    if (!specialCharRegex.test(pressedKey)) {
                      e.preventDefault()
                      return false
                    }
                    return true
                  }}
                />
              </Form.Item>
              <Form.Item className='login-form-item'>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  size='large'
                  loading={loading}
                  style={{
                    height: `48px`,
                    fontSize: `16px`,
                    fontWeight: `bold`,
                  }}
                >
                  {service.id ? 'Atualizar Serviço' : 'Cadastrar Serviçø'}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ProfessionalServicesCreate
