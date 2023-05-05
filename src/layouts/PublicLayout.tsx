import React, { FC } from 'react'

import { Layout, Row, Col } from 'antd'

const PublicLayout: FC = ({ children }) => {
  return (
    <Layout style={{ backgroundColor: '#FCFCFC', height: '100vh' }}>
      <Row
        justify='center'
        align='middle'
        style={{
          height: '100vh',
        }}
      >
        <Col xs={{ span: 20 }} lg={{ span: 8 }}>
          {children}
        </Col>
      </Row>
    </Layout>
  )
}

export default PublicLayout
