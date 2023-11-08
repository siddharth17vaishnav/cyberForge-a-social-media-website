import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import { useFetchFriendRequestsQuery } from '@/store/friendsApi'
import { useStateSelector } from '@/store/root.reducer'
import Image from 'next/image'

const NotificationSection = () => {
  const { id } = useStateSelector(state => state.userSlice)
  const { data } = useFetchFriendRequestsQuery(id)
  const pendingRequests = data?.filter(i => i.status === 'pending') || []
  return (
    <div className="pt-4 px-6">
      <h5 className="font-semibold underline">Friend Requests</h5>
      <div>
        {pendingRequests && pendingRequests.length > 0 ? (
          <div>
            {pendingRequests.map(request => {
              return (
                <div key={request.id}>
                  <Image
                    src={
                      request.user.profile && !invalidImageValues.includes(request.user.profile)
                        ? request.user.profile
                        : assets.images.DUMMY_PROFILE
                    }
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <p>{request?.user?.username}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="w-full mx-auto [text-align-last:center] mt-5"> No Friend Requests</div>
        )}
      </div>
    </div>
  )
}

export default NotificationSection
