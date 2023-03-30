import React from 'react'
import Panel from '../../../components/Panel'
import { Row, Col,  List, Statistic,Card  } from 'antd'
import {  UserOutlined } from '@ant-design/icons'
/* import { useHistory } from 'react-router-dom'
import api from '../../../services/api'
import { setEstablishment } from '../../../utils/authentication' */

function ManagerAppointmentsList() {
/*   const history = useHistory()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    api.get(`/establishments/161/appointments`).then((response) => {
      setData(response.data)
    })
  }, []) */


  let example =[
    {
      user_name: 'Gabriel',
      time: 630,
      date: '14/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '15/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '16/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 780,
      date: '17/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '18/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '16/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '14/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '18/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '14/08/2021',
    },
    {
      user_name: 'Gabriel',
      time: 630,
      date: '15/08/2021',
    },
    ]

    const time_format = (time:any) =>{
      let hours = adicionaZero(Math.trunc(time/60))
      let minutes = adicionaZero(time%60)

      return `${hours}h${minutes}min`
    }

    function adicionaZero(numero:any) {
      if (numero <= 9)
        return "0" + numero;
      else
        return numero;
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
        title='Controle da Agenda do Estabelecimentos de Saúde'
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
            <Statistic title="Agendamentos Cadastrados" value={example.length} />

          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <List
              grid={{ gutter: 24, column: 5 }}
              dataSource={example}
              renderItem={item => (
                <List.Item

                 /*  actions={[<a key="agenda" onClick={() => {
                    setEstablishment(item);
                    history.push(`/gestao/estabelecimentos/${item.id}/agenda`)
                  }}>Horários</a>,

                  <a key="agendamentos" onClick={() => {
                    setEstablishment(item);
                    history.push(`/gestao/estabelecimentos/${item.id}/agendamentos`)
                  }}>Agendamentos</a>]} */

                >

                  <Card title={<p> <UserOutlined /> {item.user_name}</p>}>
                    {[<p>Data: {item.date} </p>, <p>Horário: {time_format(item.time)}</p>]}
                  </Card>

                </List.Item>
              )}
            />

          </Col>
        </Row>
      </Panel>

    </>
  )
}

export default ManagerAppointmentsList
