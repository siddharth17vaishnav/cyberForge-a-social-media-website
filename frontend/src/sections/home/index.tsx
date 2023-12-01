import Loader from '@/comp/Loader'
import Post, { PostProps } from '@/comp/Post'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetPostsQuery } from '@/store/postApi'

const HomeSection = () => {
  const { data: postData, isLoading } = useGetPostsQuery(undefined)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollArea className="h-[99vh] w-full rounded-md p-4">
          <div className=" mx-auto  pb-10">
            {postData && postData.length > 0 ? (
              Array.from(postData).map(res => {
                const posts = res as PostProps
                return <Post key={posts.id} post={posts} />
              })
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                No Posts found,&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => dispatch(setModals({ createPost: true }))}>
                  Add some
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </>
  )
}

export default HomeSection
