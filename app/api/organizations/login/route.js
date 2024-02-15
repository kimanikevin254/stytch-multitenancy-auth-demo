import loadStytch from "@/utils/loadStytch";

export async function POST(request) {
    const stytchClient = loadStytch();

    const { email, organizationId } = await request.json();

    try {
   	 await stytchClient.magicLinks.email.loginOrSignup({
   		 email_address: email,
   		 organization_id: organizationId,
   		 login_redirect_url: `${process.env.DOMAIN}/api/callback`,
   		 signup_redirect_url: `${process.env.DOMAIN}/api/callback`,
   	 });

   	 return Response.json({ message: "success" }, { status: 200 });
    } catch (error) {
   	 console.log(error);
   	 return Response.json({ message: "error" }, { status: 500 });
    }
}
