"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const orgId = searchParams.get("org_id");
    const memberId = searchParams.get("member_id");
    const sent = searchParams.get("sent");

    // Set endpoints and text based on the value of  `sent` parameter in URL query string
    const formAction =
   	 sent === "true" ? "/api/smsmfa/authenticate" : "/api/smsmfa/send";
    const formTitle =
   	 sent === "true"
   		 ? "Please enter the one-time code sent to your phone number"
   		 : "Please enter your phone number";
    const submitButtonText = sent === "true" ? "Authenticate" : "Send";

    return (
   	 <div>
   		 <form method="POST" action={formAction} className="row">
       		 <h3 className="font-bold">{formTitle}</h3>

       		 <div className="flex gap-3 mt-3">
           		 <input
               		 type="text"
               		 placeholder={sent === "true" ? "Code" : "Phone number"}
               		 name={sent === "true" ? "code" : "phone_number"}
               		 className="border rounded focus:outline-none px-2 py-1 flex-1"
           		 />
           		 <input type="hidden" name="orgID" value={orgId} />
           		 <input type="hidden" name="memberID" value={memberId} />
           		 <button
               		 type="submit"
               		 className="bg-purple-500 px-4 py-2 rounded text-white"
           		 >
               		 {submitButtonText}
           		 </button>
       		 </div>
   		 </form>
   	 </div>
    );
}
