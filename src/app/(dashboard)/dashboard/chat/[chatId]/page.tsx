import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { fetchRedis } from '@/helpers/redis'
import { messageValidator } from '@/lib/validations/message'

interface PageProps {
  params: {
    chatId: string
  }
}

async function getChatMessages(chatId: string) {
  try {
    const result: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1)
    const dbMessages = result.map(message => JSON.parse(message) as Message)
    const reverseDbMessages = dbMessages.reverse()
    const messages = messageValidator.parse(reverseDbMessages)
    return messages
  }
  catch (error) {
    notFound()
  }
}

export default async function page({ params }: PageProps) {
  const { chatId } = params

  const session = await getServerSession(authOptions)

  if (!session)
    notFound()

  const { user } = session

  const [userId1, userId2] = chatId.split('--')

  if (user.id !== userId1 && user.id !== userId2)
    notFound()

  const chatPartnerId = user.id === userId1 ? userId2 : userId1

  const chatPartner = await db.get(`user:${chatPartnerId}`) as User

  const initialMessages = await getChatMessages(chatId)

  return <div>{params.chatId}</div>
}
