import React from 'react'
import { Button, Result } from 'antd'

const PageSuccess: React.FC = () => (
  <Result
    status='success'
    title='Agendamento Realizado'
    subTitle=''
    extra={<Button type='primary'>Novo agendamento</Button>}
  />
)

export default PageSuccess
