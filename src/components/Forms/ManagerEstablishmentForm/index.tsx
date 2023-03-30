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

interface ManagerEstablishmentFormProps {
  buttonText: string
  role: string
}

const ManagerEstablishmentForm: FC<ManagerEstablishmentFormProps> = ({ buttonText, role }) => {
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
          label='CNES*'
          className='login-form-item'
          name='cnes'
          rules={[{ required: true, message: 'Por favor, insira o CNES!' }]}
        >
          <Tooltip
            trigger={['focus']}
            title='Somente números'
            overlayClassName='numeric-input'
            placement='topRight'
          >
            <Input
              placeholder=''
              size='large'
              maxLength={15}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label='Código da Unidade*'
          className='login-form-item'
          name='unit_cod'
          rules={[{ required: true, message: 'Por favor, insira o Código da unidade!' }]}
        >
          <Tooltip
            trigger={['focus']}
            title='Somente números'
            overlayClassName='numeric-input'
            placement='topRight'
          >
            <Input
              placeholder=''
              size='large'
              maxLength={14}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label='Nome Social*'
          name='social_name' /*precisa ?*/
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o Nome Social!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas Letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: PRES M MAXANGUAPE'
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

        <Form.Item
          label='Nome Fantasia*'
          name='fantasy_name'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o Nome Fantasia!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas Letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: UBASF NOVO MAXARANGUAPE CAIC'
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

        <Form.Item
          label='Logradouro'
          name='place'
          className='login-form-item'
          rules={[
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Rua Pau Brasil'
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

        <Form.Item
          label='Número'
          className='login-form-item'
          name='address_number'
        >
          <Tooltip
            trigger={['focus']}
            title='Somente números'
            overlayClassName='numeric-input'
            placement='topRight'
          >
            <Input
              placeholder=''
              size='large'
              maxLength={8}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label='Complemento'
          name='address_complement'
          className='login-form-item'
          rules={[
            {
              required: false,
              message: 'Por favor, insira o complemento!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Bloco A, apartamento 205'
            size='large'
          />
        </Form.Item>

        <Form.Item
          label='Bairro'
          name='neighborhood'
          className='login-form-item'
          rules={[
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Intermares'
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

        <Form.Item
          label='CEP'
          className='login-form-item'
          name='cep'
        >
          <Tooltip
            trigger={['focus']}
            title='Somente números'
            overlayClassName='numeric-input'
            placement='topRight'
          >
            <Input
              placeholder=''
              size='large'
              value={cep}
              onChange={e => {
                setCep(maskCEP(e.target.value))
              }}
              maxLength={9}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label='Código da Cidade'
          className='login-form-item'
          name='city_cod'
        >
          <Tooltip
            trigger={['focus']}
            title='Somente números'
            overlayClassName='numeric-input'
            placement='topRight'
          >
            <Input
              placeholder=''
              size='large'
              onChange={e => {
                setCityCod(e.target.value)
              }}
              value={city_cod}
              maxLength={7}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          name='termsAccepted'
          valuePropName='checked'
          className='login-form-item'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    'É necessário concordar com os termos de uso'
                  ),
            },
          ]}
        >
          <Checkbox>
            Eu li e concordo com os Termos de Uso e a Política de Privacidade da Secretaria de Saúde da Prefeitura de Cabedelo.
          </Checkbox>
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
