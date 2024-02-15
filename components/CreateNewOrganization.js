import { useState } from "react";

function Checkbox({ label, name, checked, onChange }) {
    return (
   	 <div className="flex gap-2 w-fit mx-auto">
   		 <input
       		 type="checkbox"
       		 name={name}
       		 onChange={onChange}
       		 checked={checked}
   		 />
   		 <label>{label}</label>
   	 </div>
    );
}

export default function CreateNewOrganization() {
    const [orgName, setOrgName] = useState("");
    const [requireMFA, setRequireMFA] = useState(false);
    const [allowGoogleAuth, setAllowGoogleAuth] = useState(true);
    const [allowMagicLinks, setAllowMagicLinks] = useState(true);

    const handleCheckboxChange = (setter) => () => setter((prev) => !prev);

    return (
   	 <div className="mt-3">
   		 <h3 className="font-bold text-center">Create a New Organization</h3>

   		 <form method="POST" action="/api/discovery/create" className="mt-3">
       		 {/* Organization name input */}
       		 <input
           		 name="orgName"
           		 type="text"
           		 placeholder="Example Org"
           		 value={orgName}
           		 onChange={(e) => setOrgName(e.target.value)}
           		 className="px-4 py-2 border border-gray-300 rounded focus:outline-none"
       		 />

       		 {/* Checkboxes */}
       		 <div className="flex flex-col gap-2 w-fit mx-auto mt-3">
           		 <Checkbox
               		 label="Require MFA"
               		 name="require_mfa"
               		 checked={requireMFA}
               		 onChange={handleCheckboxChange(setRequireMFA)}
           		 />
           		 <Checkbox
               		 label="Allow Google Auth"
               		 name="google_oauth"
               		 checked={allowGoogleAuth}
               		 onChange={handleCheckboxChange(setAllowGoogleAuth)}
           		 />
           		 <Checkbox
               		 label="Allow Magic Links"
               		 name="magic_link"
               		 checked={allowMagicLinks}
               		 onChange={handleCheckboxChange(setAllowMagicLinks)}
           		 />
       		 </div>

       		 {/* Submit button */}
       		 <button
           		 disabled={orgName.length < 3}
           		 type="submit"
           		 className={`w-full mt-4 py-2 rounded ${
               		 orgName.length < 3
                   		 ? "bg-gray-200"
                   		 : "bg-purple-600 text-white"
           		 }`}
       		 >
           		 Create
       		 </button>
   		 </form>
   	 </div>
    );
}
