'use client'
import assets from '@/assets'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { BiHomeAlt2, BiSearchAlt2, BiMessageDetail } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { IoCreateOutline } from 'react-icons/io5'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useStateSelector } from '@/store/root.reducer'
import { IoNotificationsCircleSharp } from 'react-icons/io5'

export const invalidImageValues = ['null', 'undefined']
const Drawer = () => {
  const pathName = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const userDetails = useStateSelector(state => state.userSlice)
  const options = [
    {
      id: 1,
      title: 'Home',
      icon: <BiHomeAlt2 />,
      isActive: pathName === '/',
      link: '/',
      onClick: () => router.replace('/')
    },
    {
      id: 2,
      title: 'Search',
      icon: <BiSearchAlt2 />,
      isActive: pathName.includes('search'),
      onClick: () => router.replace('/search')
    },
    {
      id: 3,
      title: 'Messages',
      icon: <BiMessageDetail />,
      isActive: pathName.includes('messages'),
      onClick: () => router.replace('/messages')
    },
    {
      id: 4,
      title: 'Notifications',
      icon: <IoNotificationsCircleSharp />,
      isActive: pathName.includes('notifications'),
      onClick: () => router.replace('/notifications')
    },
    {
      id: 5,
      title: 'Create New Post',
      icon: <IoCreateOutline />,
      isActive: false,
      onClick: () => dispatch(setModals({ createPost: true }))
    },
    {
      id: 6,
      title: 'Profile',
      icon: (
        <Image
          src={
            !invalidImageValues.includes(userDetails.profile!)
              ? String(userDetails.profile)
              : assets.images.DUMMY_PROFILE
          }
          alt="profile"
          width={20}
          height={20}
          className="rounded-full w-[20px] h-[20px]"
        />
      ),
      isActive: pathName.includes('profile'),
      onClick: () => router.replace('/profile')
    }
  ]

  return (
    <div className="">
      <div className="font-pacifico text-2xl py-4 px-8">CyberForge</div>
      <div className="mt-[30px]  flex flex-col  justify-between h-[80vh]">
        <div className="flex flex-col gap-[10px]">
          {options.map(menu => {
            return (
              <div
                key={menu.id}
                className={`flex px-8 py-2 gap-2 cursor-pointer ${menu.isActive ? 'bg-[#F3F3F3]' : 'bg-white'
                  } hover:bg-[#F3F3F3]`}
                onClick={menu.onClick}>
                <div className="self-center text-xl">{menu.icon}</div>
                <div className="self-center text-xl">{menu.title}</div>
              </div>
            )
          })}
        </div>
        <div
          className="flex px-8 py-2 gap-2 cursor-pointer hover:bg-[#F3F3F3] "
          onClick={async () => dispatch(setModals({ logout: true }))}>
          <div className="self-center text-xl">
            <HiOutlineLogout />
          </div>
          <div className="self-center text-xl">Logout</div>
        </div>
      </div>
    </div>
  )
}
export default Drawer
