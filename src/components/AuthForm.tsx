"use client";

import React, { useState, useMemo } from "react"; 
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Hospital,
  Mail,
  Lock,
  Phone,
  Hash,
  MapPin,
  Eye,
  EyeOff,
  LucideIcon, 
} from "lucide-react";

// --- Helper: Input Component ---
const InputWithIcon = ({
  icon,
  type = "text",
  ...props
}: {
  icon: LucideIcon;
  type?: string;
  [key: string]: any;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";
  const IconComponent = icon;

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <IconComponent size={16} />
      </span>
      <Input
        type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
        {...props}
        className="pl-10 pr-10 py-2.5 h-11"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

// --- Helper: Dynamic Fields Animator ---
const AnimateFields = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="grid transition-all duration-500 ease-in-out overflow-hidden"
      style={{
        maxHeight: isVisible ? "1000px" : "0px",
        opacity: isVisible ? 1 : 0,
        gridTemplateRows: "1fr",
      }}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// --- Main Authentication Form Component ---
export function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState(searchParams.get("mode") || "login");
  const [role, setRole] = useState<"patient" | "hospital">("patient"); 
  const [formData, setFormData] = useState<any>({});
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // --- FIX 1: Added 'any' type to 'prev' ---
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleModeToggle = (newMode: "login" | "signup") => {
    setMode(newMode);
    setError(null);
    setFormData({});
    setPasswordConfirm("");
  };

  const handleRoleToggle = (newRole: "patient" | "hospital") => {
    setRole(newRole);
    setError(null);
    setFormData({});
    setPasswordConfirm("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (mode === 'signup') {
      if (formData.password !== passwordConfirm) {
        setError("Passwords do not match.");
        return;
      }
    }
    
    const userData = {
      ...formData,
      email: role === 'patient' ? formData.email : formData.hospitalEmail,
      name: role === 'patient' ? formData.name : formData.hospitalName,
      role: role, 
    };
    
    login(userData);
    console.log("DUMMY AUTH SUBMIT:", userData);
    alert(`Dummy Auth Success!\n\nRole: ${role}\nMode: ${mode}\nEmail: ${userData.email}\n\nCheck console for all data.`);
    router.push("/"); 
  };
  
  // --- Memoized Fields (for smooth animation) ---
  const signupPatientFields = useMemo(() => (
    <AnimateFields isVisible={role === 'patient'}>
      <div className="space-y-4 pt-4">
        <InputWithIcon icon={User} name="name" placeholder="Full Name" onChange={handleInputChange} required />
        <InputWithIcon icon={Mail} name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required />
        <InputWithIcon icon={Phone} name="phone" type="tel" placeholder="Phone Number" onChange={handleInputChange} required />
        <InputWithIcon icon={Lock} name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
        {/* --- FIX 2: Added type for 'e' --- */}
        <InputWithIcon icon={Lock} name="passwordConfirm" type="password" placeholder="Confirm Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)} required />
      </div>
    </AnimateFields>
  ), [role, handleInputChange]); 

  const signupHospitalFields = useMemo(() => (
    <AnimateFields isVisible={role === 'hospital'}>
      <div className="space-y-4 pt-4">
        <InputWithIcon icon={Hospital} name="hospitalName" placeholder="Hospital Name" onChange={handleInputChange} required />
        <InputWithIcon icon={Hash} name="registrationNumber" placeholder="Registration Number" onChange={handleInputChange} required />
        <InputWithIcon icon={MapPin} name="address" placeholder="Address" onChange={handleInputChange} required />
        <InputWithIcon icon={User} name="contactPerson" placeholder="Contact Person" onChange={handleInputChange} required />
        <InputWithIcon icon={Mail} name="hospitalEmail" type="email" placeholder="Hospital Email" onChange={handleInputChange} required />
        <InputWithIcon icon={Phone} name="phone" type="tel" placeholder="Phone Number" onChange={handleInputChange} required />
        <InputWithIcon icon={Lock} name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
        {/* --- FIX 2: Added type for 'e' --- */}
        <InputWithIcon icon={Lock} name="passwordConfirm" type="password" placeholder="Confirm Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)} required />
      </div>
    </AnimateFields>
  ), [role, handleInputChange]); 
  
  const loginPatientFields = useMemo(() => (
    <AnimateFields isVisible={role === 'patient'}>
      <div className="space-y-4 pt-4">
        <InputWithIcon icon={Mail} name="email" placeholder="Email or Phone" onChange={handleInputChange} required />
        <InputWithIcon icon={Lock} name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
      </div>
    </AnimateFields>
  ), [role, handleInputChange]);

  const loginHospitalFields = useMemo(() => (
    <AnimateFields isVisible={role === 'hospital'}>
      <div className="space-y-4 pt-4">
        <InputWithIcon icon={Mail} name="hospitalEmail" placeholder="Hospital Email" onChange={handleInputChange} required />
        <InputWithIcon icon={Lock} name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
        <InputWithIcon icon={Hash} name="registrationId" placeholder="Registration ID" onChange={handleInputChange} required />
      </div>
    </AnimateFields>
  ), [role, handleInputChange]);

  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
      
      {/* === Mode Toggle (Login/Signup) === */}
      <div className="flex">
        <button
          type="button"
          onClick={() => handleModeToggle('login')}
          className={`w-1/2 py-4 text-lg font-semibold transition-all duration-300 ${
            mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => handleModeToggle('signup')}
          className={`w-1/2 py-4 text-lg font-semibold transition-all duration-300 ${
            mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* === Form Content === */}
      <div className="p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* === Role Toggle (Patient/Hospital) === */}
          <div>
            <Label className="text-sm font-medium text-gray-700">I am a...</Label>
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg p-1 bg-gray-200">
              <button
                type="button"
                onClick={() => handleRoleToggle('patient')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  role === 'patient' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('hospital')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  role === 'hospital' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
                }`}
              >
                Hospital
              </button>
            </div>
          </div>

          {/* === Dynamic Fields Container === */}
          <div className="form-fields-container -mx-2 px-2" style={{ maxHeight: 'calc(100vh - 450px)', overflowY: 'auto' }}>
            {mode === 'login' && (
              <div>
                {loginPatientFields}
                {loginHospitalFields}
              </div>
            )}
            
            {mode === 'signup' && (
              <div>
                {signupPatientFields}
                {signupHospitalFields}
              </div>
            )}
          </div>

          {/* === Error Message === */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* === Submit Button === */}
          <Button
            type="submit"
            className="w-full py-3 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
          >
            {mode === 'login' ? 'Login' : 'Create Account'}
          </Button>
          
          {/* === Toggle Link === */}
          <p className="text-sm text-center text-gray-600">
            {mode === 'login'
              ? "Don't have an account? "
              : "Already have an account? "
            }
            <button
              type="button"
              onClick={() => handleModeToggle(mode === 'login' ? 'signup' : 'login')}
              className="font-medium text-blue-600 hover:underline"
            >
              {mode === 'login' ? 'Sign up here' : 'Login here'}
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}