import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher : [
        '/((?!login|_next|emailLink|signUp|uusiSalasana|admin|/).*)'
    ]
}

export async function middleware(req : NextRequest) : Promise<NextResponse> {

    const res : NextResponse = NextResponse.next();

    const supabase = createMiddlewareSupabaseClient({req, res});

    const {data} = await supabase.auth.getSession();

    if (!data.session) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/login';

        return NextResponse.redirect(loginUrl)
    } else {
        return res;
    }

    

}