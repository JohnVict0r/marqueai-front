import React, { useEffect, useState } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col, List, Statistic, Card } from 'antd'
import api from '../../../../services/api'

function ManagerAppointmentsList() {
  const isMobile = window.innerWidth < 720
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/me/appointments`).then(response => {
      setData(response.data.data)
      setLoading(false)
    })
  }, [])

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

  return (
    <>
      <Panel
        title='Controle de agendamentos'
        /*   action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push('/gestao/estabelecimentos/cadastro')
            }}
          >
            Cadastrar Estabelecimento
      </Button>

        } */
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic title='Agendamentos Cadastrados' value={data.length} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            {/* {!isMobile ? ( */}
            <List
              className='demo-loadmore-list'
              loading={loading}
              itemLayout='horizontal'
              dataSource={data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key='list-edit'>Atender</a>,
                    <a key='list-loadmore-more'>Cancelar</a>,
                  ]}
                >
                  {/* <Skeleton avatar title={false} loading={item.loading} active> */}
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
                  {/* </Skeleton> */}
                </List.Item>
              )}
            />
            {/* ) : (
              <List
                dataSource={data}
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
                        <strong>Contato:</strong> {item.number}{' '}
                      </p>
                    </Card>
                  </List.Item>
                )}
              />
            )} */}
          </Col>
        </Row>
      </Panel>
    </>
  )
}

export default ManagerAppointmentsList
