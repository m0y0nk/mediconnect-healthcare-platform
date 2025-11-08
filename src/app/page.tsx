"use client";

import { useState } from "react";
import { EmergencyButton } from "@/components/EmergencyButton";
import { LocationSelector } from "@/components/LocationSelector";
import { HospitalCard } from "@/components/HospitalCard";
import { hospitalsData } from "@/data/hospitalsData";
import { Hospital, Stethoscope, Users, HeartPulse, Search, MapPin, CheckCircle, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Bhopal");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const router = useRouter();

  const filteredHospitals = hospitalsData.filter(
    (hospital) => hospital.city === selectedCity
  );

  const handleSearch = (type: "hospital" | "doctor") => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (searchLocation) params.set("location", searchLocation);
    params.set("type", type);
    router.push(`/categories?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* <Navbar /> */}
      
      {/* Hero Section with Enhanced Search */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold animate-fade-in">
              MediConnect — Your Verified Healthcare Partner
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Connecting patients with trusted hospitals and doctors instantly
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search Hospital or Doctor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="City or Location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 h-12 text-base border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleSearch("hospital")}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Hospital className="mr-2 h-5 w-5" />
                  Find Hospitals
                </Button>
                <Button
                  onClick={() => handleSearch("doctor")}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Find Doctors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 -mt-4 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm md:text-base flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-gray-800">Trusted by patients across India</span>
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="flex justify-center mb-2">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600">50+</div>
              <div className="text-xs md:text-sm text-gray-600">Verified Hospitals</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex justify-center mb-2">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-green-600">200+</div>
              <div className="text-xs md:text-sm text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
              <div className="flex justify-center mb-2">
                <HeartPulse className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">24/7</div>
              <div className="text-xs md:text-sm text-gray-600">Emergency Support</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600">100%</div>
              <div className="text-xs md:text-sm text-gray-600">Verified Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Selector */}
      <section className="max-w-7xl mx-auto px-4 mt-8 relative z-10">
        <LocationSelector
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
      </section>

      {/* What MediConnect Provides */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          What MediConnect Provides
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Comprehensive healthcare solutions at your fingertips
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Hospital className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Hospitals</h3>
            <p className="text-sm text-gray-600">
              Find hospitals with available beds, emergency wards, and specialized departments
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Doctors</h3>
            <p className="text-sm text-gray-600">
              Connect with experienced doctors, check availability, and book appointments online
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-gray-100">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <HeartPulse className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Emergency Services</h3>
            <p className="text-sm text-gray-600">
              Quick access to nearest hospitals with emergency wards and ambulance services
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Blood Bank Network</h3>
            <p className="text-sm text-gray-600">
              Access blood banks and emergency blood donation services across the network
            </p>
          </div>
        </div>
      </section>

      {/* Hospitals List */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hospitals in {selectedCity}
            </h2>
            <p className="text-gray-600 mt-2">
              {filteredHospitals.length} verified hospitals available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-16">
            <Hospital className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No hospitals found</h3>
            <p className="text-gray-500 mt-2">Try selecting a different city</p>
          </div>
        )}
      </section>

      {/* Emergency Button */}
      <EmergencyButton />
    </div>
  );
}