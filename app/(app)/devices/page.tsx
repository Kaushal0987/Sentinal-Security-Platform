const devices = [
  { name: "Work Laptop", type: "Laptop", os: "Windows 11", status: "Up to date", trust: "Trusted" },
  { name: "Personal iPhone", type: "Phone", os: "iOS 18", status: "Pending update", trust: "Trusted" },
  { name: "Old Tablet", type: "Tablet", os: "Android 12", status: "Outdated", trust: "Risky" },
];

export default function DevicesPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h1 className="text-3xl font-semibold text-white">Device manager</h1>
      <p className="mt-2 text-sm text-slate-300">Track update status, trust level, and security posture.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {devices.map((device) => (
          <article key={device.name} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold text-white">{device.name}</h2>
            <dl className="mt-4 space-y-2 text-sm text-slate-300">
              <div className="flex justify-between gap-4"><dt>Type</dt><dd>{device.type}</dd></div>
              <div className="flex justify-between gap-4"><dt>OS</dt><dd>{device.os}</dd></div>
              <div className="flex justify-between gap-4"><dt>Status</dt><dd>{device.status}</dd></div>
              <div className="flex justify-between gap-4"><dt>Trust</dt><dd>{device.trust}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}