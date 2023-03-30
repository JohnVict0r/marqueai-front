import React from 'react'

import './index.less'

import { ArrowRightOutlined } from '@ant-design/icons'
/* 
import DateIcon from '../../assets/icons/data.svg'
import DoseIcon from '../../assets/icons/dose.svg'
import LocationIcon from '../../assets/icons/local.svg'
 */

interface StageCardProps {
  stage: string
  groups: string[]
  selected: boolean
}

const StageCard: React.FC<StageCardProps> = ({ stage, groups, selected }) => {
  return (
    <div className='stage-card-container' style={selected ? { background: '#CCE7E4' } : {}}>
      <h2>{stage} {selected && '(Atual)'}</h2>
      {groups.map((group) => (
        <div className='group-content'>
          <ArrowRightOutlined style={{ color: '#018578' }} />
          <p>{group}</p>
        </div>
      ))}
    </div>
  )
}

export default StageCard
