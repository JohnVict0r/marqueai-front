import React, { useEffect, useState, useMemo } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col, List, Button, Card } from 'antd'
import { PushpinOutlined, FormOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../../services/api'
import '@progress/kendo-theme-material/dist/all.css'
import 'hammerjs'

function PuzzleItemList() {
  const isMobile = window.innerWidth < 720
  const params = useParams<any>()
  const history = useHistory()
  const [dataItem, setDataItem] = useState<any[]>([])

  useEffect(() => {
    api.get(`/services`).then(response => {
      setDataItem(response.data.data)
    })
  }, [params.puzzle_id])

  const priceFormat = (price: any) => {
    return `R$${price},00`
  }

  const timeFormat = (time: any) => {
    const minutesCalc = time % 60
    const hourCalc = Math.trunc(time / 60)

    if (!hourCalc) return `${minutesCalc}min`
    if (!minutesCalc) return `${hourCalc}h`

    const minutes = adicionaZero(time % 60)

    return `${hourCalc}h${minutes}min`
  }

  function adicionaZero(numero: any) {
    if (numero <= 9) return '0' + numero
    else return numero
  }

  return (
    <>
      <Panel
        title='Serviços cadastrados'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push(`/manager/professional/services/create`)
            }}
          >
            Cadastrar Serviço
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Panel title=''>
              {!isMobile ? (
                <List
                  grid={{
                    gutter: 16,
                    xs: 24,
                    lg: 4,
                    column: 4,
                  }}
                  style={{ width: '95%' }}
                  dataSource={dataItem}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <Card
                        style={{ padding: '0' }}
                        title={
                          <p>
                            {' '}
                            <PushpinOutlined /> <strong>
                              {item.name}
                            </strong>{' '}
                          </p>
                        }
                      >
                        {[
                          <p>
                            {' '}
                            <strong>Descrição:</strong> {item.description}{' '}
                          </p>,
                          <p>
                            {' '}
                            <strong> Preço:</strong> {priceFormat(item.price)}
                          </p>,
                          <p>
                            {' '}
                            <strong> Duração:</strong>{' '}
                            {timeFormat(item.duration)}
                          </p>,
                        ]}
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <List
                  dataSource={dataItem}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        title={
                          <p>
                            {' '}
                            <PushpinOutlined />{' '}
                            <strong>{item.display_name}</strong>{' '}
                          </p>
                        }
                      >
                        {[
                          <p>
                            {' '}
                            <strong>Descrição:</strong> {item.description}{' '}
                          </p>,
                          <p>
                            {' '}
                            <strong> Estoque inicial:</strong>{' '}
                            {item.controlable && item.controlable_amount}
                          </p>,
                        ]}
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

export default PuzzleItemList
