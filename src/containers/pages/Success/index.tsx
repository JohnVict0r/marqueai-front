import React from 'react'
import { Button, Descriptions, Result } from 'antd'
import { getCustomerAppointment } from '../../../utils/authentication'
import {
  minutesToHourString,
  priceToCurrencyString,
} from '../../../utils/format'
import { useHistory } from 'react-router-dom'

const PageSuccess: React.FC = () => {
  const history = useHistory()
  const appointment = getCustomerAppointment()
  return (
    <Result
      status='success'
      title='Agendamento Realizado'
      subTitle=''
      extra={
        <>
          <Descriptions
            title='Informações do agendamento'
            size='small'
            layout='vertical'
          >
            <Descriptions.Item label='' style={{ textAlign: 'left' }}>
              Nome: {appointment.name}
              <br />
              Telefone/Celular: {appointment.number}
              <br />
              data: {appointment.dateExtend}
              <br />
              Horário: {minutesToHourString(appointment.schedule)}
              <br />
              Preço: {priceToCurrencyString(appointment.price)}
              <br />
              Serviços: {appointment.serviceNames}
              <br />
              Status: Agendado
              {/* Status: {appointment.status} */}
            </Descriptions.Item>
          </Descriptions>
          <Button type='primary' onClick={() => history.goBack()}>
            Novo agendamento
          </Button>
        </>
      }
    />
  )
}

export default PageSuccess
