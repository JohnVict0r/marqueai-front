import React, { FC, useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Tooltip,
 /*  Radio,
  Select,
  Space,
  InputNumber, */
  Checkbox,
} from 'antd'
/* import moment from 'moment'
import { QuestionCircleOutlined } from '@ant-design/icons'
import api from '../../../services/api' */
import { /* maskCPF, maskCNS, maskPhone, */ maskCEP, /* maskNumber */ } from '../../../utils/mask'

/* const months = [
  { name: 'Janeiro', value: 1 },
  { name: 'Fevereiro', value: 2 },
  { name: 'Março', value: 3 },
  { name: 'Abril', value: 4 },
  { name: 'Maio', value: 5 },
  { name: 'Junho', value: 6 },
  { name: 'Julho', value: 7 },
  { name: 'Agosto', value: 8 },
  { name: 'Setembro', value: 9 },
  { name: 'Outubro', value: 10 },
  { name: 'Novembro', value: 11 },
  { name: 'Dezembro', value: 12 },
] */

/* function compare(a: any, b: any) {
  if (a.nome < b.nome) return -1
  if (a.nome > b.nome) return 1
  return 0
} */

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

interface PuzzleFormProps {
  buttonText: string
  role: string
}

const ManagerEstablishmentForm: FC<PuzzleFormProps> = ({ buttonText, role }) => {
  const [form] = Form.useForm()

  const [loading/* , setLoading */] = useState(false)
  const [cep, setCep] = useState('')
  const [city_cod, setCityCod] = useState('')




/*   const onFinish = (values: any) => {
  setLoading(true)

    api
      .post('/manager/users', {
        ...values,
        birthDate: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
        //state: stateFormated,
        //city,
        role
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
      })
      .catch(({ response }) => {
        if (response.data.email) {
          form.setFields([
            {
              name: 'email',
              errors: [response.data.error],
            },
          ])
        }
      })
  }
 */
  useEffect(() => {
    form.setFields([

      {
        name: 'cep',
        value: cep,
      },
      {
        name: 'city_cod',
        value: city_cod,
      },
    ])
  }, [ form, cep, city_cod])

  return (
    <>
      <Form
        name='login-form'
        className='login-form'
        layout='vertical'
        form={form}
        initialValues={{ remember: true }}
        /* onFinish={onFinish}
        onFinishFailed={err => console.log('erro no finish', err)} */
        requiredMark={false}
        scrollToFirstError
        validateMessages={validateMessages}
      >

        <Form.Item
          label='Nome do Módulo'
          name='name'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o Nome do Módulo!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Exames'
            size='large'
            onKeyPress={e => {
              const specialCharRegex = new RegExp('[a-zA-Z \u00C0-\u00FF]')
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
            style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
          >
            {buttonText}
          </Button>
        </Form.Item>
        {/*<div className='login-form-register'>
          Já possui conta?
          <a href='/login'> Faça seu login</a>
        </div>*/}
      </Form>
    </>
  )
}

export default ManagerEstablishmentForm
