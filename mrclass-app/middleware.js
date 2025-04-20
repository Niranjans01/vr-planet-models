import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const cookieObj = request.cookies.get('userAuth')?.value;
    const user = JSON.parse(cookieObj || '{}')

    if (user && user?.uid) {
        // If the user is logged in, continue to the route
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/classes/:path*','/lms/:path*']
}