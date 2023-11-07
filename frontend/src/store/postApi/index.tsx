import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const postApi = createApi({
  reducerPath: '/posts',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts', 'comments'],
  endpoints: builder => ({
    getPosts: builder.query({
      queryFn: async () => {
        const { data } = await supabase.rpc('get_posts')
        return { data: data ?? [] }
      },
      providesTags: ['posts']
    }),

    getPostById: builder.query({
      queryFn: async id => {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id)
        const { data: likesData } = await supabase.from('post_likes').select('*').eq('post_id', id)
        const { data: userData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data![0].user_id)
        if (error) toast.error(error.message)
        const resposne = { ...data![0], likes: likesData || [], user_profiles: userData![0] || {} }
        return { data: resposne || {} }
      }
    }),

    getPostByUserid: builder.query({
      queryFn: async id => {
        const { data: postsData, error: PostsError } = await supabase
          .from('posts')
          .select('*, user_profiles(*)')
          .eq('user_id', id)
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
        const commentData = await Promise.all(
          postIds.map(async postId => {
            const { data: postComments } = await supabase
              .from('post_comments')
              .select()
              .eq('post_id', postId)
            return { postId, comments: postComments }
          })
        )
        const postsWithLikes = postsData?.map(post => {
          const likes = likesData.find(likeInfo => likeInfo.postId === post.id)
          const comments = commentData.find(comment => comment.postId === post.id)
          return {
            ...post,
            likes: likes ? likes.likes : [],
            comments: comments ? comments.comments : []
          }
        })
        if (PostsError) {
          throw toast.error(PostsError.message)
        }
        return { data: postsWithLikes ?? [] }
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
  useGetPostByUseridQuery,
  useLazyGetPostByUseridQuery,
  useDeletePostMutation,
  useGetPostByIdQuery
} = postApi
export { postApi }
