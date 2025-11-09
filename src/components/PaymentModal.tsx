"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Banknote,
  Smartphone,
  Hospital,
  User,
  Calendar,
  Lock,
} from "lucide-react";
import type { Doctor } from "@/data/hospitalsData";

// --- SVG LOGOS (Self-contained) ---

const VisaLogo = () => (
  <svg
    width="32"
    height="20"
    viewBox="0 0 32 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.563 0H7.38C6.076 0 5.012 1.01 4.903 2.31L0.03 17.69C-0.08 18.99 0.983 20 2.288 20H24.571c1.304 0 2.368-1.01 2.477-2.31L31.921 2.31C32.03 1.01 30.867 0 29.563 0Z"
      fill="#1A1F71"
    />
    <path
      d="M13.68 15.632L11.077 4.368H8.16L5.556 15.632H8.568l.493-2.352h3.04l.58 2.352h1.001Zm-1.52-4.664H9.98l.942-3.808.235-.984h.047l.212.984.942 3.808H12.16Zm5.942 4.664L16.208 8.4h-2.58l3.6 7.232h2.722Zm.728-7.232L16.208 15.632h2.88l4.105-11.264h-2.88l-1.63 4.48-1.096-4.48h-2.8l1.096 4.48-1.096-4.48h-2.8l1.096 4.48L16.208 8.4h-2.58l3.6 7.232h2.722Zm6.48-4.32V4.368h-4.392l-1.024 8.712-1.392-7.224h-2.58l1.647 11.264h2.88l1.07-8.712 1.344 7.224h2.58l-1.647-11.264h2.88Z"
      fill="white"
    />
  </svg>
);

const MastercardLogo = () => (
  <svg
    width="32"
    height="20"
    viewBox="0 0 40 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12.5" cy="12.5" r="12.5" fill="#EB001B" />
    <circle cx="27.5" cy="12.5" r="12.5" fill="#F79E1B" fillOpacity="0.8" />
  </svg>
);

// --- NEW UPI APP LOGOS ---
const GooglePayLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M108.3 106.8h41.4c-2.4 12.6-9.8 23.3-21.2 29.8l-19 11.4c-7.2-6.5-12.7-14.7-16-24.2l-1.3-3.6c-1.2-3.3-1.6-6.7-1.6-10.2c0-1.1-.1-2.2 0-3.2z"
      fill="#34A853"
    />
    <path
      d="M130.3 43.6c-11.8 0-22.6 3.9-31.1 10.7l16.1 12.9c3.9-3 8.8-4.9 14.3-4.9c8.2 0 15.6 3.4 20.8 8.9l.9 1l17.7-14.2c-10.3-9.5-23.7-15.4-38.7-15.4z"
      fill="#EA4335"
    />
    <path
      d="M57.9 76.5c-6.1 9.3-9.6 20.3-9.6 32.2c0 11.9 3.6 22.9 9.6 32.2l-18.4 14.7C30.4 140 24 124.9 24 108.7c0-16.1 6.3-31.2 15.5-42.2l18.4 14.5v.5z"
      fill="#F9BC05"
    />
    <path
      d="M130.3 173.8c-11.7 0-21.7-3.2-29.6-8.9l-18.1 14.5c9.2 7.1 20.9 11.2 33.7 11.2c21.8 0 41.3-9.7 54.3-25.8l-18.3-14.6c-5.7 6.4-13.6 10.4-22 10.4z"
      fill="#4285F4"
    />
    <path
      d="M228 108.7c0-7.3-0.7-14.5-2-21.3H128.6v40.3h56.6c-2.6 12.8-10.1 23.6-21.2 30.2l-0.1 0.1l18.3 14.6l0.2-0.1c17.5-16.1 27.8-39.1 27.8-63.8z"
      fill="#4285F4"
    />
  </svg>
);

const PhonePeLogo = () => (
  <svg width="24" height="24" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path
        d="M26 0C11.64 0 0 11.64 0 26s11.64 26 26 26 26-11.64 26-26S40.36 0 26 0z"
        fill="#5F259F"
      />
      <path
        d="M37.81 18.15c-1.37-1.93-3.28-3.02-5.74-3.02-3.79 0-6.73 1.94-8.48 5.75-.82 1.77-1.22 3.61-1.22 5.51 0 1.9.4 3.74 1.22 5.51 1.76 3.81 4.7 5.75 8.48 5.75 2.45 0 4.37-1.09 5.74-3.02 1.05-1.48 1.58-3.14 1.58-4.99s-.53-3.5-1.58-4.99zM30.4 26.18c.6-1.57 1.57-2.35 2.91-2.35 1.1 0 1.8.53 2.1 1.57.14.47.21.98.21 1.52s-.07 1.05-.21 1.52c-.3.98-1 1.57-2.1 1.57-1.34 0-2.31-.78-2.91-2.35-.14-.39-.21-.8-.21-1.23s.07-.84.21-1.23z"
        fill="#FFF"
      />
      <path
        d="M19.34 32.89h-1.3v-4.71h-3.02v-1.18h3.02v-3.76h1.3v3.76h3.2v1.18h-3.2z"
        fill="#FFF"
      />
    </g>
  </svg>
);

