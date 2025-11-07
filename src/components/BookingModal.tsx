"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Doctor } from "@/data/hospitalsData";

interface BookingModalProps {
  doctor: Doctor;
  hospitalName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ doctor, hospitalName, isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    symptoms: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Appointment booked successfully with ${doctor.name}!\nDate: ${formData.date}\nTime: ${formData.time}`);
      onClose();
      setFormData({
        patientName: "",
        age: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        symptoms: "",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment with {doctor.name} at {hospitalName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Doctor Info Summary */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
            <p className="text-sm text-blue-600">{doctor.specialization}</p>
            <p className="text-sm text-gray-600 mt-1">{hospitalName}</p>
            <p className="text-sm font-semibold text-green-600 mt-2">
              Consultation Fee: ₹{doctor.consultationFee}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Name */}
            <div>
              <Label htmlFor="patientName">
                <User className="h-4 w-4 inline mr-1" />
                Patient Name *
              </Label>
              <Input
                id="patientName"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                required
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">
                <Mail className="h-4 w-4 inline mr-1" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="time">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <Label htmlFor="symptoms">
                <FileText className="h-4 w-4 inline mr-1" />
                Symptoms / Reason for Visit
              </Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                placeholder="Describe your symptoms or reason for consultation"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
