import React from 'react'
import Panel from '../../../components/Panel'
import { Row, Col } from 'antd'
import UserAppointmentForm from '../../../components/Forms/UserAppointmentForm'

function UserAppointmentCreate() {
  return (
    <Panel title='Solicitação de agendamento de vacinação'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <UserAppointmentForm buttonText='Solicitar agendamento' /*role="OPERATOR"*/ />
        </Col>
      </Row>
    </Panel>
  )
}

export default UserAppointmentCreate
