import { type NextRequest, NextResponse } from 'next/server'

const guestRoutes = [`/auth`]

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  if (new RegExp(/^.*(fonts|_next|vk.com|favicon).*$/).test(request.url)) {
    return NextResponse.next()
  }

  if (token) {
    if (!guestRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (!guestRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/auth', request.url))
    } else {
      return NextResponse.next()
    }
  }
}
