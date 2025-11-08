import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

// Imports from your file
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";

// Imports from our previous steps
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediConnect",
  description: "MediConnect Healthcare Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We combine the 'inter' font class with your 'antialiased' class 
      */}
      <body className={`${inter.className} antialiased`}>
        {/* Wrap everything in the AuthProvider so all components 
          (including Navbar and children) can access the auth state.
        */}
        <AuthProvider>
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />

          {/* Add the Navbar here so it appears on every page */}
          <Navbar />

          {children}
          
          <VisualEditsMessenger />
        </AuthProvider>
      </body>
    </html>
  );
}