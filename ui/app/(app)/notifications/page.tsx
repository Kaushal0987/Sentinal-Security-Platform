const notifications = [
  { title: "Suspicious login flagged", body: "New location and unrecognized device." },
  { title: "Device update overdue", body: "Work Laptop has not updated in 11 days." },
  { title: "Vault entry updated", body: "GitHub credential was edited 2 hours ago." },
];

export default function NotificationsPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h1 className="text-3xl font-semibold text-white">Notifications</h1>
      <p className="mt-2 text-sm text-slate-300">Security alerts and app events in one feed.</p>

      <div className="mt-6 space-y-3">
        {notifications.map((notification) => (
          <article key={notification.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <h2 className="font-medium text-white">{notification.title}</h2>
            <p className="mt-1 text-sm text-slate-300">{notification.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}