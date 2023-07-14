import React, { useEffect, useState } from 'react'
import Panel from '../../../components/Panel'
import { Row, Col, List, Button, Card } from 'antd'
import { PushpinOutlined, FormOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'
import '@progress/kendo-theme-material/dist/all.css'
import 'hammerjs'
import {
  minutesToHourString,
  priceToCurrencyString,
} from '../../../utils/format'

function ProfessionalServicesList() {
  const isMobile = window.innerWidth < 720
  const history = useHistory()
  const [dataItem, setDataItem] = useState<any[]>([])

  useEffect(() => {
    api.get(`/me/services`).then(response => {
      setDataItem(response.data.data)
    })
  }, [])

  return (
    <>
      <Panel
        title='Serviços cadastrados'
        action={
          <Button
            type='primary'
            icon={<FormOutlined />}
            onClick={() => {
              history.push(`/professional/services/create`)
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
                            <strong> Preço:</strong>{' '}
                            {priceToCurrencyString(item.price)}
                          </p>,
                          <p>
                            {' '}
                            <strong> Duração:</strong>{' '}
                            {minutesToHourString(item.duration)}
                          </p>,
                        ]}
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Button
                            type='primary'
                            icon={<FormOutlined />}
                            onClick={() => {
                              history.push(
                                `/professional/services/${item.id}/update`
                              )
                            }}
                          >
                            Editar
                          </Button>
                        </div>
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
                        style={{ width: '100%' }}
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
                            <strong> Preço:</strong>{' '}
                            {priceToCurrencyString(item.price)}
                          </p>,
                          <p>
                            {' '}
                            <strong> Duração:</strong>{' '}
                            {minutesToHourString(item.duration)}
                          </p>,
                        ]}
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Button
                            type='primary'
                            icon={<FormOutlined />}
                            onClick={() => {
                              history.push(
                                `/professional/services/${item.id}/update`
                              )
                            }}
                          >
                            Editar
                          </Button>
                        </div>
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

export default ProfessionalServicesList
