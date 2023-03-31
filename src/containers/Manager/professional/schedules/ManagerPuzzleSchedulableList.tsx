import React, { useEffect, useState } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col, List, Statistic, Button, Card } from 'antd'
import { PushpinOutlined, FormOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../../services/api'
import '@progress/kendo-theme-material/dist/all.css'
import 'hammerjs'

function ManagerPuzzleSchedulableList() {
  const isMobile = window.innerWidth < 720
  // const params = useParams<any>()
  const history = useHistory()
  const [dataSchedule, setDataSchedule] = useState<any[]>([])
  //const [dataPuzzle, setDataPuzzle] = useState<any[]>([])

  /* const currentPuzzle = useMemo<any>(() => {
    return dataPuzzle.filter(item => item.id === Number(params.puzzle_id))[0]
    //eslint-disable-next-line
  }, [dataPuzzle]) */

  const weekdays = [
    { name: 'Segunda-feira', value: 'Segunda' },
    { name: 'Terça-feira', value: 'terca' },
    { name: 'Quarta-feira', value: 'quarta' },
    { name: 'Quinta-feira', value: 'quinta' },
    { name: 'Sexta-feira', value: 'sexta' },
    { name: 'Sábado', value: 'sabado' },
    { name: 'Domingo', value: 'domingo' },
  ]

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
    api.get(`/schedules`).then(response => {
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

  /* const onlyUnique = (value:any, index:any, self:any) => {
    return self.indexOf(value) === index;
  }

  const get_unique_date = (data:any) => {
    let atribute = data.map((item:any)=>item.user_name);
    let unique = atribute.filter(onlyUnique);

    return unique;
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
              history.push(`/gestao/horarios/cadastro`)
            }}
          >
            Cadastrar Horário
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic
              title='Controle os horários disponíveis por dia da semana'
              value={dataSchedule.length}
            />
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Panel
              title={'Horários Disponíveis'}

              /* action={
            <Button
              style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
              icon={<FormOutlined />}
              onClick={() => {
                history.push('/gestao/modulos/cadastro')
              }}
            >
              Listar Todos
            </Button>
          } */
            >
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
                          <strong>Horário de abertura:</strong>{' '}
                          {time_format(item.start_time)}{' '}
                          <strong>Horário de fechamento:</strong>{' '}
                          {time_format(item.end_time)}{' '}
                        </p>
                      </Card>
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Col>

          {/* {currentPuzzle && currentPuzzle.chartable===true &&

          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Panel title={'Análise dos Itens'}>
            {dataItem.length>0 &&
              <Donut
                title={'Porcentagem de estoque dos itens'}
                data={dataItem}
              />
            }
            </Panel>
          </Col>
        } */}
        </Row>
      </Panel>
    </>
  )
}

export default ManagerPuzzleSchedulableList
