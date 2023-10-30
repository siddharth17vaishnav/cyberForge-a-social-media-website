import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const postApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts', 'comments'],
  endpoints: builder => ({
    getPosts: builder.query({
      queryFn: async () => {
        const { data: postsData, error: PostsError } = await supabase
          .from('posts')
          .select('*, user_profiles(*)')
          .order('created_at', { ascending: false })

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
    }),
    getComments: builder.query({
      queryFn: async ({ postId }) => {
        const { data, error } = await supabase.from('post_comments').select().eq('post_id', postId)
        const response =
          data &&
          (await Promise.all(
            data?.map(async item => {
              const { data: user } = await supabase
                .from('user_profiles')
                .select()
                .eq('id', item.user_id)
              return { ...item, user: user }
            })
          ))
        if (error) throw toast.error(error.message)

        return { data: response ?? [] }
      },
      providesTags: ['comments']
    }),
    addComment: builder.mutation({
      queryFn: async data => {
        const { data: res, error } = await supabase.from('post_comments').insert(data).select()
        if (error) {
          throw toast.error(error.message)
        }
        return { data: res ?? [] }
      },
      invalidatesTags: ['comments']
    }),
    deleteComment: builder.mutation({
      queryFn: async commentId => {
        const { data: res, error } = await supabase
          .from('post_comments')
          .delete()
          .eq('id', commentId)
        if (error) {
          throw toast.error(error.message)
        }
        return { data: res ?? [] }
      },
      invalidatesTags: ['comments']
    })
  })
})

export const {
  useGetPostsQuery,
  useLazyLikePostQuery,
  useLazyDisLikePostQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation
} = postApi
export { postApi }
