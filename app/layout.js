import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Stytch Auth",
    description: "Stytch Multi-tenancy auth demo.",
};

export default function RootLayout({ children }) {
    return (
   	 <html lang="en">
   		 <body className={inter.className}>
       		 <div className="h-screen w-screen flex items-center justify-center">
           		 <div className="w-[50%] border rounded p-4">{children}</div>
       		 </div>
   		 </body>
   	 </html>
    );
}
