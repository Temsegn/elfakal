"use client";

import { useEffect, useState } from "react";
import { adminApi, type Inquiry } from "@/lib/api/admin";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  closed: "bg-green-100 text-green-700",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    adminApi
      .getInquiries()
      .then((res) => setInquiries(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await adminApi.updateInquiryStatus(id, status);
    load();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
          Business Inquiries
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage leads from the contact form
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
          No inquiries yet
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-navy">{inq.name}</h3>
                  {inq.company && (
                    <p className="text-gray-500 text-sm">{inq.company}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      statusColors[inq.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {inq.status}
                  </span>
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <p>
                  <span className="text-gray-400">Email:</span> {inq.email}
                </p>
                {inq.phone && (
                  <p>
                    <span className="text-gray-400">Phone:</span> {inq.phone}
                  </p>
                )}
                {inq.country && (
                  <p>
                    <span className="text-gray-400">Country:</span> {inq.country}
                  </p>
                )}
                {inq.productInterest && (
                  <p>
                    <span className="text-gray-400">Product:</span>{" "}
                    {inq.productInterest}
                  </p>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-lg p-4">
                {inq.message}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(inq.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
