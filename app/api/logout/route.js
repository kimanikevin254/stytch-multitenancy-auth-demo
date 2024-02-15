import { revokeSession } from "@/utils/sessionManagement";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
    const sessionJWT = cookies().get("session")?.value;

    if (!sessionJWT) {
   	 return redirect("/login");
    } else {
   	 revokeSession(sessionJWT);
   	 return redirect("/login");
    }
}
