import { getServerSession } from 'next-auth'
import type { ReactNode } from 'react'
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { authOptions } from '@/lib/auth'
import type { Icon } from '@/components/Icons'
import { Icons } from '@/components/Icons'
import SignOutButton from '@/components/SignOutButton'
import FriendRequestSidebarOptions from '@/components/FriendRequestSidebarOptions'
import { fetchRedis } from '@/helpers/redis'

interface LayoutProps {
  children: ReactNode
}

interface SidebarOptions {
  id: number
  name: string
  href: string
  Icon: Icon
}
const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: 'Add friend',
    href: '/dashboard/add',
    Icon: 'UserPlus',
  },
]

export default async function layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions)
  if (!session)
    notFound()
  const unseenRequestCount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-full h-full max-w-xs px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
        <Link href={'/dashboard'} className="flex items-center h-16 shrink-0">
          <Icons.Logo className="w-auto h-8 text-indigo-600" />
        </Link>

        <div className="font-semibold leading-6 text-gray-400 text-sx">Your chats</div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>{/* chats that this user has */}</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">Overview</div>
              <ul role="list" className="mt-2 -mx-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon]
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="flex gap-3 p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group"
                      >
                        <span className="flex items-center justify-center w-6 h-6 text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 shrink-0 rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            <li>
              <FriendRequestSidebarOptions sessionId={session.user.id} initialUnseenRequestCount={unseenRequestCount}/>
            </li>
            <li className="flex items-center mt-auto -mx-6">
              <div className="flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4">
                <div className="relative w-8 h-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ''}
                    alt="Your profile picture"
                  />
                </div>
                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col">
                  <span area-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden>
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className='h-full aspect-square' />
            </li>
          </ul>
        </nav>
      </div>

      {children}
    </div>
  )
}
