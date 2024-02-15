"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const [organizations, setOrganizations] = useState([]);

    const fetchDiscoveredOrgs = async () => {
   	 const res = await fetch("/api/discovery/orgswitcher");

   	 if (res.status === 302) {
   		 router.replace("/login");
   	 } else {
   		 const { discovered_organizations } = await res.json();

   		 setOrganizations(discovered_organizations);
   	 }
    };

    useEffect(() => {
   	 fetchDiscoveredOrgs();
    }, []);
    return (
   	 <div className="flex flex-col">
   		 <h3 className="font-bold">Your Organizations</h3>

   		 {organizations &&
       		 organizations.map(({ organization }) => (
           		 <Link
               		 href={`/api/discovery/${organization.organization_id}`}
               		 key={organization.organization_id}
               		 className="underline"
           		 >
               		 {organization.organization_name}
           		 </Link>
       		 ))}
   	 </div>
    );
}
