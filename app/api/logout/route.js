import { getSession, revokeSession } from "@/utils/sessionManagement";
import { redirect } from "next/navigation";

export async function GET(request) {
    const sessionJWT = getSession()

    if (!sessionJWT) {
   	 return redirect("/login");
    } else {
   	 revokeSession(sessionJWT.value);
   	 return redirect("/login");
    }
}
