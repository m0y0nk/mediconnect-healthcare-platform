"use client";

import { useState } from "react";
import { BookingDetailsForm } from "@/components/BookingDetailsForm";
import { PaymentModal } from "@/components/PaymentModal";
import type { Doctor } from "@/data/hospitalsData";

interface MultiStepBookingModalProps {
  doctor: Doctor;
  hospitalName: string; // <-- ADD THIS PROP
}

// This component acts as the "manager" for the multi-step flow
export function MultiStepBookingModal({
  doctor,
  hospitalName, // <-- GET THE PROP
}: MultiStepBookingModalProps) {
  // State to manage which step we are on: "details" or "payment"
  const [step, setStep] = useState<"details" | "payment">("details");

  const handleDetailsConfirm = () => {
    setStep("payment");
  };

  return (
    <div>
      {step === "details" && (
        <BookingDetailsForm
          doctor={doctor}
          hospitalName={hospitalName} // <-- PASS THE PROP
          onConfirm={handleDetailsConfirm}
        />
      )}

      {step === "payment" && <PaymentModal doctor={doctor} />}
    </div>
  );
}