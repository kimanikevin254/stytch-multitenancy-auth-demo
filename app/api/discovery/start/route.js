import loadStytch from "@/utils/loadStytch";

export async function POST(request) {
    const stytchClient = loadStytch();

    const { email } = await request.json();

    try {
   	 await stytchClient.magicLinks.email.discovery.send({
   		 email_address: email,
   		 discovery_redirect_url: `${process.env.DOMAIN}/api/callback`,
   	 });

   	 return Response.json({ message: "success" }, { status: 200 });
    } catch (error) {
   	 console.log(error);
   	 return Response.json({ message: "error" }, { status: 500 });
    }
}
