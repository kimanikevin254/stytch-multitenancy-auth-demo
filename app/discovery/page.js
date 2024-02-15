"use client";

import CreateNewOrganization from "@/components/CreateNewOrganization";
import DiscoveredOrganizationsList from "@/components/DiscoveredOrganizationsList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const [organizations, setOrganizations] = useState(null);

    const fetchDiscoveredOrgs = async () => {
   	 const res = await fetch("/api/discovery/list");

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
   	 <div className="flex flex-col items-center">
   		 <DiscoveredOrganizationsList
       		 discovered_organizations={organizations}
   		 />

   		 <CreateNewOrganization />
   	 </div>
    );
}
