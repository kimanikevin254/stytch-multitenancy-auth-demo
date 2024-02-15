import loadStytch from "@/utils/loadStytch";
import { redirect } from "next/navigation";

export async function POST(request) {
    const stytchClient = loadStytch();

    const formData = await request.formData();

    const orgID = formData.get("orgID");
    const memberID = formData.get("memberID");
    const phone_number = formData.get("phone_number");

    // Authenticate OTP URL
    let authenticateOTPURL = null;

    try {
   	 const { organization, member } = await stytchClient.otps.sms.send({
   		 organization_id: orgID,
   		 member_id: memberID,
   		 mfa_phone_number: phone_number,
   	 });

   	 authenticateOTPURL = `/${organization.organization_slug}/smsmfa?sent=true&org_id=${organization.organization_id}&member_id=${member.member_id}`;
    } catch (error) {
   	 console.log(error);
    } finally {
   	 redirect(authenticateOTPURL);
    }
}
