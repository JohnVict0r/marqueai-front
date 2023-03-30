import React, { useEffect, useState, } from 'react'
import Panel from '../../../components/Panel'
import { Row, Col, Button, Form, Select, InputNumber, Space } from 'antd'
/* import { useHistory } from 'react-router-dom' */
import api from '../../../services/api'

const weekdays = [
  { name: 'Segunda-feira', value: 1 },
  { name: 'Terça-feira', value: 2 },
  { name: 'Quarta-feira', value: 3 },
  { name: 'Quinta-feira', value: 4 },
  { name: 'Sexta-feira', value: 5 },
  { name: 'Sábado', value: 6 },
  { name: 'Domingo', value: 7 },
]

function ManagerEstablishmentHours() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
 /*  const history = useHistory() */
  const [/* schedules */, setSchedules] = useState<any[]>([])
  const [hour, setHour] = useState()
  const [minutes, setMinutes] = useState()

  useEffect(() => {
    api.get(`schedules`).then((response) => {
      setSchedules(response.data)
    })
  }, [])


  const onFinish = (values: any) => {
    setLoading(true)

    api
      .post('/schedules', {
        ...values,
      })
      .then(() => {
        setLoading(false)
        /*form.resetFields()*/
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
    <>
      <Panel
        title='Lista de Horários'
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>

          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
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
                label='Selecione o(s) dia(s) da semana que você deseja cadastrar os horários'
                name='weekdays'
                className='login-form-item'
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Selecione um ou mais dias"
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
                      setHour(value)
                    }}
                  />
                  <InputNumber
                    placeholder='Minutos'
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={value => {
                      setMinutes(value)
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

export default ManagerEstablishmentHours
