import React from 'react'
import './styles.less'

interface BannerProps {
  title: string
  description: string
  img?: any
}

const Banner: React.FC<BannerProps> = ({ title, description, img }) => {
  return (
    <div className='banner-container'>
      <div className='banner-content'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <img src={img} alt={title}></img>
    </div>
  )
}

export default Banner
