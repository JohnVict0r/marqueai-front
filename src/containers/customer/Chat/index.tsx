import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Input,
  Button,
  List,
  Space,
  Select,
  Spin,
  InputNumber,
  Image,
  Col,
  Row,
} from 'antd'

import { useHistory, useParams } from 'react-router-dom'

import moment from 'moment'
import Logo from '../../../assets/marqueai.png'

import api from '../../../services/api'
import { dateExtend, minutesToHourString } from '../../../utils/format'
import { setCustomerAppointment } from '../../../utils/authentication'

const botMessage = (msg: string) => ({
  message: msg,
  type: 'BOT',
})

const customerMessage = (msg: string) => ({
  message: msg,
  type: 'CUSTOMER',
})

const botMessageStyle = {
  justifyContent: 'flex-start',
  display: 'flex',
  fontWeight: 500,
  padding: '10px',
  color: '#ffffff',
  background: '#ff9000',
  borderRadius: '16px',
  maxWidth: '75%',
}

const customerMessageStyle = {
  fontWeight: 500,
  padding: '10px',
  color: 'white',
  background: '#919292',
  borderRadius: '16px',
  maxWidth: '75%',
}

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
  number: '',
  services: [],
  serviceNames: '',
  date: '',
  dateExtend: '',
  price: 0,
}

