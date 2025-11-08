"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add state for role and hospital name
  const [role, setRole] = useState<'customer' | 'hospital'>('customer');
  const [hospitalName, setHospitalName] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check for hospital name *before* logging in
    if (role === 'hospital' && !hospitalName) {
      // We are just using a simple alert for this dummy app
      alert("Please enter your hospital name.");
      return; // Stop the function here
    }

    // 2. Create the user data object
    const userData = {
      email,
      role,
      name: role === 'hospital' ? hospitalName : email.split('@')[0], // Use hospital name or first part of email
    };
    
    // 3. Log in with the new user data and redirect
    login(userData); // Pass the whole user object
    router.push("/");
  };

  return (
    // Added py-12 to give some space on mobile screens
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Join as a customer or a hospital.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">

            {/* --- ADD THIS SECTION --- */}
            <div className="grid gap-2">
              <Label>Sign up as a:</Label>
              <RadioGroup
                defaultValue="customer"
                value={role}
                onValueChange={(value: 'customer' | 'hospital') => setRole(value)}
                className="flex gap-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="r-customer" />
                  <Label htmlFor="r-customer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hospital" id="r-hospital" />
                  <Label htmlFor="r-hospital">Hospital</Label>
                </div>
              </RadioGroup>
            </div>

            {/* --- ADD THIS CONDITIONAL FIELD --- */}
            {role === 'hospital' && (
              <div className="grid gap-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input
                  id="hospitalName"
                  type="text"
                  placeholder="e.g. City General Hospital"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
            )}
            {/* --- END OF NEW SECTIONS --- */}

            {/* Existing Fields */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}