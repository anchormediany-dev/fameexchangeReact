export default function AdminContact() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-white">Contact Messages</h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        {/* Later: hook to GET /contact/messages */}
        <p className="text-gray-300">
          Inbox of contact submissions with filters & status.
        </p>
      </div>
    </div>
  );
}
