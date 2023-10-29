import Loader from '@/comp/Loader'
import Post, { PostProps } from '@/comp/Post'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetPostsQuery } from '@/store/postApi'

const HomeSection = () => {
  const { data: postData, isLoading } = useGetPostsQuery(undefined)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollArea className="h-[99vh] w-full rounded-md p-4">
          <div className=" mx-auto pt-12 pb-10">
            {postData
              ? Array.from(postData).map(res => {
                  const posts = res as PostProps
                  return <Post key={posts.id} post={posts} />
                })
              : null}
          </div>
        </ScrollArea>
      )}
    </>
  )
}

export default HomeSection
