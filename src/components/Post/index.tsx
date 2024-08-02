import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { ServerPostType } from '../../redux/post/types'
import { postApi } from '../../services/PostService'
import './Post.scss'

export const Post: React.FC<ServerPostType> = ({
  id,
  fileName,
  tags,
  title,
  text,
  viewsCount,
  createdAt,
  commentsCount,
  user,
  children,
  isEditTable,
  isFullPost,
}) => {
  const [deletePost, { isLoading }] = postApi.useDeletePostMutation()
  const onDeletePost = () => {
    if (window.confirm('Вы действительно хотите удалить пост?')) {
      deletePost(id)
    }
  }

  return (
    <div className='home__post post'>
      {fileName && (
        <div className={clsx('post__image', { full: isFullPost })}>
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${fileName}`}
            alt='post image'
          />
        </div>
      )}
      <div className='post__body'>
        <div className='post__icon-user'>
          {user?.imageUrl ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${user.imageUrl}`}
              alt='icon user'
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/noavatar.png`}
              alt='icon user'
            />
          )}
        </div>
        <div className='post__box'>
          <div className='post__date'>{createdAt}</div>
          <h2 className={clsx('post__title', { full: isFullPost })}>
            {isFullPost ? (
              title
            ) : (
              <Link className='post__title' to={`/post/${id}`}>
                {title}
              </Link>
            )}
          </h2>
          <ul className='post__tags'>
            {tags.map((tag, index) => (
              <li key={index} className='post__tag'>
                #{tag}
              </li>
            ))}
          </ul>
          {children && <div className='post__text'>{children}</div>}
          <div className='post__rows'>
            <div className='post__row'>
              <div className='post__icon'>
                <svg viewBox='0 0 24 24' fill='#8d8d8d'>
                  <path d='M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z'></path>
                </svg>
              </div>
              <span className='post__count'>{viewsCount}</span>
            </div>
            <div className='post__row'>
              <div className='post__icon'>
                <svg viewBox='0 0 24 24' fill='#8d8d8d'>
                  <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z'></path>
                </svg>
              </div>
              <span className='post__count'>{commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
      {isEditTable && (
        <div className='post__panel'>
          <Link to={`/post/${id}/edit`} className='post__edit'>
            <svg viewBox='0 0 24 24'>
              <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'></path>
            </svg>
          </Link>
          <button onClick={onDeletePost} className='post__delete'>
            <svg viewBox='0 0 24 24'>
              <path d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
