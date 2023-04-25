import React, { FC, useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Typography,
  List,
  Space,
  Radio,
  Select,
  Calendar,
  Spin,
  DatePicker,
  InputNumber,
  Checkbox,
  Row,
} from 'antd'

import { useHistory, useParams } from 'react-router-dom'

import moment from 'moment'

import api from '../../../services/api'
import {
  dateExtend,
  minutesToHourString,
  priceToCurrencyString,
} from '../../../utils/format'

const botMessage = (msg: string) => ({
  message: msg,
  type: 'BOT',
})

const customerMessage = (msg: string) => ({
  message: msg,
  type: 'CUSTOMER',
})

const initialMessages = [
  botMessage('Oi, tudo bem?'),
  botMessage('Sou o Mark, assistente virtual para marcar o seu horário!'),
  botMessage('Qual o seu nome, por favor?'),
]

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

const initialData = {
  name: '',
  services: [],
}

const Chat: FC = () => {
  const history = useHistory()
  const params = useParams() as any
  const [form] = Form.useForm()
  const [messages, setMessages] = useState(initialMessages)
  const [name, setName] = useState('')
  const [data, setData] = useState(initialData)
  const [services, setServices] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [servicesSelected, setServicesSelected] = useState([])
  const [schedules, setSchedules] = useState([])
  const [schedule, setSchedule] = useState()
  const [date, setDate] = useState()
  const [loading, setLoading] = useState(false)
  const [professional, setProfessional] = useState()
  const [professionalLoading, setProfessionalLoading] = useState(true)

  const [day, setDay] = useState<any>(moment().date())
  const [month, setMonth] = useState(moment().month() + 1)
  const [year, setYear] = useState(moment().year())

  useEffect(() => {
    api
      .get(`/users/${params.username}/info`)
      .then(response => {
        if (response.data === 'Recurso não encontrado') history.push('/404')
        setProfessionalLoading(false)
        setProfessional(response.data.data)
      })
      .catch(response => {
        console.error(response)
      })
  }, [])

  useEffect(() => {
    api.get(`/users/${params.username}/services`).then(response => {
      setServices(response.data.data)
    })
  }, [])

  const addName = () => {
    setData({
      ...data,
      name,
    })
    setMessages([
      ...messages,
      customerMessage(name),
      botMessage(`Excelente, ${name}! Bora lá?`),
      botMessage('Para qual serviço você deseja marcar um horário?'),
    ])
    setCurrentStep(currentStep + 1)
  }

  const getSchedules = () => {
    api
      .post(`/schedules/available`, {
        user_id: (professional as any).id,
        date: `${year}-${month < 10 ? '0' + month : month}-${
          day < 10 ? '0' + day : day
        }`,
        total_duration: 30,
      })
      .then(response => {
        setLoading(false)
        if (typeof response.data === 'string') {
          setMessages([
            ...messages,
            customerMessage(
              dateExtend(
                `${year}-${month < 10 ? '0' + month : month}-${
                  day < 10 ? '0' + day : day
                }`
              ) || ''
            ),
            botMessage(
              `oops :(, Não temos horários disponíveis para esse dia, por favor, selecione outra data.`
            ),
          ])
          setCurrentStep(2)
        } else {
          setMessages([
            ...messages,
            botMessage('Qual horário você deseja marcar?'),
          ])
          setSchedules(response.data)
        }
      })
  }

  const addService = () => {
    setData({
      ...data,
      services: servicesSelected,
    })

    // const serviceFinded = services.find(
    //   (item: any) => item.id === service
    // ) as any
    setMessages([
      ...messages,
      //customerMessage(serviceFinded?.name),
      botMessage('Qual dia você deseja agendar?'),
    ])
    setCurrentStep(currentStep + 1)
  }

  const backToDateChange = () => {
    setMessages([
      ...messages,
      customerMessage('Voltar'),
      botMessage('Qual dia você deseja agendar?'),
    ])
    setCurrentStep(currentStep - 1)
  }

  const addDate = () => {
    setLoading(true)
    setMessages([
      ...messages,
      customerMessage(
        dateExtend(
          `${year}-${month < 10 ? '0' + month : month}-${
            day < 10 ? '0' + day : day
          }`
        ) || ''
      ),
    ])
    setCurrentStep(currentStep + 1)
    setTimeout(getSchedules, 1000)
  }

  if (professionalLoading) return <Spin />

  return (
    <>
      <List
        size='large'
        dataSource={messages}
        renderItem={item => (
          <List.Item
            key={item.message}
            style={{
              justifyContent: item.type === 'BOT' ? 'flex-start' : 'flex-end',
            }}
          >
            {item.message}
          </List.Item>
        )}
      />
      <br />
      {currentStep === 0 && (
        <>
          <Input
            size='large'
            placeholder='Nome'
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                addName()
              }
            }}
          />
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
            disabled={name === ''}
            onClick={addName}
          >
            Enviar
          </Button>
        </>
      )}
      {currentStep === 1 && (
        <>
          <Checkbox.Group
            style={{ width: '100%' }}
            onChange={(checkedValues: any) =>
              setServicesSelected(checkedValues)
            }
          >
            {services.map((service: any) => (
              <Checkbox key={service.id} value={service.id}>
                {service.name} | {minutesToHourString(service.duration)} |{' '}
                {priceToCurrencyString(service.price)}
              </Checkbox>
            ))}
          </Checkbox.Group>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            style={{
              height: `48px`,
              fontSize: `16px`,
              fontWeight: `bold`,
              marginBottom: '48px',
            }}
            disabled={name === ''}
            onClick={addService}
          >
            Enviar
          </Button>
        </>
      )}
      {!loading && currentStep === 2 && (
        <>
          <div
            style={{
              marginTop: '8px',
              marginBottom: '32px',
            }}
          >
            <Space>
              <InputNumber
                placeholder='Dia'
                min={moment().date()}
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
                min={moment().year()}
                max={moment().year() + 1}
                value={year}
                onChange={(value: any) => {
                  setYear(value)
                }}
              />
            </Space>
          </div>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            style={{
              height: `48px`,
              fontSize: `16px`,
              fontWeight: `bold`,
              marginBottom: '48px',
            }}
            disabled={!day && !month && !year}
            onClick={addDate}
          >
            Enviar
          </Button>
        </>
      )}
      {!loading && currentStep === 3 && (
        <>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Select
              size='large'
              style={{ width: '100%' }}
              placeholder='Selecione um horário...'
              options={schedules.map((item: any) => ({
                value: item,
                label: minutesToHourString(item),
              }))}
              value={schedule}
              onChange={value => setSchedule(value)}
            />
          </Space>

          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            style={{
              height: `48px`,
              fontSize: `16px`,
              fontWeight: `bold`,
              marginTop: '8px',
            }}
            disabled={name === ''}
            onClick={() => console.log('Agendamento finalizado!')}
          >
            Finalizar Agendamento
          </Button>
          <Button
            htmlType='submit'
            className='login-form-button'
            size='large'
            style={{
              height: `48px`,
              fontSize: `16px`,
              fontWeight: `bold`,
              marginBottom: '48px',
            }}
            disabled={name === ''}
            onClick={backToDateChange}
          >
            Voltar
          </Button>
        </>
      )}
      {loading && <Spin />}
    </>
  )
}

export default Chat