const PaytmLogo = () => (
  <svg width="24" height="24" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.9 44.5l8.7-33.3c.4-1.2 1.6-1.9 2.8-1.5l18.2 4.7c1.2.3 2 1.5 1.7 2.7l-8.7 33.3c-.4 1.2-1.6 1.9-2.8 1.5L11.6 47c-1.2-.3-2-1.5-1.7-2.5zM38.8 4.2L57 9c1.2.3 2 1.5 1.7 2.7l-3.3 12.6c-.3 1.2-1.5 2-2.7 1.7L34.5 21c-1.2-.3-2-1.5-1.7-2.7l3.3-12.6c.3-1.1 1.4-1.8 2.7-1.5zM44.4 27.7l18.2 4.7c1.2.3 2 1.5 1.7 2.7l-8.7 33.3c-.4 1.2-1.6 1.9-2.8 1.5L34.5 65c-1.2-.3-2-1.5-1.7-2.7l8.7-33.1c.4-1.2 1.6-1.9 2.9-1.5z"
      fill="#00baf2"
    />
    <path
      d="M85.9 44.5l8.7-33.3c.4-1.2 1.6-1.9 2.8-1.5l18.2 4.7c1.2.3 2 1.5 1.7 2.7l-8.7 33.3c-.4 1.2-1.6 1.9-2.8 1.5L87.6 47c-1.2-.3-2-1.5-1.7-2.5zM63 4.2L81.2 9c1.2.3 2 1.5 1.7 2.7l-3.3 12.6c-.3 1.2-1.5 2-2.7 1.7L58.7 21c-1.2-.3-2-1.5-1.7-2.7l3.3-12.6c.3-1.1 1.4-1.8 2.7-1.5zM68.6 27.7l18.2 4.7c1.2.3 2 1.5 1.7 2.7l-8.7 33.3c-.4 1.2-1.6 1.9-2.8 1.5L58.7 65c-1.2-.3-2-1.5-1.7-2.7l8.7-33.1c.3-1.2 1.5-1.9 2.9-1.5z"
      fill="#0d2e81"
    />
  </svg>
);

// --- End of SVG LOGOS ---

interface PaymentModalProps {
  doctor: Doctor;
}

export function PaymentModal({ doctor }: PaymentModalProps) {
  const handlePayment = (method: string) => {
    // In a real app, this would trigger the specific payment SDK or API
    alert(`Payment initiated via ${method} for ₹${doctor.consultationFee}`);
    // You would close the modal on success
  };

  return (
    <>
      <DialogHeader className="p-6">
        <DialogTitle className="text-2xl font-bold">
          Select Payment Method
        </DialogTitle>
        <DialogDescription>
          Pay ₹{doctor.consultationFee} for your appointment with{" "}
          {doctor.name}
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="upi" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-2 bg-gray-100">
          <TabsTrigger value="upi" className="flex-col h-full py-2">
            <Smartphone className="h-5 w-5 mb-1" />
            <span className="text-xs">UPI</span>
          </TabsTrigger>
          <TabsTrigger value="card" className="flex-col h-full py-2">
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs">Card</span>
          </TabsTrigger>
          <TabsTrigger value="netbanking" className="flex-col h-full py-2">
            <Banknote className="h-5 w-5 mb-1" />
            <span className="text-xs">Net Banking</span>
          </TabsTrigger>
          <TabsTrigger value="reception" className="flex-col h-full py-2">
            <Hospital className="h-5 w-5 mb-1" />
            <span className="text-xs">Pay at Hospital</span>
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          {/* --- UPDATED UPI Tab --- */}
          <TabsContent value="upi" className="space-y-6">
            <div className="space-y-2">
              <Label>Pay with UPI Apps</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="h-14 flex items-center justify-center gap-2"
                  onClick={() => handlePayment("Google Pay")}
                >
                  <GooglePayLogo />
                  <span className="hidden sm:inline">Google Pay</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-14 flex items-center justify-center gap-2"
                  onClick={() => handlePayment("PhonePe")}
                >
                  <PhonePeLogo />
                  <span className="hidden sm:inline">PhonePe</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-14 flex items-center justify-center gap-2"
                  onClick={() => handlePayment("Paytm")}
                >
                  <PaytmLogo />
                  <span className="hidden sm:inline">Paytm</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex-1 border-t" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 border-t" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="upi-id">Pay using UPI ID</Label>
              <div className="flex space-x-2">
                <Input id="upi-id" placeholder="your-id@upi" />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePayment("UPI ID")}
                >
                  Verify
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* --- Card Tab --- */}
          <TabsContent value="card" className="space-y-6">
            <div className="flex items-center space-x-2">
              <VisaLogo />
              <MastercardLogo />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input id="card-name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="expiry" placeholder="MM/YY" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="cvv" placeholder="123" className="pl-10" />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handlePayment("Credit/Debit Card")}
            >
              Pay Securely
            </Button>
          </TabsContent>

          {/* --- Net Banking Tab --- */}
          <TabsContent value="netbanking" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bank">Select Your Bank</Label>
              <Select>
                <SelectTrigger id="bank">
                  <SelectValue placeholder="Choose a bank..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="other">Other Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handlePayment("Net Banking")}
            >
              Continue to Bank
            </Button>
          </TabsContent>

          {/* --- Pay at Reception Tab --- */}
          <TabsContent value="reception" className="space-y-6 text-center">
            <Hospital className="h-16 w-16 text-blue-600 mx-auto" />
            <h3 className="text-lg font-medium">Pay at Hospital</h3>
            <p className="text-sm text-gray-600">
              You can choose to pay directly at the hospital reception after your
              appointment.
            </p>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handlePayment("Pay at Reception")}
            >
              Confirm Booking
            </Button>
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}