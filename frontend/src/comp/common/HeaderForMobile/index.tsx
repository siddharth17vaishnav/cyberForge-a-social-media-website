import { useRouter } from 'next/navigation'
import { IoNotificationsCircleSharp } from 'react-icons/io5'
import { HiOutlineLogout } from 'react-icons/hi'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
const HeaderForMobile = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  return (
    <div className="flex justify-between lg:hidden px-8">
      <div className="font-pacifico text-2xl py-4 ">CyberForge</div>
      <div className="flex gap-2 self-center">
        <IoNotificationsCircleSharp
          fontSize={26}
          cursor={'pointer'}
          onClick={() => push('/notifications')}
        />
        <HiOutlineLogout
          fontSize={26}
          cursor={'pointer'}
          onClick={() => dispatch(setModals({ logout: true }))}
        />
      </div>
    </div>
  )
}

export default HeaderForMobile
