import assets from '@/assets'
import Image from 'next/image'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'

const Post = () => {
  return (
    <div className="w-[full] lg:w-[60%]">
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
        <Image src={assets.images.DUMMY_PROFILE} alt="feed-post" fill className="rounded" />
      </div>
    </div>
  )
}

export default Post
