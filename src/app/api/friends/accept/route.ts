import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { HttpStatusCode } from 'axios'
import { authOptions } from '@/lib/auth'
import { fetchRedis } from '@/helpers/redis'

export async function POST(req: Request) {
  try {
    const body = req.json()
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body)
    const session = await getServerSession(authOptions)

    if (!session)
      return new Response('Unauthorized', { status: HttpStatusCode.Unauthorized })
    // verify both users are not already friends
    const isAlreadyFriends = await fetchRedis('sismember', `user:${session.user.id}:friends`)
    if (isAlreadyFriends)
      return new Response('Already friends', { status: HttpStatusCode.BadRequest })
    const hasFriendRequest = await fetchRedis('sismember', `user:${session.user.id}:incoming_friend_requests`, idToAdd)

    console.log(hasFriendRequest)
  }

  catch (error) {

  }
}
