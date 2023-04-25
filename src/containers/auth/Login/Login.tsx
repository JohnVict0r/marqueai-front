import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Button, Typography, Tooltip } from 'antd'

import './Login.less'
import {
  setAuthToken,
  setProfile,
  setRoles,
} from '../../../utils/authentication'
import api from '../../../services/api'
import { useHistory } from 'react-router-dom'
import { maskCPF } from '../../../utils/mask'

const Login: FC = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    api
      .post('/login', {
        ...values,
      })
      .then(response => {
        setLoading(false)
        // if (userExist) {
        //   setAuthToken(response.data.auth.token)
        //   setProfile(response.data.profile)
        //   setRoles(response.data.roles)
        //   history.push('/bem-vindo')
        //   return
        // }
        setAuthToken(response.data.token)
        console.log('response:', response)
        setProfile(response.data.user)
        history.push('/bem-vindo')
      })
      .catch(response => {
        console.log(response)
        // form.setFields([
        //   {
        //     name: 'email',
        //     errors: [response.data.message],
        //   },
        // ])
        setLoading(false)
      })
  }
  return (
    <>
      {/* <Typography.Title
        style={{
          textAlign: 'center',
          fontSize: `32px`,
          color: `#1a2423`,
          marginTop: `12px`,
          marginBottom: `12px`,
        }}
      >
        Realize o Login
      </Typography.Title> */}
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
          rules={[{ required: true, message: 'Por favor, insira o E-mail!' }]}
          className='login-form-item'
        >
          <Input placeholder='example@email.com' size='large' name='email' />
        </Form.Item>
        <>
          <Form.Item
            label='Senha'
            name='password'
            rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
            className='form-item'
          >
            <Input type='password' size='large' placeholder='Senha' />
          </Form.Item>
          {/*<Form.Item>
              <a className='login-form-forgot' href='/forgot-password'>
                Esqueci minha senha
              </a>
            </Form.Item>*/}
        </>

        <Form.Item className='form-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            loading={loading}
            style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
          >
            Entrar
          </Button>
        </Form.Item>
        <div className='login-form-register'>
          Não tem conta?
          <a href='/cadastro'> Crie uma agora</a>
        </div>
      </Form>
    </>
  )
}

export default Login
