'use client'
import Drawer from '@/comp/Drawer'
import { useAppDispatch } from '@/store'
import { setAccount } from '@/store/User/user.slice'
import supabase from '@/utils/supabase'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface Props {
  children: ReactNode
}
const MainLayout = ({ children }: Props) => {
  const pathName = usePathname()
  const dispatch = useAppDispatch()
  useEffect(() => {
    supabase.auth.getUser().then(session => {
      const email = session.data.user?.email
      supabase
        .from('user_profiles')
        .select('*')
        .eq('email', email)
        .then(({ data: userData }) => {
          userData &&
            dispatch(
              setAccount({
                id: userData[0]?.id,
                userName: userData[0]?.user_name,
                firstName: userData[0]?.first_name,
                lastName: userData[0]?.last_name,
                email: userData[0]?.email,
                profile: userData[0]?.profile
              })
            )
        })
    })
  }, [])
  if (pathName.includes('auth')) return <>{children}</>
  else {
    return (
      <div className="grid grid-flow-col ">
        <div className="sticky col-span-1 h-screen border border-r-1 hidden lg:block ">
          <Drawer />
        </div>
        <div className="col-span-4 h-screen p-2">{children}</div>
      </div>
    )
  }
}

export default MainLayout
