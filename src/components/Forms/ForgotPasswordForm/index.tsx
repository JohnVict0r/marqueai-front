import React, { FC, useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'

import './index.less'
import api from '../../../services/api'

const ForgotPasswordForm: FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    api
      .post('auth/forgot-password', values)
      .then(response => {
        setLoading(false)
        form.resetFields()
      })
      .catch(({ response }) => {
        form.setFields([
          {
            name: 'email',
            errors: [response.data.error],
          },
        ])
        setLoading(false)
      })
  }

  return (
    <>
      <Typography.Title
        style={{
          textAlign: 'center',
          fontSize: `40px`,
          color: `#1a2423
`,
          marginBottom: `32px`,
        }}
      >
        Esqueceu sua senha?
      </Typography.Title>
      <Typography.Paragraph
        style={{
          textAlign: 'center',
          fontSize: `16px`,
          color: `#1a2423
`,
          marginBottom: `32px`,
        }}
      >
        Vamos te ajudar a recuperar sua senha. informe seu e-mail para te enviar
        as instruções dos próximos passos.
      </Typography.Paragraph>
      <Form
        name='login-form'
        className='login-form'
        layout='vertical'
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label='E-mail'
          name='email'
          rules={[{ required: true, message: 'Por favor, insira o email!' }]}
          className='form-item'
        >
          <Input placeholder='Email' size='large' />
        </Form.Item>

        <Form.Item className='form-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            loading={loading}
            style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
          >
            Enviar
          </Button>
        </Form.Item>
        <div className='login-form-register'>
          Ja possui conta?
          <a href='/login'> Faça seu login</a>
        </div>
      </Form>
    </>
  )
}

export default ForgotPasswordForm
