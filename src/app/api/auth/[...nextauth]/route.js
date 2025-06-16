import NextAuth from "next-auth/next"
import { authOptions } from "../../../../helper/authindex"




const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}