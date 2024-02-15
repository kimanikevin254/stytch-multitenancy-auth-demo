import loadStytch from "@/utils/loadStytch";
import { cookies } from "next/headers";

export async function GET(request) {
    const stytchClient = loadStytch();

    const cookieStore = cookies();
    const organization_id_cookie = cookieStore.get("organization_id");

    if (!organization_id_cookie) {
   	 console.log("No org id cookie");
   	 return Response.json(
   		 { redirectToLogin: true },
   		 {
       		 status: 302,
   		 }
   	 );
    }

    try {
   	 const organization = await stytchClient.organizations.get({
   		 organization_id: organization_id_cookie.value,
   	 });

   	 const members = await stytchClient.organizations.members.search({
   		 organization_ids: [`${organization_id_cookie.value}`],
   	 });

   	 return Response.json({ organization, members });
    } catch (error) {
   	 console.log(error);

   	 return Response.json({ message: "Failed to organization data" });
    }
}
