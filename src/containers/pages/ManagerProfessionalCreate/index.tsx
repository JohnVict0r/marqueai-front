import React from 'react'
import Panel from '../../../components/Panel'
import { Row, Col } from 'antd'
import ManagerUserForm from '../../../components/Forms/ManagerUserForm'

function ManagerProfessionalCreate() {
  return (
    <Panel title='Cadastrar Profissional'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <ManagerUserForm buttonText='Cadastrar Profissional' role="PROFESSIONAL" />
        </Col>
      </Row>
    </Panel>
  )
}

export default ManagerProfessionalCreate
