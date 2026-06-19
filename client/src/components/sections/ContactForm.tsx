"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { INDUSTRIES } from "@/lib/constants";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
        <p className="text-gray-600">
          Thank you for reaching out. Our team will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
        Request a Quotation
      </h2>
      <p className="text-gray-600 text-sm">
        Fill out the form below and our team will respond with pricing and
        availability information.
      </p>

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
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all resize-none"
          placeholder="Describe your requirements, quantities, and timeline..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg">
        Send Request
        <Send size={18} />
      </Button>
    </form>
  );
}