const Chat: FC = () => {
  const history = useHistory()
  const params = useParams() as any
  const [messages, setMessages] = useState(initialMessages)
  const messagesEndRef = useRef(null) as any

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [data, setData] = useState(initialData)
  const [services, setServices] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [servicesSelected, setServicesSelected] = useState<any>([])
  const [schedules, setSchedules] = useState([])
  const [schedule, setSchedule] = useState()
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
  }, [params.username, history])

  useEffect(() => {
    api.get(`/users/${params.username}/services`).then(response => {
      setServices(response.data.data)
    })
  }, [params.username])

  useEffect(() => {
    messagesEndRef &&
      messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, messagesEndRef])

  const addName = () => {
    setData({
      ...data,
      name,
    })
    setMessages([
      ...messages,
      customerMessage(name),
      botMessage(`Excelente, ${name}! Bora lá?`),
      botMessage('Poderia informar um telefone/celular para contato?'),
    ])
    setCurrentStep(currentStep + 1)
  }

  const addNumber = () => {
    setData({
      ...data,
      number,
    })
    setMessages([
      ...messages,
      customerMessage(number),
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
        if (typeof response.data === 'string' || !response.data.length) {
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
          setCurrentStep(4)
        } else {
          setMessages([
            ...messages,
            customerMessage(
              dateExtend(
                `${year}-${month < 10 ? '0' + month : month}-${
                  day < 10 ? '0' + day : day
                }`
              ) || ''
            ),
            botMessage('Qual horário você deseja marcar?'),
          ])
          setSchedules(response.data)
        }
      })
  }

  const addService = () => {
    const servicesTotalPrice = services
      .filter((item: any) => servicesSelected.includes(item.id))
      .reduce((accumulator, item: any) => accumulator + item.price, 0)

    const serviceNames = services
      .filter((item: any) => servicesSelected.includes(item.id))
      .map((item: any) => item.name)
      .join(', ')

    setData({
      ...data,
      services: servicesSelected,
      price: servicesTotalPrice,
      serviceNames,
    })

    setMessages([
      ...messages,
      customerMessage(serviceNames),
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
    const dateValue = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`
    setData({
      ...data,
      date: dateValue,
      dateExtend: dateExtend(dateValue) || '',
    })

    setMessages([...messages, customerMessage(dateExtend(dateValue) || '')])
    setCurrentStep(currentStep + 1)
    setTimeout(getSchedules, 1000)
  }

  const handleCreateAppoitment = () => {
    setLoading(true)
    const servicesTotalTime = services
      .filter((item: any) => servicesSelected.includes(item.id))
      .reduce((accumulator, item: any) => accumulator + item.duration, 0)

    api
      .post(`/appointments`, {
        ...data,
        user_id: (professional as any).id,
        type: 'service',
        start_time: schedule,
        end_time: Number(schedule) + servicesTotalTime,
        status: 'pending',
      })
      .then(response => {
        setLoading(false)
        setCustomerAppointment({ ...response.data, ...data, schedule })
        history.push('/success')
      })
  }

  if (professionalLoading)
    return <Spin style={{ display: 'flex', justifyContent: 'center' }} />

  return (
    <Row
      justify='center'
      align='middle'
      style={{
        height: '100vh',
      }}
    >
      <Col
        xs={{ span: 20 }}
        lg={{ span: 8 }}
        style={{
          maxWidth: '100%',
          minWidth: '100%',
        }}
      >
        <div
          style={{
            // paddingTop: '20px',
            // paddingBottom: '10px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh',
          }}
        >
          <Image src={Logo} width='240px' />
        </div>
        <div style={{ height: '50vh', overflowY: 'auto' }}>
          <List
            size='large'
            dataSource={messages}
            renderItem={item => (
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    item.type === 'BOT' ? 'flex-start' : 'flex-end',
                  margin: '10px',
                }}
              >
                <List.Item
                  key={item.message}
                  style={
                    item.type === 'BOT' ? botMessageStyle : customerMessageStyle
                  }
                >
                  {item.message}
                </List.Item>
              </div>
            )}
          />
          <div ref={messagesEndRef}></div>
        </div>
        <div
          style={{
            maxHeight: '10vh',
          }}
        >
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
            </>
          )}

          {currentStep === 1 && (
            <>
              <Input
                size='large'
                value={number}
                onChange={e => setNumber(e.target.value)}
                placeholder='Ex.: (84) 994654749'
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    addNumber()
                  }
                }}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <Select
                mode='multiple'
                size='large'
                allowClear
                style={{ width: '100%' }}
                placeholder='Selecione um ou mais serviços'
                value={servicesSelected}
                onChange={(values: any) => {
                  setServicesSelected(values)
                }}
                options={services.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </>
          )}
          {!loading && currentStep === 3 && (
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
                    min={moment().month() === month - 1 ? moment().date() : 1}
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
                    {months
                      .filter(item => {
                        const currentYear = moment().year() === year
                        if (currentYear && item.value < month) return false
                        return true
                      })
                      .map(item => (
                        <Select.Option value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                  <InputNumber
                    placeholder='Ano'
                    min={moment().year()}
                    max={moment().year() + 1}
                    value={year}
                    onChange={(value: any) => {
                      setYear(value)
                      if (value === moment().year()) {
                        setMonth(moment().month() + 1)
                        setDay(moment().date())
                      }
                    }}
                  />
                </Space>
              </div>
            </>
          )}
          {!loading && currentStep === 4 && (
            <Space
              direction='vertical'
              style={{ width: '100%', marginBottom: '8px' }}
            >
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
          )}

          {loading && <Spin />}
        </div>
        <div
          style={{
            height: '20vh',
            alignItems: 'flex-end',
            justifyItems: 'flex-end',
          }}
        >
          {currentStep === 0 && (
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
          )}

          {currentStep === 1 && (
            <>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                size='large'
                style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
                disabled={number === ''}
                onClick={addNumber}
              >
                Enviar
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              size='large'
              style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
              disabled={name === ''}
              onClick={addService}
            >
              Enviar
            </Button>
          )}
          {!loading && currentStep === 3 && (
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              size='large'
              style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
              disabled={!day && !month && !year}
              onClick={addDate}
            >
              Verificar
            </Button>
          )}
          {!loading && currentStep === 4 && (
            <>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                size='large'
                style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
                disabled={name === ''}
                onClick={handleCreateAppoitment}
              >
                Finalizar Agendamento
              </Button>
              <Button
                htmlType='submit'
                className='login-form-button'
                size='large'
                style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
                disabled={name === ''}
                onClick={backToDateChange}
              >
                Voltar
              </Button>
            </>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Chat
