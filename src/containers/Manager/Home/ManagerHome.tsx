import React, { useState, useEffect /* lazy */ } from 'react'
import { Row, Col, Statistic, Empty } from 'antd'
import Panel from '../../../components/Panel'
import Banner from '../../../components/Banner'
import api from '../../../services/api'

import Bar from '../../../components/Charts/Bar'
import WhitwLogoGestio from '../../../assets/logos/gestio_branco.png'

import './ManagerHome.less'

import {
  PieChartOutlined,
  FieldNumberOutlined,
  /*  LeftSquareOutlined,
  RightSquareOutlined, */
} from '@ant-design/icons'
// import Card from '../../../components/Card'
import { getProfile, getRoles } from '../../../utils/authentication'
// import api from '../../../services/api'
// import Card from '../../../components/Card'
// import { dateExtend } from '../../../utils/format'
import { useHistory } from 'react-router-dom'
//import VaccineModal from '../../../components/VaccineModal'

const ManagerHome: React.FC = () => {
  const history = useHistory()
  const profile = getProfile()
  const [users, setUsers] = useState<any[]>([])
  const [dataItens, setDataItens] = useState<any[]>([])
  const [dataPuzzles, setDataPuzzles] = useState<any[]>([])
  const [itemsPerPuzzle, setItemsPerPuzzle] = useState<any[]>([])

  useEffect(() => {
    api.get(`/items`).then(response => {
      setDataItens(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`/users`).then(response => {
      setUsers(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`/puzzles`).then(response => {
      setDataPuzzles(response.data)
    })
  }, [])

  useEffect(() => {
    const itemsPerPuzzle = dataPuzzles.reduce((result, puzzle) => {
      const amount = dataItens.filter(
        item => item.puzzle_id === puzzle.id
      ).length
      if (amount === 0) {
        return result
      }
      return [
        ...result,
        {
          name: puzzle.name,
          data: [amount],
        },
      ]
    }, [])

    setItemsPerPuzzle(itemsPerPuzzle)
  }, [dataPuzzles, dataItens])

  // const roles = getRoles();

  // if (roles.length === 0) {
  //   history.push('/cidadao/inicio')
  // }

  const isMobile = window.innerWidth < 920

  return (
    <>
      <Row
        className='welcome-text'
        gutter={[24, 24]}
        style={{ width: '100%', margin: '0px' }}
      >
        <Col span={24}>
          <h1>Olá, {profile?.name.split(' ')[0]}!</h1>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        <Col span={24}>
          <Banner
            title='Monitore seus dados!'
            description='A ferramenta de gestão que se adequa a você.'
            img={WhitwLogoGestio}
          ></Banner>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        {/* <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Panel title={'Em breve'} icon={RiseOutlined}>
            <div
              className='status-graph'
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                paddingBottom: '10px',
              }}
            >
              <Progress
                type='circle'
                percent={data.vaccinateds ? 100 * (Number(data.vaccinateds[0].count) / Number(data.users[0].count)) : 0}
                format={(percent) => `${percent && percent.toFixed(2)}%`}
                strokeColor={{
                  '0%': '#018578',
                  '100%': '#015048',
                }}
                width={130}
              />
            </div>
          </Panel>
        </Col> */}
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Panel
            title={'Dados Numéricos'}
            style={{ height: '100%' }}
            icon={FieldNumberOutlined}
            /*  action={
             <p
               onClick={() => {
                 history.push('/vaccines')
               }}
               style={{
                 color: '#DB353A',
                 cursor: 'pointer',
                 verticalAlign: 'middle',
                 textAlign: 'center',
                 fontWeight:'bold',
               }}
             >
               Ver todas cadastradas
             </p>
           } */
          >
            <Row
              gutter={[24, 24]}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                <Statistic
                  title='Total de Módulos '
                  value={dataPuzzles.length}
                />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                <Statistic title='Total de Itens' value={dataItens.length} />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                <Statistic title='Total de Usuários ' value={users.length} />
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>

      {!isMobile && (
        <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <Panel
              title={'Dados Gráficos'}
              style={{ height: '100%' }}
              icon={PieChartOutlined}
            >
              <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                {dataItens.length === 0 ? (
                  <Empty />
                ) : (
                  <Bar
                    data={itemsPerPuzzle}
                    title={'Total de itens por Módulo'}
                    xLabel={'Módulos'}
                  />
                )}
              </Col>
            </Panel>
          </Col>
        </Row>
      )}

      {/*  <VaccineModal
        visible={vaccineModalVisible}
        //vaccine={vaccineSelected}
        handleOk={() => handleCancelModal()}
        handleCancel={() => handleCancelModal()}
      //handleDelete={() => loadLastProfileVaccines()}
      /> */}
    </>
  )
}

export default ManagerHome
