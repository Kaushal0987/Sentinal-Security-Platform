import Link from "next/link";
import { Shield } from "lucide-react";

export function AuthShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(to_bottom,_#020617,_#0f172a)] px-6 py-10 text-slate-50">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
            <Link className="inline-flex items-center gap-3 font-semibold text-white" href="/">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                <Shield className="h-5 w-5" />
              </span>
              Sentinal
            </Link>
            <div>
              <p className="mt-8 text-sm uppercase tracking-[0.24em] text-cyan-200">Secure access</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Sign in to manage your vault and device posture.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Keep authentication, vault data, and login monitoring in one controlled workspace with a security-first layout.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}