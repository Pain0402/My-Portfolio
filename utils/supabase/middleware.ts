import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isLoginRoute = request.nextUrl.pathname === '/admin/login'
    const isExactAdminRoute = request.nextUrl.pathname === '/admin'

    if (isAdminRoute) {
        if (!user && !isLoginRoute) {
            // Redirect unauthenticated users to login page
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        if (user && isLoginRoute) {
            // Redirect authenticated users away from login page
            const url = request.nextUrl.clone()
            url.pathname = '/admin/dashboard'
            return NextResponse.redirect(url)
        }

        if (user && isExactAdminRoute) {
            // Redirect exactly /admin to /admin/dashboard
            const url = request.nextUrl.clone()
            url.pathname = '/admin/dashboard'
            return NextResponse.redirect(url)
        }

        // Optional: Add logic here to check if the specific connected GitHub account email
        // is YOUR email. E.g.
        // if (user && user.email !== 'your.github.email@example.com') { ... block }
    }

    return supabaseResponse
}
