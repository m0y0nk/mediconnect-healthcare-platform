"use client"; // Needs to be client to use Suspense with useSearchParams
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

// A wrapper component to ensure useSearchParams works
function AuthFormWrapper() {
  return <AuthForm />;
}

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4">
      {/* We use Suspense here because AuthForm uses useSearchParams */}
      <Suspense fallback={<div>Loading...</div>}>
        <AuthFormWrapper />
      </Suspense>
    </div>
  );
}