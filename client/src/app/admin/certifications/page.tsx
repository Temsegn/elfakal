function AdminPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
          {title}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
        <p className="text-gray-500 text-sm">
          Content management for this section is coming soon.
        </p>
      </div>
    </div>
  );
}

export default function AdminCertificationsPage() {
  return (
    <AdminPlaceholder
      title="Certifications"
      description="Manage licenses and compliance documents"
    />
  );
}
