import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const postApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts', 'comments'],
  endpoints: builder => ({
    getPosts: builder.query({
      queryFn: async () => {
        const { data } = await supabase.rpc('get_posts' as never)
        return { data: data ?? [] }
      },
      providesTags: ['posts']
    }),

    getPostByUserid: builder.query({
      queryFn: async id => {
        const { data, error } = await supabase
          .from('posts')
          .select('*, user_profiles(*)')
          .eq('user_id', id)
          .order('created_at', { ascending: false })
        if (error) throw toast.error(error.message)
        return { data }
      }
    }),
    deletePost: builder.mutation({
      queryFn: async ({ id, image }) => {
        await supabase.storage.from('posts').remove([`public/${image}`])
        const { data, error } = await supabase.from('posts').delete().eq('id', id)
        if (error) {
          throw toast.error(error.message)
        }
        return { data: data ?? [] }
      }
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
  useDeleteCommentMutation,
  useLazyGetPostByUseridQuery,
  useDeletePostMutation
} = postApi
export { postApi }
