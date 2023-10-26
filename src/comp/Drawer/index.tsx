'use client'
import assets from '@/assets'
import { RootReduxState } from '@/store/redux.types'
import { removeCookie } from '@/utils/cokkies'
import supabase from '@/utils/supabase'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { BiHomeAlt2, BiSearchAlt2, BiMessageDetail } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { IoCreateOutline } from 'react-icons/io5'

const Drawer = () => {
  const pathName = usePathname()
  const router = useRouter()
  const userDetails = useSelector((state: RootReduxState) => state.userSlice)
  const options = [
    { id: 1, title: 'Home', icon: <BiHomeAlt2 />, isActive: pathName === '/', link: '/' },
    {
      id: 2,
      title: 'Search',
      icon: <BiSearchAlt2 />,
      isActive: pathName.includes('search'),
      link: '/search'
    },
    {
      id: 3,
      title: 'Messages',
      icon: <BiMessageDetail />,
      isActive: pathName.includes('messages'),
      link: '/messages'
    },
    {
      id: 4,
      title: 'Create New Post',
      icon: <IoCreateOutline />,
      isActive: false,
      link: '/?create-post=true'
    },
    {
      id: 5,
      title: 'Profile',
      icon: (
        <Image
          src={!!userDetails.profile ? userDetails.profile : assets.images.DUMMY_PROFILE}
          alt="profile"
          width={20}
          height={20}
          className="rounded-full w-[20px] h-[20px]"
        />
      ),
      isActive: pathName.includes('profile'),
      link: '/profile'
    }
  ]

  return (
    <div className="">
      <div className="font-pacifico text-2xl py-4 px-8">CyberForge</div>
      <div className="mt-[30px]  flex flex-col  justify-between h-[80vh]">
        <div className="flex flex-col gap-[30px]">
          {options.map(menu => {
            return (
              <div
                key={menu.id}
                className={`flex px-8 py-2 gap-2 cursor-pointer ${
                  menu.isActive ? 'bg-[#F3F3F3]' : 'bg-white'
                } hover:bg-[#F3F3F3]`}
                onClick={() => router.push('/profile')}>
                <div className="self-center text-xl">{menu.icon}</div>
                <div className="self-center text-xl">{menu.title}</div>
              </div>
            )
          })}
        </div>
        <div className="flex px-8 py-2 gap-2 cursor-pointer hover:bg-[#F3F3F3] ">
          <div className="self-center text-xl">
            <HiOutlineLogout />
          </div>
          <div
            className="self-center text-xl"
            onClick={async () =>
              await supabase.auth.signOut().then(() => {
                router.push('/auth')
                removeCookie('auth_token')
              })
            }>
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}
export default Drawer
