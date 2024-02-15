import loadStytch from "@/utils/loadStytch";
import { cookies } from "next/headers";

export async function GET(request) {
    const stytchClient = loadStytch();

    const cookieStore = cookies();
    const session_cookie = cookieStore.get("session");

    if (!session_cookie) {
   	 return Response.json(
   		 { message: "Invalid session" },
   		 {
       		 status: 302,
   		 }
   	 );
    }

    try {
   	 const { discovered_organizations } =
   		 await stytchClient.discovery.organizations.list({
       		 session_jwt: session_cookie.value,
   		 });

   	 return Response.json({ discovered_organizations });
    } catch (error) {
   	 console.log(error);

   	 return Response.json(
   		 { error: "Failed" },
   		 {
       		 status: 302,
   		 }
   	 );
    }
}
