import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import {
  useAcceptFriendRequestMutation,
  useFetchFriendRequestsQuery,
  useRejectFriendRequestMutation
} from '@/store/friendsApi'
import { useStateSelector } from '@/store/root.reducer'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { RxCrossCircled } from 'react-icons/rx'
import Image from 'next/image'

const NotificationSection = () => {
  const { id } = useStateSelector(state => state.userSlice)
  const { data, refetch } = useFetchFriendRequestsQuery(id)
  const [acceptRequest] = useAcceptFriendRequestMutation()
  const [rejectRequest] = useRejectFriendRequestMutation()
  const pendingRequests = data?.filter(i => i.status === 'pending') || []
  return (
    <div className="pt-4 px-6">
      <h5 className="font-semibold underline">Friend Requests</h5>
      <div>
        {pendingRequests && pendingRequests.length > 0 ? (
          <div className="my-3">
            {pendingRequests.map(request => {
              return (
                <div key={request.id} className="flex justify-between">
                  <div className="flex gap-2">
                    <Image
                      src={
                        request.user.profile && !invalidImageValues.includes(request.user.profile)
                          ? request.user.profile
                          : assets.images.DUMMY_PROFILE
                      }
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <p>{request?.user?.user_name}</p>
                  </div>
                  <div className="flex gap-1">
                    <AiOutlineCheckCircle
                      fontSize={23}
                      className="cursor-pointer hover:text-green-600"
                      onClick={() => {
                        acceptRequest(request.id).then(() => refetch())
                      }}
                    />
                    <RxCrossCircled
                      fontSize={23}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => {
                        rejectRequest(request.id).then(() => refetch())
                      }}
                    />
                  </div>
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
