'use client'

import type { ButtonHTMLAttributes } from 'react'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Loader2, LogOut } from 'lucide-react'
import Button from './ui/Button'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function SignOutButton({ ...props }: SignOutButtonProps) {
  const [isSignOut, setIsSignOut] = useState<boolean>(false)

  return (
    <Button {...props} variant={'ghost'} onClick={async () => {
      setIsSignOut(true)
      try {
        await signOut({ callbackUrl: '/login' })
      }
      catch (error) {
        toast.error('There was a problem signing out')
      }
      finally {
        setIsSignOut(false)
      }
    }}>{ isSignOut ? <Loader2 className='w-4 h-4 animate-spin'/> : <LogOut className='w-4 h-4'/>}</Button>
  )
}
