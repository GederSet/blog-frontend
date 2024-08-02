import { destroyCookie } from 'nookies'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { logout } from '../../redux/auth/slice'
import './Header.scss'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useAppSelector((state) => state.auth.user)

  const onLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      navigate('/')
      dispatch(logout())
      destroyCookie(null, '_token', { path: '/' })
    }
  }

  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__logo'>
          logo
        </Link>
        <div className='header__buttons'>
          {userData?.id ? (
            <>
              <Link to='/add-post' className='header__button btn-fl'>
                Создать пост
              </Link>
              <button
                onClick={onLogout}
                className='header__button header__button_red'
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='header__button btn-fl'>
                Войти
              </Link>
              <Link to='/register' className='header__button btn-tr'>
                Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
