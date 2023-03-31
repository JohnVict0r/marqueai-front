import React, { useEffect, useState } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col, Button, List, Statistic } from 'antd'
import { FormOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import api from '../../../../services/api'

function ManagerProfessionalList() {
  const history = useHistory()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    api.get(`professionals`).then(response => {
      setData(response.data)
    })
  }, [])

  return (
    <>
      <Panel
        title='Controle de Vacinadores'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push(
                '/gestao/profissionais/cadastro'
              ) /* TODO alterar rota */
            }}
          >
            Cadastrar profissionais
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic title='Profissionais cadastrados' value={data.length} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              itemLayout='horizontal'
              dataSource={data}
              renderItem={item => (
                <List.Item
                  style={{ width: '80%' }}
                  actions={[
                    <a key='list-loadmore-edit' href='/#'>
                      Editar
                    </a>,
                    <a key='list-loadmore-more' href='/#'>
                      Excluir
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<UsergroupAddOutlined />}
                    title={<p>{item.profile.name}</p>}
                    description={`CNS: ${item.profile.cns}`}
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

export default ManagerProfessionalList
