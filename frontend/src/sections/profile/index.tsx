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

interface PostProps extends Tables<'posts'> {
  post_likes: Tables<'post_likes'>[]
  post_comments: Tables<'post_comments'>[]
}
export interface ProfileDataProps extends Tables<'user_profiles'> {
  posts: PostProps[]
  friends: Tables<'friends'>[]
}

const ProfileSection = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ProfileDataProps>()
  const [selectedTab, setSelectedTab] = useState<string>('Posts')
  const { id: userId } = useStateSelector(state => state.userSlice)
  const [getUser, { isLoading, isFetching }] = useLazyUserByIdQuery()
  const { createPost, editProfile, viewPost } = useStateSelector(state => state.modalsSlice)

  const fetchData = () => {
    !editProfile &&
      setTimeout(() => {
        getUser(Number(id) ? id : userId).then(({ data }) => {
          const res = data as unknown as ProfileDataProps
          setData(res)
          setLoading(false)
        })
      }, 1000)
  }
  useEffect(() => {
    if (userId || (id && !editProfile)) fetchData()
  }, [userId, id, createPost, editProfile, viewPost])

  return (
    <div className="max-w-[90%] md:max-w-[80%] mx-auto my-4">
      {isLoading || isFetching || loading ? (
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
          {selectedTab === 'Posts' && <ProfilePosts data={data!} />}
        </>
      )}
    </div>
  )
}

export default ProfileSection
