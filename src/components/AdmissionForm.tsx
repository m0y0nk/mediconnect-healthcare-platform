"use client";

import { useState } from "react";
import { User, Phone, MapPin, CreditCard, FileText, CheckCircle } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Hospital } from "@/data/hospitalsData";

interface AdmissionFormProps {
  hospital: Hospital;
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionForm({ hospital, isOpen, onClose }: AdmissionFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    address: "",
    aadhaar: "",
    relativeName: "",
    relationship: "",
    phone: "",
    paymentType: "cash",
    insuranceNumber: "",
    consent: false,
  });
  const [showInsuranceDialog, setShowInsuranceDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentTypeChange = (value: string) => {
    setFormData({ ...formData, paymentType: value });
    if (value === "cashless") {
      setShowInsuranceDialog(true);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please accept the consent form to proceed");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Admission request submitted successfully to ${hospital.name}!\nPatient: ${formData.patientName}\nPayment: ${formData.paymentType === "cash" ? "Cash" : "Cashless"}`);
      onClose();
      // Reset form
      setFormData({
        patientName: "",
        age: "",
        address: "",
        aadhaar: "",
        relativeName: "",
        relationship: "",
        phone: "",
        paymentType: "cash",
        insuranceNumber: "",
        consent: false,
      });
      setStep(1);
    }, 1500);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Hospital Admission Form</DialogTitle>
            <DialogDescription>
              {hospital.name} - Step {step} of 2
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Patient Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Patient Information</h3>

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

                  <div>
                    <Label htmlFor="address">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Address *
                    </Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aadhaar">
                      <CreditCard className="h-4 w-4 inline mr-1" />
                      Aadhaar Number *
                    </Label>
                    <Input
                      id="aadhaar"
                      required
                      maxLength={12}
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="relativeName">Relative's Name *</Label>
                    <Input
                      id="relativeName"
                      required
                      value={formData.relativeName}
                      onChange={(e) => setFormData({ ...formData, relativeName: e.target.value })}
                      placeholder="Enter relative's name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Input
                      id="relationship"
                      required
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      placeholder="e.g., Father, Mother, Spouse"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Contact Number *
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

                  <div>
                    <Label>Payment Type *</Label>
                    <RadioGroup
                      value={formData.paymentType}
                      onValueChange={handlePaymentTypeChange}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="font-normal cursor-pointer">
                          Cash
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cashless" id="cashless" />
                        <Label htmlFor="cashless" className="font-normal cursor-pointer">
                          Cashless (Insurance)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Consent Form */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Consent Form</span>
                  </h3>

                  <div className="p-4 bg-gray-50 rounded-lg space-y-3 max-h-64 overflow-y-auto text-sm">
                    <h4 className="font-semibold">Medical Consent & Authorization</h4>
                    <p>
                      I, <strong>{formData.patientName || "[Patient Name]"}</strong>, hereby give my consent for
                      admission to <strong>{hospital.name}</strong> and authorize the medical staff to administer
                      treatment as deemed necessary.
                    </p>
                    <p>I understand and agree to the following:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>The hospital will provide medical care to the best of their ability</li>
                      <li>I am responsible for all charges incurred during treatment</li>
                      <li>My medical records may be used for treatment and administrative purposes</li>
                      <li>I will follow all hospital rules and regulations</li>
                      <li>Payment terms: <strong>{formData.paymentType === "cash" ? "Cash" : "Cashless (Insurance)"}</strong></li>
                      {formData.paymentType === "cashless" && formData.insuranceNumber && (
                        <li>Insurance Policy Number: <strong>{formData.insuranceNumber}</strong></li>
                      )}
                    </ul>
                    <p className="mt-3">
                      <strong>Emergency Contact:</strong> {formData.relativeName} ({formData.relationship}) - {formData.phone}
                    </p>
                  </div>

                  <div className="flex items-start space-x-2 p-4 border rounded-lg">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consent: checked as boolean })
                      }
                    />
                    <Label htmlFor="consent" className="text-sm cursor-pointer">
                      I have read and agree to the above consent form. I confirm that all the information provided
                      is accurate to the best of my knowledge.
                    </Label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.consent}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Admission Form"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Insurance Number Dialog */}
      <Dialog open={showInsuranceDialog} onOpenChange={setShowInsuranceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Insurance Information</DialogTitle>
            <DialogDescription>Please enter your insurance policy number</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="insuranceNumber">Insurance Policy Number *</Label>
              <Input
                id="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
                placeholder="Enter policy number"
              />
            </div>
            <Button
              onClick={() => setShowInsuranceDialog(false)}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!formData.insuranceNumber}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
