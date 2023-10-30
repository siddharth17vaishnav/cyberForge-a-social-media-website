'use client'
import assets from '@/assets'
import { Button } from '@/components/ui/button'
import { RootReduxState } from '@/store/redux.types'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { GiHadesSymbol } from 'react-icons/gi'

const ProfileHeader = () => {
  const { first_name, last_name, profile } = useSelector((state: RootReduxState) => state.userSlice)
  return (
    <>
      <div className="flex gap-[40px]">
        <div>
          <Image
            src={profile ?? assets.images.DUMMY_PROFILE}
            alt="profile"
            width={120}
            height={120}
            className="rounded-full w-[120px] h-[120px] max-w-[120px] max-h-[120px] min-w-[120px] min-h-[120px]"
          />
        </div>
        <div>
          <div className="flex gap-4">
            <div className="font-semibold pt-1">code.siddharth</div>
            <Button variant={'secondary'} className="hover:bg-black hover:text-white">
              Edit Profile
            </Button>
          </div>
          <div className="flex gap-[50px]">
            <div>
              <span className="font-medium">10</span> posts
            </div>
            <div>
              <span className="font-medium">20</span> friends
            </div>
          </div>
          <div className="mt-4">
            <p>
              {first_name} {last_name}
            </p>
            <div className="flex gap-2 bg-[#F6F6F6] max-w-[fit-content] px-2 py-1 rounded-full">
              <GiHadesSymbol className="self-center" />
              <p className="self-center">code.siddharth</p>
            </div>
            <p className="max-w-[80%] mt-1">
              Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week
              debugging Monday’s code..
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
