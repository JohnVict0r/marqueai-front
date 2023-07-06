import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd'

import Panel from '../../../../components/Panel'
import api from '../../../../services/api'
import { getProfile } from '../../../../utils/authentication'

import { useNotification } from '../../../../contexts/notification'
import { minutesToHourFormated } from '../../../../utils/format'

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

const ManagerProfessionalAppointmentsCreate = () => {
  const [form] = Form.useForm()

  const [number, setNumber] = useState<string>()
  const [date, setDate] = useState<any>()
  const [services, setServices] = useState([])
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(false)
  const { openNotification } = useNotification()

  const profile = getProfile()

  useEffect(() => {
    api.get(`/users/${profile.username}/services`).then(response => {
      setServices(response.data.data)
    })
  }, [profile.username])

  const servicesTotalTime = services
    .filter((item: any) => form.getFieldValue('services').includes(item.id))
    .reduce((accumulator, item: any) => accumulator + item.duration, 0)

  useEffect(() => {
    if (!date) return
    api
      .post(`/schedules/available`, {
        user_id: profile.id,
        date: date.format('YYYY-MM-DD'),
        total_duration: servicesTotalTime,
      })
      .then(response => {
        setLoading(false)
        setSchedules(response.data)
      })
  }, [profile.id, date, servicesTotalTime])

  const onFinish = (values: any) => {
    setLoading(true)
    const servicesTotalPrice = services
      .filter((item: any) => values.services.includes(item.id))
      .reduce((accumulator, item: any) => accumulator + item.price, 0)

    api
      .post(`/appointments`, {
        ...values,
        user_id: profile.id,
        type: 'service',
        date: date.format('YYYY-MM-DD'),
        start_time: values.schedule,
        end_time: Number(values.schedule) + servicesTotalTime,
        status: 'pending',
        price: servicesTotalPrice,
      })
      .then(response => {
        setLoading(false)
        form.resetFields()
        openNotification({
          type: 'success',
          message: 'Agendamento cadastrado com sucesso!',
        })
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response.data) {
          console.log(response.data)

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
    <>
      <Panel title='Cadastrar Agendamento'>
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <Form
              name='login-form'
              className='login-form'
              layout='vertical'
              form={form}
              onFinish={onFinish}
              onFinishFailed={err => console.log('erro no finish', err)}
              requiredMark={false}
              scrollToFirstError
              validateMessages={validateMessages}
            >
              <Form.Item
                label='Nome'
                name='name'
                className='login-form-item'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o Nome do Serviço!',
                  },
                  {
                    pattern: new RegExp('[a-zA-Z \u00C0-\u00FF]'),
                    message: 'Apenas letras!',
                  },
                ]}
              >
                <Input
                  placeholder='Ex.: João'
                  size='large'
                  onKeyPress={e => {
                    const specialCharRegex = new RegExp(
                      '[a-zA-Z \u00C0-\u00FF]'
                    )
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
                label='Telefone'
                name='number'
                className='login-form-item'
              >
                <Input
                  type='tel'
                  pattern='[0-9]*'
                  size='large'
                  value={number}
                  onChange={e => {
                    const numbers = e.target.value.replace(/[^0-9]/g, '')
                    const result = numbers.replace(
                      /^(\d{2})(\d{5})(\d{4}).*/,
                      '($1) $2-$3'
                    )
                    setNumber(result)
                  }}
                  placeholder='Ex.: (84) 994654749'
                  maxLength={15}
                />
              </Form.Item>

              <Form.Item label='Data' name='date' className='login-form-item'>
                <DatePicker
                  defaultValue={date}
                  format={['DD/MM/YYYY']}
                  allowClear={false}
                  onChange={momentValue => setDate(momentValue)}
                />
              </Form.Item>
              <Form.Item
                label='Serviço'
                name='services'
                className='login-form-item'
              >
                <Select
                  placeholder='Selecione um serviço'
                  mode='multiple'
                  disabled={!services.length}
                  options={services.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label='Horário'
                name='schedule'
                className='login-form-item'
              >
                <Select
                  placeholder='Selecione um horário'
                  disabled={!schedules.length}
                  options={schedules.map((item: any) => ({
                    label: minutesToHourFormated(item),
                    value: item,
                  }))}
                />
              </Form.Item>

              <Form.Item className='login-form-item'>
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
                  Cadatrar Agendamento
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ManagerProfessionalAppointmentsCreate
