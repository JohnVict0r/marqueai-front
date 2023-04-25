import React, { FC } from 'react'
import Logo from '../assets/marqueai.png'

import { Layout, Row, Col, Image } from 'antd'

const PublicLayout: FC = ({ children }) => {
  return (
    <Layout style={{ backgroundColor: '#FCFCFC', paddingBottom: '120px' }}>
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        <Image src={Logo} width='240px' />
      </div>
      <Row justify='center' align='middle'>
        <Col xs={{ span: 20 }} lg={{ span: 8 }}>
          {children}
        </Col>
      </Row>
    </Layout>
  )
}

export default PublicLayout
