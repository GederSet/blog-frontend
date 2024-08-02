import TextField from '@mui/material/TextField'
import { notification } from 'antd'
import 'easymde/dist/easymde.min.css'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import { Loader } from '../../components/Loader'
import { ClientPostType } from '../../redux/post/types'
import { fileApi } from '../../services/FileService'
import { postApi } from '../../services/PostService'
import './AddPost.scss'

const AddPost = () => {
  const { id: _id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(_id)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientPostType>({
    mode: 'onChange',
  })

  const [uploadFile, { isLoading: fileLoading }] =
    fileApi.useUploadFileMutation()
  const [createPost, { isLoading: createPostLoading }] =
    postApi.useCreatePostMutation()
  const [updatePost, { isLoading: updatePostLoading }] =
    postApi.useUpdatePostMutation()

  const [text, setText] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [originalFile, setOriginalFile] = React.useState('')
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const { data } = _id ? postApi.useGetPostQuery(_id) : { data: null }

  React.useEffect(() => {
    if (data !== null && data !== undefined) {
      console.log(data)
      const stringTags = data.tags.join(',')
      setTitle(data.title)
      setTags(stringTags)
      setText(data.text)
      setFileName(data?.fileName)
      setOriginalFile(data?.originalFile)
      setValue('title', data.title)
      setValue('tags', stringTags)
      setValue('text', data.text)
      setValue('fileName', data?.fileName)
      setValue('originalFile', data?.originalFile)
    }
  }, [data])

  const onChange = React.useCallback(
    (value: string) => {
      setText(value)
      setValue('text', value)
    },
    [setValue]
  )

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
    }),
    []
  )

  const removeImage = () => {
    setFileName('')
    setOriginalFile('')
    setValue('fileName', '')
    setValue('originalFile', '')
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  const resetForm = () => {
    if (window.confirm('Вы действительно хотите очистить все поля?')) {
      setText('')
      setTitle('')
      setTags('')
      setFileName('')
      setOriginalFile('')
      if (inputFileRef.current) {
        inputFileRef.current.value = ''
      }
    }
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setValue('title', event.target.value)
  }

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const formData = new FormData()
      const file = event.target.files ? event.target.files[0] : ''
      formData.append('file', file)
      const { fileName, originalName } = await uploadFile(formData).unwrap()
      setFileName(fileName)
      setOriginalFile(originalName)
      setValue('fileName', fileName)
      setValue('originalFile', originalName)
    } catch (err: any) {
      console.log(err)
      notification.error({
        message: 'Ошибка!',
        description: err?.data?.message || 'Ошибка при загрузке файла',
        duration: 3,
      })
    }
  }

  const onSubmit: SubmitHandler<ClientPostType> = async (formData) => {
    try {
      const { id } = isEditing
        ? await updatePost({ ...formData, id: _id }).unwrap()
        : await createPost(formData).unwrap()
      navigate('/')
    } catch (err: any) {
      console.log(err)
      notification.error({
        message: 'Ошибка!',
        description: err?.data?.message || 'Ошибка при создании статьи',
        duration: 3,
      })
    }
  }

  return (
    <section className='add-post'>
      <div className='add-post__container'>
        <form onSubmit={handleSubmit(onSubmit)} className='add-post__body'>
          <div className='add-post__buttons'>
            <div
              onClick={() => inputFileRef.current?.click()}
              className='add-post__img-button btn-fl'
            >
              Загрузить превью
            </div>
            {fileName && (
              <div
                onClick={removeImage}
                className='add-post__img-button add-post__img-button_remove'
              >
                Удалить
              </div>
            )}
          </div>
          <input
            {...register('fileName')}
            type='file'
            onChange={handleChangeFile}
            ref={inputFileRef}
            hidden
          />
          <input
            {...register('originalFile')}
            type='text'
            value={originalFile}
            hidden
          />
          {fileName && (
            <div className='add-post__img'>
              <img
                src={`http://localhost:8000/uploads/${fileName}`}
                alt='page image'
              />
            </div>
          )}
          <div className='add-post__content'>
            {errors.title && (
              <div className='form-error form-error_title'>
                {errors.title.message}
              </div>
            )}
            <TextField
              {...register('title', {
                required: 'Напишите заголовок',
                maxLength: {
                  value: 100,
                  message: 'Максимальное количество символов 100',
                },
              })}
              className='add-post__input add-post__input_title'
              variant='standard'
              placeholder='Заголовок статьи...'
              value={title}
              onChange={handleChangeTitle}
              fullWidth
            />
            {errors.tags && (
              <div className='form-error form-error_title'>
                {errors.tags.message}
              </div>
            )}
            <TextField
              {...register('tags', {
                maxLength: {
                  value: 100,
                  message: 'Максимальное количество символов 100',
                },
              })}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className='add-post__input add-post__input_text'
              variant='standard'
              placeholder='Тэги'
              fullWidth
            />
            {errors.text && (
              <div className='form-error form-error_text'>
                {errors.text.message}
              </div>
            )}
            <SimpleMDE
              {...register('text', {
                required: 'Напишите текс',
                maxLength: {
                  value: 10000,
                  message: 'Максимальное количество символов 10000',
                },
              })}
              className='add-post__editor'
              value={text}
              onChange={onChange}
              options={options}
            />
            <div className='add-post__buttons'>
              <button className='add-post__button btn-fl'>
                {isEditing ? 'Редактировать' : 'Опубликовать'}
              </button>
              <div onClick={resetForm} className='add-post__button btn-tr'>
                Отмена
              </div>
            </div>
          </div>
        </form>
      </div>
      {(fileLoading || createPostLoading || updatePostLoading) && (
        <Loader></Loader>
      )}
    </section>
  )
}

export default AddPost
