import { supabase } from '@/services/Supebase'
import { userAtom } from '@/store'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useUser = () => {
  const supabaseUser = supabase.auth.user()
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    if (!supabaseUser) {
      setUser(null)
      return
    }
    setUser({
      id: supabaseUser.id,
      email: supabaseUser.email as string,
      name: supabaseUser.user_metadata.name
    })
  }, [supabaseUser])

  if (!user) return null

  return user
}

export default useUser
