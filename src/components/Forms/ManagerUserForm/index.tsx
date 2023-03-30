import React, { FC, useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Tooltip,
  Radio,
  Select,
  Space,
  InputNumber,
  Checkbox,
} from 'antd'
import moment from 'moment'
import { QuestionCircleOutlined } from '@ant-design/icons'
import api from '../../../services/api'
import { maskCPF, maskCNS, maskPhone, maskCEP, maskNumber } from '../../../utils/mask'

const months = [
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
]

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

interface ManagerUserFormProps {
  buttonText: string
  role: string
}

const ManagerUserForm: FC<ManagerUserFormProps> = ({ buttonText, role }) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [cpf, setCpf] = useState('')
  const [cns, setCns] = useState('')
  const [phone_number, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [address_number, setNumber] = useState('')

  const [day, setDay] = useState<any>(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState()

  const onFinish = (values: any) => {
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

  useEffect(() => {
    form.setFields([
      {
        name: 'cpf',
        value: cpf,
      },
      {
        name: 'cns',
        value: cns,
      },
      {
        name: 'phoneNumber',
        value: phone_number,
      },
      {
        name: 'cep',
        value: cep,
      },
      {
        name: 'address_number',
        value: address_number,
      },
    ])
  }, [cpf, phone_number, cns, form, cep, address_number])

  return (
    <>
      <Form
        name='login-form'
        className='login-form'
        layout='vertical'
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={err => console.log('erro no finish', err)}
        requiredMark={false}
        scrollToFirstError
        validateMessages={validateMessages}
      >

        <Form.Item
          label='CPF*'
          className='login-form-item'
          name='cpf'
          rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
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
              value={cpf}
              onChange={e => {
                setCpf(maskCPF(e.target.value))
              }}
              maxLength={14}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label='CNS*'
          className='login-form-item'
          name='cns'
          rules={[{ required: true, message: 'Por favor, insira o CNS!' }]}
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
              value={cns}
              onChange={e => {
                setCns(maskCNS(e.target.value))
              }}
              maxLength={15}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label='Nome Completo*'
          name='name'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o nome!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas Letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Eulália Costa Ribeiro'
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
          label='Nome da mãe*'
          name='motherName'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o nome da mãe!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Maria Ribeiro'
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
          label={
            <span>
              Nome social{' '}
              <Tooltip title='Designação pela qual a pessoa travesti ou transexual se identifica e é socialmente reconhecida (Decreto nº 8.727/16)'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name='socialName'
          className='login-form-item'
          rules={[
            {
              required: false,
              message: 'Por favor, insira o nome!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            //placeholder='Ex.: Eulália Ribeiro'
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
          label='Profissão*'
          name='occupation'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira sua profissão!',
            },
            {
              pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
              message: 'Apenas letras!',
            },
          ]}
        >
          <Input
            placeholder='Ex.: Enfermeiro'
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
          label='E-mail'
          name='email'
          className='login-form-item'
          rules={[{ type: 'email', required: false }]}
        >
          <Input placeholder='Ex.:  eulalia.ribeiro@email.com' size='large' />
        </Form.Item>

        <Form.Item
          label='DDD + Telefone*'
          className='login-form-item'
          name='phoneNumber'
          rules={[{ required: true, message: 'Por favor, insira um telefone válido!' }]}
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
              value={phone_number}
              onChange={e => {
                setPhone(maskPhone(e.target.value))
              }}
              maxLength={14}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          className='login-form-item'
          name='birthDate'
          label='Data de Nascimento*'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a data de nascimento!',
            },
          ]}
        >
          <Space>
            <InputNumber
              placeholder='Dia'
              min={1}
              max={31}
              value={day}
              onChange={value => {
                setDay(value)
              }}
            />
            <Select
              placeholder='Mês'
              style={{ width: '100px' }}
              value={month}
              onChange={value => {
                setMonth(value)
              }}
            >
              {months.map(item => (
                <Select.Option value={item.value}>{item.name}</Select.Option>
              ))}
            </Select>
            <InputNumber
              placeholder='Ano'
              min={1910}
              max={moment().year()}
              value={year}
              onChange={value => {
                setYear(value)
              }}
            />
          </Space>
        </Form.Item>

        <Form.Item
          name='gender'
          className='login-form-item'
          label={
            <span>
              Gênero{' '}
             {/*  <Tooltip title='Precisamos que informe o seu sexo biológico para personalizar algumas funcionalidades'>
                <QuestionCircleOutlined />
              </Tooltip> */}
            </span>
          }
          rules={[
            {
              required: false,
              message: 'Por favor, informe seu sexo!',
              whitespace: true,
            },
          ]}
        >
          <Radio.Group
          /*  onChange={() => {
             setIsFemale(false)
             if (form.getFieldValue('gender') === 'female') {
               setIsFemale(true)
             }
           }} */
          >
            <Radio value='male'>Masculino</Radio>
            <Radio value='female'>Feminino</Radio>
            <Radio value='non-binary'>Não-binário</Radio>
            <Radio value='other'>Outro</Radio>
            <Radio value='prefer-not-saying'>Prefiro não dizer</Radio>
          </Radio.Group>
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
          label='Logradouro'
          name='address'
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
              value={address_number}
              onChange={e => {
                setNumber(maskNumber(e.target.value))
              }}
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
            Eu li e concordo com os Termos de Uso e a Política de Privacidade da Secretaria de Saúde da Prefeitura de Nazaré da Mata.
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

export default ManagerUserForm
