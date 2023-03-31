import React, { useState} from 'react'
import { useParams } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Tooltip,
  Radio,
  Row,
  Col,
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

function ManagerPuzzleItemCreate(){
  const params = useParams<any>()
  const [form] = Form.useForm()
  const [controlable, setControlable] = useState(false)
  const [loading, setLoading] = useState(false)

 const onFinish = (values: any) => {
    setLoading(true)
    console.log(values)
    api
      .post(`/puzzles/${params.puzzle_id}/items`, {
        ...values,
        controlable,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
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

  return(
  <>
  <Panel title='Cadastrar Item'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
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
          label='Nome de Cadastro'
          name='name'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o Nome do Item!',
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

        <Form.Item
          label='Nome de exibição'
          name='display_name'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o Nome de exibição do Item!',
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

        <Form.Item
          label='Descrição'
          name='description'
          className='login-form-item'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o Nome de exibição do Item!',
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

        <Form.Item
          name='controlable'
          className='login-form-item'
          label={
            <span>
              Este Item possui Estoque?*{' '}
              <Tooltip title='Precisamos que informe se o seu Item possui algum estoque inicial'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Por favor, informe se seu item possui estoque!',
            },
          ]}
        >
          <Radio.Group>
            <Radio onClick={() => setControlable(true)} value={true}>Sim</Radio>
            <Radio onClick={() => setControlable(false)} value={false}>Não</Radio>
          </Radio.Group>

        </Form.Item>

        {controlable &&
           <Form.Item
           label='Quantidade em Estoque'
           className='login-form-item'
           name='controlable_amount'
           >
             <Input
               placeholder=''
               size='large'
               maxLength={9}
             />
         </Form.Item>
        }
        <Form.Item className='login-form-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            loading={loading}
            style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
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

export default ManagerPuzzleItemCreate
