import supabase from '@/utils/supabase'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  image: File
  data: {
    user_id: number
    description: string
  }
}
const useCreatePost = () => {
  const [loading, setLoading] = useState(false)

  const addPost = async ({ image, data }: Props) => {
    setLoading(true)
    try {
      const storageResponse = await supabase.storage
        .from('posts')
        .upload(`public/${data.user_id}/${image?.name}`, image, {
          cacheControl: '3600',
          upsert: false
        })

      const insertedData = await supabase
        .from('posts')
        .insert({
          ...data,
          image:
            `https://bsluzuktmnydpxshkbxl.supabase.co/storage/v1/object/public/posts/${storageResponse?.data?.path}` ??
            null
        })
        .then(() => toast.success('Post Created'))

      setLoading(false)
      return insertedData
    } catch (error) {
      setLoading(false)
      // Handle error here if needed
      return null
    }
  }

  return { addPost, loading }
}
export default useCreatePost
