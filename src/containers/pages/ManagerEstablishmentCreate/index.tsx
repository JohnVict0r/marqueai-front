import React from 'react'
import Panel from '../../../components/Panel'
import { Row, Col } from 'antd'
import ManagerEstablishmentForm from '../../../components/Forms/ManagerEstablishmentForm'

function ManagerEstablishmentCreate() {
  return (
    <Panel title='Cadastrar Estabalecimento'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <ManagerEstablishmentForm buttonText='Cadastrar Estabelecimento' role="ESTABLESHMENT" />
        </Col>
      </Row>
    </Panel>
  )
}

export default ManagerEstablishmentCreate
