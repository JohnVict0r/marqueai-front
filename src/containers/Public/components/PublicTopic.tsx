import React from 'react'
import './PublicTopic.less'
import { Image } from 'antd'
import Logo from '../../../assets/logos/gestio_azul.png'



interface TopicProps {
  title: string
  description: string
}

const PublicTopic: React.FC<TopicProps> = ({ title, description }) => {
  return (
    <div className='topic-container'>
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '10px',
          textAlign: 'center',
        }}
      >
        <Image width={100} src={Logo} />
      </div>
      <div className='topic-content'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default PublicTopic
