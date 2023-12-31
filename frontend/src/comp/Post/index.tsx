import assets from '@/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { TfiCommentAlt } from 'react-icons/tfi'
import { FcLike } from 'react-icons/fc'
import { AiOutlineHeart } from 'react-icons/ai'
import { postApi, useLazyDisLikePostQuery, useLazyLikePostQuery } from '@/store/postApi'
import { dispatch } from '@/store'
import { formatLikeCount, formatPostCreationTime } from '@/utils'
import { Tables } from '@/types/gen/supabase.table'
import { setModals } from '@/store/Modals/modals.slice'
import { useStateSelector } from '@/store/root.reducer'
import { invalidImageValues } from '../Drawer'

export interface PostProps extends Tables<'posts'> {
  user_profiles: Tables<'user_profiles'>
  likes: Tables<'post_likes'>[]
}

interface Props {
  post: PostProps
  fullWidth?: boolean
}

const Post = ({ post, fullWidth = false }: Props) => {
  const [likePost] = useLazyLikePostQuery()
  const [disLikePost] = useLazyDisLikePostQuery()
  const [showFullText, setShowFulltext] = useState(false)
  const { id } = useStateSelector(state => state.userSlice)
  const likeIds = post?.likes?.map(i => i.user_id) || []
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setIsLiked(likeIds.includes(id))
    setLikes(post?.likes?.length || 0)
  }, [])

  const handleLikePost = () => {
    const data = {
      post_id: post.id,
      user_id: id
    }
    setIsLiked(true)
    setLikes(prev => prev + 1)
    likePost(data).then(() => dispatch(postApi.util.invalidateTags(['posts'])))
  }
  const handleDislikePost = () => {
    const data = {
      postId: post.id,
      userId: id
    }
    setIsLiked(false)
    setLikes(prev => prev - 1)
    disLikePost(data).then(() => dispatch(postApi.util.invalidateTags(['posts'])))
  }
  return (
    <div className={`w-[full] mx-auto ${!fullWidth && 'max-w-[700px]'} mb-7`}>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Image
            src={
              post?.user_profiles?.profile &&
              !invalidImageValues.includes(post?.user_profiles?.profile as string)
                ? String(post?.user_profiles.profile)
                : assets.images.DUMMY_PROFILE
            }
            alt={'post-user-image'}
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] object-contain"
          />
          <div className="">
            <h5 className="font-bold">{post?.user_profiles?.user_name}</h5>
            <p className="text-[12px] font-semibold">
              {formatPostCreationTime(new Date(post?.created_at))}
            </p>
          </div>
        </div>
        <CiMenuKebab
          className="cursor-pointer"
          onClick={() => dispatch(setModals({ postOptions: { id: post?.id, value: true } }))}
        />
      </div>
      <div className="relative w-full h-[450px] mt-3 ">
        <Image src={post?.image!} alt="feed-post" fill className="rounded 	" />
      </div>
      <div className="mt-2 ml-1 flex gap-3">
        {!isLiked ? (
          <AiOutlineHeart fontSize={21} onClick={handleLikePost} className="cursor-pointer" />
        ) : (
          <FcLike fontSize={21} className="mt-[-2px] cursor-pointer" onClick={handleDislikePost} />
        )}
        <TfiCommentAlt
          fontSize={18}
          className="self-center cursor-pointer"
          onClick={() => dispatch(setModals({ commentSection: { id: post?.id, value: true } }))}
        />
      </div>
      <div className="mt-2 ml-1 text-[12px]">{formatLikeCount(likes || 0)} likes</div>
      <div className="ml-1 text-[12px]">
        {post?.description && !showFullText && post?.description!.length > 150
          ? post!.description?.substring(0, 150) + '...'
          : post?.description}
      </div>
      {post?.description && post?.description!.length > 150 && (
        <div
          className="ml-1 text-[12px] font-semibold cursor-pointer"
          onClick={() => setShowFulltext(prev => !prev)}>
          {showFullText ? 'view less' : 'view more'}
        </div>
      )}
    </div>
  )
}

export default Post
