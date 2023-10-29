import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const postApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts'],
  endpoints: builder => ({
    getPosts: builder.query({
      queryFn: async () => {
        const { data: postsData, error: PostsError } = await supabase
          .from('posts')
          .select('*, user_profiles(*)')

        const postIds = postsData?.map(post => post.id) ?? []

        const likesData = await Promise.all(
          postIds.map(async postId => {
            const { data: postLikes } = await supabase
              .from('post_likes')
              .select()
              .eq('post_id', postId)
            return { postId, likes: postLikes }
          })
        )
        const postsWithLikes = postsData?.map(post => {
          const likes = likesData.find(likeInfo => likeInfo.postId === post.id)
          return {
            ...post,
            likes: likes ? likes.likes : []
          }
        })
        if (PostsError) {
          throw toast.error(PostsError.message)
        }
        return { data: postsWithLikes ?? [] }
      },
      providesTags: ['posts']
    }),

    likePost: builder.query({
      queryFn: async data => {
        const { data: res, error } = await supabase.from('post_likes').insert(data).select()
        if (error) {
          throw toast.error(error.message)
        }
        return { data: res ?? [] }
      }
    }),
    disLikePost: builder.query({
      queryFn: async ({ userId, postId }) => {
        const { data: res, error } = await supabase
          .from('post_likes')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId)
        if (error) {
          throw toast.error(error.message)
        }
        return { data: res ?? [] }
      }
    })
  })
})

export const { useGetPostsQuery, useLazyLikePostQuery, useLazyDisLikePostQuery } = postApi
export { postApi }
