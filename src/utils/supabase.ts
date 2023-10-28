import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY as string
const supabase = createClient(supabaseURL!, supabaseAnonKey!)

export default supabase
