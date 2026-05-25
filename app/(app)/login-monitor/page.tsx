const events = [
  { time: "08:41", ip: "203.0.113.18", device: "Work Laptop", status: "Success" },
  { time: "07:55", ip: "203.0.113.18", device: "Work Laptop", status: "Failed" },
  { time: "Yesterday", ip: "198.51.100.41", device: "Unknown browser", status: "Failed" },
];

export default function LoginMonitorPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h1 className="text-3xl font-semibold text-white">Login monitor</h1>
      <p className="mt-2 text-sm text-slate-300">Recent login history with IP address, device, and failure tracking.</p>

      <div className="mt-6 space-y-3">
        {events.map((event) => (
          <article key={`${event.time}-${event.ip}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm">
            <div>
              <p className="font-medium text-white">{event.status}</p>
              <p className="text-slate-400">{event.time} · {event.device}</p>
            </div>
            <p className="text-slate-300">{event.ip}</p>
          </article>
        ))}
      </div>
    </section>
  );
}