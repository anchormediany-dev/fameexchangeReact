export default function AdminNewsletter() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-white">
        Newsletter Subscribers
      </h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        {/* Later: hook to GET /newsletter/subscribers */}
        <p className="text-gray-300">
          List, search, export CSV, and send test email.
        </p>
      </div>
    </div>
  );
}
