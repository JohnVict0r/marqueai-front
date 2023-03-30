import React from 'react'

import './index.less'

import DateIcon from '../../assets/icons/data.svg'
import DoseIcon from '../../assets/icons/dose.svg'
import LocationIcon from '../../assets/icons/local.svg'
import AplicatorIcon from '../../assets/icons/Responsavel-icon.svg'
import LoteIcon from '../../assets/icons/Lote-icon.svg'
import { Modal, Button } from 'antd'
import { dateExtend } from '../../utils/format'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

const orderFormated: any = {
  '0': 'Dose zero',
  '1': '1ª Dose',
  '2': '2ª Dose',
  '3': '3ª Dose',
  '4': '4ª Dose',
  U: 'Dose única',
  R: 'Reforço',
}

interface VaccineModalProps {
  visible: boolean
  vaccine: any
  handleOk: () => void
  handleCancel: () => void
  handleDelete?: () => void
  handleRemove?: (id: number) => void
}

const VaccineModal: React.FC<VaccineModalProps> = ({
  visible,
  vaccine,
  handleOk,
  handleCancel,
  handleDelete,
  handleRemove,
}) => {
  const history = useHistory()
  const handleModalDelete = () => {
    api
      .delete(`profiles/${vaccine.profile_id}/vaccines/${vaccine.id}`)
      .then(response => {
        console.log(response)
        handleDelete && handleDelete()
        handleRemove && handleRemove(vaccine.id)
        handleCancel()
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }
  return (
    <Modal
      title={`${vaccine?.vaccine.display_name}`}
      visible={visible}
      onOk={handleOk}
      onCancel={() => handleCancel()}
      className='modal-title'
      footer={[
        <Button
          disabled={true}
          key='back'
          onClick={() => {
            handleModalDelete()
          }}
        >
          Excluir
        </Button>,
        <Button
          disabled={true}
          type='primary'
          onClick={() => {
            history.push(`/profile/vaccines/${vaccine.id}/update`)
          }}
        >
          Editar
        </Button>,
      ]}
    >
      <div className='modal-item'>
        <p className='modal-item-title'>
          {' '}
          {/* o claasName foi pra resolver a cor do banner que tava pegando desse css */}
          <img src={DateIcon} alt='Data de vacinação'></img>
          Dia da vacinação
        </p>
        <strong>{vaccine && dateExtend(vaccine.application_date)}</strong>
      </div>

      <div className='modal-item'>
        <p className='modal-item-title'>
          <img src={LocationIcon} alt='Localização'></img>
          CNES
        </p>
        <strong>
          {' '}
          {vaccine?.cnes === ' ' ? 'Sem localização' : vaccine?.cnes}
        </strong>
      </div>

      <div className='modal-item'>
        <p className='modal-item-title'>
          <img src={DoseIcon} alt='Data de vacinação'></img>
          Dose
        </p>
        <strong>
          {vaccine?.order ? orderFormated[vaccine?.order] : 'Dose não definida'}
        </strong>
      </div>
      <div className='modal-item'>
        <p className='modal-item-title'>
          <img src={AplicatorIcon} alt='Responsável'></img>
          Responsável
        </p>
        <strong>
          {' '}
          {vaccine && vaccine.professional.profile.name !== ' ' ? vaccine.professional.profile.name : '---'}
        </strong>
      </div>
      <div className='modal-item'>
        <p className='modal-item-title'>
          <img src={LoteIcon} alt='Lote'></img>
          Lote da vacina
        </p>
        <strong>
          {vaccine && vaccine.lote !== ' ' ? vaccine.lote : '---'}
        </strong>
      </div>
    </Modal>
  )
}

export default VaccineModal
