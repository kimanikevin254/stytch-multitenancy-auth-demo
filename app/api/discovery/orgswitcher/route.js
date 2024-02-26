import loadStytch from "@/utils/loadStytch";
import { getSession } from "@/utils/sessionManagement";

export async function GET(request) {
    const stytchClient = loadStytch();

    const session_cookie = getSession();

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
