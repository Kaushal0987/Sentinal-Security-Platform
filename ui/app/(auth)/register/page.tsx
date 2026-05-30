"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      signIn(response.data.token, response.data.user);
      router.push("/dashboard");
    } catch {
      setError("Unable to create your account. Please review the form and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Start protecting your workspace</h1>
      </div>

      {error ? <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

      <label className="block text-sm text-slate-300">
        Name
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="text" placeholder="Alex Morgan" value={name} onChange={(event) => setName(event.target.value)} />
      </label>

      <label className="block text-sm text-slate-300">
        Email
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>

      <label className="block text-sm text-slate-300">
        Password
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="password" placeholder="Create a strong password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>

      <label className="block text-sm text-slate-300">
        Confirm password
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" type="password" placeholder="Repeat your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      </label>

      <button className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300" disabled={loading} type="submit">
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account? <Link className="text-cyan-200 hover:text-cyan-100" href="/auth/login">Sign in</Link>
      </p>
    </form>
  );
}