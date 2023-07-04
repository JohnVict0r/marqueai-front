import React, { useEffect, useState } from 'react'
import Panel from '../../../../components/Panel'
import {
  Row,
  Col,
  List,
  Statistic,
  Button,
  Space,
  DatePicker,
  Card,
} from 'antd'
import { FormOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'
import api from '../../../../services/api'
import { useHistory } from 'react-router-dom'

import moment from 'moment'

function ManagerProfesisonalAppointmentsList() {
  const isMobile = window.innerWidth < 720
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const [date, setDate] = useState<any>(moment())

  useEffect(() => {
    api
      .get(`/me/appointments?date=${date.format('YYYY-MM-DD')}`)
      .then(response => {
        setData(response.data.data)
        setLoading(false)
      })
  }, [date])

  const time_format = (time: any) => {
    let hours = adicionaZero(Math.trunc(time / 60))
    let minutes = adicionaZero(time % 60)

    return `${hours}h${minutes}min`
  }

  function adicionaZero(numero: any) {
    if (numero <= 9) return '0' + numero
    else return numero
  }

  /* const onlyUnique = (value:any, index:any, self:any) => {
    return self.indexOf(value) === index;
  }

  const get_unique_date = (data:any) => {
    let atribute = data.map((item:any)=>item.user_name);
    let unique = atribute.filter(onlyUnique);

    return unique;
  } */

  const handleCanceled = (appointmentId: number) => {
    api
      .patch(`/me/appointments/${appointmentId}/confirmation`, {
        status: 'canceled',
      })
      .then(() => {
        const newData = data.filter(item => item.id !== appointmentId)
        setData(newData)
        setLoading(false)
      })
  }

  const handleConfirmed = (appointmentId: number) => {
    api
      .patch(`/me/appointments/${appointmentId}/confirmation`, {
        status: 'confirmed',
      })
      .then(response => {
        const newData = data.filter(item => item.id !== appointmentId)
        setData([...newData, response.data])
        setLoading(false)
      })
  }

  return (
    <>
      <Panel
        title='Controle de agendamentos'
        action={
          <Button
            type='primary'
            icon={<FormOutlined />}
            onClick={() => {
              history.push(`/manager/professional/appointments/create`)
            }}
          >
            Cadastrar Agendamento
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Space>
              <Statistic title='Agendamentos Cadastrados' value={data.length} />
              <DatePicker
                defaultValue={date}
                format={['DD/MM/YYYY']}
                allowClear={false}
                onChange={momentValue => setDate(momentValue)}
              />
            </Space>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            {!isMobile ? (
              <List
                className='demo-loadmore-list'
                loading={loading}
                itemLayout='horizontal'
                dataSource={data}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button
                        type='primary'
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleCanceled(item.id)}
                      >
                        Cancelar
                      </Button>,
                      <Button
                        type='primary'
                        icon={<CheckOutlined />}
                        onClick={() => handleConfirmed(item.id)}
                      >
                        Atender
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <p>
                          <strong>Nome:</strong> {item.name}
                        </p>
                      }
                      description={
                        <p>
                          <strong>Contato:</strong> {item.number}{' '}
                        </p>
                      }
                    />
                    <div>{time_format(item.start_time)}</div>
                  </List.Item>
                )}
              />
            ) : (
              <List
                dataSource={data}
                style={{ display: 'flex', justifyContent: 'center' }}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <Card
                      title={
                        <p>
                          <strong>Horário:</strong>{' '}
                          {time_format(item.start_time)}
                        </p>
                      }
                    >
                      <p>
                        <strong>Nome:</strong> {item.name}{' '}
                      </p>
                      <p>
                        <strong>Contato:</strong> {item.number}{' '}
                      </p>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          type='primary'
                          danger
                          icon={<CloseOutlined />}
                          onClick={() => handleCanceled(item.id)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type='primary'
                          icon={<CheckOutlined />}
                          onClick={() => handleConfirmed(item.id)}
                        >
                          Atender
                        </Button>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ManagerProfesisonalAppointmentsList
