"use client";

import { useState } from "react";
import { MapPin, Phone, Bed, AlertCircle, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hospital } from "@/data/hospitalsData";
import { DoctorCard } from "./DoctorCard";
import { HospitalDetailModal } from "./HospitalDetailModal";

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span>{hospital.name}</span>
              </CardTitle>
              <div className="flex items-start space-x-1 text-sm text-gray-600 mt-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{hospital.address}</span>
              </div>
            </div>
            {hospital.emergencyWard && (
              <Badge className="bg-red-600 text-white">
                <AlertCircle className="h-3 w-3 mr-1" />
                Emergency
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <a
              href={`tel:${hospital.contact}`}
              className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
            >
              <Phone className="h-3 w-3" />
              <span>{hospital.contact}</span>
            </a>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Bed className="h-4 w-4" />
              <span>{hospital.availableBeds} beds available</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{hospital.workingHours}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {hospital.cashless && (
              <Badge variant="secondary" className="text-xs">Cashless</Badge>
            )}
            {hospital.governmentFacility && (
              <Badge variant="secondary" className="text-xs">Government</Badge>
            )}
            {hospital.hasBloodBank && (
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">Blood Bank</Badge>
            )}
            {hospital.hasICU && (
              <Badge variant="secondary" className="text-xs">ICU Available</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Departments */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Departments</h4>
            <div className="flex flex-wrap gap-1.5">
              {hospital.departments.slice(0, 4).map((dept) => (
                <span
                  key={dept}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                >
                  {dept}
                </span>
              ))}
              {hospital.departments.length > 4 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{hospital.departments.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Doctors */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Available Doctors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hospital.doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} hospitalName={hospital.name} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDetails(true)}
            >
              View Details
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Book Appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      <HospitalDetailModal
        hospital={hospital}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
