import loadStytch from "@/utils/loadStytch";
import { cookies } from "next/headers";

export async function POST(request) {
    const stytchClient = loadStytch();

    const { email } = await request.json();

    const cookieStore = cookies();
    const organization_id_cookie = cookieStore.get("organization_id");

    try {
   	 await stytchClient.magicLinks.email.invite({
   		 email_address: email,
   		 organization_id: organization_id_cookie.value,
   	 });

   	 return Response.json({
   		 error: false,
   		 message: "User invited successfully",
   	 });
    } catch (err) {
   	 console.log(err);
   	 return Response.json({
   		 error: true,
   		 message: "Unable to send magic link",
   	 });
    }
}
