import Modal from '@/comp/Modal'
import Post, { PostProps } from '@/comp/Post'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetPostByIdQuery } from '@/store/postApi'
import { useStateSelector } from '@/store/root.reducer'

const ViewPostModal = () => {
  const dispatch = useAppDispatch()
  const {
    viewPost: { id, value }
  } = useStateSelector(state => state.modalsSlice)

  const { data } = useGetPostByIdQuery(id)
  return (
    <Modal isOpen={value} onClose={() => dispatch(setModals({ viewPost: false }))}>
      {data && data![0] && <Post fullWidth post={data[0] as unknown as PostProps} />}
    </Modal>
  )
}

export default ViewPostModal
