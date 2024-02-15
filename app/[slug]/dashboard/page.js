"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Regex to validate email
const isValidEmail = (emailValue) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailValue);
};

export default function Page() {
    const router = useRouter();

    const [organization, setOrganization] = useState(null);
    const [members, setMembers] = useState(null);

    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch the organization details and members
    const getOrganizationAndMembers = async () => {
   	 const res = await fetch("/api/organizations/findById");

   	 if (res.status === 302) {
   		 router.replace("/login");
   	 } else {
   		 const data = await res.json();

   		 setOrganization(data.organization.organization);
   		 setMembers(data.members.members);
   	 }
    };

    useEffect(() => {
   	 getOrganizationAndMembers();
    }, []);

    useEffect(() => {
   	 setIsDisabled(!isValidEmail(email));
    }, [email]);

    const inviteMember = async (e) => {
   	 e.preventDefault();

   	 if (isDisabled) {
   		 return;
   	 } else {
   		 setIsDisabled(true);
   	 }

   	 const res = await fetch("/api/organizations/invite", {
   		 method: "POST",
   		 body: JSON.stringify({ email }),
   	 });

   	 const data = await res.json();

   	 if (!data.error) {
   		 router.refresh();
   	 } else {
   		 alert("Error inviting user to organization");
   	 }
    };

    return (
   	 <div>
   		 <h3 className="text-2xl font-bold text-center underline">
       		 Organization Dashboard
   		 </h3>

   		 {!organization && !members ? (
       		 <p className="mt-3 text-center text-gray-600">Loading...</p>
   		 ) : (
       		 <div className="mt-3 flex flex-col items-center gap-2">
           		 <p>Organization name: {organization?.organization_name}</p>
           		 <p>Organization slug: {organization?.organization_slug}</p>
           		 <p>MFA policy: {organization?.mfa_policy}</p>
           		 <p>
               		 Allowed auth methods:{" "}
               		 {organization?.allowed_auth_methods?.join(", ")}
           		 </p>

           		 <div className="mt-3 flex flex-col items-center gap-2">
               		 <h2 className="text-xl font-bold">Members</h2>

               		 {members.map((member) => (
                   		 <p
                       		 key={member.email_address}
                       		 className="flex gap-2"
                   		 >
                       		 <span>
                           		 {member.is_admin ? "[admin]" : "member"}
                       		 </span>
                       		 <span>{member.email_address}</span>
                       		 <span>
                           		 {member.status === "active"
                               		 ? "(active)"
                               		 : "(inactive)"}
                       		 </span>
                   		 </p>
               		 ))}

               		 {/* Invite new members form */}
               		 <div className="mt-3">
                   		 <p className="font-bold">Invite new member</p>
                   		 <div className="mt-1">
                       		 <form
                           		 onSubmit={inviteMember}
                           		 className="flex gap-3"
                       		 >
                           		 <input
                               		 type="email"
                               		 value={email}
                               		 onChange={(e) =>
                                   		 setEmail(e.target.value)
                               		 }
                               		 placeholder="coworker@email.com"
                               		 className="border rounded px-2 py-1 focus:outline-none"
                           		 />
                           		 <button
                               		 type="submit"
                               		 disabled={isDisabled}
                               		 className={`px-6 py-2 rounded bg-gray-200 ${
                                   		 !isDisabled &&
                                   		 "bg-purple-500 text-white"
                               		 }`}
                           		 >
                               		 Invite
                           		 </button>
                       		 </form>
                   		 </div>
               		 </div>

               		 <div className="mt-3 flex gap-3">
                   		 <Link href={"/orgswitcher"} className="underline">
                       		 Switch Organizations
                   		 </Link>
                   		 <Link href={"/api/logout"} className="underline">
                       		 Log out
                   		 </Link>
               		 </div>
           		 </div>
       		 </div>
   		 )}
   	 </div>
    );
}
