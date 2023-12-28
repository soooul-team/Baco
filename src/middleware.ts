import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import HttpCode from "@/pages/api/utils/http_code";
import {prisma} from "@/pages/api/utils/db/db_browser";

// This function can be marked `async` if using `await` inside
/**
 * login auth middleware
 */
export async function middleware(request: NextRequest) {
    let uvid: any | undefined = request.cookies.get('uvid');
    let token = request.cookies.get('token');
    if (!uvid || !token) {
        return new NextResponse(
            JSON.stringify({status: HttpCode.ERROR_AUTH_CODE, msg: HttpCode.ERROR_AUTH_MSG, data: {}}),
            {status: HttpCode.OK, headers: {'content-type': 'application/json'}}
        );
    }
    console.log(`auth:::url:${request.nextUrl}===============uvid:${uvid.value},token:${token.value}==============`);
    const res = await fetch('http://localhost:8098/api/middleware/auth', {
        method: 'post',
        body: JSON.stringify({uvid: uvid.value, token: token.value})
    });
    console.log(`res.status============>${res.status}`);
    if (res.status !== HttpCode.OK) {
        // This will activate the closest `error.js` Error Boundary
        return new NextResponse(
            JSON.stringify({
                status: HttpCode.ERROR_AUTH_CODE,
                msg: HttpCode.ERROR_AUTH_MSG,
                data: {data: HttpCode.ERROR_AUTH_MSG}
            }),
            {status: HttpCode.OK, headers: {'content-type': 'application/json'}}
        );
    } else {
        const {pathname} = request.nextUrl;
        const res = await fetch('http://localhost:8098/api/middleware/auth_permission_roles', {
            method: 'post',
            body: JSON.stringify({uvid: uvid.value, path: pathname})
        });
        if (res.status !== HttpCode.OK) {
            return new NextResponse(
                JSON.stringify({
                    status: HttpCode.ERROR_AUTH_DONT_HAVE_PERMISSION_CODE,
                    msg: HttpCode.ERROR_AUTH_DONT_HAVE_PERMISSION_MSG,
                    data: {data: []}
                }),
                {status: HttpCode.OK, headers: {'content-type': 'application/json'}}
            );
        }
        return NextResponse.next();
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/v1/users/:path*', '/api/v1/orders/:path*', '/api/v1/products/:path*', '/api/v1/admin/:path*'],
}
