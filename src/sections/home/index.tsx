import useFetchPosts from '@/api/post/useFetchPosts'
import Post from '@/comp/Post'
import { ScrollArea } from '@/components/ui/scroll-area'

const HomeSection = () => {
  const { data } = useFetchPosts()
  return (
    <ScrollArea className="h-[99vh] w-full max-w-[80%] rounded-md p-4">
      <div className=" mx-auto pt-12 pb-10">
        {data.map(posts => {
          return <Post key={posts.id} post={posts} />
        })}
      </div>
    </ScrollArea>
  )
}

export default HomeSection
