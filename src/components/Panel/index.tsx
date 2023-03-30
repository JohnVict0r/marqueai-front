import React from 'react'
import Title from '../Title'
import Tab from '../Tab'

import './styles.less'

interface PanelProps {
  title: string
  icon?: any
  action?: any
  style?: any
}

const Panel: React.FC<PanelProps> = ({
  title,
  icon: Icon,
  action,
  children,
  ...rest
}) => {
  return (
    <div className='panel-container' {...rest}>
      <header>
        <div className='panel-title'>
          <Tab>
            {Icon && <Icon style={{ color: '#1e3978' }} />}
            <Title>{title}</Title>
          </Tab>
        </div>
      </header>
      <main>{children}</main>
      <div className='action'>{action && action}</div>
    </div>
  )
}

export default Panel
