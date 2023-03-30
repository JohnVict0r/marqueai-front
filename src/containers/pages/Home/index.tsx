import React from 'react'
import { Row, Col, Empty } from 'antd'/* 
import VaccineIcon from '../../../components/Icons/VaccineIcon' */
import './styles.less'
import Panel from '../../../components/Panel'
import Banner from '../../../components/Banner'
import BannerIcon from '../../../assets/graphic.svg'

import {
  CalendarOutlined,
  RiseOutlined,
  /*  LeftSquareOutlined,
  RightSquareOutlined, */
} from '@ant-design/icons'
// import Card from '../../../components/Card'
import { getProfile, getRoles } from '../../../utils/authentication'
// import api from '../../../services/api'
// import Card from '../../../components/Card'
/* import StageCard from '../../../components/StageCard' */
// import { dateExtend } from '../../../utils/format'
import { useHistory } from 'react-router-dom'
//import VaccineModal from '../../../components/VaccineModal'

const Home: React.FC = () => {
  const history = useHistory()
  const profile = getProfile()

  const roles = getRoles();

  if (roles.length === 0) {
    history.push('/cidadao/inicio')
  }

  /* const [lastProfileVaccines, setLastProfileVaccines] = useState<any[]>([])
  const [profileStatus, setProfileStatus] = useState() */

  //const [vaccineSelected, setVaccineSelected] = useState()
  // const [vaccineModalVisible, setVaccineModalVissible] = useState(false)

  /* const handleShowModal = (vaccine: any) => {
    setVaccineSelected(vaccine)
    setVaccineModalVissible(true)
  } */

  /*  const handleCancelModal = () => {
     setVaccineModalVissible(false)
   } */

  /* const [pageForNextVaccine, setPageForNextVaccine] = useState(0)

  const nextPage = () => {
    setPageForNextVaccine(prevState => prevState + 1)
  }

  const prevPage = () => {
    if (pageForNextVaccine === 0) return

    setPageForNextVaccine(prevState => prevState - 1)
  } */

  /* useEffect(() => {
    api
      .get(`/profiles/${profile.id}/vaccines/status`)
      .then(response => {
        setProfileStatus(response.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }, [profile.id]) */

  /* const loadLastProfileVaccines = () => {
    api
      .get(`/profiles/${profile.id}/vaccines/last`)
      .then(response => {
        setLastProfileVaccines(response.data.vaccines)
      })
      .catch(err => {
        console.log(err)
      })
  } */
  /*
    useEffect(() => {
      loadLastProfileVaccines()
      // eslint-disable-next-line
    }, []) */

  return (
    <>
      <Row
        className='welcome-text'
        gutter={[24, 24]}
        style={{ width: '100%', margin: '0px' }}
      >
        <Col span={24}>
          <h1>Seja bem vindo, {profile?.name.split(' ')[0]}!</h1>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
        <Col span={24}>
          <Banner
            title='Acompanhe aqui os seus dados!'
            description='Agora você consegue agendar atendimentos para os serviços disponibilizados na sua cidade!'
            img={BannerIcon}
          ></Banner>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ width: '100%', margin: '0px' }}>
       <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Panel title={'Meus Agendamentos'} icon={RiseOutlined}>
            <Row gutter={[24, 24]} style={{ width: '100%' }}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Empty
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Em breve</span>}
                ></Empty>
              </Col>
            </Row>

          </Panel>
        </Col>
        {/* <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <Panel
            title={'Meus agendamentos'}
            style={{ height: '100%' }}
            icon={VaccineIcon}
            action={
              <Row gutter={[24, 24]} style={{ width: '100%' }}>
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                  <Empty
                    imageStyle={{
                      height: 60,
                    }}
                    description={<span>Em breve</span>}
                  ></Empty>
                </Col>
              </Row>
            }
          >
            <Row gutter={[24, 24]} style={{ width: '100%' }}>
              {/* {lastProfileVaccines.length > 0 ? (
                lastProfileVaccines.map(vaccine => (
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
              )} 
            </Row>
          </Panel>
        </Col> */}
        {/*  inicio */}

        <Col span={24}>
          <Panel
            title={'Notícias'}
            icon={CalendarOutlined}
            style={{ height: '100%' }}

          >
            <Empty
                    imageStyle={{
                      height: 60,
                    }}
                    description={<span>Em breve</span>}
                  >

                  </Empty>
            {/* <Row gutter={[24, 24]} style={{ width: '100%' }}>
              <StageCard
                stage={'Primeira Fase'}
                selected={false}
                groups={['Trabalhadores de saúde', 'População idosa a partir de 75 anos', 'Pessoas de 60 anos ou mais institucionalizadas', 'População indígena aldeada e quilombola']}
              />
              <StageCard
                stage={'Segunda Fase'}
                selected={true}
                groups={['Pessoas com comorbidades', 'Diabetes mellitus', 'hipertensão',
                  'Pessoas de 60 anos ou mais institucionalizadas', 'População indígena aldeada e quilombola']}
              />
              <StageCard
                stage={'Terceira Fase'}
                selected={false}
                groups={['Diabetes mellitus', 'doença pulmonar obstrutiva crônica',
                  'doença renal', ' doenças cardiovasculares e cerebrovasculares', 'indivíduos transplantados de órgão sólido', 'anemia falciforme']}
              />
            </Row> */}
          </Panel>
        </Col>

      </Row>



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

export default Home
