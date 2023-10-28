import supabase from '@/utils/supabase'
import { useEffect, useState } from 'react'

export interface PostProps {
  created_at: string
  description: string
  id: number
  image: string
  user_id: number
}

const useFetchPosts = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PostProps[]>([])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const { data } = await supabase.from('posts').select()
      setLoading(false)
      setData(data as PostProps[])
    } catch (error) {
      setLoading(false)
      return null
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  const refetch = () => {
    fetchPosts()
  }

  return { data, loading, refetch }
}
export default useFetchPosts
