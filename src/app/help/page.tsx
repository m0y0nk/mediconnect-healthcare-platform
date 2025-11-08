"use client";

import { useState } from "react";
// import { Navbar } from "@/components/Navbar";
import { EmergencyButton } from "@/components/EmergencyButton";
import { MessageCircle, AlertTriangle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "complaint">("contact");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [complaintForm, setComplaintForm] = useState({
    name: "",
    email: "",
    issueType: "",
    description: "",
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueTypes = [
    "Hospital Service",
    "Doctor Behavior",
    "Billing Issue",
    "Appointment Problem",
    "Technical Issue",
    "Other",
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        `Thank you for contacting us!\nWe have received your message and will respond within 24 hours.\n\nSubject: ${contactForm.subject}`
      );
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        `Your complaint has been registered.\nReference ID: COMP${Math.floor(Math.random() * 100000)}\n\nWe take all complaints seriously and will investigate this matter.\nYou will receive an update within 48 hours.`
      );
      setComplaintForm({
        name: "",
        email: "",
        issueType: "",
        description: "",
        file: null,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help. Contact us or file a complaint
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <Button
              variant={activeTab === "contact" ? "default" : "ghost"}
              onClick={() => setActiveTab("contact")}
              className={activeTab === "contact" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
            <Button
              variant={activeTab === "complaint" ? "default" : "ghost"}
              onClick={() => setActiveTab("complaint")}
              className={activeTab === "complaint" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              File Complaint
            </Button>
          </div>
        </div>

        {/* Contact Form Tab */}
        {activeTab === "contact" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span>Contact Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Please describe your query in detail"
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Complaint Form Tab */}
        {activeTab === "complaint" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                <span>File a Complaint</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800">
                  <strong>Note:</strong> All complaints are treated with strict confidentiality and
                  will be reviewed by our team within 48 hours.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="complaint-name">Name *</Label>
                    <Input
                      id="complaint-name"
                      required
                      value={complaintForm.name}
                      onChange={(e) =>
                        setComplaintForm({ ...complaintForm, name: e.target.value })
                      }
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="complaint-email">Email *</Label>
                    <Input
                      id="complaint-email"
                      type="email"
                      required
                      value={complaintForm.email}
                      onChange={(e) =>
                        setComplaintForm({ ...complaintForm, email: e.target.value })
                      }
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="issueType">Issue Type *</Label>
                  <Select
                    value={complaintForm.issueType}
                    onValueChange={(value) =>
                      setComplaintForm({ ...complaintForm, issueType: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    value={complaintForm.description}
                    onChange={(e) =>
                      setComplaintForm({ ...complaintForm, description: e.target.value })
                    }
                    placeholder="Please provide detailed information about your complaint"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="file">Attach File (Optional)</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="file"
                      className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-600">
                          {complaintForm.file
                            ? complaintForm.file.name
                            : "Click to upload or drag and drop"}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </div>
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          setComplaintForm({
                            ...complaintForm,
                            file: e.target.files?.[0] || null,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Email</h4>
              <a href="mailto:support@mediconnect.com" className="text-blue-600 hover:underline">
                support@mediconnect.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Phone</h4>
              <a href="tel:1800-123-4567" className="text-blue-600 hover:underline">
                1800-123-4567 (Toll Free)
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700">Office Hours</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <EmergencyButton />
    </div>
  );
}
