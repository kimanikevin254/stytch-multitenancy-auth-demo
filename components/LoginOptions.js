import GoogleAuthButton from "./GoogleAuthButton";
import MagicLinkForm from "./MagicLinkForm";

export default function LoginOptions({
    isDiscovery,
    organizationId,
    organizationSlug,
}) {
    return (
   	 <div>
   		 <MagicLinkForm
       		 isDiscovery={isDiscovery}
       		 organizationId={organizationId}
   		 />

   		 <p className="my-3 text-center">or</p>

   		 <GoogleAuthButton
       		 isDiscovery={isDiscovery}
       		 organizationSlug={organizationSlug}
   		 />
   	 </div>
    );
}
