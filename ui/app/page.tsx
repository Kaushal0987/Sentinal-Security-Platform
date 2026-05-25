import Link from "next/link";
import { ShieldCheck, LockKeyhole, MonitorSmartphone, LineChart, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a_55%,_#111827)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Sentinal</p>
            <p className="text-sm text-slate-300">Security platform for vaults, devices, and login monitoring.</p>
          </div>
          <div className="flex gap-3 text-sm font-medium">
            <Link className="rounded-full border border-white/10 px-4 py-2 text-slate-200 transition hover:bg-white/10" href="/auth/login">
              Sign in
            </Link>
            <Link className="rounded-full bg-cyan-400 px-4 py-2 text-slate-950 transition hover:bg-cyan-300" href="/dashboard">
              Open dashboard
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
              Clean architecture. Known algorithms. Security-first.
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              One place for credentials, devices, and suspicious login alerts.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Manage vault entries, track device posture, and review login events from a focused UI built to stay lean and maintainable.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200" href="/dashboard">
                Enter app <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10" href="/auth/register">
                Create account
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Password vault", text: "Encrypt passwords and notes, search entries, and favorite key logins.", icon: LockKeyhole },
                { title: "Device manager", text: "Track trust level, update status, and security posture per device.", icon: MonitorSmartphone },
                { title: "Login monitor", text: "Review time, IP, and device with failed login detection.", icon: ShieldCheck },
                { title: "Security dashboard", text: "See alerts, summaries, and key risk signals at a glance.", icon: LineChart },
              ].map((item) => (
                <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <item.icon className="h-5 w-5 text-cyan-300" />
                  <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">Current posture</p>
                <p className="text-2xl font-semibold text-white">Protected</p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">2 alerts active</span>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="font-medium text-white">Vault status</p>
                <p className="mt-1">42 credentials stored. 12 marked as favorites.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="font-medium text-white">Devices</p>
                <p className="mt-1">7 trusted, 1 risky, 2 pending updates.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="font-medium text-white">Login activity</p>
                <p className="mt-1">3 failed attempts and 1 unusual location flagged today.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
