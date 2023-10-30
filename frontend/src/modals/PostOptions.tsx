import Modal from '@/comp/Modal'
import { Separator } from '@/components/ui/separator'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { postApi, useDeletePostMutation, useLazyGetPostByUseridQuery } from '@/store/postApi'
import { useStateSelector } from '@/store/root.reducer'
import React, { useEffect, useState } from 'react'

const PostOptions = () => {
  const dispatch = useAppDispatch()
  const [deletePost] = useDeletePostMutation()
  const { id } = useStateSelector(state => state.userSlice)
  const { postOptions } = useStateSelector(state => state.modalsSlice)
  const onClose = () => dispatch(setModals({ postOptions: { id: 0, value: false } }))
  const [getPostById] = useLazyGetPostByUseridQuery()
  const [data, setData] = useState<{ id: number; image: string }[]>([])

  useEffect(() => {
    if (id)
      getPostById(id).then(res => {
        setData(res.data as any)
      })
  }, [])
  const postIds = data?.map(i => i.id) ?? []

  const handleDeletePost = () => {
    const image = data?.find(i => i.id === postOptions.id)?.image
    deletePost({ id: postOptions.id, image: image?.split('posts/public/')[1] })
    dispatch(postApi.util.invalidateTags(['posts']))
    onClose()
  }

  const options = [
    {
      id: 0,
      label: 'Delete post',
      onclick: handleDeletePost,
      color: 'red',
      isVisible: postIds.includes(postOptions.id)
    },
    {
      id: 1,
      label: 'Unfollow',
      onclick: () => null,
      color: 'red',
      isVisible: true
    },
    {
      id: 2,
      label: 'Go to post',
      onclick: () => null,
      color: 'black',
      isVisible: true
    },
    {
      id: 3,
      label: 'Share',
      onclick: () => null,
      color: 'black',
      isVisible: true
    },
    {
      id: 4,
      label: 'Copy link',
      onclick: () => null,
      color: 'black',
      isVisible: true
    },
    {
      id: 5,
      label: 'Go to profile',
      onclick: () => null,
      color: 'black',
      isVisible: true
    },
    {
      id: 6,
      label: 'Cancel',
      onclick: () => onClose(),
      color: 'black',
      isVisible: true
    }
  ]
  return (
    <Modal hideclose removePadding isOpen={postOptions.value} onClose={onClose}>
      <div className="w-full flex flex-col  ">
        {options.map((option, index) => {
          return (
            <div key={option.id}>
              {option.isVisible && (
                <>
                  <div
                    style={{ color: option.color }}
                    className="w-full [text-align-last:center] text-md  cursor-pointer hover:bg-stone-200 py-4"
                    onClick={option.onclick}>
                    {option.label}
                  </div>
                  {index !== options.length - 1 && <Separator />}
                </>
              )}
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

export default PostOptions
