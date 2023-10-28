import Modal from '@/comp/Modal'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { RootReduxState } from '@/store/redux.types'
import { removeCookie } from '@/utils/cokkies'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

export const Logout = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isOpen = useSelector((state: RootReduxState) => state.modalsSlice.logout)
  const onClose = () => {
    dispatch(setModals({ logout: false }))
  }
  const handleLogout = async () => {
    await supabase.auth.signOut().then(() => {
      router.push('/auth')
      removeCookie('auth_token')
      dispatch(setModals({ logout: false }))
      dispatch({ type: 'reset' })
    })
  }
  return (
    <Modal title="Are you sure want to logout?" isOpen={isOpen} onClose={onClose}>
      <div className="  ">
        <div className="flex gap-4 mt-4 mx-auto w-full justify-center">
          <Button onClick={handleLogout}>Logout</Button>
          <Button variant={'destructive'} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
