import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(request) {
  /*let cookie = request.cookies.get('auth')
    if (cookie == undefined) {
        return NextResponse.json(
          {
            success: false,
            message: "Usuário sem permissão de acesso",
          },
          {
            status: 401,
          }
        );
    }*/
}

// 58

export const config = {
  //matcher: '/cadastro/:path*',
};
