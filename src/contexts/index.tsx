import React from 'react'
import { NotificationProvider } from './notification'

const AppProvider: React.FC = ({ children }) => (
  <NotificationProvider>{children}</NotificationProvider>
)

export default AppProvider
