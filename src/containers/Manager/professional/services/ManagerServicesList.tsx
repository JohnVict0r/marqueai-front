import React, { useEffect,useState, useMemo } from 'react'
import Panel from '../../../../components/Panel'
import { Row, Col,  List, Statistic,Button, Card  } from 'antd'
import {PushpinOutlined, FormOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../../services/api'
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import Donut from '../../../../components/Charts/Donut'

function PuzzleItemList() {
  const isMobile = window.innerWidth < 720
  const params = useParams<any>()
  const history = useHistory()
  const [dataItem, setDataItem] = useState<any[]>([])
  const [dataPuzzle, setDataPuzzle] = useState<any[]>([])

  const currentPuzzle = useMemo<any>(() => {
    return dataPuzzle.filter(item => item.id === Number(params.puzzle_id))[0]
    //eslint-disable-next-line
  }, [dataPuzzle])


  useEffect(() => {
    api.get(`/puzzles/${params.puzzle_id}/items`).then((response) => {
      setDataItem(response.data)
    })
  }, [params.puzzle_id])

  useEffect(() => {
    api.get(`/puzzles`).then((response) => {
      setDataPuzzle(response.data)
    })

  }, [])

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
        title='Controle de Itens'
         action={
          <Button
            style={{ backgroundColor: '#1e3978', color: '#FCFCFC' }}
            icon={<FormOutlined />}
            onClick={() => {
              history.push(`/gestao/modulos/${params.puzzle_id}/itens/cadastro`)
            }}
          >
            Cadastrar Item
      </Button>

        }
      >
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Statistic title="Itens cadastrados" value={dataItem.length} />

          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Panel title={'últimos cadastrados'}

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
              {!isMobile ? <List
                grid={{
                  gutter: 16,
                  xs: 24,
                  lg: 4,
                  column: 4
                }}
                style = {{width:'95%' }}
                dataSource={dataItem}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <Card style = {{padding:'0'}} title={<p> <PushpinOutlined /> <strong>{item.display_name}</strong> </p>}>
                      {[<p> <strong>Descrição:</strong>  {item.description} </p>,
                      <p> <strong> Estoque inicial:</strong> {item.controlable && item.controlable_amount}</p>,
                      ]}
                    </Card>
                  </List.Item>
                )}
              />: <List
              dataSource={dataItem}
              renderItem={item => (
                <List.Item>
                  <Card title={<p> <PushpinOutlined /> <strong>{item.display_name}</strong> </p>}>
                    {[<p> <strong>Descrição:</strong>  {item.description} </p>,
                    <p> <strong> Estoque inicial:</strong> {item.controlable && item.controlable_amount}</p>,
                    ]}
                  </Card>
                </List.Item>
              )}
            />}
          </Panel>
          </Col>



       {currentPuzzle && currentPuzzle.chartable===true &&

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
        }
        </Row>
      </Panel>

    </>
  )
}

export default PuzzleItemList
