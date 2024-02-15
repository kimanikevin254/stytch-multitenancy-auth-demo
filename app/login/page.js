"use client";

import GoogleAuthButton from "@/components/GoogleAuthButton";
import MagicLinkForm from "@/components/MagicLinkForm";
import { useState } from "react";
import OrganizationLogin from "@/components/OrganizationLogin";
import DiscoveryLoginForm from "@/components/DiscoveryLoginForm";

export default function Page() {
    const [isDiscovery, setIsDiscovery] = useState(true);
    return (
   	 <div>
   		 {isDiscovery ? (
       		 <DiscoveryLoginForm
           		 setIsDiscovery={setIsDiscovery}
           		 isDiscovery={isDiscovery}
       		 />
   		 ) : (
       		 <OrganizationLogin setIsDiscovery={setIsDiscovery} />
   		 )}
   	 </div>
    );
}
