import assets from '@/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { TfiCommentAlt } from 'react-icons/tfi'
import { FcLike } from 'react-icons/fc'
import { AiOutlineHeart } from 'react-icons/ai'
import { PostProps } from '@/api/post/useFetchPosts'

interface Props {
  post: PostProps
}

const Post = ({ post }: Props) => {
  const [showFullText, setShowFulltext] = useState(false)
  return (
    <div className="w-[full] lg:w-[60%] mb-7">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Image
            src={assets.images.DUMMY_PROFILE}
            alt={'post-user-image'}
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />
          <div className="">
            <h5 className="font-bold">code.siddahrth</h5>
            <p className="text-[12px] font-semibold">2d</p>
          </div>
        </div>
        <CiMenuKebab />
      </div>
      <div className="relative w-full h-[450px] mt-3 ">
        <Image src={post.image} alt="feed-post" fill className="rounded" />
      </div>
      <div className="mt-2 ml-1 flex gap-3">
        {!true ? <AiOutlineHeart fontSize={21} /> : <FcLike fontSize={21} className="mt-[-2px]" />}
        <TfiCommentAlt fontSize={18} className="self-center" />
      </div>
      <div className="ml-1 text-[12px]">1k likes</div>
      <div className="ml-1 text-[12px]">
        {!showFullText && post.description.length > 150
          ? post.description.substring(0, 150) + '...'
          : post.description}
      </div>
      {post.description.length > 150 && (
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
