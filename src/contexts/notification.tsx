import { notification } from 'antd'
import React, { useContext, createContext } from 'react'

export type ApiNotificationType = 'success' | 'info' | 'warning' | 'error'

interface NotificationType {
  type: ApiNotificationType
  message: string
  description?: string
}

interface NotificationContextData {
  openNotification(notification: NotificationType): void
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
)

export const NotificationProvider: React.FC = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({
    type,
    message,
    description,
  }: NotificationType) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
    })
  }

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext)

  if (!context)
    throw new Error(
      'useNotification must be used within an NotificationProvider'
    )

  return context
}
