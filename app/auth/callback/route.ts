import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server' // The server client we just created

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(new URL('/admin/login?error=Could+not+authenticate', request.url))
}
