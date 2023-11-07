import { useStateSelector } from '@/store/root.reducer'
import ProfileHeader from './Header'
import { useLazyUserByIdQuery } from '@/store/UserApi'
import { useEffect, useState } from 'react'
import { Tables } from '@/types/gen/supabase.table'
import { useSearchParams } from 'next/navigation'
import Loader from '@/comp/Loader'
import Tabs from '@/comp/Tabs'
import ProfilePosts from './ProfilePosts'

const tabsOptions = [{ id: 1, title: 'Posts' }]

export interface ProfileDataProps extends Tables<'user_profiles'> {
  posts: Tables<'posts'>[]
}

const ProfileSection = () => {
  const [data, setData] = useState<ProfileDataProps>()
  const [selectedTab, setSelectedTab] = useState<string>('Posts')
  const [getUser, { isLoading }] = useLazyUserByIdQuery()
  const { id: userId } = useStateSelector(state => state.userSlice)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { createPost } = useStateSelector(state => state.modalsSlice)

  useEffect(() => {
    if (userId || id)
      getUser(Number(id) ? id : userId).then(({ data }) => {
        const res = data as unknown as ProfileDataProps
        setData(res)
      })
  }, [userId, id, createPost])
  return (
    <div className="max-w-[90%] md:max-w-[80%] mx-auto my-4">
      {isLoading ? (
        <div className="w-full h-[90vh]">
          <Loader />
        </div>
      ) : (
        <>
          <ProfileHeader data={data!} />
          <Tabs
            options={tabsOptions}
            onChange={value => setSelectedTab(value)}
            value={selectedTab}
          />
          {selectedTab === 'Posts' && <ProfilePosts />}
        </>
      )}
    </div>
  )
}

export default ProfileSection
