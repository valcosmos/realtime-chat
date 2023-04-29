'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { chatHrefConstructor } from '@/lib/utils'

interface SidebarChatListProps {
  friends: User[]
  sessionId: string
}

export default function SidebarChatList({ friends, sessionId }: SidebarChatListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [unseenMessages, setUnseenMessages] = useState<Message[]>()

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev?.filter(msg => !pathname.includes(msg.senderId))
      })
    }
  }, [pathname])

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages?.filter(unseenMsg => unseenMsg.senderId === friend.id).length
        return (
          <li key={friend.id}>
            <a href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`}>{friend.name} {unseenMessagesCount > 0 ? <div className='flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-indigo-600 rounded-full'>{ unseenMessagesCount}</div> : null }</a>
          </li>
        )
      })}
    </ul>
  )
}
