import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'
import { authOptions } from '@/lib/auth'
import { fetchRedis } from '@/helpers/redis'
import FriendRequests from '@/components/FriendRequests'

export default async function page() {
  const session = await getServerSession(authOptions)
  if (!session)
    notFound()

  // ids of people who sent current logged in user a friend requests
  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`,
  )) as string[]

  const incomingFriendRequests = await Promise.all(incomingSenderIds.map(async (senderId) => {
    const sender = await fetchRedis('get', `user:${senderId}`) as string
    const senderParsed = JSON.parse(sender)
    return { senderId, senderEmail: senderParsed.email }
  }))

  return <main className='pt-8'>
    <h1 className='mb-8 text-5xl font-bold'></h1>
    <div className='flex flex-col gap-4'>
      <FriendRequests incomingFriendRequests={incomingFriendRequests} sessionId={session.user.id} />
    </div>
  </main>
}
