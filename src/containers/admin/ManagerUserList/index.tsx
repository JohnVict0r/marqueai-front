import React, { useEffect, useState } from 'react'
import Panel from '../../../components/Panel'
import { Row, Button, List, Col, Statistic } from 'antd'
import { FormOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'

function ManagerUserList() {
  const history = useHistory()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    api.get(`citizens`).then((response) => {
      setData(response.data)
    })
  }, [])

  return (
    <>
      <Panel
        title='Controle dos cidadãos cadastrados'
        action={

          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push('/gestao/cidadaos/cadastro')
            }}
          >
            Cadastrar Cidadão
            </Button>

        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>

          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic title="Cidadãos cadastrados" value={data.length} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item style={{ width: '80%' }}
                  actions={[<a key="list-loadmore-edit" href='/#'>Editar</a>]}
                >
                  <List.Item.Meta
                    avatar={<UserOutlined />}
                    title={<p>{item.profile.name}</p>}
                    description={`CNS: ${item.profile.cns}`}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Panel>

    </>
  )
}

export default ManagerUserList
