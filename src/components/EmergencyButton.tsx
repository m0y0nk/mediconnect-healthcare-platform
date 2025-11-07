"use client";

import { useState } from "react";
import { Bell, X, Phone, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { hospitalsData } from "@/data/hospitalsData";

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectNearest = () => {
    setIsConnecting(true);
    // Simulate finding nearest hospital
    setTimeout(() => {
      setIsConnecting(false);
      alert("Connected to nearest hospital emergency ward!");
    }, 2000);
  };

  const emergencyHospitals = hospitalsData.filter(h => h.emergencyWard);

  return (
    <>
      {/* Sticky Emergency Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl animate-pulse hover:animate-none transition-all transform hover:scale-110"
        aria-label="Emergency"
      >
        <Bell className="h-6 w-6" />
      </button>

      {/* Emergency Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-600 flex items-center space-x-2">
              <Bell className="h-6 w-6" />
              <span>Emergency Services</span>
            </DialogTitle>
            <DialogDescription>
              Connect to the nearest hospital or view emergency contacts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={handleConnectNearest}
                disabled={isConnecting}
                className="bg-red-600 hover:bg-red-700 h-16 text-lg"
              >
                <Navigation className="h-5 w-5 mr-2" />
                {isConnecting ? "Connecting..." : "Connect to Nearest Hospital"}
              </Button>

              <a href="tel:108">
                <Button variant="outline" className="w-full h-16 text-lg border-red-600 text-red-600 hover:bg-red-50">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Ambulance (108)
                </Button>
              </a>
            </div>

            {/* Emergency Hospitals List */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Hospitals with Emergency Ward</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {emergencyHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                        <div className="flex items-start space-x-1 text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <a
                            href={`tel:${hospital.contact}`}
                            className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{hospital.contact}</span>
                          </a>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {hospital.availableBeds} beds available
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          24/7 Emergency
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
