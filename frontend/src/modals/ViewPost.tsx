import Loader from '@/comp/Loader'
import Modal from '@/comp/Modal'
import Post, { PostProps } from '@/comp/Post'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetPostByIdQuery } from '@/store/postApi'
import { useStateSelector } from '@/store/root.reducer'

const ViewPostModal = () => {
  const {
    viewPost: { id, value }
  } = useStateSelector(state => state.modalsSlice)

  const { data, isLoading, isFetching } = useGetPostByIdQuery(id)
  return (
    <Modal isOpen={value} onClose={() => dispatch(setModals({ viewPost: false }))}>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        data && data![0] && <Post fullWidth post={data[0] as unknown as PostProps} />
      )}
    </Modal>
  )
}

export default ViewPostModal
