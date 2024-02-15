"use client";

import { useEffect, useState } from "react";

const isValidEmail = (emailValue) => {
    // Simple email address regex
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailValue);
};

export default function MagicLinkForm({ isDiscovery, organizationId }) {
    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
   	 setIsDisabled(!isValidEmail(email));
    }, [email]);

    // handle form submission
    const handleDiscoveryLogin = async (e) => {
   	 e.preventDefault();

   	 // Disable button right away to prevent sending emails twice
   	 if (isDisabled) {
   		 return;
   	 } else {
   		 setIsDisabled(true);
   	 }

   	 const res = await fetch("/api/discovery/start", {
   		 method: "POST",
   		 body: JSON.stringify({
       		 email,
   		 }),
   	 });

   	 if (res.status === 200) {
   		 alert("Magic link sent successfully");
   	 } else {
   		 alert(" Unable to send magic link");
   	 }
    };

    const handleOrganizationLogin = async (e) => {
   	 e.preventDefault();

   	 // Disable button right away to prevent sending emails twice
   	 if (isDisabled) {
   		 return;
   	 } else {
   		 setIsDisabled(true);
   	 }

   	 const res = await fetch("/api/organizations/login", {
   		 method: "POST",
   		 body: JSON.stringify({
       		 email,
       		 organizationId,
   		 }),
   	 });

   	 if (res.status === 200) {
   		 alert("Magic link sent successfully");
   	 } else {
   		 alert(" Unable to send magic link");
   	 }
    };

    return (
   	 <form
   		 onSubmit={
       		 isDiscovery ? handleDiscoveryLogin : handleOrganizationLogin
   		 }
   		 className="mt-3"
   	 >
   		 <input
       		 name="email"
       		 placeholder="example@email.com"
       		 value={email}
       		 onChange={(e) => setEmail(e.target.value)}
       		 type="email"
       		 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
   		 />
   		 <button
       		 className={`w-full py-2 rounded mt-3 ${
           		 isDisabled && "bg-gray-200"
       		 } ${!isDisabled && "bg-purple-600 text-white"}`}
       		 id="button"
       		 type="submit"
       		 disabled={isDisabled}
   		 >
       		 Continue
   		 </button>
   	 </form>
    );
}
