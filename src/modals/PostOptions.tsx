import Modal from '@/comp/Modal'
import { Separator } from '@/components/ui/separator'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useStateSelector } from '@/store/root.reducer'
import React from 'react'

const PostOptions = () => {
  const dispatch = useAppDispatch()
  const { postOptions } = useStateSelector(state => state.modalsSlice)
  const onClose = () => dispatch(setModals({ postOptions: { id: 0, value: false } }))

  const options = [
    {
      id: 1,
      label: 'Unfollow',
      onclick: () => null
    },
    {
      id: 2,
      label: 'Go to post',
      onclick: () => null
    },
    {
      id: 3,
      label: 'Share',
      onclick: () => null
    },
    {
      id: 4,
      label: 'Copy link',
      onclick: () => null
    },
    {
      id: 5,
      label: 'Go to profile',
      onclick: () => null
    },
    {
      id: 6,
      label: 'Cancel',
      onclick: () => onClose()
    }
  ]
  return (
    <Modal hideclose removePadding isOpen={postOptions.value} onClose={onClose}>
      <div className="w-full flex flex-col  ">
        {options.map((option, index) => {
          return (
            <>
              <div
                key={option.id}
                className="w-full [text-align-last:center] text-md text-black cursor-pointer hover:bg-stone-200 py-4"
                onClick={option.onclick}>
                {option.label}
              </div>
              {index !== options.length - 1 && <Separator />}
            </>
          )
        })}
      </div>
    </Modal>
  )
}

export default PostOptions
