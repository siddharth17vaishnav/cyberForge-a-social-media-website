import CommentSection from './CommentSection'
import { CreatePosts } from './CreatePosts'
import { Logout } from './Logout'
import PostOptions from './PostOptions'

const ModalProvider = () => {
  return (
    <>
      <CreatePosts />
      <Logout />
      <PostOptions />
      <CommentSection />
    </>
  )
}

export default ModalProvider
