"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EmergencyButton } from "@/components/EmergencyButton";
import { hospitalsData } from "@/data/hospitalsData";
import { Heart, MapPin, Phone, Navigation, Droplets } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BloodBankPage() {
  const [activeTab, setActiveTab] = useState<"nearest" | "emergency">("nearest");
  const [isSearching, setIsSearching] = useState(false);
  const [nearestBanks, setNearestBanks] = useState<typeof hospitalsData>([]);
  const [emergencyForm, setEmergencyForm] = useState({
    patientName: "",
    bloodGroup: "",
    contactNumber: "",
    hospitalCity: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const bloodBankHospitals = hospitalsData.filter((h) => h.hasBloodBank);

  const handleFindNearest = () => {
    setIsSearching(true);
    // Simulate location detection and finding nearest banks
    setTimeout(() => {
      setNearestBanks(bloodBankHospitals.slice(0, 5));
      setIsSearching(false);
    }, 1500);
  };

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Emergency blood request submitted!\nPatient: ${emergencyForm.patientName}\nBlood Group: ${emergencyForm.bloodGroup}\nContact: ${emergencyForm.contactNumber}\nLocation: ${emergencyForm.hospitalCity}\n\nOur team will contact you shortly.`
    );
    setEmergencyForm({
      patientName: "",
      bloodGroup: "",
      contactNumber: "",
      hospitalCity: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Heart className="h-16 w-16 mx-auto mb-4" fill="white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blood Bank Network</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Find blood banks near you or submit an emergency blood request
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <Button
              variant={activeTab === "nearest" ? "default" : "ghost"}
              onClick={() => setActiveTab("nearest")}
              className={activeTab === "nearest" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Nearest Blood Banks
            </Button>
            <Button
              variant={activeTab === "emergency" ? "default" : "ghost"}
              onClick={() => setActiveTab("emergency")}
              className={activeTab === "emergency" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              <Droplets className="h-4 w-4 mr-2" />
              Emergency Request
            </Button>
          </div>
        </div>

        {/* Nearest Blood Banks Tab */}
        {activeTab === "nearest" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-red-600" />
                  <span>Find Nearest Blood Banks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    Click the button below to detect your location and find nearby blood banks
                  </p>
                  <Button
                    onClick={handleFindNearest}
                    disabled={isSearching}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {isSearching ? "Searching..." : "Find Nearest Blood Banks"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {nearestBanks.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Blood Banks Near You ({nearestBanks.length})
                </h3>
                {nearestBanks.map((hospital) => (
                  <Card key={hospital.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <Heart className="h-5 w-5 text-red-600" fill="currentColor" />
                            <span>{hospital.name}</span>
                          </h4>
                          <div className="flex items-start space-x-1 text-sm text-gray-600 mt-2">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{hospital.address}</span>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-3">
                            <a
                              href={`tel:${hospital.contact}`}
                              className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
                            >
                              <Phone className="h-3 w-3" />
                              <span>{hospital.contact}</span>
                            </a>
                            {hospital.emergencyWard && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                24/7 Available
                              </span>
                            )}
                          </div>
                        </div>
                        <a href={`tel:${hospital.contact}`}>
                          <Button className="bg-red-600 hover:bg-red-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* All Blood Banks */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">All Blood Banks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bloodBankHospitals.map((hospital) => (
                  <Card key={hospital.id}>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-gray-900 mb-1">{hospital.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{hospital.city}</p>
                      <a
                        href={`tel:${hospital.contact}`}
                        className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{hospital.contact}</span>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Emergency Request Tab */}
        {activeTab === "emergency" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Droplets className="h-5 w-5" />
                <span>Emergency Blood Request</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmergencySubmit} className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  <strong>Important:</strong> This is for emergency requests only. Our team will
                  verify and contact you as soon as possible.
                </div>

                <div>
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    required
                    value={emergencyForm.patientName}
                    onChange={(e) =>
                      setEmergencyForm({ ...emergencyForm, patientName: e.target.value })
                    }
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <Label htmlFor="bloodGroup">Blood Group Required *</Label>
                  <Select
                    value={emergencyForm.bloodGroup}
                    onValueChange={(value) =>
                      setEmergencyForm({ ...emergencyForm, bloodGroup: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    required
                    value={emergencyForm.contactNumber}
                    onChange={(e) =>
                      setEmergencyForm({ ...emergencyForm, contactNumber: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="hospitalCity">Hospital / City *</Label>
                  <Input
                    id="hospitalCity"
                    required
                    value={emergencyForm.hospitalCity}
                    onChange={(e) =>
                      setEmergencyForm({ ...emergencyForm, hospitalCity: e.target.value })
                    }
                    placeholder="Enter hospital name or city"
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Droplets className="h-4 w-4 mr-2" />
                  Submit Emergency Request
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <EmergencyButton />
    </div>
  );
}
