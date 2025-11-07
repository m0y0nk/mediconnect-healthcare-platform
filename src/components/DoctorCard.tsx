"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, IndianRupee, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/data/hospitalsData";
import { BookingModal } from "./BookingModal";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
  hospitalName: string;
}

export function DoctorCard({ doctor, hospitalName }: DoctorCardProps) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
        <div className="flex space-x-3">
          {/* Doctor Photo */}
          <div className="relative">
            <Image
              src={doctor.photo}
              alt={doctor.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            {/* Availability Indicator */}
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                doctor.available ? "bg-green-500" : "bg-gray-500"
              }`}
              title={doctor.available ? "Available" : "Unavailable"}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-sm text-gray-900 truncate">{doctor.name}</h5>
            <p className="text-xs text-blue-600 font-medium">{doctor.specialization}</p>

            <div className="space-y-1 mt-2">
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <GraduationCap className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{doctor.education}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Briefcase className="h-3 w-3 flex-shrink-0" />
                <span>{doctor.experience} years experience</span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-semibold text-green-600">
                <IndianRupee className="h-3 w-3 flex-shrink-0" />
                <span>₹{doctor.consultationFee}</span>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full mt-3 h-8 text-xs bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowBooking(true)}
              disabled={!doctor.available}
            >
              <Calendar className="h-3 w-3 mr-1" />
              {doctor.available ? "Book Now" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        doctor={doctor}
        hospitalName={hospitalName}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </>
  );
}
