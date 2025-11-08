"use client";

// import Navbar from "@/components/Navbar";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Heart, Target, Eye, Users, Award, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To bridge the gap between patients and healthcare providers, making quality medical care accessible to everyone, everywhere.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To create a comprehensive healthcare ecosystem where finding the right medical care is simple, transparent, and efficient.",
    },
    {
      icon: Users,
      title: "Patient-Centric",
      description:
        "Every feature we build is designed with patients in mind, ensuring the best possible healthcare experience.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We maintain the highest standards of data security and privacy to protect your personal health information.",
    },
  ];

  const stats = [
    { number: "500+", label: "Hospitals" },
    { number: "2000+", label: "Doctors" },
    { number: "50000+", label: "Patients Served" },
    { number: "3", label: "Cities" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Heart className="h-10 w-10" fill="white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About MediConnect</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing healthcare access by connecting patients with the right hospitals and
            doctors at the right time
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            MediConnect was born from a simple observation: finding the right healthcare at the
            right time shouldn't be difficult. Too often, patients struggle to locate hospitals with
            available beds, find doctors with the right specialization, or access emergency services
            quickly.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            We set out to change that. MediConnect is a comprehensive platform that brings together
            hospitals, doctors, and patients in one seamless ecosystem. Whether you need to book a
            routine consultation, find emergency care, or locate a blood bank, we're here to help.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, MediConnect serves thousands of patients across multiple cities in Madhya
            Pradesh, partnering with hundreds of hospitals and thousands of qualified doctors. Our
            platform continues to grow, driven by our commitment to making healthcare accessible to
            all.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-xl text-blue-100 mb-8">
            We are committed to maintaining the highest standards of service, transparency, and
            patient care. Your health and wellbeing are our top priorities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-blue-700/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Quality Assurance</h3>
              <p className="text-blue-100 text-sm">
                All hospitals and doctors are verified and meet our quality standards
              </p>
            </div>
            <div className="bg-blue-700/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-blue-100 text-sm">
                Emergency services and support available round the clock
              </p>
            </div>
            <div className="bg-blue-700/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-blue-100 text-sm">
                Clear information about costs, availability, and doctor credentials
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmergencyButton />
    </div>
  );
}
