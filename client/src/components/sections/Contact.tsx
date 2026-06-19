"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import LocationMap from "@/components/ui/LocationMap";
import { COMPANY, INDUSTRIES } from "@/lib/constants";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Contact"
          title="Get In Touch"
          description="Ready to discuss your requirements? Contact us for quotations, product information, or partnership opportunities."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-plus-jakarta)]">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-gold mt-1 shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Office Address</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {COMPANY.address.building}
                      <br />
                      {COMPANY.address.street}
                      <br />
                      {COMPANY.address.floor}
                      <br />
                      {COMPANY.address.city}, {COMPANY.address.country}
                      <br />
                      {COMPANY.address.poBox}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-gold shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="text-gray-400 text-sm">
                      {COMPANY.phone.main}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {COMPANY.phone.mobile}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-gold shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-gray-400 text-sm">{COMPANY.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive map */}
            <LocationMap heightClass="h-48" />
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <CheckCircle
                  size={48}
                  className="text-green-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-navy mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
                      placeholder="+251 ..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Industry
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all bg-white">
                      <option value="">Select industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.id} value={ind.id}>
                          {ind.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Product Interest
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
                      placeholder="Product or category"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
                  Send Message
                  <Send size={18} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
