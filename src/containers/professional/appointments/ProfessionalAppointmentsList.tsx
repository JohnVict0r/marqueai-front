import React, { useEffect, useState } from 'react'
import Panel from '../../../components/Panel'
import {
  Row,
  Col,
  List,
  Statistic,
  Button,
  Space,
  DatePicker,
  Card,
  Tag,
  Modal,
  Descriptions,
} from 'antd'
import {
  FormOutlined,
  CloseOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import api from '../../../services/api'
import { useHistory } from 'react-router-dom'

import moment from 'moment'

const statusTag: any = {
  confirmed: (
    <Tag icon={<CheckCircleOutlined />} color='success'>
      Confirmado
    </Tag>
  ),
  pending: (
    <Tag icon={<ClockCircleOutlined />} color='default'>
      Aguardando
    </Tag>
  ),
}

function ProfesisonalAppointmentsList() {
  const isMobile = window.innerWidth < 720
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [appointmentSelected, setAppointmentSelected] = useState<any>({})
  const [modalCancelOpen, setModalCancelOpen] = useState(false)
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

  const handleCanceled = (appointmentId: number) => {
    api
      .put(`/me/appointments/${appointmentId}/confirmation`, {
        status: 'canceled',
      })
      .then(() => {
        const newData = data.filter(item => item.id !== appointmentId)
        setData(newData)
      })
  }

  const handleConfirmed = (appointmentId: number) => {
    api
      .put(`/me/appointments/${appointmentId}/confirmation`, {
        status: 'confirmed',
      })
      .then(response => {
        const newData = data.filter(item => item.id !== appointmentId)
        setData([...newData, response.data])
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
              history.push(`/professional/appointments/create`)
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
                    actions={
                      item.status === 'pending'
                        ? [
                            <Button
                              type='primary'
                              danger
                              icon={<CloseOutlined />}
                              onClick={() => {
                                setAppointmentSelected(item)
                                setModalCancelOpen(true)
                              }}
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
                          ]
                        : [
                            <Button
                              type='primary'
                              danger
                              icon={<CloseOutlined />}
                              onClick={() => {
                                setAppointmentSelected(item)
                                setModalCancelOpen(true)
                              }}
                            >
                              Cancelar
                            </Button>,
                          ]
                    }
                  >
                    <List.Item.Meta
                      title={
                        <p>
                          <strong>Nome:</strong> {item.name}
                        </p>
                      }
                      description={
                        <p>
                          <strong>Contato:</strong> {item.number} <br />
                          <strong>Serviços:</strong>{' '}
                          {item.services
                            ?.map((item: any) => item.name)
                            .join(', ')}{' '}
                        </p>
                      }
                    />
                    <div>{time_format(item.start_time)}</div>
                    <div style={{ paddingLeft: '14px' }}>
                      <strong>Status:</strong> {statusTag[item.status]}
                    </div>
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
                      <p>
                        <strong>Serviços:</strong>{' '}
                        {item.services.map((item: any) => item.name).join(', ')}{' '}
                      </p>
                      <p>
                        <strong>Status:</strong> {statusTag[item.status]}{' '}
                      </p>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          type='primary'
                          danger
                          icon={<CloseOutlined />}
                          onClick={() => {
                            setAppointmentSelected(item)
                            setModalCancelOpen(true)
                          }}
                        >
                          Cancelar
                        </Button>
                        {item.status === 'pending' && (
                          <Button
                            type='primary'
                            icon={<CheckOutlined />}
                            onClick={() => handleConfirmed(item.id)}
                          >
                            Atender
                          </Button>
                        )}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Panel>
      <Modal
        title='Deseja Cancelar o agendamento?'
        centered
        visible={modalCancelOpen}
        onOk={() => {
          handleCanceled(appointmentSelected.id)
          setModalCancelOpen(false)
        }}
        onCancel={() => setModalCancelOpen(false)}
        footer={[
          <Button key='back' onClick={() => setModalCancelOpen(false)}>
            Não
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={() => {
              handleCanceled(appointmentSelected.id)
              setModalCancelOpen(false)
            }}
          >
            Sim
          </Button>,
        ]}
      >
        <Descriptions size='small' layout='vertical'>
          <Descriptions.Item label='' style={{ textAlign: 'left' }}>
            Nome: {appointmentSelected.name}
            <br />
            Telefone/Celular: {appointmentSelected.number}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}

export default ProfesisonalAppointmentsList
