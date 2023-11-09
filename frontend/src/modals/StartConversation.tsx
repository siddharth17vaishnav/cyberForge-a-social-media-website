import AutocompleteField from '@/comp/AutocompleteField'
import Modal from '@/comp/Modal'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetAllUsersQuery } from '@/store/UserApi'
import { useStateSelector } from '@/store/root.reducer'
import { TransformAutocompleteFieldOptions } from '@/utils'
import React from 'react'

const StartConversation = () => {
  const dispatch = useAppDispatch()
  const { startConversation } = useStateSelector(state => state.modalsSlice)
  const handleClose = () => {
    dispatch(setModals({ startConversation: false }))
  }
  const { data } = useGetAllUsersQuery(undefined)
  return (
    <Modal isOpen={startConversation} onClose={handleClose}>
      <div>
        <h3 className="text-lg font-semibold">Start Conversation</h3>
        <div className="mt-4 flex gap-2">
          <AutocompleteField options={TransformAutocompleteFieldOptions(data)} />
          <Button className=" ">Start </Button>
        </div>
      </div>
    </Modal>
  )
}

export default StartConversation
