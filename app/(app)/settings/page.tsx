export default function SettingsPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h1 className="text-3xl font-semibold text-white">Settings</h1>
      <p className="mt-2 text-sm text-slate-300">Security, export, and account preferences will live here.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300">
          <h2 className="font-medium text-white">Security controls</h2>
          <p className="mt-2">Password rotation reminders, alert thresholds, and session settings.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300">
          <h2 className="font-medium text-white">Import and export</h2>
          <p className="mt-2">Backup vault data, import credentials, and manage restore workflows.</p>
        </article>
      </div>
    </section>
  );
}