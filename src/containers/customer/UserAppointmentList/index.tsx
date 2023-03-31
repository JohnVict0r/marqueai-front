import React, { useEffect, useState } from 'react'
// import api from "../../services/api";

import { getProfile } from '../../../utils/authentication'
import { useHistory } from 'react-router-dom'

import './style.css'

import api from '../../../services/api'
import Panel from '../../../components/Panel'
import { Row, Col, Empty, Button, List } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { dateExtend, /* minutesToHourString */ } from '../../../utils/format'
//import Card from '../../../components/Card'

//import VaccineModal from '../../../components/VaccineModal'

export interface IShendule {
  id: number
  appointment: any
  status: number
  date?: string
}

const appoitementStatus = (status:any) =>{
  if(status === 1){
    return 'Agendamento em Aberto'
  }
  return ''
}

function UserAppointmentList() {
  const [appointments, setAppointments] = useState<IShendule[]>([])

  const history = useHistory()

  useEffect(() => {
    const profile = getProfile()
    api
      .get(`/citizens/${profile.user_id}/appointments`)
      .then(response => setAppointments(response.data))
  }, [])



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

  /*const handleRemoveVaccine = (id: number) => {
    const newVaccines = vaccines.filter(item => item.id !== id)
    setVaccines(newVaccines)
  }*/

  //const [vaccineSelected, setVaccineSelected] = useState()
  //const [vaccineModalVisible, setVaccineModalVissible] = useState(false)

  /*const handleShowModal = (vaccine: any) => {
    setVaccineSelected(vaccine)
    setVaccineModalVissible(true)
  }*/

  /*const handleCancelModal = () => {
    setVaccineModalVissible(false)
  }*/

  return (
    <>
      <Panel
        title='Minhas solicitações de agendamento'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push('/cidadao/agendamentos/cadastro')
            }}
          >
            Solicitar agendamento
          </Button>
        }
      >

        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          {appointments.length > 0 ? (
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <List
                itemLayout="horizontal"
                dataSource={appointments}
                renderItem={item => (
                  <List.Item style={{ width: '80%' }}
                    /* actions={[<a key="list-loadmore-edit" href='/#'>Editar</a>]} */
                  >
                    <List.Item.Meta
                       title={<p>{item.date && dateExtend(item.date) } - { timeFormat( item.appointment.time_in_minutes)}</p>}
                      description={`status: ${appoitementStatus(item.status)}`}
                    />
                  </List.Item>
                )}
              />
            </Col>
          ) : (
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Empty
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Nenhum agendamento solicitado</span>}
                ></Empty>
              </Col>
            )}
        </Row>
      </Panel>
      {/*<VaccineModal
        visible={vaccineModalVisible}
        vaccine={vaccineSelected}
        handleOk={() => handleCancelModal()}
        handleCancel={() => handleCancelModal()}
        handleRemove={(id: number) => handleRemoveVaccine(id)}
      />*/}
    </>
  )
}

export default UserAppointmentList
