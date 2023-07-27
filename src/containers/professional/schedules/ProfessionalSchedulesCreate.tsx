import React, { useEffect, useState } from 'react'
import { Form, Button, Space, Select, Row, Col, InputNumber, Spin } from 'antd'

import Panel from '../../../components/Panel'

import api from '../../../services/api'
import { weekdays } from '../../../utils/constants'
import { useNotification } from '../../../contexts/notification'
import { useHistory, useParams } from 'react-router-dom'

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
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { openNotification } = useNotification()

  const [startHour, setStartHour] = useState<any>()
  const [endHour, setEndHour] = useState<any>()
  const [startMinutes, setStartMinutes] = useState<any>()
  const [endMinutes, setEndMinutes] = useState<any>()

  const [startLunchHour, setStartLunchHour] = useState<any>()
  const [endLunchHour, setEndLunchHour] = useState<any>()
  const [startLunchMinutes, setStartLunchMinutes] = useState<any>()
  const [endLunchMinutes, setEndLunchMinutes] = useState<any>()

  const params = useParams<any>()
  const [loadingPage, setLoadingPage] = useState(true)
  const [schedule, setSchedule] = useState<any>({})
  const history = useHistory()

  useEffect(() => {
    if (params.scheduleId) {
      api.get(`/me/schedules/${params.scheduleId}`).then(response => {
        setSchedule(response.data)
        form.setFields([
          {
            name: 'day',
            value: response.data.day,
          },
        ])
        setStartHour(Math.trunc(response.data.start_time / 60))
        setStartMinutes(response.data.start_time % 60)
        setEndHour(Math.trunc(response.data.end_time / 60))
        setEndMinutes(response.data.end_time % 60)
        if (response.data.lunch_start && response.data.lunch_end) {
          setStartLunchHour(Math.trunc(response.data.lunch_start / 60))
          setStartLunchMinutes(response.data.lunch_start % 60)
          setEndLunchHour(Math.trunc(response.data.lunch_end / 60))
          setEndLunchMinutes(response.data.lunch_end % 60)
        }
        setLoadingPage(false)
      })
    } else {
      setLoadingPage(false)
    }
  }, [params.scheduleId, form])

  const onFinish = (values: any) => {
    params.scheduleId ? updateSchedule(values) : createSchedule(values)
  }

  const createSchedule = (values: any) => {
    setLoading(true)
    const startTimeInMinutes = (startHour || 0) * 60 + (startMinutes || 0)
    const endTimeInMinutes = (endHour || 0) * 60 + (endMinutes || 0)
    const startLunchInMinutes =
      (startLunchHour || 0) * 60 + (startLunchMinutes || 0)
    const endLunchInMinutes = (endLunchHour || 0) * 60 + (endLunchMinutes || 0)

    api
      .post(`/me/schedules`, {
        ...values,
        start_time: startTimeInMinutes,
        end_time: endTimeInMinutes,
        lunch_start: startLunchInMinutes,
        lunch_end: endLunchInMinutes,
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
      .catch(response => {
        setLoading(false)
        console.error(response)
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

  const updateSchedule = (values: any) => {
    setLoading(true)
    const startTimeInMinutes = (startHour || 0) * 60 + (startMinutes || 0)
    const endTimeInMinutes = (endHour || 0) * 60 + (endMinutes || 0)
    const startLunchInMinutes =
      (startLunchHour || 0) * 60 + (startLunchMinutes || 0)
    const endLunchInMinutes = (endLunchHour || 0) * 60 + (endLunchMinutes || 0)

    api
      .put(`/me/schedules/${params.scheduleId}`, {
        start_time: startTimeInMinutes,
        end_time: endTimeInMinutes,
        lunch_start: startLunchInMinutes,
        lunch_end: endLunchInMinutes,
      })
      .then(() => {
        setLoading(false)
        openNotification({
          type: 'success',
          message: 'Horário atualizado com sucesso!',
        })
        history.push('/professional/schedules')
      })
      .catch(response => {
        console.error(response)
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

  if (loadingPage) {
    return <Spin />
  }

  return (
    <>
      <Panel title={schedule.id ? 'Atualizar Horário' : 'Cadastrar Horário'}>
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
                  disabled={schedule.id}
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

              <Form.Item
                className='login-form-item'
                name=''
                label='Início do almoço'
              >
                <Space>
                  <InputNumber
                    placeholder='Hora'
                    min={0}
                    max={23}
                    value={startLunchHour}
                    onChange={value => {
                      setStartLunchHour(Number(value))
                    }}
                  />
                  <InputNumber
                    placeholder='Minutos'
                    min={0}
                    max={59}
                    value={startLunchMinutes}
                    onChange={value => {
                      setStartLunchMinutes(Number(value))
                    }}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                className='login-form-item'
                name=''
                label='Fim do almoço'
              >
                <Space>
                  <InputNumber
                    placeholder='Hora'
                    min={0}
                    max={23}
                    value={endLunchHour}
                    onChange={value => {
                      setEndLunchHour(Number(value))
                    }}
                  />
                  <InputNumber
                    placeholder='Minutos'
                    min={0}
                    max={59}
                    value={endLunchMinutes}
                    onChange={value => {
                      setEndLunchMinutes(Number(value))
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
                  {schedule.id ? 'Atualizar Horário' : 'Cadastrar Horário'}
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
