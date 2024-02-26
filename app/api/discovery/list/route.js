import loadStytch from "@/utils/loadStytch";
import { getIntermediateSession } from "@/utils/sessionManagement";

export async function GET(request) {
    const stytchClient = loadStytch();

    const intermediate_session_cookie = getIntermediateSession()

    if (!intermediate_session_cookie) {
   	 return Response.json(
   		 { error: "Invalid session" },
   		 {
       		 status: 302,
   		 }
   	 );
    }

    try {
   	 const { discovered_organizations } =
   		 await stytchClient.discovery.organizations.list({
       		 intermediate_session_token: intermediate_session_cookie.value,
   		 });

   	 return Response.json({ discovered_organizations });
    } catch (error) {
   	 console.log(error);

   	 if (error.error_type === "intermediate_session_not_found") {
   		 return Response.json(
       		 { error: "Invalid session" },
       		 {
           		 status: 302,
       		 }
   		 );
   	 }
    }
}
