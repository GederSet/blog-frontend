import React from 'react'
import './NullData.scss'

type NullProps = {
  text: string
}

export const NullData: React.FC<NullProps> = ({ text }) => {
  return (
    <div className='null-data'>
      <h2 className='null-data__title'>Пока ничего нет 😕</h2>
      <p className='null-data__text'>{text}</p>
    </div>
  )
}
