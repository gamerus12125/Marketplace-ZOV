"use server"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await cookies().get('next-auth.session-token')
    if (!session) {
  return NextResponse.redirect(new URL('/', request.url))
}
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile/',
}