"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import { Navbar } from "@/components/Navbar";
import { EmergencyButton } from "@/components/EmergencyButton";
import { HospitalCard } from "@/components/HospitalCard";
import { hospitalsData, allSpecializations, cities } from "@/data/hospitalsData";
import { Filter, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlLocation = searchParams.get("location") || "";
  const urlType = searchParams.get("type") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCity, setSelectedCity] = useState<string>(urlLocation || "all");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [hasCashless, setHasCashless] = useState(false);
  const [hasICU, setHasICU] = useState(false);
  const [hasBloodBank, setHasBloodBank] = useState(false);
  const [hasEmergency, setHasEmergency] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(urlSearch);
    if (urlLocation) setSelectedCity(urlLocation);
  }, [urlSearch, urlLocation]);

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedSpecializations([]);
    setPriceRange([0, 2000]);
    setHasCashless(false);
    setHasICU(false);
    setHasBloodBank(false);
    setHasEmergency(false);
  };

  // Filter hospitals
  const filteredHospitals = hospitalsData.filter((hospital) => {
    // Search query filter (hospital name or doctor name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const hospitalMatch = hospital.name.toLowerCase().includes(query);
      const doctorMatch = hospital.doctors.some((doc) =>
        doc.name.toLowerCase().includes(query)
      );
      const specializationMatch = hospital.specializations.some((spec) =>
        spec.toLowerCase().includes(query)
      );
      
      // If searching for doctors specifically, prioritize doctor matches
      if (urlType === "doctor" && !doctorMatch) {
        return false;
      }
      
      if (!hospitalMatch && !doctorMatch && !specializationMatch) {
        return false;
      }
    }

    // City filter
    if (selectedCity !== "all" && hospital.city !== selectedCity) {
      return false;
    }

    // Specialization filter
    if (
      selectedSpecializations.length > 0 &&
      !selectedSpecializations.some((spec) => hospital.specializations.includes(spec))
    ) {
      return false;
    }

    // Price filter (check if any doctor is within range)
    const hasMatchingPrice = hospital.doctors.some(
      (doc) => doc.consultationFee >= priceRange[0] && doc.consultationFee <= priceRange[1]
    );
    if (!hasMatchingPrice) {
      return false;
    }

    // Facility filters
    if (hasCashless && !hospital.cashless) return false;
    if (hasICU && !hospital.hasICU) return false;
    if (hasBloodBank && !hospital.hasBloodBank) return false;
    if (hasEmergency && !hospital.emergencyWard) return false;

    return true;
  });

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <span>Filters</span>
        </h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="hover:bg-red-50 hover:text-red-600">
          Clear All
        </Button>
      </div>

      {/* Search Filter */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Hospital or Doctor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* City Filter */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">City</Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Specialization Filter */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Specialization</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {allSpecializations.map((spec) => (
            <div key={spec} className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded transition-colors">
              <Checkbox
                id={spec}
                checked={selectedSpecializations.includes(spec)}
                onCheckedChange={() => toggleSpecialization(spec)}
              />
              <Label htmlFor={spec} className="text-sm font-normal cursor-pointer flex-1">
                {spec}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">
          Consultation Fee: ₹{priceRange[0]} - ₹{priceRange[1]}
        </Label>
        <Slider
          min={0}
          max={2000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
      </div>

      {/* Facilities */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Facilities</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
            <Checkbox
              id="cashless"
              checked={hasCashless}
              onCheckedChange={(checked) => setHasCashless(checked as boolean)}
            />
            <Label htmlFor="cashless" className="text-sm font-normal cursor-pointer flex-1">
              Cashless Treatment
            </Label>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
            <Checkbox
              id="icu"
              checked={hasICU}
              onCheckedChange={(checked) => setHasICU(checked as boolean)}
            />
            <Label htmlFor="icu" className="text-sm font-normal cursor-pointer flex-1">
              ICU Available
            </Label>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
            <Checkbox
              id="bloodbank"
              checked={hasBloodBank}
              onCheckedChange={(checked) => setHasBloodBank(checked as boolean)}
            />
            <Label htmlFor="bloodbank" className="text-sm font-normal cursor-pointer flex-1">
              Blood Bank
            </Label>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
            <Checkbox
              id="emergency"
              checked={hasEmergency}
              onCheckedChange={(checked) => setHasEmergency(checked as boolean)}
            />
            <Label htmlFor="emergency" className="text-sm font-normal cursor-pointer flex-1">
              24/7 Emergency
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* <Navbar /> */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {urlType === "doctor" ? "Find Doctors" : "Browse Hospitals & Doctors"}
          </h1>
          <p className="text-gray-600">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Find the right healthcare provider based on your needs"}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline"
            className="w-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Filters */}
          <aside
            className={`lg:w-80 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-20">
              <FilterPanel />
            </div>
          </aside>

          {/* Right Panel - Results */}
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filteredHospitals.length}</span>{" "}
                hospital{filteredHospitals.length !== 1 ? "s" : ""} found
              </p>
              {(searchQuery || selectedCity !== "all" || selectedSpecializations.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}

              {filteredHospitals.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100">
                  <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No hospitals found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? "Try a different search term or adjust your filters"
                      : "Try adjusting your filters"}
                  </p>
                  <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <EmergencyButton />
    </div>
  );
}