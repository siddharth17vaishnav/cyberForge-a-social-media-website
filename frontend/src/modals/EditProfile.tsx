import Loader from '@/comp/Loader'
import Modal from '@/comp/Modal'
import EditProfileForm from '@/forms/profile/EditProfile'
import { ProfileDataProps } from '@/sections/profile'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useLazyUserByIdQuery } from '@/store/UserApi'
import { useStateSelector } from '@/store/root.reducer'
import React, { useEffect, useState } from 'react'

const EditProfile = () => {
  const { editProfile } = useStateSelector(state => state.modalsSlice)
  const { id } = useStateSelector(state => state.userSlice)
  const [data, setData] = useState<ProfileDataProps>()
  const [getUser, { isLoading, isFetching }] = useLazyUserByIdQuery()

  useEffect(() => {
    if (id) {
      getUser(id).then(({ data }) => {
        const res = data as unknown as ProfileDataProps
        setData(res)
      })
    }
  }, [id])
  return (
    <Modal isOpen={editProfile} onClose={() => dispatch(setModals({ editProfile: false }))}>
      <div>{isLoading || isFetching ? <Loader /> : <EditProfileForm data={data} />}</div>
    </Modal>
  )
}

export default EditProfile
