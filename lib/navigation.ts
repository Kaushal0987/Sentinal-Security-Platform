import { LayoutDashboard, ShieldCheck, LockKeyhole, MonitorSmartphone, BellRing, Settings } from "lucide-react";

export const appNavigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vault", label: "Vault", icon: LockKeyhole },
  { href: "/devices", label: "Devices", icon: MonitorSmartphone },
  { href: "/login-monitor", label: "Login monitor", icon: ShieldCheck },
  { href: "/notifications", label: "Notifications", icon: BellRing },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;