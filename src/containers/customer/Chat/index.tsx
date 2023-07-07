import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import {
  Input,
  Button,
  List,
  Spin,
  Image,
  Col,
  Row,
  Modal,
  Descriptions,
} from 'antd'

import { useHistory, useParams } from 'react-router-dom'

import moment from 'moment'
import Logo from '../../../assets/marqueai.png'

import api from '../../../services/api'
import {
  dateExtend,
  minutesToHourFormated,
  minutesToHourString,
  priceToCurrencyString,
} from '../../../utils/format'
import { setCustomerAppointment } from '../../../utils/authentication'
import './index.less'
import { weekNumbers } from '../../../utils/constants'

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

const inputStyleDefault = {
  borderRadius: '5px',
  margin: '3vw 3vw 0 3vw',
  width: '94vw',
}

const initialMessages = [
  botMessage('Oi, tudo bem?'),
  botMessage('Sou o Mark, assistente virtual para marcar o seu horário!'),
  botMessage('Qual o seu nome, por favor?'),
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

function validatePhone(phone: string) {
  var regex = new RegExp('^\\(((1[1-9])|([2-9][0-9]))\\) 9[0-9]{4}-[0-9]{4}$')
  return regex.test(phone)
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

  const [date, setDate] = useState<any>(moment())

  const [modalAppointmentConfirmOpen, setModalAppointmentConfirmOpen] =
    useState<boolean>(false)

  const dates = new Array(8)
    .fill(0)
    .map((_, index) => moment().add(index, 'day'))

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
      botMessage('Por favor, informe um telefone/celular para contato:'),
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
      botMessage('Selecione um ou mais serviços para agendamento:'),
    ])
    setCurrentStep(currentStep + 1)
  }

  const servicesTotalTime = useMemo(
    () =>
      services
        .filter((item: any) => servicesSelected.includes(item.id))
        .reduce((accumulator, item: any) => accumulator + item.duration, 0),
    [services, servicesSelected]
  )

  const getSchedules = () => {
    api
      .post(`/schedules/available`, {
        user_id: (professional as any).id,
        date: date.format('YYYY-MM-DD'),
        total_duration: servicesTotalTime || 30,
      })
      .then(response => {
        setLoading(false)
        if (typeof response.data === 'string' || !response.data.length) {
          setMessages([
            ...messages,
            customerMessage(dateExtend(date.format('YYYY-MM-DD')) || ''),
            botMessage(
              `oops :(, Não temos horários disponíveis para esse dia, por favor, selecione outra data.`
            ),
          ])
          setCurrentStep(3)
        } else {
          setMessages([
            ...messages,
            customerMessage(dateExtend(date.format('YYYY-MM-DD')) || ''),
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

  const handleSelectService = (serviceId: any) => {
    const active = servicesSelected.includes(serviceId)
    if (active) {
      setServicesSelected(
        servicesSelected.filter((item: any) => item !== serviceId)
      )
    } else {
      setServicesSelected([...servicesSelected, serviceId])
    }
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

    setData({
      ...data,
      date: date.format('YYYY-MM-DD'),
      dateExtend: dateExtend(date.format('YYYY-MM-DD')) || '',
    })

    setMessages([
      ...messages,
      customerMessage(dateExtend(date.format('YYYY-MM-DD')) || ''),
    ])
    setCurrentStep(currentStep + 1)
    setTimeout(getSchedules, 1000)
  }

  const handleCreateAppoitment = () => {
    setLoading(true)
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
        <div>
          {currentStep === 0 && (
            <>
              <Input
                style={{ ...inputStyleDefault }}
                size='large'
                placeholder='Nome'
                value={name}
                onChange={e => {
                  const result = e.target.value.replace(
                    /[^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÒÖÚÇÑ'~˜` ]+$/,
                    ''
                  )
                  setName(result)
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    addName()
                  }
                }}
                maxLength={50}
              />
            </>
          )}

          {currentStep === 1 && (
            <>
              <Input
                type='tel'
                pattern='[0-9]*'
                style={{ ...inputStyleDefault }}
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
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    addNumber()
                  }
                }}
                maxLength={15}
              />
            </>
          )}
          {currentStep === 2 && (
            <div className='select-carrousel'>
              {services.map((item: any) => (
                <div
                  className='box'
                  onClick={() => handleSelectService(item.id)}
                >
                  <div
                    className={`info ${
                      servicesSelected.includes(item.id) ? 'info--active' : ''
                    }`}
                  >
                    {/* <input
                      type='checkbox'
                      checked={servicesSelected.includes(item.id)}
                    /> */}
                    <p className='name'>
                      <b>{item.name}</b>
                    </p>
                    <div className='details'>
                      <p>{minutesToHourString(item.duration)}</p>
                      <p>{priceToCurrencyString(item.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && currentStep === 3 && (
            <div className='select-carrousel'>
              {dates.map(item => (
                <div
                  className='box-date'
                  onClick={() => {
                    setDate(item)
                  }}
                >
                  <div
                    className={`info-date ${
                      date.date() === item.date() ? 'info--active' : ''
                    }`}
                  >
                    {/* <input type='radio' checked={day === item.date()} /> */}
                    <p className='date'>
                      <b>{weekNumbers[item.day()]}</b>
                    </p>
                    <hr
                      className={`${
                        date.date() === item.date() ? 'active' : ''
                      }`}
                    />
                    <p>{item.format('DD/MM/YYYY')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && currentStep === 4 && (
            <div className='select-list-rows'>
              {schedules.map(item => (
                <div
                  className='box-time'
                  onClick={() => {
                    setSchedule(item)
                  }}
                >
                  <div
                    className={`info-time ${
                      item === schedule ? 'info--active' : ''
                    }`}
                  >
                    <p className='time'>{minutesToHourFormated(item)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && <Spin />}
        </div>
        <div
          style={{
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
              style={{
                height: `48px`,
                fontSize: `16px`,
                fontWeight: `bold`,
                ...inputStyleDefault,
              }}
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
                style={{
                  height: `48px`,
                  fontSize: `16px`,
                  fontWeight: `bold`,
                  ...inputStyleDefault,
                }}
                disabled={number.length < 11 || !validatePhone(number)}
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
              style={{
                height: `48px`,
                fontSize: `16px`,
                fontWeight: `bold`,
                ...inputStyleDefault,
              }}
              disabled={servicesTotalTime === 0}
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
              style={{
                height: `48px`,
                fontSize: `16px`,
                fontWeight: `bold`,
                ...inputStyleDefault,
              }}
              disabled={!date}
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
                style={{
                  height: `48px`,
                  fontSize: `16px`,
                  fontWeight: 'bold',
                  ...inputStyleDefault,
                }}
                disabled={!schedule}
                onClick={() => setModalAppointmentConfirmOpen(true)}
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
                  ...inputStyleDefault,
                }}
                disabled={name === ''}
                onClick={backToDateChange}
              >
                Voltar
              </Button>
            </>
          )}
        </div>
        <Modal
          title='Deseja finalizar o agendamento?'
          centered
          visible={modalAppointmentConfirmOpen}
          onOk={handleCreateAppoitment}
          onCancel={() => setModalAppointmentConfirmOpen(false)}
          footer={[
            <Button
              key='back'
              onClick={() => setModalAppointmentConfirmOpen(false)}
            >
              Não
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={handleCreateAppoitment}
            >
              Sim
            </Button>,
          ]}
        >
          <Descriptions size='small' layout='vertical'>
            <Descriptions.Item label='' style={{ textAlign: 'left' }}>
              Nome: {name}
              <br />
              Telefone/Celular: {number}
              <br />
              Data: {dateExtend(date.format('YYYY-MM-DD'))}
              <br />
              Horário: {minutesToHourFormated(Number(schedule))}
              <br />
              Preço total: {priceToCurrencyString(data.price)}
              <br />
              Serviços: {data.serviceNames}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </Col>
    </Row>
  )
}

export default Chat
