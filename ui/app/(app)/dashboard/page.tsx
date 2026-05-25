const stats = [
  { label: "Vault entries", value: "42", note: "12 favorites, 3 recent updates" },
  { label: "Devices", value: "10", note: "7 trusted, 2 risky, 1 unknown" },
  { label: "Alerts", value: "2", note: "1 suspicious login, 1 outdated device" },
  { label: "Failed logins", value: "3", note: "Last 24 hours" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-200">Dashboard</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Security overview</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Monitor vault health, device risk, and recent login activity from one view.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-300">{stat.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white">Recent alerts</h2>
          <div className="mt-4 space-y-3">
            {[
              "Suspicious login from new location detected",
              "Device 'Work Laptop' marked outdated",
              "Failed login attempts exceeded threshold on account",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white">Security posture</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl bg-white/5 p-4">Password vault encryption: active</div>
            <div className="rounded-2xl bg-white/5 p-4">2FA tracking: pending for 8 accounts</div>
            <div className="rounded-2xl bg-white/5 p-4">Audit logging: enabled</div>
          </div>
        </article>
      </section>
    </div>
  );
}