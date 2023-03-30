import React, {useState } from 'react'
import Panel from '../../../components/Panel'
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Tooltip,
  Button,
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import api from '../../../services/api'


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

function ManagerPuzzleCreate() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [chartable, setChartable] = useState(false)
  const [schedulable, setSchedulable] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
   /*  console.log(values) */
    api
      .post('/puzzles', {
        ...values,
        schedulable,
        chartable,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
      })
      .catch(({ response }) => {
        if (response.data.email) {
          form.setFields([
            {
              name: 'name',
              errors: [response.data.error],
            },
          ])
        }
      })
  }

  return (
    <Panel title='Cadastrar Módulo'>
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

        <Form.Item
          name='schedulable'
          valuePropName='checked'
          className='login-form-item'
          label={
            <span>
              Este Item possui agendamentos?*{' '}
              <Tooltip title='Esta função vai permiter  o agendamento de horários para o item'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    'É necessário informar se esse Item possuira agendamentos'
                  ),
            },
          ]}
        >
        <Radio.Group>
            <Radio onClick={() => setSchedulable(true)} value={true}>Sim</Radio>
            <Radio onClick={() => setSchedulable(false)} value={false}>Não</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name='chartable'
          valuePropName='checked'
          className='login-form-item'
          label={
            <span>
              Este Item possui gráficos?*{' '}
              <Tooltip title='Essa função permite que gráficos para controle do item sejam gerados.'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    'É necessário informar se esse Item possuirá gráficos'
                  ),
            },
          ]}
        >
          <Radio.Group>
            <Radio   onClick={() => setChartable(true)} value={true}>Sim</Radio>
            <Radio   onClick={() => setChartable(false)}  value={false}>Não</Radio>
          </Radio.Group>
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
            Cadastrar Módulo
          </Button>
        </Form.Item>
      </Form>
        </Col>
      </Row>
    </Panel>
  )
}

export default ManagerPuzzleCreate
