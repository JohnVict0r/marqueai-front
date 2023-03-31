import React, { FC } from 'react'
// import GreenGestio from '../assets/logos/gestio_azul.png'

import { Layout, Row, Col, Image } from 'antd'

const PublicLayout: FC = ({ children }) => {
  return (
    <Layout style={{ backgroundColor: '#FCFCFC', height: '100vh' }}>
      <div
        style={{
          marginTop: '120px', // TODO remover quando adicionar a imagem
          paddingTop: '20px',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        {/* <Image width={250} height={250} src={GreenGestio} /> */}
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
