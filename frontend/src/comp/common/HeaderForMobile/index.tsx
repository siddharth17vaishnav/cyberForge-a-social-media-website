import { useRouter } from 'next/navigation'
import { IoNotificationsCircleSharp } from 'react-icons/io5'
const HeaderForMobile = () => {
    const { push } = useRouter()
    return (
        <div className="flex justify-between lg:hidden px-8">
            <div className="font-pacifico text-2xl py-4 ">CyberForge</div>
            <div className='self-center cursor-pointer' onClick={() => push('/notifications')}>
                <IoNotificationsCircleSharp fontSize={26} />
            </div>
        </div>
    )
}

export default HeaderForMobile