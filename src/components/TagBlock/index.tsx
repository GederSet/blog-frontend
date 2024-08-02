import TagIcon from '@mui/icons-material/Tag'
import ListItemIcon from '@mui/material/ListItemIcon'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './TagBlock.scss'

type TagProps = {
  text?: string
  isLoading?: boolean
}

export const TagBlock: React.FC<TagProps> = ({ text, isLoading }) => {
  return (
    <div className='tags__row'>
      <ListItemIcon>
        <TagIcon />
      </ListItemIcon>
      {isLoading ? (
        <Skeleton width={100} />
      ) : (
        <div className='tags__text'>{text}</div>
      )}
    </div>
  )
}
