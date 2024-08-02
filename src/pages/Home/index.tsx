import React from 'react'
import { CommentsBlock } from '../../components/CommentsBlock'
import { ErrorBlock } from '../../components/ErrorBlock'
import { NullData } from '../../components/NullData'
import { Post } from '../../components/Post'
import { PostSkeleton } from '../../components/Post/Skeleton'
import { TagBlock } from '../../components/TagBlock'
import { useAppSelector } from '../../hooks/redux'
import { commentApi } from '../../services/CommentService'
import { postApi } from '../../services/PostService'
import './Home.scss'

const Home: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.user.id)
  const {
    data: postsData,
    error: postError,
    isLoading: postsLoading,
  } = postApi.useGetPostsQuery()
  const {
    data: comments,
    error: commentError,
    isLoading: commentsLoading,
  } = commentApi.useGetLatestCommentsQuery(5)
  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsLoading,
  } = postApi.useGetLatestTagsQuery(5)

  const tags = tagsData?.map((tag, index) => (
    <TagBlock key={index} text={tag}></TagBlock>
  ))
  const skeletonsTags = [...Array(5)].map((_, index) => (
    <TagBlock key={index} isLoading></TagBlock>
  ))

  const posts = postsData?.map((post) => (
    <Post key={post.id} {...post} isEditTable={userId === post.user?.id}></Post>
  ))
  const skeletonsPosts = [...Array(5)].map((_, index) => (
    <PostSkeleton key={index}></PostSkeleton>
  ))

  return (
    <section className='home'>
      <div className='home__container'>
        <div className='home__columns'>
          {postError && (
            <ErrorBlock text='Произошла ошибка при получении постов, повторите попытку позже'></ErrorBlock>
          )}
          {postsLoading && skeletonsPosts}
          {posts?.length === 0 ? <NullData text='Постов пока нет.' /> : posts}
        </div>
        <div className='home__columns'>
          <div className='home__wrapper'>
            <h6 className='home__sub-title home__sub-title_tags'>Тэги</h6>
            <div className='home__body'>
              <div className='home__tags tags'>
                {tagsError && (
                  <ErrorBlock text='Произошла ошибка при получении тэгов, повторите попытку позже'></ErrorBlock>
                )}
                {tagsLoading && skeletonsTags}
                {tags?.length === 0 ? (
                  <NullData text='Тэгов пока нет.' />
                ) : (
                  tags
                )}
              </div>
            </div>
          </div>
          <div className='home__wrapper'>
            <h6 className='home__sub-title'>Комментарии</h6>
            <div className='home__body'>
              {commentError && (
                <ErrorBlock text='Произошла ошибка при получении комментариев.' />
              )}
              {commentsLoading &&
                [...Array(5)].map((_, index) => (
                  <CommentsBlock key={index} isLoading />
                ))}
              {comments?.length === 0 ? (
                <NullData text='Комментариев пока нет.' />
              ) : (
                comments?.map((comment) => (
                  <CommentsBlock key={comment.id} {...comment} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
