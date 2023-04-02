import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Tooltip,
  Radio,
  Row,
  Col,
  InputNumber,
  message,
} from 'antd'

import Panel from '../../../../components/Panel'

import { QuestionCircleOutlined } from '@ant-design/icons'

import api from '../../../../services/api'

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

function ManagerServicesCreate() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values: any) => {
    setLoading(true)
    console.log(values)
    api
      .post(`/services`, {
        ...values,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
        messageApi.open({
          type: 'success',
          content: 'Serviço cadastrado com sucesso!',
          duration: 3,
        })
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response.data) {
          form.setFields([
            {
              name: 'description',
              errors: [response.data.error],
            },
          ])
        }
      })
  }

  return (
    <>
      {contextHolder}
      <Panel title='Cadastrar Serviço'>
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
                label='Tempo de duração'
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
                  Cadastrar Item
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ManagerServicesCreate
