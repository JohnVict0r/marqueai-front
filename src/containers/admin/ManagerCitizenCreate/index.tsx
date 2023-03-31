import React from 'react'
import Panel from '../../../components/Panel'
import { Row, Col } from 'antd'
import ManagerUserForm from '../../../components/Forms/ManagerUserForm'

function ManagerCitizenCreate() {

  return (

    <Panel title='Cadastrar Cidadão'>
      <Row gutter={[24, 24]} style={{ width: '100%' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <ManagerUserForm buttonText='Cadastrar Cidadão' role="CITIZEN" />
        </Col>
      </Row>
    </Panel>
  )
}

export default ManagerCitizenCreate
