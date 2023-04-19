import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { HttpStatusCode } from 'axios'
import { authOptions } from '@/lib/auth'
import { fetchRedis } from '@/helpers/redis'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body)
    const session = await getServerSession(authOptions)

    if (!session)
      return new Response('Unauthorized', { status: HttpStatusCode.Unauthorized })
    // verify both users are not already friends
    const isAlreadyFriends = await fetchRedis('sismember', `user:${session.user.id}:friends`, idToAdd)
    if (isAlreadyFriends)
      return new Response('Already friends', { status: HttpStatusCode.BadRequest })

    const hasFriendRequest = await fetchRedis('sismember', `user:${session.user.id}:incoming_friend_requests`, idToAdd)
    if (!hasFriendRequest)
      return new Response('No friend request', { status: HttpStatusCode.BadRequest })

    await db.sadd(`user:${session.user.id}:friends`, idToAdd)

    await db.sadd(`user:${idToAdd}:friend`, session.user.id)

    // await db.srem(`user:${idToAdd}:outbound_friend_requests`, session.user.id)
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd)

    return new Response('ok')
  }

  catch (error) {
    // console.log('===>', error)
    if (error instanceof z.ZodError)
      return new Response('Invalid request payload', { status: HttpStatusCode.UnprocessableEntity })

    return new Response('Invalid request', { status: HttpStatusCode.BadRequest })
  }
}
