import React, { useEffect, useState } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col, Button, List, Statistic } from 'antd'
import { FormOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import api from '../../../../services/api'
import { setEstablishment } from '../../../../utils/authentication'

function ManagerEstablishmentList() {
  const history = useHistory()
  const [establishments, setEstablishments] = useState<any[]>([])

  useEffect(() => {
    api.get(`/cities/211050/establishments`).then(response => {
      setEstablishments(response.data)
    })
  }, [])

  return (
    <>
      <Panel
        title='Controle dos horários do Estabelecimentos de Saúde'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push('/gestao/estabelecimentos/cadastro')
            }}
          >
            Cadastrar Estabelecimento
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          {/*  <h2 style={{ marginLeft: '2vh' }}>Vacinas aplicadas:</h2>

          <Badge
            className="site-badge-count-109"
            count={vaccinations.length}
            style={{ backgroundColor: 'rgb(30, 57, 120)', marginTop: '1.3vh', marginLeft: '1vw' }}
          /> */}
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic
              title='Estabelecimentos Cadastrados'
              value={establishments.length}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              itemLayout='horizontal'
              dataSource={establishments}
              renderItem={item => (
                <List.Item
                  style={{ width: '80%' }}
                  actions={[
                    <a
                      key='agenda'
                      href='/#'
                      onClick={() => {
                        setEstablishment(item)
                        history.push(
                          `/gestao/estabelecimentos/${item.id}/agenda`
                        )
                      }}
                    >
                      Horários
                    </a>,

                    <a
                      key='agendamentos'
                      href='/#'
                      onClick={() => {
                        setEstablishment(item)
                        history.push(
                          `/gestao/estabelecimentos/${item.id}/agendamentos`
                        )
                      }}
                    >
                      Agendamentos
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<EnvironmentOutlined />}
                    title={<p>{item.fantasy_name}</p>}
                    description={[<p>CNES: {item.cnes} </p>]}
                  />
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

export default ManagerEstablishmentList
