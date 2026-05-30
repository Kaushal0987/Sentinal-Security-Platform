"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Shield, ArrowUpRight } from "lucide-react";
import { appNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, loading, signOut, user } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/auth/login");
    }
  }, [loading, router, token]);

  if (loading || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Loading secure workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link className="flex items-center gap-3 font-semibold text-white" href="/dashboard">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <Shield className="h-5 w-5" />
            </span>
            <span>
              Sentinal
              <span className="block text-xs font-normal text-slate-400">Security control center</span>
            </span>
          </Link>

          <div className="hidden text-right lg:block">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="text-sm font-medium text-white">{user?.email ?? "Secure session"}</p>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {appNavigation.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    active ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10" onClick={() => void signOut()} type="button">
            Sign out <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">{children}</main>
    </div>
  );
}