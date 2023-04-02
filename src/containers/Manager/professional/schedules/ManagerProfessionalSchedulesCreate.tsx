import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Space, Select, Row, Col, InputNumber } from 'antd'

import Panel from '../../../../components/Panel'

import api from '../../../../services/api'
import { weekdays } from '../../../../utils/constants'
import { useNotification } from '../../../../contexts/notification'

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

function ManagerProfessionalSchedulesCreate() {
  const params = useParams<any>()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { openNotification } = useNotification()

  const [startHour, setStartHour] = useState<any>()
  const [endHour, setEndHour] = useState<any>()
  const [startMinutes, setStartMinutes] = useState<any>()
  const [endMinutes, setEndMinutes] = useState<any>()

  const onFinish = (values: any) => {
    setLoading(true)
    const startTimeInMinutes = (startHour || 0) * 60 + (startMinutes || 0)
    const endTimeInMinutes = (endHour || 0) * 60 + (endMinutes || 0)

    api
      .post(`/schedules`, {
        ...values,
        start_time: startTimeInMinutes,
        end_time: endTimeInMinutes,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
        setStartHour(0)
        setStartMinutes(0)
        setEndHour(0)
        setEndMinutes(0)
        openNotification({
          type: 'success',
          message: 'Horário cadastrado com sucesso!',
        })
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response.data) {
          form.setFields([
            {
              name: 'day',
              errors: [response.data.errors[0]],
            },
          ])
        }
      })
  }

  return (
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
                name='day'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, Selecione um dia da semana!',
                  },
                ]}
              >
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Selecione um dia'
                >
                  {weekdays.map(item => (
                    <Select.Option value={item.value} key={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className='login-form-item'
                name=''
                label='Horário de abertura'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira um horário de abertura!',
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    placeholder='Hora'
                    min={0}
                    max={23}
                    value={startHour}
                    onChange={value => {
                      setStartHour(Number(value))
                    }}
                  />
                  <InputNumber
                    placeholder='Minutos'
                    min={0}
                    max={59}
                    value={startMinutes}
                    onChange={value => {
                      setStartMinutes(Number(value))
                    }}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                className='login-form-item'
                name=''
                label='Horário de fechamento'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira um horário de fechamento!',
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    placeholder='Hora'
                    min={0}
                    max={23}
                    value={endHour}
                    onChange={value => {
                      setEndHour(Number(value))
                    }}
                  />
                  <InputNumber
                    placeholder='Minutos'
                    min={0}
                    max={59}
                    value={endMinutes}
                    onChange={value => {
                      setEndMinutes(Number(value))
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
                  style={{
                    height: `48px`,
                    fontSize: `16px`,
                    fontWeight: `bold`,
                  }}
                >
                  Cadastrar horário
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ManagerProfessionalSchedulesCreate
