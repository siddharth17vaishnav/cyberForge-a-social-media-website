import { CreatePosts } from './CreatePosts'
import { Logout } from './Logout'
import PostOptions from './PostOptions'

const ModalProvider = () => {
  return (
    <>
      <CreatePosts />
      <Logout />
      <PostOptions />
    </>
  )
}

export default ModalProvider
