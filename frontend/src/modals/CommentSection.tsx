import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import Loader from '@/comp/Loader'
import Modal from '@/comp/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import {
  postApi,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery
} from '@/store/postApi'
import { useStateSelector } from '@/store/root.reducer'
import { ReloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { useState } from 'react'

const CommentSection = () => {
  const [addComment, { isLoading: isCommentSending }] = useAddCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [comment, setComment] = useState('')
  const {
    commentSection: { id: postId, value }
  } = useStateSelector(state => state.modalsSlice)
  const { id: userId } = useStateSelector(state => state.userSlice)
  const onClose = () => dispatch(setModals({ commentSection: { id: 0, value: false } }))
  const { data, isLoading, isFetching, refetch } = useGetCommentsQuery({ postId })

  const handleOnEnter = (text?: string) => {
    const data = {
      user_id: userId,
      post_id: postId,
      comment: text ?? comment
    }
    addComment(data)
    setTimeout(() => {
      dispatch(postApi.util.invalidateTags(['comments']))
      refetch()
      setComment('')
    }, 1000)
  }
  const loading = isLoading || isFetching

  const handleDeleteComment = (id: number) => {
    deleteComment(id)
    setTimeout(() => {
      dispatch(postApi.util.invalidateTags(['comments']))
      refetch()
    }, 1000)
  }
  return (
    <Modal title="Comments" isOpen={value} onClose={onClose}>
      <div className="flex flex-col gap-3 mt-4">
        <ScrollArea className="h-72 w-full relative">
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="w-full h-72">
                <Loader />
              </div>
            ) : data && data.length > 0 ? (
              Array.from(data).map(comment => {
                const user = comment.user ? comment.user[0] : null
                return (
                  <div className="flex gap-3" key={comment.id}>
                    <Image
                      src={
                        !invalidImageValues.includes(user!.profile as string)
                          ? (user!.profile as string)
                          : assets.images.DUMMY_PROFILE
                      }
                      alt="post-user-image"
                      width={50}
                      height={50}
                      className="rounded-full w-[50px] h-[50px]"
                    />
                    <div>
                      <p className="font-semibold">{user?.user_name}</p>
                      <p>{comment.comment}</p>
                      {userId === comment.user_id && (
                        <p
                          className="text-[11px] cursor-pointer hover:underline"
                          onClick={() => handleDeleteComment(comment.id)}>
                          Delete
                        </p>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  ">
                No Comments Yet
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            placeholder="Write a comment"
            onKeyDown={e => e.key === 'Enter' && handleOnEnter()}
            onChange={e => setComment(e.target.value)}
          />
          <Button>
            {isCommentSending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}Send
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CommentSection
