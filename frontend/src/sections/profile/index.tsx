import { useStateSelector } from '@/store/root.reducer'
import ProfileHeader from './Header'
import { useLazyUserByIdQuery } from '@/store/UserApi'
import { useEffect, useState } from 'react'
import { Tables } from '@/types/gen/supabase.table'
import { useSearchParams } from 'next/navigation'
import Loader from '@/comp/Loader'
import Tabs from '@/comp/Tabs'

const tabsOptions = [{ id: 1, title: 'Posts' }]

export interface ProfileDataProps extends Tables<'user_profiles'> {
  posts: Tables<'posts'>[]
}
const ProfileSection = () => {
  const [data, setData] = useState<ProfileDataProps>()
  const [getUser, { isLoading }] = useLazyUserByIdQuery()
  const { id: userId } = useStateSelector(state => state.userSlice)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (userId || id)
      getUser(Number(id) ? id : userId).then(({ data }) => {
        const res = data as unknown as ProfileDataProps
        setData(res)
      })
  }, [userId, id])
  return (
    <div className="max-w-[90%] md:max-w-[80%] mx-auto my-4">
      {isLoading ? (
        <div className="w-full h-[90vh]">
          <Loader />
        </div>
      ) : (
        <>
          <ProfileHeader data={data!} />
          <Tabs options={tabsOptions} />
        </>
      )}
    </div>
  )
}

export default ProfileSection
