import AutocompleteField from '@/comp/AutocompleteField'
import Loader from '@/comp/Loader'
import Modal from '@/comp/Modal'
import { Button } from '@/components/ui/button'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetAllUsersQuery } from '@/store/UserApi'
import {
  useCreateConversationMutation,
  useLazyFetchConversationListQuery
} from '@/store/conversationApi'
import { useStateSelector } from '@/store/root.reducer'
import { TransformAutocompleteFieldOptions } from '@/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const StartConversation = () => {
  const [ids, setIds] = useState<number[]>([])
  const [value, setValue] = useState({ id: 0, value: '' })
  const { startConversation } = useStateSelector(state => state.modalsSlice)
  const { id } = useStateSelector(state => state.userSlice)
  const [createConversation] = useCreateConversationMutation()
  const [fetchConversations, { isLoading, isFetching }] = useLazyFetchConversationListQuery()
  const usefetchConversations = (id: number) => {
    fetchConversations(id).then(conversations => {
      const result = conversations?.data?.filter(i => i.user_id !== id)
      const ids = result?.map(i => i.user_id) as number[]
      setIds(ids)
    })
  }
  const handleClose = () => {
    dispatch(setModals({ startConversation: false }))
  }
  const { data } = useGetAllUsersQuery(undefined)
  const router = useRouter()
  const handleStartConversation = () => {
    createConversation({ userId: id, id: value.id }).then(res => {
      handleClose()
      router.push(`/messages/${(res as any)?.data[0].id}`)
    })
  }
  useEffect(() => {
    if (id) usefetchConversations(id)
  }, [id])
  return (
    <Modal isOpen={startConversation} onClose={handleClose}>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div>
          <h3 className="text-lg font-semibold">Start Conversation</h3>
          <div className="mt-4 flex gap-2">
            <AutocompleteField
              value={value.value}
              onChange={e => setValue(e)}
              options={TransformAutocompleteFieldOptions(data?.filter(i => !ids?.includes(i.id)))}
            />
            <Button className=" " onClick={handleStartConversation}>
              Start{' '}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default StartConversation
