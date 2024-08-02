import { TextField } from '@mui/material'
import { notification } from 'antd'
import { setCookie } from 'nookies'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader'
import { UserType } from '../../redux/auth/types'
import { fileApi } from '../../services/FileService'
import { userApi } from '../../services/UserService'
import './Register.scss'

interface IFormInput {
  login: string
  password: string
  passwordConfirmation: string
  imageUrl: string
  originalUrl: string
}

const Registration: React.FC = () => {
  const [registerUser, { isLoading: userLoading }] =
    userApi.useRegisterUserMutation()
  const [uploadFile, { isLoading: fileLoading }] =
    fileApi.useUploadFileMutation()

  const [originalNameUrl, setOriginalNameUrl] = React.useState('')
  const [fileNameUrl, setFileNameUrl] = React.useState('')

  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onChange' })

  React.useEffect(() => {
    setValue('imageUrl', fileNameUrl)
    setValue('originalUrl', originalNameUrl)
  }, [originalNameUrl, fileNameUrl, setValue])

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const { passwordConfirmation, ...data } = formData
    try {
      const { token } = await registerUser(data as UserType).unwrap()

      setCookie(null, '_token', token, {
        path: '/',
      })

      navigate('/')
    } catch (err: any) {
      console.log(err)
      notification.error({
        message: 'Ошибка!',
        description: err?.data?.message || 'Ошибка при регистрации',
        duration: 3,
      })
    }
  }

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const fileData = new FormData()
      const file = event.target.files ? event.target.files[0] : ''
      fileData.append('file', file)
      const { fileName, originalName } = await uploadFile(fileData).unwrap()
      setFileNameUrl(fileName)
      setOriginalNameUrl(originalName)
    } catch (err: any) {
      console.log(err)
      notification.error({
        message: 'Ошибка!',
        description: err?.data?.message || 'Ошибка при загрузке файла',
        duration: 3,
      })
    }
  }

  const onClickRemoveImage = () => {
    setFileNameUrl('')
    setOriginalNameUrl('')
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  return (
    <section className='registration'>
      <div className='registration__container'>
        <form onSubmit={handleSubmit(onSubmit)} className='registration__body'>
          <h1 className='registration__title'>Создание аккаунта</h1>
          <div className='registration__user-image'>
            {fileNameUrl && (
              <span
                onClick={onClickRemoveImage}
                className='registration__remove'
              >
                <svg fill='white' viewBox='0 0 24 24'>
                  <path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                </svg>
              </span>
            )}
            <div
              onClick={() => inputFileRef.current?.click()}
              className='registration__wrapper'
            >
              {fileNameUrl ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}uploads/${fileNameUrl}`}
                  alt='user icon'
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_API_URL}uploads/noavatar.png`}
                  alt='user icon'
                />
              )}
            </div>
          </div>
          <input
            {...register('imageUrl')}
            ref={inputFileRef}
            onChange={handleChangeFile}
            type='file'
            hidden
          />
          <input {...register('originalUrl')} type='text' hidden />
          <TextField
            error={Boolean(errors.login?.message)}
            helperText={errors.login?.message}
            {...register('login', {
              required: 'Введите логин',
              minLength: {
                value: 5,
                message: 'Минимальное количество символов 5',
              },
              maxLength: {
                value: 30,
                message: 'Максимальное количество символов 30',
              },
            })}
            label='Логин'
            className='registration__input'
            fullWidth
          />
          <TextField
            type='password'
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 5,
                message: 'Минимальное количество символов 5',
              },
              maxLength: {
                value: 30,
                message: 'Максимальное количество символов 30',
              },
            })}
            label='Пароль'
            className='registration__input'
            fullWidth
          />
          <TextField
            type='password'
            error={Boolean(errors.passwordConfirmation?.message)}
            helperText={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation', {
              required: 'Повторите пароль',
              validate: (value: string) => {
                if (watch('password') != value) {
                  return 'Ваши пароли не совпадают'
                }
              },
            })}
            label='Повторите пароль'
            className='registration__input'
            fullWidth
          />
          <button className='registration__button btn-fl'>
            Зарегистрироваться
          </button>
          <Link to='/login' className='registration__link'>
            Войти в аккаунт
          </Link>
        </form>
      </div>
      {(userLoading || fileLoading) && <Loader></Loader>}
    </section>
  )
}

export default Registration
