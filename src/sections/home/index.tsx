import Post from '@/comp/Post'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetPostsQuery } from '@/store/postApi'

const HomeSection = () => {
  const { data } = useGetPostsQuery(undefined)
  return (
    <ScrollArea className="h-[99vh] w-full max-w-[80%] rounded-md p-4">
      <div className=" mx-auto pt-12 pb-10">
        {data
          ? data.map(posts => {
              return <Post key={posts.id} post={posts} />
            })
          : null}
      </div>
    </ScrollArea>
  )
}

export default HomeSection
