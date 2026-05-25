import Link from "next/link";

export default function RegisterPage() {
  return (
    <form className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Start protecting your workspace</h1>
      </div>

      <label className="block text-sm text-slate-300">
        Name
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="text" placeholder="Alex Morgan" />
      </label>

      <label className="block text-sm text-slate-300">
        Email
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="email" placeholder="you@example.com" />
      </label>

      <label className="block text-sm text-slate-300">
        Password
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="password" placeholder="Create a strong password" />
      </label>

      <button className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-200" type="button">
        Create account
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account? <Link className="text-cyan-200 hover:text-cyan-100" href="/auth/login">Sign in</Link>
      </p>
    </form>
  );
}