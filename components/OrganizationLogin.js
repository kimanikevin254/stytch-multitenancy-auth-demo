import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrganizationLogin({ setIsDiscovery }) {
    const router = useRouter();

    const [slug, setSlug] = useState("");

    useEffect(() => {
   	 setIsDisabled(slug.length <= 3);
    }, [slug]);

    const searchOrg = async (e) => {
   	 e.preventDefault();

   	 const res = await fetch("/api/organizations/searchBySlug", {
   		 method: "POST",
   		 body: JSON.stringify({ slug }),
   	 });

   	 const data = await res.json();

   	 if (!data.error) {
   		 if (data.organizations.length === 0) {
       		 alert("Organization not found");
   		 } else {
       		 const organization_slug =
           		 data.organizations[0].organization_slug;
       		 router.push(`/${organization_slug}/login`);
   		 }
   	 }
    };

    const isDisabled = slug.length <= 3;

    return (
   	 <div>
   		 <h3 className="text-2xl font-bold text-center">
       		 What is your Organization's Domain?
   		 </h3>

   		 <div className="mt-3 flex flex-col items-center">
       		 <p>
           		 Don't know your organization's Domain?{" "}
           		 <button
               		 onClick={() => setIsDiscovery(true)}
               		 className="underline"
           		 >
               		 Find your organizations.
           		 </button>
       		 </p>

       		 <form onSubmit={searchOrg} className="mt-3 w-3/5">
           		 <input
               		 placeholder="org-slug"
               		 value={slug}
               		 onChange={(e) => setSlug(e.target.value)}
               		 type="text"
               		 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
           		 />
           		 <button
               		 className={`w-full py-2 rounded mt-3 ${
                   		 isDisabled
                       		 ? "bg-gray-200"
                       		 : "bg-purple-600 text-white"
               		 }`}
               		 id="button"
               		 type="submit"
               		 disabled={isDisabled}
           		 >
               		 Continue
           		 </button>
       		 </form>
   		 </div>
   	 </div>
    );
}
