import loadStytch from "@/utils/loadStytch";

export async function POST(request) {
    const stytchClient = loadStytch();

    const { slug } = await request.json();

    try {
   	 const { organizations } = await stytchClient.organizations.search({
   		 query: {
       		 operator: "AND",
       		 operands: [
           		 {
               		 filter_name: "organization_slugs",
               		 filter_value: [slug],
           		 },
       		 ],
   		 },
   	 });

   	 return Response.json({ organizations });
    } catch (err) {
   	 console.log(err);
   	 return Response.json({ error: true, message: "Failed" });
    }
}
