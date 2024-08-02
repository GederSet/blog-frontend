import Skeleton from '@mui/material/Skeleton'
import clsx from 'clsx'
import React from 'react'
import { ServerCommentType } from '../../@types/commentTypes'
import './CommentsBlock.scss'

export const CommentsBlock: React.FC<ServerCommentType> = ({
  id,
  comment,
  user,
  isLoading,
  isFullComment,
}) => {
  return (
    <div className='home__comments'>
      <div className='home__icon-user'>
        {isLoading ? (
          <Skeleton variant='circular' width={40} height={40} />
        ) : user?.imageUrl ? (
          <img
            src={`${import.meta.env.VITE_API_URL}uploads/${user?.imageUrl}`}
            alt='icon user'
          />
        ) : (
          <img
            src={`${import.meta.env.VITE_API_URL}uploads/noavatar.png`}
            alt='icon user'
          />
        )}
      </div>
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant='text' height={25} width={120} />
          <Skeleton variant='text' height={18} width={230} />
        </div>
      ) : (
        <div className='home__box'>
          <p className='home__name'>{user?.login}</p>
          <p className={clsx('home__comment', { full: isFullComment })}>
            {comment}
          </p>
        </div>
      )}
    </div>
  )
}
