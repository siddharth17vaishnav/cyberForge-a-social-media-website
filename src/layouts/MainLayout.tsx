'use client'
import Drawer from '@/comp/Drawer'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const MainLayout = ({ children }: Props) => {
  const pathName = usePathname()
  if (pathName.includes('auth')) return <>{children}</>
  else
    return (
      <div className="grid grid-flow-col ">
        <div className="col-span-1 h-screen border border-r-1 ">
          <Drawer />
        </div>
        <div className="col-span-4 h-screen p-2">{children}</div>
      </div>
    )
}

export default MainLayout
