import React, { useEffect, useState } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col, List, Statistic, Button, Card } from 'antd'
import { PushpinOutlined, FormOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../../services/api'
import '@progress/kendo-theme-material/dist/all.css'
import 'hammerjs'
import { weekdays } from '../../../../utils/constants'

function ManagerProfessionalSchedulesList() {
  const isMobile = window.innerWidth < 720
  // const params = useParams<any>()
  const history = useHistory()
  const [dataSchedule, setDataSchedule] = useState<any[]>([])

  const findDay = (dayId: any) => {
    const day: any = weekdays.find(element => element.value === dayId)
    return day.name
  }

  const time_format = (time: any) => {
    const hours = adicionaZero(Math.trunc(time / 60))
    const minutes = adicionaZero(time % 60)

    return `${hours}h${minutes}min`
  }

  function adicionaZero(numero: any) {
    if (numero <= 9) return '0' + numero
    else return numero
  }

  useEffect(() => {
    api.get(`/me/schedules`).then(response => {
      setDataSchedule(response.data.data)
    })
  }, [])

  /*  useEffect(() => {
    api.get(`/puzzles`).then((response) => {
      setDataPuzzle(response.data)
    })

  }, []) */

  //console.log(actualPuzzle)
  /*  const time_format = (time:any) =>{
      let hours = adicionaZero(Math.trunc(time/60))
      let minutes = adicionaZero(time%60)

      return `${hours}h${minutes}min`
    }

    function adicionaZero(numero:any) {
      if (numero <= 9)
        return "0" + numero;
      else
        return numero;
    } */

  return (
    <>
      <Panel
        title='Controle de horários'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push(`/manager/professional/schedules/create`)
            }}
          >
            Cadastrar Horário
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic
              title='Controle os horários de funcionamento por dia da semana'
              value={dataSchedule.length}
            />
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Panel title={'Horários Disponíveis'}>
              {!isMobile ? (
                <List
                  grid={{
                    gutter: 12,
                    xs: 24,
                    lg: 3,
                    column: 4,
                  }}
                  style={{ width: '95%' }}
                  dataSource={dataSchedule}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <Card
                        title={
                          <p>
                            {' '}
                            <PushpinOutlined />{' '}
                            <strong>
                              {item.day && findDay(item.day)}
                            </strong>{' '}
                          </p>
                        }
                      >
                        <p>
                          {' '}
                          <strong>Horário de abertura:</strong>{' '}
                          {time_format(item.start_time)}{' '}
                          <strong>Horário de fechamento:</strong>{' '}
                          {time_format(item.end_time)}{' '}
                        </p>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <List
                  dataSource={dataSchedule}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <Card
                        title={
                          <p>
                            {' '}
                            <PushpinOutlined />{' '}
                            <strong>
                              {item.day && findDay(item.day)}
                            </strong>{' '}
                          </p>
                        }
                      >
                        <p>
                          {' '}
                          <strong>Aabertura:</strong>{' '}
                          {time_format(item.start_time)}{' '}
                          <strong>Fechamento:</strong>{' '}
                          {time_format(item.end_time)}{' '}
                        </p>
                      </Card>
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ManagerProfessionalSchedulesList
