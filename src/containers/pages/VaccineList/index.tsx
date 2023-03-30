import React, { useEffect, useState } from 'react'
// import api from "../../services/api";

import { getProfile } from '../../../utils/authentication'
// import { useHistory } from 'react-router-dom'

import './style.css'

import api from '../../../services/api'
import Panel from '../../../components/Panel'
import { Row, Col, Empty } from 'antd'
// import { FormOutlined } from '@ant-design/icons'
import Card from '../../../components/Card'
import { dateExtend } from '../../../utils/format'
import VaccineModal from '../../../components/VaccineModal'

export interface IVacinne {
  id: number
  name: string
  vaccine: any
  professional: any
  description: string
  lote: string
  applicator: string
  cnes: string
  application_date: string
  order: number
  vaccine_id: number
}

function VaccineList() {
  const [vaccines, setVaccines] = useState<IVacinne[]>([])

  //const history = useHistory()




  useEffect(() => {
    const profile = getProfile()
    api
      .get(`/citizens/${profile.user_id}/vaccines`)
      .then(response => setVaccines(response.data))
  }, [])

  const handleRemoveVaccine = (id: number) => {
    const newVaccines = vaccines.filter(item => item.id !== id)
    setVaccines(newVaccines)
  }

  const [vaccineSelected, setVaccineSelected] = useState()
  const [vaccineModalVisible, setVaccineModalVissible] = useState(false)

  const handleShowModal = (vaccine: any) => {
    setVaccineSelected(vaccine)
    setVaccineModalVissible(true)
  }

  const handleCancelModal = () => {
    setVaccineModalVissible(false)
  }



  return (
    <>

      <Panel
        title='Minhas vacinas'
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          {vaccines.length > 0 ? (
            vaccines.map(vaccine => (
              <Col
                xs={{ span: 24 }}
                lg={{ span: 8 }}
                onClick={() => {
                  handleShowModal(vaccine)
                }}
              >
                <Card
                  name={`${vaccine.vaccine.display_name}`}
                  date={dateExtend(vaccine.application_date)}
                  location={vaccine.cnes}
                  dose={vaccine.order}
                ></Card>
              </Col>
            ))
          ) : (
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Empty
                imageStyle={{
                  height: 60,
                }}
                description={<span>Nenhuma vacina cadastrada</span>}
              ></Empty>
            </Col>
          )}
        </Row>
      </Panel>
      <VaccineModal
        visible={vaccineModalVisible}
        vaccine={vaccineSelected}
        handleOk={() => handleCancelModal()}
        handleCancel={() => handleCancelModal()}
        handleRemove={(id: number) => handleRemoveVaccine(id)}
      />
    </>
  )
}

export default VaccineList
