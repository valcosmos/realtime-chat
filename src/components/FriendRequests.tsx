'use client'

import { Check, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Button from './ui/Button'

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

export default function FriendRequests({ incomingFriendRequests, sessionId }: FriendRequestsProps) {
  const router = useRouter()

  const [friendRequests, setFriendRequests]
    = useState<IncomingFriendRequest[]>(incomingFriendRequests)

  const acceptFriend = async (senderId: string) => {
    await axios.post('/api/friends/accept', { id: senderId })
    setFriendRequests(prev => prev.filter(request => request.senderId !== senderId))
    router.refresh()
  }

  const denyFriend = async (senderId: string) => {
    await axios.post('/api/requests/deny', { id: senderId })
    setFriendRequests(prev => prev.filter(request => request.senderId !== senderId))
    router.refresh()
  }

  return (
    <>
      {friendRequests.length === 0
        ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
          )
        : (
            friendRequests.map(request => (
          <div key={request.senderId} className="flex items-center gap-4">
            <UserPlus className="text-black" />
            <p className="text-lg font-medium">{request.senderEmail}</p>
            <Button
              onClick={() => acceptFriend(request.senderId)}
              area-aria-label="accept friend"
              className="grid w-8 h-8 transition bg-indigo-600 rounded-full hover:bg-indigo-700 place-items-center hover:shadow-md"
            >
              <Check className="font-semibold text-white w-/4 h-3/4" />
            </Button>
            <Button
              onClick={() => denyFriend(request.senderId)}
              area-aria-label="deny friend"
              className="grid w-8 h-8 transition bg-red-600 rounded-full hover:bg-red-700 place-items-center hover:shadow-md"
            >
              <X className="font-semibold text-white w-/4 h-3/4" />
            </Button>
          </div>
            ))
          )}
    </>
  )
}
