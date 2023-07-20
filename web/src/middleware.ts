import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import initializeBasicAuth from "nextjs-basic-auth";
const users = [
    { user: "user1", password: "toocool" },
    { user: "admin", password: "password" },
];
const basicAuthCheck = initializeBasicAuth({
    users: users,
});
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authheader = request.headers.get("authorization");
    if (!authheader) {
        const res = new NextResponse(null, { status: 401 });
        let err = new Error('You are not authenticated!');
        res.headers.set('WWW-Authenticate', 'Basic');
        return res;
    }

    const auth: string[] = Buffer.from(authheader.split(' ')[1], 'base64')
        .toString()
        .split(':');
    const user = auth[0];
    const pass = auth[1];
    console.log(user, pass)

    if (user != process.env.NEXT_APP_USERNAME || pass != process.env.NEXT_APP_PASSWORD) {
        const res = new NextResponse(null, { status: 401 });
        let err = new Error('You are not authenticated!');
        res.headers.set('WWW-Authenticate', 'Basic');
        return res;
    }// else {
    //     let err = new Error('You are not authenticated!');
    //     res.setHeader('WWW-Authenticate', 'Basic');
    //     err.status = 401;
    //     return next(err);
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}