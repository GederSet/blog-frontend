import { TextField } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { CommentsBlock } from '../../components/CommentsBlock'
import { Loader } from '../../components/Loader'
import { NullData } from '../../components/NullData'
import { Post } from '../../components/Post'
import { PostSkeleton } from '../../components/Post/Skeleton'
import { useAppSelector } from '../../hooks/redux'
import { commentApi } from '../../services/CommentService'
import { postApi } from '../../services/PostService'
import './FullPost.scss'

const FullPost: React.FC = () => {
  const { id } = useParams()
  const [updateCount] = postApi.useIncreaseViewCountMutation()
  const { data: post } = id ? postApi.useGetPostQuery(id) : { data: null }
  const { data: comments } = id
    ? commentApi.useGetPostCommentsQuery(id)
    : { data: null }
  const [sendComment, { isLoading: commentLoading }] =
    commentApi.useCreateCommentMutation()

  const { id: userId, imageUrl } = useAppSelector((state) => state.auth.user)
  const [comment, setComment] = React.useState('')

  React.useEffect(() => {
    if (id) {
      updateCount(id)
    }
  }, [id])

  if (!post || !comments) {
    return (
      <section className='full-post'>
        <div className='full-post__container'>
          <PostSkeleton></PostSkeleton>
        </div>
      </section>
    )
  }

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    if (id) {
      const data = {
        comment,
        postId: id,
      }
      sendComment(data)
    }
  }

  return (
    <section className='full-post'>
      <div className='full-post__container'>
        <div className='full-post__body'>
          <Post key={post?.id} {...post} isFullPost>
            <ReactMarkdown children={post?.text} />
          </Post>
          <div className='full-post__comments comments'>
            <h2 className='comments__title'>Комментарии</h2>
            <div className='comments__shell'>
              {userId ? (
                <div className='comments__wrapper'>
                  <div className='comments__icon-user'>
                    {imageUrl ? (
                      <img
                        src={`${
                          import.meta.env.VITE_API_URL
                        }/uploads/${imageUrl}`}
                        alt='icon user'
                      />
                    ) : (
                      <img
                        src={`${
                          import.meta.env.VITE_API_URL
                        }/uploads/noavatar.png`}
                        alt='icon user'
                      />
                    )}
                  </div>
                  <form className='comments__box'>
                    <TextField
                      type='text'
                      onChange={handleChangeComment}
                      value={comment}
                      label='Написать комментарий'
                      className='comments__input'
                      fullWidth
                    />
                    <button
                      disabled={!Boolean(comment)}
                      onClick={onSubmit}
                      className='comments__button btn-fl'
                    >
                      Отправить
                    </button>
                  </form>
                </div>
              ) : (
                <div className='comments__authorized'>
                  Авторизуйтесь, чтобы оставить комментарий
                </div>
              )}
              <div className='comments__body'>
                {comments.length === 0 ? (
                  <NullData text='Комментариев пока нет. Станьте первым!'></NullData>
                ) : (
                  comments.map((comment) => (
                    <CommentsBlock
                      key={comment.id}
                      {...comment}
                      isFullComment
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {commentLoading && <Loader></Loader>}
    </section>
  )
}

export default FullPost
