export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  education: string;
  experience: number;
  consultationFee: number;
  available: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  address: string;
  contact: string;
  email: string;
  availableBeds: number;
  emergencyWard: boolean;
  departments: string[];
  specializations: string[];
  cashless: boolean;
  governmentFacility: boolean;
  insurancePartners: string[];
  hasBloodBank: boolean;
  hasICU: boolean;
  workingHours: string;
  latitude: number;
  longitude: number;
  doctors: Doctor[];
}

export const hospitalsData: Hospital[] = [
  // BHOPAL HOSPITALS
  {
    id: "BPL001",
    name: "Bhopal Care Hospital",
    city: "Bhopal",
    address: "Sector B, Arera Colony, Bhopal, Madhya Pradesh 462016",
    contact: "+91 755-2234567",
    email: "info@bhopalcare.com",
    availableBeds: 45,
    emergencyWard: true,
    departments: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine"],
    specializations: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
    cashless: true,
    governmentFacility: false,
    insurancePartners: ["HDFC Ergo", "Star Health", "ICICI Lombard"],
    hasBloodBank: true,
    hasICU: true,
    workingHours: "24/7",
    latitude: 23.2599,
    longitude: 77.4126,
    doctors: [
      {
        id: "D001",
        name: "Dr. Rajesh Kumar",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        specialization: "Cardiologist",
        education: "MBBS, MD (Cardiology), AIIMS Delhi",
        experience: 15,
        consultationFee: 800,
        available: true
      },
      {
        id: "D002",
        name: "Dr. Priya Sharma",
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
        specialization: "Neurologist",
        education: "MBBS, MD (Neurology), PGI Chandigarh",
        experience: 12,
        consultationFee: 700,
        available: true
      },
      {
        id: "D003",
        name: "Dr. Anil Verma",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
        specialization: "Orthopedic Surgeon",
        education: "MBBS, MS (Orthopedics), GMCH Bhopal",
        experience: 10,
        consultationFee: 600,
        available: false
      },
      {
        id: "D004",
        name: "Dr. Sneha Patel",
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
        specialization: "Pediatrician",
        education: "MBBS, MD (Pediatrics), KGMU Lucknow",
        experience: 8,
        consultationFee: 500,
        available: true
      }
    ]
  },
  {
    id: "BPL002",
    name: "Sanjivani Multispecialty Hospital",
    city: "Bhopal",
    address: "MP Nagar Zone 2, Bhopal, Madhya Pradesh 462011",
    contact: "+91 755-4556789",
    email: "contact@sanjivani.com",
    availableBeds: 32,
    emergencyWard: true,
    departments: ["General Surgery", "ENT", "Dermatology", "Gynecology", "Urology"],
    specializations: ["ENT", "Dermatology", "Gynecology", "Urology"],
    cashless: true,
    governmentFacility: false,
    insurancePartners: ["Care Health", "Max Bupa", "Religare"],
    hasBloodBank: false,
    hasICU: true,
    workingHours: "24/7",
    latitude: 23.2344,
    longitude: 77.4345,
    doctors: [
      {
        id: "D005",
        name: "Dr. Amit Singh",
        photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
        specialization: "ENT Specialist",
        education: "MBBS, MS (ENT), BHU Varanasi",
        experience: 14,
        consultationFee: 650,
        available: true
      },
      {
        id: "D006",
        name: "Dr. Kavita Jain",
        photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop",
        specialization: "Dermatologist",
        education: "MBBS, MD (Dermatology), LHMC Delhi",
        experience: 9,
        consultationFee: 550,
        available: true
      },
      {
        id: "D007",
        name: "Dr. Sunita Rao",
        photo: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
        specialization: "Gynecologist",
        education: "MBBS, MS (Obstetrics & Gynecology), JIPMER",
        experience: 11,
        consultationFee: 700,
        available: false
      },
      {
        id: "D008",
        name: "Dr. Vikram Malhotra",
        photo: "https://images.unsplash.com/photo-1613686762133-0b36c5e5c6f5?w=400&h=400&fit=crop",
        specialization: "Urologist",
        education: "MBBS, MS (Urology), CMC Vellore",
        experience: 13,
        consultationFee: 750,
        available: true
      }
    ]
  },
  {
    id: "BPL003",
    name: "Gandhi Medical College Hospital",
    city: "Bhopal",
    address: "Royal Market, Bhopal, Madhya Pradesh 462001",
    contact: "+91 755-2740444",
    email: "gmc@gov.in",
    availableBeds: 120,
    emergencyWard: true,
    departments: ["General Medicine", "Surgery", "Pediatrics", "Orthopedics", "Oncology"],
    specializations: ["General Medicine", "Surgery", "Oncology"],
    cashless: true,
    governmentFacility: true,
    insurancePartners: ["Ayushman Bharat", "CGHS", "ESIC"],
    hasBloodBank: true,
    hasICU: true,
    workingHours: "24/7",
    latitude: 23.2494,
    longitude: 77.4179,
    doctors: [
      {
        id: "D009",
        name: "Dr. Ramesh Tiwari",
        photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
        specialization: "General Physician",
        education: "MBBS, MD (General Medicine), GMC Bhopal",
        experience: 20,
        consultationFee: 300,
        available: true
      },
      {
        id: "D010",
        name: "Dr. Meera Deshmukh",
        photo: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop",
        specialization: "General Surgeon",
        education: "MBBS, MS (Surgery), GMC Bhopal",
        experience: 18,
        consultationFee: 400,
        available: true
      },
      {
        id: "D011",
        name: "Dr. Suresh Gupta",
        photo: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=400&h=400&fit=crop",
        specialization: "Oncologist",
        education: "MBBS, MD (Oncology), Tata Memorial Mumbai",
        experience: 16,
        consultationFee: 500,
        available: false
      }
    ]
  },

  // INDORE HOSPITALS
  {
    id: "IND001",
    name: "Apollo Indore Hospital",
    city: "Indore",
    address: "Scheme No. 74C, Vijay Nagar, Indore, Madhya Pradesh 452010",
    contact: "+91 731-4567890",
    email: "info@apolloindore.com",
    availableBeds: 85,
    emergencyWard: true,
    departments: ["Cardiology", "Neurosurgery", "Gastroenterology", "Nephrology", "Pulmonology"],
    specializations: ["Cardiology", "Neurosurgery", "Gastroenterology", "Nephrology"],
    cashless: true,
    governmentFacility: false,
    insurancePartners: ["Star Health", "Apollo Munich", "HDFC Ergo", "Bajaj Allianz"],
    hasBloodBank: true,
    hasICU: true,
    workingHours: "24/7",
    latitude: 22.7532,
    longitude: 75.8937,
    doctors: [
      {
        id: "D012",
        name: "Dr. Ashok Mehta",
        photo: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop",
        specialization: "Cardiologist",
        education: "MBBS, DM (Cardiology), AIIMS Delhi",
        experience: 22,
        consultationFee: 1200,
        available: true
      },
      {
        id: "D013",
        name: "Dr. Nandini Kulkarni",
        photo: "https://images.unsplash.com/photo-1629905376732-0fbb0e586ce0?w=400&h=400&fit=crop",
        specialization: "Neurosurgeon",
        education: "MBBS, MCh (Neurosurgery), NIMHANS Bangalore",
        experience: 17,
        consultationFee: 1500,
        available: true
      },
      {
        id: "D014",
        name: "Dr. Ravi Agarwal",
        photo: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=400&fit=crop",
        specialization: "Gastroenterologist",
        education: "MBBS, DM (Gastroenterology), CMC Vellore",
        experience: 14,
        consultationFee: 1000,
        available: false
      },
      {
        id: "D015",
        name: "Dr. Anjali Rao",
        photo: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
        specialization: "Nephrologist",
        education: "MBBS, DM (Nephrology), PGI Chandigarh",
        experience: 12,
        consultationFee: 900,
        available: true
      }
    ]
  },
  {
    id: "IND002",
    name: "CHL Hospital Indore",
    city: "Indore",
    address: "AB Road, Near BRTS Bus Stop, Indore, Madhya Pradesh 452008",
    contact: "+91 731-6677889",
    email: "info@chlhospital.com",
    availableBeds: 60,
    emergencyWard: true,
    departments: ["Orthopedics", "Plastic Surgery", "Ophthalmology", "Dental", "Radiology"],
    specializations: ["Orthopedics", "Plastic Surgery", "Ophthalmology"],
    cashless: true,
    governmentFacility: false,
    insurancePartners: ["ICICI Lombard", "Max Bupa", "Religare", "Aditya Birla"],
    hasBloodBank: false,
    hasICU: true,
    workingHours: "24/7",
    latitude: 22.7196,
    longitude: 75.8577,
    doctors: [
      {
        id: "D016",
        name: "Dr. Manoj Joshi",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        specialization: "Orthopedic Surgeon",
        education: "MBBS, MS (Orthopedics), KEM Mumbai",
        experience: 19,
        consultationFee: 850,
        available: true
      },
      {
        id: "D017",
        name: "Dr. Pooja Saxena",
        photo: "https://images.unsplash.com/photo-1590611936760-eeb9bc598548?w=400&h=400&fit=crop",
        specialization: "Plastic Surgeon",
        education: "MBBS, MCh (Plastic Surgery), Safdarjung Delhi",
        experience: 11,
        consultationFee: 1100,
        available: true
      },
      {
        id: "D018",
        name: "Dr. Sandeep Dubey",
        photo: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?w=400&h=400&fit=crop",
        specialization: "Ophthalmologist",
        education: "MBBS, MS (Ophthalmology), AIIMS Delhi",
        experience: 13,
        consultationFee: 700,
        available: false
      },
      {
        id: "D019",
        name: "Dr. Ritu Sharma",
        photo: "https://images.unsplash.com/photo-1624979345606-791e0a0a4cfd?w=400&h=400&fit=crop",
        specialization: "Dentist",
        education: "BDS, MDS (Prosthodontics), Govt Dental College",
        experience: 8,
        consultationFee: 400,
        available: true
      }
    ]
  },
  {
    id: "IND003",
    name: "MY Hospital Indore",
    city: "Indore",
    address: "MG Road, Indore, Madhya Pradesh 452001",
    contact: "+91 731-2536969",
    email: "myhospital@gov.in",
    availableBeds: 250,
    emergencyWard: true,
    departments: ["Emergency Medicine", "General Surgery", "Medicine", "Pediatrics", "Obstetrics"],
    specializations: ["Emergency Medicine", "General Surgery", "General Medicine"],
    cashless: true,
    governmentFacility: true,
    insurancePartners: ["Ayushman Bharat", "CGHS", "ESIC", "State Health"],
    hasBloodBank: true,
    hasICU: true,
    workingHours: "24/7",
    latitude: 22.7196,
    longitude: 75.8577,
    doctors: [
      {
        id: "D020",
        name: "Dr. Prakash Jain",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
        specialization: "Emergency Physician",
        education: "MBBS, MD (Emergency Medicine), MGM Indore",
        experience: 15,
        consultationFee: 250,
        available: true
      },
      {
        id: "D021",
        name: "Dr. Shweta Tripathi",
        photo: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
        specialization: "General Surgeon",
        education: "MBBS, MS (Surgery), MGM Indore",
        experience: 16,
        consultationFee: 300,
        available: true
      },
      {
        id: "D022",
        name: "Dr. Deepak Chouhan",
        photo: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=400&h=400&fit=crop",
        specialization: "General Physician",
        education: "MBBS, MD (Medicine), MGM Indore",
        experience: 21,
        consultationFee: 200,
        available: true
      }
    ]
  },

  // JABALPUR HOSPITALS
  {
    id: "JBP001",
    name: "Sanjay Gandhi Memorial Hospital",
    city: "Jabalpur",
    address: "Napier Town, Jabalpur, Madhya Pradesh 482001",
    contact: "+91 761-2621234",
    email: "info@sgmh.com",
    availableBeds: 55,
    emergencyWard: true,
    departments: ["Cardiology", "Neurology", "Pulmonology", "Pediatrics", "Orthopedics"],
    specializations: ["Cardiology", "Neurology", "Pulmonology", "Pediatrics"],
    cashless: true,
    governmentFacility: false,
    insurancePartners: ["Star Health", "HDFC Ergo", "Care Health"],
    hasBloodBank: true,
    hasICU: true,
    workingHours: "24/7",
    latitude: 23.1815,
    longitude: 79.9864,
    doctors: [
      {
        id: "D023",
        name: "Dr. Sanjay Mishra",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        specialization: "Cardiologist",
        education: "MBBS, MD, DM (Cardiology), NSCB Jabalpur",
        experience: 16,
        consultationFee: 750,
        available: true
      },
      {
        id: "D024",
        name: "Dr. Vandana Singh",
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
        specialization: "Neurologist",
        education: "MBBS, MD (Neurology), AIIMS Bhopal",
        experience: 11,
        consultationFee: 650,
        available: true
      },
      {
        id: "D025",
        name: "Dr. Alok Pandey",
        photo: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop",
        specialization: "Pulmonologist",
        education: "MBBS, MD (Pulmonology), PGIMER Chandigarh",
        experience: 10,
        consultationFee: 600,
        available: false
      },
      {
        id: "D026",
        name: "Dr. Rekha Dwivedi",
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
        specialization: "Pediatrician",
        education: "MBBS, MD (Pediatrics), NSCB Jabalpur",
        experience: 9,
        consultationFee: 450,
        available: true
      }
    ]
  },
  {
    id: "JBP002",
    name: "Victoria Hospital",
    city: "Jabalpur",
    address: "Civil Lines, Jabalpur, Madhya Pradesh 482001",
    contact: "+91 761-2677788",
    email: "victoria@hospital.com",
    availableBeds: 40,
    emergencyWard: true,
    departments: ["General Medicine", "Surgery", "ENT", "Dermatology", "Gynecology"],
    specializations: ["General Medicine", "Surgery", "ENT", "Dermatology"],
    cashless: true,
    governmentFacility: false,
    insurancePartners: ["ICICI Lombard", "Max Bupa", "Religare"],
    hasBloodBank: false,
    hasICU: true,
    workingHours: "6:00 AM - 10:00 PM",
    latitude: 23.1685,
    longitude: 79.9445,
    doctors: [
      {
        id: "D027",
        name: "Dr. Ajay Saxena",
        photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
        specialization: "General Physician",
        education: "MBBS, MD (Medicine), NSCB Jabalpur",
        experience: 14,
        consultationFee: 500,
        available: true
      },
      {
        id: "D028",
        name: "Dr. Neha Agrawal",
        photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop",
        specialization: "General Surgeon",
        education: "MBBS, MS (Surgery), GMC Jabalpur",
        experience: 12,
        consultationFee: 600,
        available: true
      },
      {
        id: "D029",
        name: "Dr. Manoj Tiwari",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
        specialization: "ENT Specialist",
        education: "MBBS, MS (ENT), NSCB Jabalpur",
        experience: 13,
        consultationFee: 550,
        available: false
      },
      {
        id: "D030",
        name: "Dr. Priyanka Joshi",
        photo: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop",
        specialization: "Dermatologist",
        education: "MBBS, MD (Dermatology), NSCB Jabalpur",
        experience: 8,
        consultationFee: 500,
        available: true
      }
    ]
  },
  {
    id: "JBP003",
    name: "NSCB Medical College Hospital",
    city: "Jabalpur",
    address: "Gorakhpur, Jabalpur, Madhya Pradesh 482003",
    contact: "+91 761-2672333",
    email: "nscbmc@gov.in",
    availableBeds: 180,
    emergencyWard: true,
    departments: ["Emergency", "General Medicine", "Surgery", "Pediatrics", "Orthopedics", "Obstetrics"],
    specializations: ["Emergency Medicine", "General Medicine", "Surgery", "Orthopedics"],
    cashless: true,
    governmentFacility: true,
    insurancePartners: ["Ayushman Bharat", "CGHS", "ESIC"],
    hasBloodBank: true,
    hasICU: true,
    workingHours: "24/7",
    latitude: 23.1451,
    longitude: 79.9320,
    doctors: [
      {
        id: "D031",
        name: "Dr. Rajendra Patel",
        photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
        specialization: "Emergency Physician",
        education: "MBBS, MD (Emergency), NSCB Jabalpur",
        experience: 17,
        consultationFee: 250,
        available: true
      },
      {
        id: "D032",
        name: "Dr. Swati Verma",
        photo: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
        specialization: "General Physician",
        education: "MBBS, MD (Medicine), NSCB Jabalpur",
        experience: 19,
        consultationFee: 200,
        available: true
      },
      {
        id: "D033",
        name: "Dr. Vikash Kumar",
        photo: "https://images.unsplash.com/photo-1613686762133-0b36c5e5c6f5?w=400&h=400&fit=crop",
        specialization: "Orthopedic Surgeon",
        education: "MBBS, MS (Orthopedics), NSCB Jabalpur",
        experience: 15,
        consultationFee: 400,
        available: true
      }
    ]
  }
];

export const cities = ["Bhopal", "Indore", "Jabalpur"];

export const allSpecializations = Array.from(
  new Set(hospitalsData.flatMap(h => h.specializations))
).sort();
