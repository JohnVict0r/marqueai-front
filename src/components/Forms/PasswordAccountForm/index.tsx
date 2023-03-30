import React, { FC, useState } from 'react'
import { Form, Input, Button } from 'antd'
import api from '../../../services/api'

const PasswordAccountForm: FC = () => {
  const [form] = Form.useForm()
  // const history = useHistory()

  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    api
      .put('/users/update-password', {
        ...values,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  return (
    <Form
      name='Password-account-form'
      className='login-form'
      layout='vertical'
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={err => console.log('erro no finish', err)}
      requiredMark={false}
      scrollToFirstError
    >
      <Form.Item
        name='current_password'
        label='Senha atual'
        rules={[
          {
            required: true,
            message: 'Por favor, insira a senha!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='password'
        label='Nova senha'
        rules={[
          {
            required: true,
            message: 'Por favor, insira a senha!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirm-password'
        label='Confirme a nova senha'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor, confirme a senha!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('As duas senhas não são iguais!')
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          size='large'
          loading={loading}
          style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
        >
          Salvar nova senha
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PasswordAccountForm
