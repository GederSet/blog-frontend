import React from 'react'
import './ErrorBlock.scss'

type ErrorProps = {
  text: string
}

export const ErrorBlock: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className='error-block'>
      <h2 className='error-block__title'>Произошла ошибка 😕</h2>
      <p className='error-block__text'>{text}</p>
    </div>
  )
}
