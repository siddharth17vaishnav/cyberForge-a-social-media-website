import AutocompleteField from '@/comp/AutocompleteField'
import Modal from '@/comp/Modal'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetAllUsersQuery } from '@/store/UserApi'
import { useCreateConversationMutation } from '@/store/conversationApi'
import { useStateSelector } from '@/store/root.reducer'
import { TransformAutocompleteFieldOptions } from '@/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const StartConversation = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState({ id: 0, value: '' })
  const { startConversation } = useStateSelector(state => state.modalsSlice)
  const { id } = useStateSelector(state => state.userSlice)
  const [createConversation] = useCreateConversationMutation()
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
  return (
    <Modal isOpen={startConversation} onClose={handleClose}>
      <div>
        <h3 className="text-lg font-semibold">Start Conversation</h3>
        <div className="mt-4 flex gap-2">
          <AutocompleteField
            value={value.value}
            onChange={e => setValue(e)}
            options={TransformAutocompleteFieldOptions(data)}
          />
          <Button className=" " onClick={handleStartConversation}>
            Start{' '}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default StartConversation
