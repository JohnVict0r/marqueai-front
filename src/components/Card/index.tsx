import React from 'react'

import './index.less'

import DateIcon from '../../assets/icons/data.svg'
import DoseIcon from '../../assets/icons/dose.svg'
import LocationIcon from '../../assets/icons/local.svg'

const orderFormated: any = {
  '0': 'Dose zero',
  '1': '1ª Dose',
  '2': '2ª Dose',
  '3': '3ª Dose',
  '4': '4ª Dose',
  U: 'Dose única',
  R: 'Reforço',
}

interface CardProps {
  name: string
  date?: any
  location?: any
  dose?: any
}

const Card: React.FC<CardProps> = ({ date, location, dose, name }) => {
  return (
    <div className='card-container'>
      <p id='vacinne-title'>
        {name.length > 40 ? `${name.slice(0, 40)}...` : name}
      </p>
      <p>
        <img src={DateIcon} alt='Data de vacinação'></img>
        {date}
      </p>
      <p>
        <img src={LocationIcon} alt='Data de vacinação'></img>
        {location === ' ' ? 'Sem localização' : location}
      </p>
      <p>
        <img src={DoseIcon} alt='Data de vacinação'></img>
        {dose ? orderFormated[dose] : 'Dose não definida'}
      </p>
    </div>
  )
}

export default Card
