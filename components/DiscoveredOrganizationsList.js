import Link from "next/link";

export default function DiscoveredOrganizationsList({
    discovered_organizations,
}) {
    const formatMembership = (organization, membership) => {
   	 if (membership.type === "pending_member") {
   		 return `Join ${organization.organization_name}`;
   	 }
   	 if (membership.type === "eligible_to_join_by_email_domain") {
   		 return `Join ${organization.organization_name} via your ${membership.details.domain} email`;
   	 }
   	 if (membership.type === "invited_member") {
   		 return `Accept Invite for ${organization.organization_name}`;
   	 }
   	 return `Continue to ${organization.organization_name}`;
    };
    return (
   	 <div className="mt-3">
   		 <h3 className="text-xl font-bold">Your Organizations</h3>
   		 {!discovered_organizations ? (
       		 <p>Loading...</p>
   		 ) : discovered_organizations.length === 0 ? (
       		 <p>No existing organizations</p>
   		 ) : (
       		 <ul>
           		 {discovered_organizations.map(
               		 ({ organization, membership }) => (
                   		 <li
                       		 key={organization.organization_id}
                       		 className="underline cursor-pointer"
                   		 >
                       		 <Link
                           		 href={`/api/discovery/${organization.organization_id}`}
                       		 >
                           		 {formatMembership(organization, membership)}
                       		 </Link>
                   		 </li>
               		 )
           		 )}
       		 </ul>
   		 )}
   	 </div>
    );
}
