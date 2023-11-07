import CommentSection from './CommentSection'
import { CreatePosts } from './CreatePosts'
import { Logout } from './Logout'
import PostOptions from './PostOptions'
import ViewPostModal from './ViewPost'

const ModalProvider = () => {
  return (
    <>
      <CreatePosts />
      <Logout />
      <PostOptions />
      <CommentSection />
      <ViewPostModal />
    </>
  )
}

export default ModalProvider
