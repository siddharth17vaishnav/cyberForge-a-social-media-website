import { fetchCookie } from '@/utils/cokkies'
import supabase from '@/utils/supabase'
import { useEffect } from 'react'

const useHandleLoggedInStatus = () => {
  const id = fetchCookie('id')

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        await supabase.from('user_profiles').update({ is_logged_in: false }).eq('id', Number(id))
      } else {
        await supabase.from('user_profiles').update({ is_logged_in: true }).eq('id', Number(id))
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [id])
  return null
}

export default useHandleLoggedInStatus
