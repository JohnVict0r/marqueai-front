import React, { useEffect,useState } from 'react'
import Panel from '../../../components/Panel'
import { Row, Col,  List, Statistic, Button } from 'antd'
import {  UserOutlined, FormOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'


function ManagerPuzzleList() {
  const history = useHistory()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    api.get(`/puzzles`).then((response) => {
      setData(response.data)
    })
  }, [])



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
        title='Gerenciamento de Módulos'
        action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push('/gestao/modulos/cadastro')
            }}
          >
            Cadastrar Módulo
          </Button>
        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic title="Módulos cadastrados" value={data.length} />

          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              dataSource={data}
              renderItem={item => (
                <List.Item
                style={{ width: '80%' }}
                actions={[
                  <p
                    style={{cursor:'pointer', color:'blue'}}
                    key="itens"
                    onClick={() => {
                    history.push(`/gestao/modulos/${item.id}/itens`)
                    }}
                  >
                    Abrir
                  </p>,
                   <p
                    style={{cursor:item.schedulable && 'pointer', color:item.schedulable && 'blue'}}
                    key="itens"
                    onClick={() => {
                      item.schedulable && history.push(`/gestao/modulos/${item.id}/horarios`)
                    }}
                  >
                    Horários
                  </p>
                
                   /*  <p
                    style={{cursor:'pointer', color:'rgb(30, 57, 120)'}}
                    key="excluir"
                    onClick={() => {
                    history.push(`/gestao/modulos/${item.id}/excluir`)
                  }}>Excluir</p> */]}

                >
                  <List.Item.Meta
                    title={<p> <UserOutlined /> {item.name}</p>}
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

export default ManagerPuzzleList
