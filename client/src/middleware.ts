import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export async function middleware(req: NextRequest) {

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  if(!session) {  
    return NextResponse.redirect(new URL('/ingresar', req.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/protectoras', '/adopcion', '/match', '/acercaDeMi'],
}