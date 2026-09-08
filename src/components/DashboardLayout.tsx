"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  User,
  FileCheck,
  Sparkles,
  Search,
  Bell,
  ArrowLeftRight,
  Settings,
  Users,
  Target,
  PlusCircle,
} from "lucide-react";

const studentNav = [
  { href: "/student", label: "Overview", icon: LayoutDashboard },
  { href: "/student/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/student/profile", label: "My Profile", icon: User },
  { href: "/student/resume", label: "Resume Analyzer", icon: FileCheck },
  { href: "/student/matches", label: "AI Matches", icon: Sparkles },
];

const recruiterNav = [
  { href: "/recruiter", label: "Overview", icon: LayoutDashboard },
  { href: "/recruiter/create", label: "Create Opportunity", icon: PlusCircle },
  { href: "/recruiter/candidates", label: "Candidate Rankings", icon: Target },
];

export default function DashboardLayout({
  children,
  role,
}: {
  children: ReactNode;
  role: "student" | "recruiter";
}) {
  const pathname = usePathname();
  const nav = role === "student" ? studentNav : recruiterNav;
  const switchTo = role === "student" ? "/recruiter" : "/student";
  const switchLabel = role === "student" ? "Recruiter" : "Student";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-app)" }}>
      {/* ============ SIDEBAR ============ */}
      <aside
        style={{
          width: "240px",
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          padding: "20px 12px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "4px 10px",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={14} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              <span style={{ color: "var(--text-primary)" }}>SkillSync</span>
              <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "3px", fontSize: "13px" }}>
                AI
              </span>
            </span>
          </div>
        </Link>

        {/* Role indicator */}
        <div
          style={{
            margin: "12px 10px 16px",
            padding: "6px 10px",
            borderRadius: "var(--radius-sm)",
            background: role === "student" ? "var(--accent-muted)" : "var(--success-muted)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: role === "student" ? "var(--accent-light)" : "var(--success)",
          }}
        >
          {role === "student" ? "Student" : "Recruiter"}
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
          <div className="text-overline" style={{ padding: "6px 14px 8px", marginBottom: "2px" }}>
            Menu
          </div>
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`nav-item ${isActive ? "active" : ""}`}>
                <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
          <Link href={switchTo} className="nav-item">
            <ArrowLeftRight size={15} strokeWidth={1.5} />
            <span style={{ fontSize: "13px" }}>Switch to {switchLabel}</span>
          </Link>
          <Link href="/" className="nav-item">
            <Settings size={15} strokeWidth={1.5} />
            <span style={{ fontSize: "13px" }}>Home</span>
          </Link>
        </div>
      </aside>

      {/* ============ MAIN AREA ============ */}
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header
          style={{
            height: "56px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            background: "rgba(9, 9, 11, 0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              padding: "7px 14px",
              width: "320px",
              cursor: "text",
            }}
          >
            <Search size={14} color="var(--text-muted)" strokeWidth={1.5} />
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Search opportunities, skills...
            </span>
            <span
              style={{
                marginLeft: "auto",
                padding: "2px 6px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-subtle)",
                fontSize: "10px",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              ⌘K
            </span>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Notification */}
            <button
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "var(--radius-sm)",
                background: "transparent",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                color: "var(--text-tertiary)",
                transition: "all 0.15s var(--ease)",
              }}
            >
              <Bell size={15} strokeWidth={1.5} />
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "7px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
            </button>

            {/* Divider */}
            <div style={{ width: "1px", height: "20px", background: "var(--border-subtle)" }} />

            {/* User */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "var(--radius-sm)",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {role === "student" ? "HM" : "RC"}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, lineHeight: 1.2 }}>
                  {role === "student" ? "Harshath" : "Recruiter"}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {role === "student" ? "IIT Madras" : "Dashboard"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ padding: "32px", maxWidth: "1200px", width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
