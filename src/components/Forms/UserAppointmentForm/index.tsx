import React, { FC, useState, useEffect } from 'react'
import {
  Form,
  Button,
  Select,
} from 'antd'
import api from '../../../services/api'


import FormItem from 'antd/lib/form/FormItem'
//import { dateExtend, dateWithoutTimestamp, minutesToHourString } from '../../../utils/format'
import { getProfile } from '../../../utils/authentication'




export const textMonths: any = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}


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

interface UserAppointmentFormProps {
  buttonText: string
}

const UserAppointmentForm: FC<UserAppointmentFormProps> = ({ buttonText }) => {
  const [form] = Form.useForm()



  const [loading, setLoading] = useState(false)
  const [establishments, /* setEstablishments */] = useState<any[]>([])


  //Puzzle
  const [puzzles, setPuzzles] = useState<any[]>([])
  const [puzzleId, setPuzzleId] = useState()

  //Items
  const [puzzleItems, setPuzzleItems] = useState<any[]>([])
  const [puzzleItemId, setPuzzleItemId] = useState()

  //Schedule - Days
  const [puzzleScheduleDays, setPuzzleSchedulableDays] = useState<any[]>([])
  const [puzzleScheduleDayId, setPuzzleSchedulableDayId] = useState()
  //Schedule -Date
  const [puzzleScheduleDates, setPuzzleSchedulableDates] = useState<any[]>([])
  //Schedule - Time
  //const [puzzleScheduleTimes, setPuzzleSchedulableTimes] = useState<any[]>([])
  const [puzzleScheduleTimeId, setPuzzleScheduleTimeId] = useState()

  //Date





  const [date,  setDate ] = useState()
  /* const [establishmentId, setEstablishmentId] = useState() */
  const [appointmentId, /* setAppointmentId */] = useState()

  const weekdays = [
    { name: 'Segunda-feira', value: 1 },
    { name: 'Terça-feira', value: 2 },
    { name: 'Quarta-feira', value: 3 },
    { name: 'Quinta-feira', value: 4 },
    { name: 'Sexta-feira', value: 5 },
    { name: 'Sábado', value: 6 },
    { name: 'Domingo', value: 7 },
  ]

  const findDay = (dayId:any) => {
    let day:any =  weekdays.find(element => element.value === dayId)
    return day.name
  }

  const getSchedules = (data:any, id:any) => {
    let schedules = data.find((element:any) => element.day === id)

    return schedules && schedules.schedules
  }

  const timeFormat = (time:any) =>{
    let hours = adicionaZero(Math.trunc(time/60))
    let minutes = adicionaZero(time%60)

    return `${hours}h${minutes}min`
  }

  function adicionaZero(numero:any) {
    if (numero <= 9)
      return "0" + numero;
    else
      return numero;
  }


  useEffect(() => {
    api.get(`puzzles/${puzzleId}/schedule-find-dates?day=${puzzleScheduleDayId}`).then((response) => {
      setPuzzleSchedulableDates(response.data)
    })
  }, [puzzleScheduleDayId,puzzleId])

  useEffect(() => {
    api.get(`puzzles`).then((response) => {
      setPuzzles(response.data)
    })
  }, [])

  useEffect(() => {
    if (puzzleId) {
      api.get(`puzzles/${puzzleId}/items`).then((response) => {
        setPuzzleItems(response.data)
      })
    }


  }, [puzzleId])


  useEffect(() => {
    if (puzzleId) {
      api.get(`puzzles/${puzzleId}/schedule-by-day`).then((response) => {
        setPuzzleSchedulableDays(response.data)
      })
    }
  }, [puzzleId])


  const onFinish = () => {
    setLoading(true)
    const profile = getProfile()
    api
      .post(`citizens/${profile.user_id}/appointments`, {
        puzzleItemId,
        puzzleScheduleId: puzzleScheduleTimeId,
        date,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
      })
      .catch(({ response }) => {
        if (response.data.email) {
          form.setFields([
            {
              name: 'puzzle_id',
              errors: [response.data.error],
            },
          ])
        }
      })
  }

  useEffect(() => {
    form.setFields([
      {
        name: 'establishments',
        value: establishments,
      },
      {
        name: 'date',
        value: date,
      },
    ])
  }, [establishments, date, form])

  return (
    <>
      {/*<Typography.Title
        style={{ textAlign: 'center', fontSize: `32px`, marginBottom: `12px`, marginTop: `12px`,  }}
      >
        Cadastro do Cidadão
      </Typography.Title>*/}
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
          name='puzzle_id'
          label='Selecione um dos Módulos disponíveis'
          rules={[{ required: true, message: 'Por favor, selecione um Módulo!' }]}
        >
          <Select
            showSearch
            optionFilterProp='children'
            placeholder='Selecione uma opção'
            onChange={value => {
              setPuzzleId(value)
            }}
          >
            {puzzles.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className='login-form-item'
          name='puzzle_item_id'
          label='Escolha um dos itens disponíveis para este Módulo'
          rules={[
            {
              required: true,
              message: 'Por favor, selecione um item!',
            },
          ]}
        >

          <Select
            showSearch
            optionFilterProp='children'
            placeholder='Itens Disponíveis'
            value={date}
            onChange={value => {
              setPuzzleItemId(value)
            }}
          >
            {puzzleItems.map(item => (
              <Select.Option key={item.id} value={item.id}>{item.display_name}</Select.Option>
            ))}
          </Select>

        </Form.Item>

        <FormItem
          className='login-form-item'
          name='schedule-by-day'
          label='Escolha um dia para Agendamento!'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o um dia para o agendamento!',
            },
          ]}>
          <Select
            showSearch
            optionFilterProp='children'
            placeholder='Selecione uma opção'
            value={appointmentId}
            onChange={value => {
              setPuzzleSchedulableDayId(value)
            }}
          >
            {puzzleScheduleDays.map((item) => (
              <Select.Option value={item.day}>{findDay(Number(item.day))}</Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem
          className='login-form-item'
          name='schedule-time_in_minutes'
          label='Escolha um dos Horários disponíveis para esse dia'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o um horário para o agendamento!',
            },
          ]}>
          <Select
            showSearch
            optionFilterProp='children'
            placeholder='Selecione uma opção'
            value={appointmentId}
            onChange={value => {
              setPuzzleScheduleTimeId(value)
            }}
          >
            {getSchedules(puzzleScheduleDays,puzzleScheduleDayId)
            ?.map((item:any) => (
              <Select.Option value={item.id}>{timeFormat(item.timeInMinutes)}</Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem
          className='login-form-item'
          name='date'
          label='Escolha uma data disponível'
          rules={[
            {
              required: true,
              message: 'Por favor, selecione uma data!',
            },
          ]}>
          <Select
            showSearch
            optionFilterProp='children'
            placeholder='Selecione uma opção'
            value={date}
             onChange={value => {
              setDate(value)
            }}
          >
            {puzzleScheduleDates
            ?.map((item:any) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </FormItem>


        <Form.Item className='login-form-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            size='large'
            loading={loading}
            style={{ height: `48px`, fontSize: `16px`, fontWeight: `bold` }}
          >
            {buttonText}
          </Button>
        </Form.Item>
        {/*<div className='login-form-register'>
          Já possui conta?
          <a href='/login'> Faça seu login</a>
        </div>*/}
      </Form>
    </>
  )
}

export default UserAppointmentForm
