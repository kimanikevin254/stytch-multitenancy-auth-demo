import loadStytch from "@/utils/loadStytch";
import {
    clearIntermediateSession,
    getIntermediateSession,
    setOrganization,
    setSession,
} from "@/utils/sessionManagement";
import { redirect } from "next/navigation";

export async function POST(request) {
    const stytchClient = loadStytch();

    const intermediate_session_cookie = getIntermediateSession();

    const formData = await request.formData();

    const orgID = formData.get("orgID");
    const memberID = formData.get("memberID");
    const code = formData.get("code");

    //Check if intermediate session is available
    if (!intermediate_session_cookie) {
   	 redirect("/login");
    }

    // Dashboard URL
    let redirectURL = null;

    try {
   	 // Authenticate code
   	 const { session_jwt, organization } =
   		 await stytchClient.otps.sms.authenticate({
       		 organization_id: orgID,
       		 member_id: memberID,
       		 code,
       		 intermediate_session_token: intermediate_session_cookie.value,
   		 });

   	 // Set session
   	 setSession(session_jwt);

   	 // Clear intermediate session
   	 clearIntermediateSession();

   	 // Set organization id as a cookie
   	 setOrganization(organization.organization_id)

   	 // Set org dashboard URL
   	 redirectURL = `/${organization.organization_slug}/dashboard`;
    } catch (error) {
   	 console.log(error);
    } finally {
   	 redirect(redirectURL);
    }
}
