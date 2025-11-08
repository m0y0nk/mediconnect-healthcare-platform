"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { hospitalsData } from "@/data/hospitalsData"; 

import { HospitalCard } from "@/components/HospitalCard"; 

// Import all the Shadcn components you are using
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Get all unique specializations and cities for the filter lists
const allSpecializations = Array.from(
  new Set(hospitalsData.flatMap((h) => h.departments))
);
const allCities = Array.from(new Set(hospitalsData.map((h) => h.city)));

// This component contains all your original page logic
export default function CategoryFilters() {
  const searchParams = useSearchParams();

  // State for all filters
  const [city, setCity] = useState(searchParams.get("city") || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]); // [min, max]
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  
  // The keys here (e.g., 'icu', 'bloodBank') are just for our state
  const [facilities, setFacilities] = useState({
    cashless: false,
    icu: false,
    bloodBank: false,
    emergency: false,
  });

  // Handle specialization checkbox changes
  const handleSpecChange = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  // Handle facility checkbox changes
  const handleFacilityChange = (facility: keyof typeof facilities) => {
    setFacilities((prev) => ({
      ...prev,
      [facility]: !prev[facility],
    }));
  };

  // Memoized filtering logic
  const filteredHospitals = useMemo(() => {
    return hospitalsData.filter((hospital) => {
      // Filter by city
      if (city !== "all" && hospital.city !== city) {
        return false;
      }

      // Filter by search term (hospital name or department)
      if (
        searchTerm &&
        !hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !hospital.departments.some((dept) =>
          dept.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      // Filter by price range (checking doctor fees)
      const inPriceRange = hospital.doctors.some(
        (d) => d.consultationFee <= priceRange[1]
      );
      if (!inPriceRange) {
        return false;
      }

      // Filter by selected specializations
      if (
        selectedSpecs.length > 0 &&
        !selectedSpecs.every((spec) => hospital.departments.includes(spec))
      ) {
        return false;
      }

      // --- THIS IS THE FIX ---
      // Matching the state keys to the *actual* property names in your data
      if (facilities.cashless && !hospital.cashless) return false;
      if (facilities.icu && !hospital.hasICU) return false;
      if (facilities.bloodBank && !hospital.hasBloodBank) return false;
      if (facilities.emergency && !hospital.emergencyWard) return false; // The correct property is emergencyWard
      // --- END OF FIX ---

      return true;
    });
  }, [city, searchTerm, priceRange, selectedSpecs, facilities]);

  // This is all the JSX from your original page
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- FILTERS SIDEBAR --- */}
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Refine Your Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* City Filter */}
              <div>
                <Label htmlFor="city-select">Select City</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city-select">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {allCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Filter */}
              <div>
                <Label htmlFor="search-term">Search Hospital or Dept.</Label>
                <div className="relative">
                  <Input
                    id="search-term"
                    placeholder="e.g. Apollo or Cardiology"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <Label>Consultation Fee (Max: ₹{priceRange[1]})</Label>
                <Slider
                  min={0}
                  max={2000}
                  step={100}
                  value={[priceRange[1]]} // Control the high-end of the range
                  onValueChange={(value) => setPriceRange([0, value[0]])}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.keys(facilities).map((fac) => (
                <div key={fac} className="flex items-center space-x-2">
                  <Checkbox
                    id={fac}
                    checked={facilities[fac as keyof typeof facilities]}
                    onCheckedChange={() =>
                      handleFacilityChange(fac as keyof typeof facilities)
                    }
                  />
                  <Label htmlFor={fac} className="capitalize font-normal">
                    {/* This logic just formats the label (e.g. 'bloodBank' -> 'Blood Bank') */}
                    {fac.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-60 overflow-y-auto">
              {allSpecializations.map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox
                    id={spec}
                    checked={selectedSpecs.includes(spec)}
                    onCheckedChange={() => handleSpecChange(spec)}
                  />
                  <Label htmlFor={spec} className="font-normal">
                    {spec}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* --- HOSPITAL LISTINGS --- */}
        <main className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">
            Found {filteredHospitals.length} Hospitals
          </h1>
          {filteredHospitals.length > 0 ? (
            <div className="space-y-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No Hospitals Found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to find a match.
              </p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}