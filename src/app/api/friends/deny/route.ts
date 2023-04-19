import { getServerSession } from 'next-auth'
import { HttpStatusCode } from 'axios'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getServerSession(authOptions)

    if (!session)
      return new Response('Unauthorized', { status: HttpStatusCode.Unauthorized })

    const { id: idToDeny } = z.object({ id: z.string() }).parse(body)

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny)

    return new Response('OK')
  }
  catch (error) {
    // console.log('===>', error)
    if (error instanceof z.ZodError)
      return new Response('Invalid request payload', { status: HttpStatusCode.UnprocessableEntity })

    return new Response('Invalid request', { status: HttpStatusCode.BadRequest })
  }
}
