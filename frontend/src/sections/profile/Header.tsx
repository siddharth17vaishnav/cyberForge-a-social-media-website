'use client'
import assets from '@/assets'
import Image from 'next/image'
import { GiHadesSymbol } from 'react-icons/gi'
import { ProfileDataProps } from '.'
import { invalidImageValues } from '@/comp/Drawer'
import { MdPersonAddAlt1 } from 'react-icons/md'
interface Props {
  data: ProfileDataProps
}

const ProfileHeader = ({ data }: Props) => {
  return (
    <>
      <div className="flex gap-[40px]">
        <div>
          <Image
            src={
              !!data?.profile && !invalidImageValues.includes(data?.profile!)
                ? data?.profile!
                : assets.images.DUMMY_PROFILE
            }
            alt="profile"
            width={120}
            height={120}
            className="rounded-full w-[120px] h-[120px] max-w-[120px] max-h-[120px] min-w-[120px] min-h-[120px]"
          />
        </div>
        <div>
          <div className="flex gap-4">
            <div className="font-semibold pt-1">{data?.user_name}</div>
            <MdPersonAddAlt1 style={{ alignSelf: 'center', fontSize: 18, cursor: 'pointer' }} />
          </div>
          <div className="flex gap-[50px]">
            <div>
              <span className="font-medium">{data?.posts?.length || 0}</span> posts
            </div>
            <div>
              <span className="font-medium">20</span> friends
            </div>
          </div>
          <div className="mt-4">
            <p>
              {data?.first_name} {data?.last_name}
            </p>
            <div className="flex gap-2 bg-[#F6F6F6] max-w-[fit-content] px-2 py-1 rounded-full">
              <GiHadesSymbol className="self-center" />
              <p className="self-center">{data?.user_name}</p>
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
