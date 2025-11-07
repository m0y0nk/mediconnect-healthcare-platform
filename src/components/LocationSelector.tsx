"use client";

import { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cities } from "@/data/hospitalsData";

interface LocationSelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function LocationSelector({ selectedCity, onCityChange }: LocationSelectorProps) {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  useEffect(() => {
    // Show location popup on first load
    const hasSeenPopup = localStorage.getItem("hasSeenLocationPopup");
    if (!hasSeenPopup) {
      setShowLocationPopup(true);
    }
  }, []);

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding to get the city
          // For now, we'll just set a default city
          onCityChange("Bhopal");
          localStorage.setItem("hasSeenLocationPopup", "true");
          setShowLocationPopup(false);
        },
        (error) => {
          setLocationDenied(true);
        }
      );
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenLocationPopup", "true");
    setShowLocationPopup(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-lg shadow-md">
        <MapPin className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">Select Location:</span>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Choose a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Access Popup */}
      <Dialog open={showLocationPopup} onOpenChange={setShowLocationPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Enable Location Access</span>
            </DialogTitle>
            <DialogDescription>
              Allow MediConnect to access your location to find nearby hospitals and emergency services.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {locationDenied && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                Location access denied. You can manually select your city below.
              </div>
            )}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
              >
                Skip
              </Button>
              <Button
                onClick={handleAllowLocation}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Allow Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
