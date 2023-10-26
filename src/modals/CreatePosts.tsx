import Modal from '@/comp/Modal'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { RootReduxState } from '@/store/redux.types'
import React from 'react'
import { useSelector } from 'react-redux'

export const CreatePosts = () => {
  const dispatch = useAppDispatch()
  const { createPost } = useSelector((state: RootReduxState) => state.modalsSlice)

  return (
    <Modal isOpen={createPost} onClose={() => dispatch(setModals({ createPost: false }))}>
      HELLO
    </Modal>
  )
}
