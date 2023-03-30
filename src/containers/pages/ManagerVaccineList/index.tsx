import React, { useEffect, useState, } from 'react'
import Panel from '../../../components/Panel'
import { Row, Col, Button, List, Statistic } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'

function ManagerVaccineList() {
  const history = useHistory()
  const [vaccinations, setVaccines] = useState<any[]>([])

  useEffect(() => {
    api.get(`vaccinations`).then((response) => {
      setVaccines(response.data)
    })
  }, [])



  return (

    <>

      <Panel
        title='Controle de Vacinação  Total'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push('/gestao/vacinas/cadastro')
            }}
          >
            Cadastrar vacinas
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
            <Statistic title="Vacinas Aplicadas" value={vaccinations.length} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              itemLayout="horizontal"
              dataSource={vaccinations}
              renderItem={item => (
                <List.Item style={{ width: '80%' }}
                  actions={[<a key="list-loadmore-edit" href='/#'>Editar</a>]}
                >
                  <List.Item.Meta
                    title={[<p><strong>Vacinado:</strong> {item.citizen.profile.name}</p>, <p><strong>Vacinador:</strong> {item.professional.profile.name}</p>,
                    <p><strong>Local(CNES):</strong> {item.cnes}</p>]}
                    description={<p>{item.order}ª - Dose {item.vaccine.display_name}</p>}
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

export default ManagerVaccineList
