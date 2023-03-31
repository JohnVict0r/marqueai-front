import React, { useState} from 'react'
import { useParams } from 'react-router-dom'
import {
  Form,
  Button,
  Space,
  Select,
  Row,
  Col,
  InputNumber
} from 'antd'

import Panel from '../../../../components/Panel'

import api from '../../../../services/api'


const weekdays = [
  { name: 'Segunda-feira', value: 1 },
  { name: 'Terça-feira', value: 2 },
  { name: 'Quarta-feira', value: 3 },
  { name: 'Quinta-feira', value: 4 },
  { name: 'Sexta-feira', value: 5 },
  { name: 'Sábado', value: 6 },
  { name: 'Domingo', value: 7 },
]


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

function ManagerPuzzleSchedulableCreate(){
  const params = useParams<any>()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [hour, setHour] = useState<any>()
  const [minutes, setMinutes] = useState<any>()

 const onFinish = (values: any) => {
    setLoading(true)
    const timeInMinutes = (hour || 0)*60 + (minutes || 0 ) 

    // const data = values.weekdays.map((day:any) => ({ day, timeInMinutes}))
    api
      .post(`/puzzles/${params.puzzle_id}/schedule`, {
        ...values,
        day: values.weekdays,
        timeInMinutes
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
        setHour(0)
        setMinutes(0)
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
  <Panel title='Cadastrar Horário'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
        <Form
              name='vaccine-form'
              className='vaccine-form'
              layout='vertical'
              form={form}
              onFinish={onFinish}
              onFinishFailed={err => console.log('erro no finish', err)}
              scrollToFirstError
              requiredMark={false}
              validateMessages={validateMessages}
            >

              <Form.Item
                label='Selecione o dia da semana que você deseja cadastrar o horário'
                name='weekdays'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, Selecione um dia da semana!',
                  },
                ]}
              >
                <Select
                  //mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Selecione um dia"
                >
                  {weekdays.map(item => <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>)}
                </Select>
              </Form.Item>

              <Form.Item
               className='login-form-item'
               name=''
                label='Horário'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira um horário!',
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    placeholder='Hora'
                    min={0}
                    max={23}
                    value={hour}
                    onChange={value => {
                      setHour(Number(value))
                    }}
                  />
                  <InputNumber
                    placeholder='Minutos'
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={value => {
                      setMinutes(Number(value))
                    }}
                  />
                </Space>
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
                  Cadastrar horário(s)
                </Button>
              </Form.Item>
            </Form>
      </Col>
      </Row>
    </Panel>
    </>
  )
}

export default ManagerPuzzleSchedulableCreate
