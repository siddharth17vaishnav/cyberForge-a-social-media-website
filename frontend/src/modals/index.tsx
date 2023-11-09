import { useStateSelector } from '@/store/root.reducer'
import CommentSection from './CommentSection'
import { CreatePosts } from './CreatePosts'
import { Logout } from './Logout'
import PostOptions from './PostOptions'
import ViewPostModal from './ViewPost'
import EditProfile from './EditProfile'
import StartConversation from './StartConversation'

const ModalProvider = () => {
  const {
    commentSection,
    createPost,
    logout,
    postOptions,
    viewPost,
    editProfile,
    startConversation
  } = useStateSelector(state => state.modalsSlice)
  return (
    <>
      {createPost && <CreatePosts />}
      {logout && <Logout />}
      {postOptions.value && <PostOptions />}
      {commentSection.value && <CommentSection />}
      {viewPost.value && <ViewPostModal />}
      {editProfile && <EditProfile />}
      {startConversation && <StartConversation />}
    </>
  )
}

export default ModalProvider
