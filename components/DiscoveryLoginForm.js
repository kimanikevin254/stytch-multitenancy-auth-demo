import LoginOptions from "./LoginOptions";

export default function DiscoveryLoginForm({ setIsDiscovery, isDiscovery }) {
    return (
   	 <div>
   		 <h3 className="text-2xl font-bold text-center">Sign in</h3>

   		 <div className="mt-3 flex flex-col items-center">
       		 <p className="text-gray-800">
           		 We will email you a magic link for a password-free sign in.
       		 </p>
       		 <p className="text-gray-800">
           		 You'll then be able to choose the specific organization you
           		 want to access.
       		 </p>

       		 <p>
           		 Or you can{" "}
           		 <button
               		 onClick={() => setIsDiscovery(false)}
               		 className="underline"
           		 >
               		 sign in manually instead
           		 </button>
           		 .
       		 </p>

       		 <LoginOptions isDiscovery={isDiscovery} />
   		 </div>
   	 </div>
    );
}
