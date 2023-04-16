'use client'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Button from '@/components/ui/Button'

export default function Page() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  async function loginWithGoogle() {
    setIsGoogleLoading(true)
    try {
      // throw new Error('does not matter')
      await signIn('google')
    }
    catch (error) {
      // display error message to user
      toast.error('Something went wrong with your login.')
    }
    finally {
      setIsGoogleLoading(false)
    }
  }

  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false)
  async function loginWithGithub() {
    try {
      setIsGithubLoading(true)
      await signIn('github')
    }
    catch (error) {
      toast.error('Something went wrong with your login')
    }
    finally {
      setIsGithubLoading(false)
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            logo
            <h2 className="mt-6 text-3xl font-bold tracking-tighter text-center text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Button
            isLoading={isGoogleLoading}
            type="button"
            className="w-full max-w-sm mx-auto text-black transition-all bg-gray-100 hover:bg-gray-200"
            onClick={loginWithGoogle}
          >
            {isGoogleLoading
              ? null
              : (
              <svg
                className="w-4 h-4 mr-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
                )}
            Google
          </Button>
          <Button
            isLoading={isGithubLoading}
            type="button"
            className="w-full max-w-sm mx-auto"
            onClick={loginWithGithub}
          >
            {isGithubLoading
              ? null
              : (
              <svg
                focusable="false"
                className="w-4 h-4 mr-2"
                data-icon="github"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
              </svg>
                )}
            Github
          </Button>
        </div>
      </div>
    </>
  )
}
