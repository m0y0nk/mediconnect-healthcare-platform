# 🏥 MediConnect - Medical Platform

A comprehensive medical web platform connecting patients, doctors, and hospitals across Madhya Pradesh, India.

## ✨ Features

### 🏠 Homepage
- **Hero Section** with location access prompt
- **City Selector** for filtering hospitals (Bhopal, Indore, Jabalpur)
- **Hospital Cards** displaying:
  - Available beds and emergency ward status
  - Contact information and working hours
  - Departments and specializations
  - Embedded doctor cards with availability indicators
  - Cashless/Government facility badges
  - Blood bank and ICU availability

### 👨‍⚕️ Doctor Information
- **Doctor Cards** with:
  - Profile photo and availability status (🟢/⚫)
  - Specialization and education details
  - Years of experience
  - Consultation fees
  - Book appointment button

### 📋 Categories Page
- **Advanced Filtering System**:
  - Filter by city
  - Filter by specialization (Cardiology, Neurology, etc.)
  - Price range slider (₹0 - ₹2000)
  - Facility filters (Cashless, ICU, Blood Bank, Emergency)
- **Responsive Layout** with mobile-friendly filters
- **Real-time Results** showing filtered hospitals

### 🩸 Blood Bank Section
- **Two Main Features**:
  1. **Nearest Blood Banks**: Auto-detect location and find nearby banks
  2. **Emergency Request Form**: Submit urgent blood requirements
- **Complete Blood Bank Directory** across all cities
- **Direct Contact** options for all blood banks

### 🏥 Hospital Details Modal
- **Comprehensive Information**:
  - Full contact details and address
  - Facilities and services
  - All departments
  - Insurance partners
  - Available doctors by specialization
- **Admission Form** with multi-step process:
  1. Patient information (name, age, address, Aadhaar)
  2. Relative details and contact
  3. Payment type selection (Cash/Cashless)
  4. Insurance number input (for cashless)
  5. Consent form review and submission

### 📞 Help Section
- **Contact Form**: General inquiries and support
- **Complaint Form**: File complaints with issue categorization
- **File Upload**: Attach supporting documents
- **Contact Information**: Email, phone, and office hours

### ℹ️ About Page
- Mission and vision statements
- Platform statistics
- Core values and commitments
- Quality assurance information

### 🚨 Emergency Features
- **Sticky Emergency Button**: Visible on all pages
- **Quick Access** to:
  - Nearest hospital connection
  - Emergency ward contacts
  - Ambulance service (108)
- **24/7 Hospital Directory** with emergency facilities

## 🏗️ Project Structure

```
src/
├── app/
│   ├── about/page.tsx           # About page
│   ├── blood-bank/page.tsx      # Blood bank finder & emergency
│   ├── categories/page.tsx      # Hospital/doctor filtering
│   ├── help/page.tsx            # Contact & complaint forms
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── EmergencyButton.tsx      # Floating emergency button
│   ├── HospitalCard.tsx         # Hospital display card
│   ├── DoctorCard.tsx           # Doctor display card
│   ├── HospitalDetailModal.tsx  # Hospital details popup
│   ├── AdmissionForm.tsx        # Multi-step admission form
│   ├── BookingModal.tsx         # Appointment booking form
│   └── LocationSelector.tsx     # City/location selector
└── data/
    └── hospitalsData.ts         # Hospital & doctor data
```

## 📊 Data Structure

### Hospitals
- 9 hospitals across 3 cities (3 per city)
- Each hospital includes:
  - Contact information
  - Available beds
  - Emergency ward status
  - Departments and specializations
  - Facilities (ICU, Blood Bank, Cashless)
  - Insurance partners
  - 3-4 doctors per hospital

### Doctors
- 33+ doctors across various specializations
- Each doctor has:
  - Profile photo
  - Specialization and education
  - Experience (years)
  - Consultation fee
  - Availability status

### Cities Covered
- **Bhopal**: 3 hospitals
- **Indore**: 3 hospitals  
- **Jabalpur**: 3 hospitals

## 🎨 Design Features

- **Clean Medical Theme**: Light blue (#007BFF) and soft green accents
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Accessibility**: WCAG compliant with proper labels and ARIA attributes
- **Modern UI**: Using Shadcn/UI components with Tailwind CSS
- **Smooth Animations**: Hover effects and transitions
- **Status Indicators**: Color-coded availability (green/gray dots)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📱 Pages & Routes

- `/` - Homepage with hospital listings
- `/about` - About MediConnect
- `/categories` - Browse & filter hospitals
- `/blood-bank` - Blood bank directory & emergency requests
- `/help` - Contact & complaint forms

## 🎯 User Flows

### Booking an Appointment
1. User selects city on homepage
2. Browses hospital cards
3. Views doctor availability (green dot = available)
4. Clicks "Book Now" on doctor card
5. Fills appointment form (name, age, contact, date, time, symptoms)
6. Submits booking

### Hospital Admission
1. User clicks "View Details" on hospital card
2. Modal opens with full hospital information
3. Clicks "Admission Form" button
4. **Step 1**: Fills patient details (name, age, address, Aadhaar, relative info)
5. Selects payment type (Cash/Cashless)
6. If Cashless: Enters insurance number in popup
7. **Step 2**: Reviews and accepts consent form
8. Submits admission request

### Emergency Blood Request
1. User navigates to Blood Bank page
2. Switches to "Emergency Request" tab
3. Fills form (patient name, blood group, contact, location)
4. Submits urgent request
5. Team contacts user within minutes

### Finding Hospitals
1. User visits Categories page
2. Applies filters:
   - Select city
   - Choose specializations
   - Set price range
   - Select required facilities
3. Views filtered results in real-time
4. Clicks hospital to view details or book appointment

## 🔐 Security & Privacy

- All forms validate input data
- Phone numbers and email addresses verified
- Aadhaar number masked after entry
- Insurance information securely handled
- HTTPS recommended for production

## 🌟 Future Enhancements

- User authentication (Patient & Hospital login)
- Real-time bed availability tracking
- Online payment integration
- Video consultation feature
- Prescription management
- Medical records storage
- Push notifications for appointments
- GPS-based hospital distance calculation
- Multi-language support
- Patient reviews and ratings

## 📄 License

This project is created for educational and demonstration purposes.

## 👥 Contributing

This is a demonstration project. For production use, please implement:
- Backend API with proper database
- User authentication system
- Real-time data updates
- Payment gateway integration
- SMS/Email notifications
- Advanced security measures

## 📞 Support

For questions or issues, please use the Help page contact form or file a complaint through the platform.

---

**Built with ❤️ for better healthcare accessibility**