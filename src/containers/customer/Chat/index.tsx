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
  Checkbox,
  Calendar,
  Select,
} from 'antd'

import { useHistory, useParams } from 'react-router-dom'

import moment from 'moment'
import 'moment/locale/pt-br'
import locale from 'antd/es/date-picker/locale/pt_PT'
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
import { weekString } from '../../../utils/constants'

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
  botMessage('Qual o seu número, por favor?'),
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
  const [daysAvailable, setDaysAvailable] = useState<any>([])
  const [schedules, setSchedules] = useState([])
  const [schedule, setSchedule] = useState()
  const [loading, setLoading] = useState(false)
  const [professional, setProfessional] = useState()
  const [professionalLoading, setProfessionalLoading] = useState(true)

  const [date, setDate] = useState<any>(moment())

  const [modalAppointmentConfirmOpen, setModalAppointmentConfirmOpen] =
    useState<boolean>(false)

  useEffect(() => {
    api
      .get(`/users/${params.username}/info`)
      .then(response => {
        if (response.data === 'errors.not_found') history.push('/404')
        setProfessionalLoading(false)
        setProfessional(response.data.data)
      })
      .catch(response => {
        console.error(response)
      })
  }, [params.username, history])

  useEffect(() => {
    if (professional) {
      api.get(`/users/${params.username}/services`).then(response => {
        setServices(response.data.data)
      })
    }
  }, [professional, params.username])

  useEffect(() => {
    api.get(`/user/${params.username}/days/available`).then(response => {
      setDaysAvailable(response.data.data.map((item: any) => item.day))
    })
  }, [params.username])

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current: any) => {
    if (!current) return false
    if (current < moment().startOf('day')) return true
    if (!daysAvailable.includes(weekString[current.day()])) return true

    return false
  }

  useEffect(() => {
    messagesEndRef &&
      messagesEndRef.current &&
      setTimeout(
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }),
        1000
      )
  }, [messages, messagesEndRef, schedules])

  const getNameByTel = async (tel: string) => {
    setLoading(true)
    api.get(`/appointments/customer/${tel}`).then(response => {
      setLoading(false)
      if (response.status === 200) {
        setData({
          ...data,
          number,
          name: response.data,
        })
        setName(response.data)
        setMessages([
          ...messages,
          customerMessage(number),
          botMessage(`Que bom que voltou, ${response.data}!`),
          botMessage('Selecione um ou mais serviços para agendamento:'),
        ])

        setCurrentStep(2)
      } else {
        setMessages([
          ...messages,
          customerMessage(number),
          botMessage('Qual o seu nome, por favor?'),
        ])
        setCurrentStep(currentStep + 1)
      }
    })
  }

  const addNumber = async () => {
    setData({
      ...data,
      number,
    })

    getNameByTel(number.replace(/[^0-9]/g, ''))
  }

  const addName = () => {
    setData({
      ...data,
      name,
    })
    setMessages([
      ...messages,
      customerMessage(name),
      botMessage(`Legal, ${name}!`),
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
    setDate(moment())
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
    return (
      <Spin
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50vh' }}
      />
    )

  return (
    <Row justify='center'>
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
            height: '10vh',
          }}
          onClick={() => history.push('/')}
        >
          <Image src={Logo} width='240px' preview={false} />
        </div>
        <div style={{ overflowY: 'auto' }}>
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
          {currentStep === 2 && (
            <div className='select-checkbox'>
              {services.map((item: any) => (
                <div
                  className={`checkbox-item ${
                    servicesSelected.includes(item.id)
                      ? 'checkbox-item--active'
                      : ''
                  }`}
                >
                  <Checkbox
                    onClick={() => handleSelectService(item.id)}
                    checked={servicesSelected.includes(item.id)}
                  >
                    <div>
                      <p className='name'>
                        <b>{item.name}</b>
                      </p>
                      <div className='details'>
                        <p>
                          {minutesToHourString(item.duration)}
                          {item.price ? (
                            <>
                              {' - '} {priceToCurrencyString(item.price)}
                            </>
                          ) : (
                            ' - Preço a combinar'
                          )}
                        </p>
                      </div>
                    </div>
                  </Checkbox>
                </div>
              ))}
            </div>
          )}
          {!loading && currentStep === 3 && (
            <div className='calendar'>
              <Calendar
                fullscreen={false}
                onPanelChange={value => setDate(value)}
                onChange={value => setDate(value)}
                onSelect={value => setDate(value)}
                disabledDate={disabledDate}
                locale={locale}
                headerRender={({ value, onChange }) => {
                  const start = 0
                  const end = 12
                  const monthOptions = []

                  const current = value.clone()
                  const localeData = value.localeData()
                  const months = []
                  for (let i = 0; i < 12; i++) {
                    current.month(i)
                    months.push(localeData.months(current))
                  }

                  for (let i = start; i < end; i++) {
                    monthOptions.push(
                      <Select.Option key={i} value={i} className='month-item'>
                        {months[i]}
                      </Select.Option>
                    )
                  }

                  const year = value.year()
                  const month = value.month()
                  const options = []
                  for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className='year-item'>
                        {i}
                      </Select.Option>
                    )
                  }
                  return (
                    <div style={{ padding: 8 }}>
                      <Row
                        gutter={[24, 24]}
                        style={{ width: '100%', margin: '0px' }}
                      >
                        <Col span={12}>
                          <Select
                            size='middle'
                            dropdownMatchSelectWidth={false}
                            className='my-year-select'
                            value={year}
                            onChange={newYear => {
                              const now = value.clone().year(newYear)
                              onChange(now)
                            }}
                            style={{ width: '100%' }}
                          >
                            {options}
                          </Select>
                        </Col>
                        <Col span={12}>
                          <Select
                            size='middle'
                            dropdownMatchSelectWidth={false}
                            value={month}
                            onChange={newMonth => {
                              const now = value.clone().month(newMonth)
                              onChange(now)
                            }}
                            style={{ width: '100%' }}
                          >
                            {monthOptions}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  )
                }}
              />
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

          <div ref={messagesEndRef}></div>
        </div>
        {loading ? (
          <Spin style={{ display: 'flex', justifyContent: 'center' }} />
        ) : (
          <div
            style={{
              alignItems: 'center',
              justifyItems: 'center',
              position: 'fixed',
              left: '0px',
              right: '0px',
              bottom: '0px',
              paddingBottom: '0.5rem',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              WebkitBoxPack: 'center',
              justifyContent: 'center',
              zIndex: 3000,
            }}
          >
            <div>
              {currentStep === 0 && (
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

              {currentStep === 1 && (
                <>
                  <Input
                    style={{ ...inputStyleDefault }}
                    size='large'
                    placeholder='Seu nome'
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
            </div>
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
                disabled={number.length < 11 || !validatePhone(number)}
                onClick={addNumber}
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
                  disabled={name.length < 3}
                  onClick={addName}
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
        )}

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
