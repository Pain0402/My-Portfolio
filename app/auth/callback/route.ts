import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server' // The server client we just created

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/hub'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(new URL(next, request.url))
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(new URL('/admin/login?error=Could+not+authenticate', request.url))
}
