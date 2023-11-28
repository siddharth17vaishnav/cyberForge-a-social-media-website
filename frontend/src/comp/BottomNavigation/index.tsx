import assets from '@/assets'
import Image from 'next/image'
import { BiHomeAlt2, BiSearchAlt2, BiMessageDetail } from 'react-icons/bi'
import CustomTooltip from '../Tooltip'
import { usePathname, useRouter } from 'next/navigation'
import { setModals } from '@/store/Modals/modals.slice'
import { dispatch } from '@/store'
const BottomNavigation = () => {
  const router = useRouter()
  const pathName = usePathname()
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
      isActive: pathName?.includes('search'),
      onClick: () => router.replace('/search')
    },
    {
      id: 3,
      title: 'Create New Post',
      icon: <></>,
      isActive: false,
      onClick: () => dispatch(setModals({ createPost: true }))
    },
    {
      id: 4,
      title: 'Messages',
      icon: <BiMessageDetail />,
      isActive: pathName?.includes('messages'),
      onClick: () => router.replace('/messages')
    },
    {
      id: 5,
      title: 'Profile',
      icon: (
        <Image
          src={assets.images.DUMMY_PROFILE}
          alt="profile"
          width={20}
          height={20}
          className="rounded-full w-[20px] h-[20px]"
        />
      ),
      isActive: pathName?.includes('profile'),
      onClick: () => router.replace('/profile')
    }
  ]
  return (
    <div>
      <div
        className="fixed z-50 lg:w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
        style={{ width: 'calc(100% - 20px)' }}>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {options.map(option => (
            <CustomTooltip title="Home" key={option.id}>
              <button
                data-tooltip-target="tooltip-home"
                type="button"
                onClick={option.onClick}
                className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                {option.id === 3 ? (
                  <div className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                    <svg
                      className="w-4 h-4 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </div>
                ) : (
                  option.icon
                )}
              </button>
            </CustomTooltip>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation
