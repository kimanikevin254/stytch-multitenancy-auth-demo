import loadStytch from "@/utils/loadStytch";
import {
    clearIntermediateSession,
    clearSession,
    getDiscoverySessionData,
    setIntermediateSession,
    setSession,
} from "@/utils/sessionManagement";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function redirectToSMSMFA(organization, member, mfa_required) {
    console.log("mfa required", mfa_required);
    if (
   	 mfa_required !== null &&
   	 mfa_required.secondary_auth_initiated == "sms_otp"
    ) {
   	 // An OTP code is automatically sent if Stytch knows the member's phone number
   	 return redirect(
   		 `/${organization.organization_slug}/smsmfa?sent=true&org_id=${organization.organization_id}&member_id=${member.member_id}`
   	 );
    }
    // Allow the user to enter their phone number
    return redirect(
   	 `/${organization.organization_slug}/smsmfa?sent=false&org_id=${organization.organization_id}&member_id=${member.member_id}`
    );
}

export async function GET(request, { params }) {
    const stytchClient = loadStytch();

    // Get organization id from dynamic route segments
    const orgId = params.orgId;

    console.log("orgId", orgId);

    if (!orgId || Array.isArray(orgId)) {
   	 return redirect("/discovery");
    }

    // Set variables
    let redirectLink = null;
    let mfaRequiredData = null;
    let redirectToLogin = false;

    // Get discovery session data from cookies
    console.log("getting discovery session data");
    const discoverySessionData = getDiscoverySessionData();

    console.log("discovery session data", discoverySessionData);

    // Redirect to the login page if no discovery data is found
    if (discoverySessionData.error) {
   	 return redirect("/login");
    }

    try {
   	 // Exchange session
   	 const exchangeSession = () => {
   		 if (discoverySessionData.isDiscovery) {
       		 return stytchClient.discovery.intermediateSessions.exchange({
           		 intermediate_session_token:
               		 discoverySessionData.intermediateSession.value,
           		 organization_id: orgId,
           		 session_duration_minutes: 60,
       		 });
   		 }

   		 return stytchClient.sessions.exchange({
       		 organization_id: orgId,
       		 session_jwt: discoverySessionData.sessionJWT.value,
   		 });
   	 };

   	 const {
   		 session_jwt,
   		 organization,
   		 member,
   		 intermediate_session_token,
   		 mfa_required,
   	 } = await exchangeSession();

   	 if (session_jwt === "") {
   		 setIntermediateSession(intermediate_session_token);
   		 clearSession();

   		 // Set org id as a cookie
   		 cookies().set("organization_id", organization.organization_id, {
       		 httpOnly: true,
       		 maxAge: 60 * 60,
   		 });

   		 mfaRequiredData = { organization, member, mfa_required };
   	 } else {
   		 setSession(session_jwt);
   		 clearIntermediateSession();

   		 // Set org id as a cookie
   		 cookies().set("organization_id", organization.organization_id, {
       		 httpOnly: true,
       		 maxAge: 60 * 60,
   		 });

   		 redirectLink = `/${organization.organization_slug}/dashboard`;
   	 }
    } catch (error) {
   	 console.error("Could not authenticate in callback", error);

   	 if ((error.type = "session_not_found")) {
   		 redirectToLogin = true;
   	 }
    } finally {
   	 if (redirectToLogin) {
   		 redirect("/login");
   	 } else {
   		 // MFA required
   		 if (mfaRequiredData) {
       		 redirectToSMSMFA(
           		 mfaRequiredData.organization,
           		 mfaRequiredData.member,
           		 mfaRequiredData.mfa_required
       		 );
   		 }

   		 // MFA not required
   		 if (redirectLink) {
       		 redirect(redirectLink);
   		 }
   	 }
    }
}
