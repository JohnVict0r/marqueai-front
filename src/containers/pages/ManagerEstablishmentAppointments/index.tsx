import React, {
  useEffect,
  useState /*,  { useEffect, useState, } */,
} from 'react'
import Panel from '../../../components/Panel'
import { Row, Col, Button, List, Statistic, Card } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api'
import { getEstablishment } from '../../../utils/authentication'

const weekdays: any = [
  { name: 'Segunda-feira', value: 1 },
  { name: 'Terça-feira', value: 2 },
  { name: 'Quarta-feira', value: 3 },
  { name: 'Quinta-feira', value: 4 },
  { name: 'Sexta-feira', value: 5 },
  { name: 'Sábado', value: 6 },
  { name: 'Domingo', value: 7 },
]

const example: any = [
  { value: 1, time: 780 },
  { value: 2, time: 740 },
  { value: 3, time: 540 },
  { value: 4, time: 780 },
  { value: 5, time: 660 },
]

const time_format = (time: any) => {
  let hours = adicionaZero((time / 60) | 0)
  let minutes = adicionaZero(time % 60)

  return `${hours}h${minutes}min`
}

function adicionaZero(numero: any) {
  return numero <= 9 ? `0${numero}` : numero
}

const findDay = (number: any) => {
  let dia = weekdays.find((element: any) => element.value === number)
  console.log(dia)
  return dia.name
}

function ManagerEstablishmentAppointments() {
  const history = useHistory()
  const params = useParams<any>()
  const [, /* schedules */ setSchedules] = useState<any[]>([])

  const establishment = getEstablishment()

  useEffect(() => {
    api.get(`/schedules`).then(response => {
      setSchedules(response.data)
    })
  }, [params.establishmentId])

  if (establishment.id !== params.establishmentId) return <></>

  return (
    <>
      <Panel
        title='Controle dos horários'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push(
                `/gestao/estabelecimentos/${establishment.id}/agenda/cadastro`
              ) /* TODO: fazer depois */
            }}
          >
            Cadastrar Horários
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic
              title='Estabelecimento'
              value={establishment.fantasy_name}
            />
            <br />
            <Statistic title='Horários Cadastrados' value={example.length} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              grid={{ gutter: 24, column: 5 }}
              dataSource={example}
              renderItem={(item: any) => (
                <List.Item
                  style={{ width: '80%', cursor: 'pointer' }}
                  onClick={() =>
                    history.push('/gestao/estabelecimentos/:id/agenda/:data')
                  }
                  /*  actions={[<a key="list-loadmore-edit" href='/#'>Editar</a>, <a key="list-loadmore-more" href='/#'>Excluir</a>]} */
                >
                  <Card title={<p>{findDay(item.value)}</p>}>
                    {[<p>Horário: {time_format(item.time)}</p>]}
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          {/*     {vaccines.length > 0 ? (
            vaccines.map(vaccine => (
              <Col
                xs={{ span: 24 }}
                lg={{ span: 8 }}
                onClick={() => {
                  handleShowModal(vaccine)
                }}
              >
                <Card
                  name={`${vaccine.name} - ${vaccine.description}`}
                  date={dateExtend(vaccine.date)}
                  location={vaccine.location}
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
          )} */}
        </Row>
      </Panel>
      {/*    <VaccineModal
        visible={vaccineModalVisible}
        vaccine={vaccineSelected}
        handleOk={() => handleCancelModal()}
        handleCancel={() => handleCancelModal()}
        handleRemove={(id: number) => handleRemoveVaccine(id)}
      /> */}
    </>
  )
}

export default ManagerEstablishmentAppointments
