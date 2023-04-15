'use client'

import type { ReactNode } from 'react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      { children }
    </>
  )
}
