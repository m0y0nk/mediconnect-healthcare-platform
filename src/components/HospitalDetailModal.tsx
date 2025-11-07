"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Bed,
  Clock,
  Building2,
  Shield,
  Heart,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Hospital } from "@/data/hospitalsData";
import { AdmissionForm } from "./AdmissionForm";

interface HospitalDetailModalProps {
  hospital: Hospital;
  isOpen: boolean;
  onClose: () => void;
}

export function HospitalDetailModal({ hospital, isOpen, onClose }: HospitalDetailModalProps) {
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);

  return (
    <>
      <Dialog open={isOpen && !showAdmissionForm} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span>{hospital.name}</span>
            </DialogTitle>
            <DialogDescription>Complete hospital details and facilities</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowAdmissionForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Admission Form
              </Button>
              <a href={`tel:${hospital.contact}`}>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${hospital.contact}`} className="text-blue-600 hover:underline">
                    {hospital.contact}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${hospital.email}`} className="text-blue-600 hover:underline">
                    {hospital.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{hospital.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Facilities & Services</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700">
                  <Bed className="h-3 w-3 mr-1" />
                  {hospital.availableBeds} Beds Available
                </Badge>
                {hospital.emergencyWard && (
                  <Badge className="bg-red-100 text-red-700">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    24/7 Emergency
                  </Badge>
                )}
                {hospital.hasICU && (
                  <Badge className="bg-purple-100 text-purple-700">ICU Available</Badge>
                )}
                {hospital.hasBloodBank && (
                  <Badge className="bg-red-100 text-red-700">
                    <Heart className="h-3 w-3 mr-1" />
                    Blood Bank
                  </Badge>
                )}
                {hospital.cashless && (
                  <Badge className="bg-blue-100 text-blue-700">Cashless Treatment</Badge>
                )}
                {hospital.governmentFacility && (
                  <Badge className="bg-orange-100 text-orange-700">Government Facility</Badge>
                )}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Departments</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {hospital.departments.map((dept) => (
                  <div key={dept} className="p-2 bg-gray-50 rounded text-sm text-center">
                    {dept}
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Partners */}
            {hospital.insurancePartners.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Insurance Partners</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.insurancePartners.map((partner) => (
                    <Badge key={partner} variant="outline">
                      {partner}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Doctors Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Available Doctors</h3>
              <p className="text-sm text-gray-600">
                This hospital has {hospital.doctors.length} doctors across various specializations.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {hospital.specializations.map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admission Form Modal */}
      {showAdmissionForm && (
        <AdmissionForm
          hospital={hospital}
          isOpen={showAdmissionForm}
          onClose={() => {
            setShowAdmissionForm(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
