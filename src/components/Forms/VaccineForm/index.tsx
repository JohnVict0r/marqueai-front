import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space, InputNumber } from 'antd'
import moment from 'moment'
import api from '../../../services/api'

/* const orderFormated: any = {
  '0': 'Dose zero',
  '1': '1º Dose',
  '2': '2º Dose',
  '3': '3º Dose',
  '4': '4º Dose',
  U: 'Dose única',
  R: 'Reforço',
} */

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

const vaccineOrder = [
  {id:'1',name:'1ª dose'},
  {id:'2',name:'2ª dose'},
]


interface Props {
  readonly buttonText: string
}
const VaccineForm: FC<Props> = ({ buttonText }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [vaccines, setVaccines] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([])
  const [citizens, setCitizens] = useState<any[]>([])

  const [day, setDay] = useState<any>(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState()

  useEffect(() => {
    api.get(`vaccines`).then((response) => {
      setVaccines(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`citizens`).then((response) => {
      setCitizens(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`professionals`).then((response) => {
      setProfessionals(response.data)
    })
  }, [])

  const onFinish = (values: any) => {
    setLoading(true)

    api
      .post('/vaccinations', {
        ...values,
        applicationDate: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
      })
      .then(() => {
        setLoading(false)
        form.resetFields()
      })
      .catch(({ response }) => {
        setLoading(false)
        if (response.data) {
          form.setFields([
            {
              name: 'email',
              errors: [response.data.error],
            },
          ])
        }
      })
  }

  return (
    <Form
      name='vaccine-form'
      className='vaccine-form'
      layout='vertical'
      form={form}
      //initialValues={{ ...currentVacination }}
      onFinish={onFinish}
      onFinishFailed={err => console.log('erro no finish', err)}
      scrollToFirstError
    >
      <Form.Item
        name='citizenId'
        label='Cidadão'
        rules={[{ required: true, message: 'Por favor, selecione um vacinado!' }]}
      >
        <Select
          showSearch
          optionFilterProp='children'
          placeholder='Selecione uma opção'

       /*    value={name}
          onChange={value => {
            setName(value)
          }} */
        >
         {citizens.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.profile.name}
            </Select.Option>
          ))}
        </Select>

      </Form.Item>

      <Form.Item
        name='professionalId'
        label='Vacinador'
        rules={[{ required: true, message: 'Por favor, selecione um vacinador!' }]}
      >
        <Select
          showSearch
          optionFilterProp='children'
          placeholder='Selecione uma opção'
        /*   value={name}
          onChange={value => {
            setName(value)
          }} */
        >
         {professionals.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.profile.name}
            </Select.Option>
              ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='vaccineId'
        label='Vacina'
        rules={[{ required: true, message: 'Por favor, selecione uma vacina!' }]}
      >
        <Select
          showSearch
          optionFilterProp='children'
          placeholder='Selecione uma opção'
     /*      value={name}
          onChange={value => {
            setName(value)
          }} */
        >
         {vaccines.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.display_name}
            </Select.Option>
              ))}
        </Select>

      </Form.Item>

      <Form.Item
        name='order'
        label='Dose'
        rules={[{ required: true, message: 'Por favor, selecione a dose!' }]}
      >
        <Select
          showSearch
          optionFilterProp='children'
          placeholder='Selecione uma opção'
         /*  value={vaccine}
          onChange={value => {
            setVaccine(value)
          }} */
        >
           {vaccineOrder.map(vaccine => (
              <Select.Option key={vaccine.id} value={vaccine.id}>
                {vaccine.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='applicationDate'
        label='Data de Vacinação'
        rules={[
          {
            required: true,
            message: 'Por favor, informe a data de vacinação!',
          },
        ]}
      >
        <Space>
          <InputNumber
            placeholder='Dia'
            min={1}
            max={31}
            value={day}
            onChange={value => {
              setDay(value)
            }}
          />
          <Select
            placeholder='Mês'
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
            min={1900}
            max={moment().year()}
            value={year}
            onChange={value => {
              setYear(value)
            }}
          />
        </Space>
      </Form.Item>
      <Form.Item
      label='Lote da vacina'
      name='lote'
       rules={[
        {
          required: true,
          message: 'Por favor, informe o lote da vacina!',
        },
      ]}
    >
        <Input size='large' defaultValue=' ' />
      </Form.Item>
      <Form.Item
      label='Local da vacinação (CNES)'
      name='cnes'
       rules={[
        {
          required: true,
          message: 'Por favor, informe o CNES do local de vacinação!',
        },
      ]}
      >
        <Input size='large' defaultValue=' ' />
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
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default VaccineForm
