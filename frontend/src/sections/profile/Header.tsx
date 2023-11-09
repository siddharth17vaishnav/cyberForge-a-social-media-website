'use client'
import assets from '@/assets'
import Image from 'next/image'
import { GiHadesSymbol } from 'react-icons/gi'
import { ProfileDataProps } from '.'
import { invalidImageValues } from '@/comp/Drawer'
import { useSearchParams } from 'next/navigation'
import { useAddFriendMutation } from '@/store/friendsApi'
import { useStateSelector } from '@/store/root.reducer'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
interface Props {
  data: ProfileDataProps
}

const ProfileHeader = ({ data }: Props) => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { id: userId } = useStateSelector(state => state.userSlice)
  const [addFriend] = useAddFriendMutation()

  const handleAddFriend = async () => {
    const data = {
      to_user_id: id,
      from_user_id: userId,
      status: 'pending'
    }
    await addFriend(data).then(() => toast.success('Friend Request Sent'))
  }
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
          </div>
          <div className="flex gap-[50px]">
            <div>
              <span className="font-medium">{data?.posts?.length || 0}</span> posts
            </div>
            <div>
              <span className="font-medium">{data?.friends?.length || 0}</span> friends
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
            {data?.bio && <p className="max-w-[80%] mt-1">{data?.bio}</p>}
            <div className="mt-2">
              {id && (
                <div className="flex gap-2">
                  <Button onClick={handleAddFriend}>Add Friend</Button>
                  <Button>Message</Button>
                </div>
              )}
              {!id && (
                <Button onClick={() => dispatch(setModals({ editProfile: true }))}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
