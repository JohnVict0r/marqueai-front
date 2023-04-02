import React, { FC } from 'react'
import './App.less'
import AppProvider from './contexts'

import Routes from './routes'

const App: FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}

export default App
