import React, { FC } from 'react'

import { Layout } from 'antd'

const PublicLayout: FC = ({ children }) => {
  return (
    <Layout
      style={{
        backgroundColor: '#FCFCFC',
        height: '100vh',
      }}
    >
      {children}
    </Layout>
  )
}

export default PublicLayout
