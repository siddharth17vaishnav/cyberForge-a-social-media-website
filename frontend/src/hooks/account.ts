'use client'
import supabase from '@/utils/supabase'

const useFetchUserDetails = async () => {
  await supabase.auth.getSession()
}

export { useFetchUserDetails }
