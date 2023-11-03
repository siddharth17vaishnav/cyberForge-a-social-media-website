import BottomNavigation from '@/comp/BottomNavigation'
import Drawer from '@/comp/Drawer'
import { useAppDispatch } from '@/store'
import { setAccount } from '@/store/User/user.slice'
import supabase from '@/utils/supabase'
import { deleteCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface Props {
  children: ReactNode
}
const MainLayout = ({ children }: Props) => {
  const pathName = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    supabase.auth.getUser().then(session => {
      const email = session.data.user?.email
      supabase
        .from('user_profiles')
        .select('*')
        .eq('email', String(email))
        .then(({ data: userData }) => {
          !!userData &&
            dispatch(
              setAccount({
                id: userData[0]?.id,
                user_name: String(userData[0]?.user_name),
                first_name: String(userData[0]?.first_name),
                last_name: String(userData[0]?.last_name),
                email: String(userData[0]?.email),
                profile: String(userData[0]?.profile),
                created_at: ''
              })
            )
          if (session.error) {
            router.push('/auth')
            deleteCookie('auth_token')
          }
        })
    })
  }, [])
  if (pathName.includes('auth')) return <>{children}</>
  else {
    return (
      <div className="pb-[10px] md:pb-0">
        <div className=" md:grid grid-flow-col ">
          <div className="sticky col-span-1 h-screen border border-r-1 hidden lg:block ">
            <Drawer />
          </div>
          <div className="col-span-4 h-[91vh] p-2">{children}</div>
        </div>
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    )
  }
}

export default MainLayout
