"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Users, Briefcase, ArrowRight, Zap, Target, BarChart3, Brain, ChevronRight, Check } from "lucide-react";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-app)" }}>
      {/* Background accents */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "7px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={14} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            SkillSync
            <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "3px", fontSize: "13px" }}>AI</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/student" style={{ textDecoration: "none" }}>
            <button className="btn btn-ghost" style={{ fontSize: "13px", padding: "8px 16px" }}>
              <Users size={14} /> Student
            </button>
          </Link>
          <Link href="/recruiter" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: "13px", padding: "8px 16px" }}>
              <Briefcase size={14} /> Recruiter
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "100px 40px 60px",
          textAlign: "center",
        }}
      >
        <div
          className="badge badge-accent"
          style={{
            margin: "0 auto 24px",
            fontSize: "11px",
            fontWeight: 600,
            padding: "5px 14px",
          }}
        >
          <Zap size={12} />
          Powered by Google Gemini AI
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            marginBottom: "20px",
          }}
        >
          Match talent with{" "}
          <span className="gradient-text">opportunity,</span>
          <br />
          intelligently.
        </h1>

        <p
          className="text-body"
          style={{
            fontSize: "16px",
            maxWidth: "480px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          AI understands real skills — not just keywords.
          Connect students with perfect opportunities through deep skill matching and gap analysis.
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "120px" }}>
          <Link href="/student" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ padding: "12px 28px", fontSize: "14px" }}>
              I&apos;m a Student <ArrowRight size={16} />
            </button>
          </Link>
          <Link href="/recruiter" style={{ textDecoration: "none" }}>
            <button className="btn btn-ghost" style={{ padding: "12px 28px", fontSize: "14px" }}>
              I&apos;m a Recruiter <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: "80px" }}>
          <div className="text-overline" style={{ marginBottom: "24px" }}>How it works</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {[
              { step: "01", title: "Upload Profile", desc: "Add your resume and skills" },
              { step: "02", title: "AI Analyzes", desc: "Gemini extracts competencies" },
              { step: "03", title: "Smart Matching", desc: "Compared against opportunities" },
              { step: "04", title: "Get Matched", desc: "Score, gaps & recommendations" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "24px 16px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--accent-light)",
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.step}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "80px" }}>
          {[
            {
              icon: <Brain size={20} />,
              title: "Deep Skill Analysis",
              desc: "AI understands proficiency levels, not just keywords. Your actual capabilities are matched to real requirements.",
              color: "var(--accent)",
            },
            {
              icon: <Target size={20} />,
              title: "Precision Matching",
              desc: "Weighted scoring considers skills, experience level, project relevance, and career trajectory.",
              color: "var(--info)",
            },
            {
              icon: <BarChart3 size={20} />,
              title: "Gap Analysis",
              desc: "See exactly what skills to develop. Get actionable recommendations to improve your match score.",
              color: "var(--success)",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: "28px 24px",
                textAlign: "left",
                cursor: "default",
                transform: hoveredCard === i ? "translateY(-2px)" : "none",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "var(--radius-sm)",
                  background: `color-mix(in srgb, ${f.color} 12%, transparent)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.color,
                  marginBottom: "16px",
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.01em" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="card-static"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: "32px",
            marginBottom: "60px",
          }}
        >
          {[
            { value: "2,500+", label: "Students Matched" },
            { value: "890", label: "Active Opportunities" },
            { value: "94%", label: "Match Accuracy" },
            { value: "150+", label: "Partner Companies" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                {stat.value}
              </div>
              <div className="text-caption">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="card-accent"
          style={{
            padding: "40px",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "10px" }}>
            Ready to find your perfect match?
          </h2>
          <p className="text-body" style={{ marginBottom: "24px" }}>
            Upload your resume and let AI do the work.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Link href="/student" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary">
                Get Started <ChevronRight size={15} />
              </button>
            </Link>
          </div>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
            {["Free to use", "No sign-up required", "Instant results"].map((t) => (
              <span key={t} style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Check size={12} color="var(--success)" /> {t}
              </span>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "var(--text-muted)", paddingBottom: "40px" }}>
          SkillSync AI — Built with Next.js, TypeScript & Google Gemini
        </p>
      </main>
    </div>
  );
}
