"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Phone, Calendar } from "lucide-react";
import type { Doctor } from "@/data/hospitalsData";

interface BookingDetailsFormProps {
  doctor: Doctor;
  hospitalName: string; // <-- ADD THIS PROP
  onConfirm: () => void;
}

export function BookingDetailsForm({
  doctor,
  hospitalName, // <-- GET THE PROP
  onConfirm,
}: BookingDetailsFormProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Details confirmed, moving to payment...");
    onConfirm();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          Book Appointment
        </DialogTitle>
        <DialogDescription>
          {/* --- THIS IS THE CHANGE --- */}
          {/* We now display the hospitalName here */}
          At: <span className="font-semibold text-gray-700">{hospitalName}</span>
          <br />
          For: {doctor.name} (
          <span className="text-blue-600 font-medium">
            ₹{doctor.consultationFee}
          </span>
          )
          {/* --- END OF CHANGE --- */}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Patient Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input id="name" placeholder="John Doe" required className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="+91 12345 67890"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Appointment Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input id="date" type="date" required className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slot">Time Slot</Label>
          <Select required>
            <SelectTrigger id="slot">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10:00">10:00 AM - 10:30 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM - 11:30 AM</SelectItem>
              <SelectItem value="14:00">02:00 PM - 02:30 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Confirm Details & Proceed to Payment
      </Button>
    </form>
  );
}