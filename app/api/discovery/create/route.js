import loadStytch from "@/utils/loadStytch";
import {
    clearIntermediateSession,
    clearSession,
    setIntermediateSession,
    setSession,
} from "@/utils/sessionManagement";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request) {
    const stytchClient = loadStytch();

    const cookieStore = cookies();
    const intermediate_session_cookie = cookieStore.get("intermediate_session");

    const formData = await request.formData();

    const organization_name = formData.get("orgName");
    const require_mfa = formData.get("require_mfa");
    const magic_link = formData.get("magic_link");
    const google_oauth = formData.get("google_oauth");

    // Initialize redirect URLs
    let dashboardRedirectUrl = null;
    let mfaRedirectURL = null;

    try {
   	 // Check the allowed auth methods
   	 const allowedAuthMethods = [];

   	 // Check if magic_link is true
   	 if (magic_link === "on") {
   		 allowedAuthMethods.push("magic_link");
   	 }

   	 // Check if google_oauth is true
   	 if (google_oauth === "on") {
   		 allowedAuthMethods.push("google_oauth");
   	 }

   	 // If all are disabled by the client, enable them all here
   	 if (google_oauth !== "on" && magic_link !== "on") {
   		 allowedAuthMethods.push("magic_link", "google_oauth");
   	 }

   	 // Create organization with the specified parameters
   	 const {
   		 member,
   		 organization,
   		 session_jwt,
   		 intermediate_session_token,
   	 } = await stytchClient.discovery.organizations.create({
   		 intermediate_session_token: intermediate_session_cookie.value,
   		 organization_name,
   		 email_invites: "ALL_ALLOWED",
   		 auth_methods: "RESTRICTED",
   		 allowed_auth_methods: allowedAuthMethods,
   		 mfa_policy: require_mfa === "on" ? "REQUIRED_FOR_ALL" : "OPTIONAL",
   		 email_invites: "ALL_ALLOWED",
   	 });

   	 // Check if mfa is required and redirect appropriately
   	 if (session_jwt === "") {
   		 // MFA required
   		 // Set intermediate session to complete MFA step
   		 setIntermediateSession(intermediate_session_token);
   		 clearSession();

   		 // Set MFA redirect url for sms authentication
   		 mfaRedirectURL = `/${organization.organization_slug}/smsmfa?sent=false&org_id=${organization.organization_id}&member_id=${member.member_id}`;
   	 } else {
   		 // MFA not required
   		 // Set the redirect URL after the organization has been created
   		 dashboardRedirectUrl = `/${organization.organization_slug}/dashboard`;

   		 // Clear the existing intermediate session
   		 clearIntermediateSession();

   		 // Set new session for the newly created org
   		 setSession(session_jwt);

   		 // Set org id as a cookie
   		 cookies().set("organization_id", organization.organization_id, {
       		 httpOnly: true,
       		 maxAge: 60 * 60,
   		 });
   	 }
    } catch (error) {
   	 console.log(error.message);
    } finally {
   	 // Call redirect out of try/catch blocks since it internally throws an error
   	 // Check if mfa is required
   	 if (mfaRedirectURL) {
   		 // MFA required
   		 redirect(mfaRedirectURL);
   	 } else {
   		 // MFA not required
   		 // Redirect to new org dashboard
   		 return redirect(dashboardRedirectUrl);
   	 }
    }
}
