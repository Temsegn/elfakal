"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { INDUSTRIES } from "@/lib/constants";
import { publicApi } from "@/lib/api/public";
import type { InquiryPayload } from "@/lib/api/types";

interface InquiryFormProps {
  defaultProduct?: string;
}

export default function InquiryForm({ defaultProduct = "" }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: InquiryPayload = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || "") || undefined,
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || "") || undefined,
      country: String(data.get("country") || "") || undefined,
      industry: String(data.get("industry") || "") || undefined,
      productInterest: String(data.get("productInterest") || "") || undefined,
      quantity: String(data.get("quantity") || "") || undefined,
      message: String(data.get("message") || ""),
    };

    try {
      await publicApi.submitInquiry(payload);
      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "Unable to submit your inquiry. Please try again or contact us directly via email or WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">Inquiry Submitted!</h3>
        <p className="text-gray-600">
          Thank you for your business inquiry. Our trade team will respond
          within 24 hours.
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
        Start a Business Inquiry
      </h2>
      <p className="text-gray-600 text-sm">
        Submit your requirements and our import/export team will provide pricing,
        availability, and logistics information.
      </p>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Full Name *
          </label>
          <input
            name="name"
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
            name="company"
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
            name="email"
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
            name="phone"
            type="tel"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
            placeholder="+251 ..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Country
          </label>
          <input
            name="country"
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
            placeholder="Your country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Industry
          </label>
          <select
            name="industry"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all bg-white"
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind.id} value={ind.title}>
                {ind.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Product Interest
          </label>
          <input
            name="productInterest"
            type="text"
            defaultValue={defaultProduct}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
            placeholder="Product or category"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Quantity / Volume
          </label>
          <input
            name="quantity"
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all"
            placeholder="e.g. 100 units, 1 container"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none transition-all resize-none"
          placeholder="Describe your requirements, specifications, and timeline..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className={loading ? "opacity-70 pointer-events-none" : ""}>
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Send Inquiry
            <Send size={18} />
          </>
        )}
      </Button>
    </form>
  );
}
