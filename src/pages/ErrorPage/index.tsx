import React from 'react'
import './ErrorPage.scss'

const ErrorPage: React.FC = () => {
  return (
    <div className='error-page'>
      <h2 className='error-page__title'>404</h2>
      <p className='error-page__text'>Такой страницы не существует</p>
    </div>
  )
}

export default ErrorPage
