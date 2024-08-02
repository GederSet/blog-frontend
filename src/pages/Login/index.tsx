import { TextField } from '@mui/material'
import { notification } from 'antd'
import { setCookie } from 'nookies'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { UserType } from '../../redux/auth/types'
import { userApi } from '../../services/UserService'
import './Login.scss'

interface IFormInput {
  login: string
  password: string
}

const Login: React.FC = () => {
  const [loginUser, { isLoading: userLoading }] = userApi.useLoginUserMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      const { token } = await loginUser(formData as UserType).unwrap()

      setCookie(null, '_token', token, {
        path: '/',
      })

      navigate('/')
    } catch (err: any) {
      console.log(err)
      notification.error({
        message: 'Ошибка!',
        description: err?.data?.message || 'Ошибка при авторизации',
        duration: 3,
      })
    }
  }

  return (
    <section className='login'>
      <div className='login__container'>
        <form onSubmit={handleSubmit(onSubmit)} className='login__body'>
          <h1 className='login__title'>Вход в аккаунт</h1>
          <TextField
            error={Boolean(errors.login?.message)}
            helperText={errors.login?.message}
            {...register('login', { required: 'Введите логин' })}
            label='Логин'
            className='login__input'
            fullWidth
          />
          <TextField
            type='password'
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Введите пароль' })}
            label='Пароль'
            className='login__input'
            fullWidth
          />
          <button className='login__button btn-fl'>Войти</button>
          <Link to='/register' className='login__link'>
            Зарегистрироваться
          </Link>
        </form>
      </div>
      {userLoading && <Loader></Loader>}
    </section>
  )
}

export default Login
