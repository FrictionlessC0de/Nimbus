import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const protectedRoutes = ["/build", "/dashboard"]
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}