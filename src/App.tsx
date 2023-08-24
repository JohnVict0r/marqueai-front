import React, { FC, useEffect } from 'react'
import './App.less'
import AppProvider from './contexts'

import Routes from './routes'

const App: FC = () => {
  useEffect(() => {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name)
      })
    })
    console.log('cache clean')
  }, [])

  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}

export default App
