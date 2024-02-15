"use client";

import LoginOptions from "@/components/LoginOptions";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [org, setOrg] = useState(null);

    const searchOrg = async () => {
   	 const res = await fetch("/api/organizations/searchBySlug", {
   		 method: "POST",
   		 body: JSON.stringify({ slug: params.slug }),
   	 });

   	 const data = await res.json();

   	 if (!data.error) {
   		 if (data.organizations.length > 0) {
       		 setOrg(data.organizations[0]);
   		 } else {
       		 setOrg([]);
   		 }
   	 }
    };

    useEffect(() => {
   	 searchOrg();
    }, []);

    return (
   	 <div>
   		 {org === null ? (
       		 <p className="text-center">Loading...</p>
   		 ) : org.length === 0 ? (
       		 <p className="text-center">Organization does not exist.</p>
   		 ) : (
       		 <div>
           		 <h2 className="text-xl font-bold text-center">
               		 Log in to {org.organization_name}
           		 </h2>

           		 <LoginOptions
               		 organizationId={org.organization_id}
               		 organizationSlug={org.organization_slug}
           		 />
       		 </div>
   		 )}
   	 </div>
    );
}
