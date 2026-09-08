"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ScoreRing from "@/components/ScoreRing";
import MatchDetailModal from "@/components/MatchDetailModal";
import Link from "next/link";
import { students, getMatchesForStudent, opportunities, type DetailedMatch, type Opportunity } from "@/lib/mock-data";
import {
  TrendingUp,
  Briefcase,
  Sparkles,
  ArrowRight,
  MapPin,
  ChevronRight,
  Zap,
  BarChart3,
  Target,
  Wifi,
} from "lucide-react";

const student = students[0];
const topMatches = getMatchesForStudent(student.id);

export default function StudentDashboard() {
  const [selectedMatch, setSelectedMatch] = useState<(DetailedMatch & { opportunity: Opportunity }) | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const handleApply = (opportunityId: string) => {
    setAppliedJobs(prev => {
      const next = new Set(prev);
      next.add(opportunityId);
      return next;
    });
  };

  return (
    <DashboardLayout role="student">
      {/* ============ HERO ============ */}
      <div
        style={{
          marginBottom: "36px",
          padding: "36px",
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)",
          border: "1px solid rgba(99, 102, 241, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-40px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <div className="badge badge-accent" style={{ marginBottom: "16px", fontSize: "11px", fontWeight: 600 }}>
            <Sparkles size={12} /> AI-Powered Matching
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "8px", maxWidth: "500px" }}>
            Find opportunities that match
            <br />
            <span className="gradient-text">what you can actually do.</span>
          </h1>
          <p className="text-body" style={{ maxWidth: "460px", marginBottom: "24px" }}>
            AI-powered talent matching based on your skills, projects and experience.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/student/resume" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary"><Zap size={15} /> Analyze Resume</button>
            </Link>
            <Link href="/student/opportunities" style={{ textDecoration: "none" }}>
              <button className="btn btn-ghost">Browse Opportunities <ArrowRight size={15} /></button>
            </Link>
          </div>
        </div>
      </div>

      {/* ============ STATS ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "36px" }}>
        {[
          { value: "92%", label: "Average Match", sub: "+4% from last week", icon: Target, accent: "var(--success)", bg: "var(--success-muted)" },
          { value: "14", label: "Skills Identified", sub: "From resume + profile", icon: BarChart3, accent: "var(--accent-light)", bg: "var(--accent-muted)" },
          { value: "8", label: "Recommended", sub: "Opportunities for you", icon: Briefcase, accent: "var(--info)", bg: "var(--info-muted)" },
          { value: appliedJobs.size.toString(), label: "Applications", sub: appliedJobs.size > 0 ? `${appliedJobs.size} submitted` : "None yet", icon: TrendingUp, accent: "var(--warning)", bg: "var(--warning-muted)" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card" style={{ padding: "20px", cursor: "default" }}>
              <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: stat.accent }}>
                  <Icon size={17} strokeWidth={1.8} />
                </div>
              </div>
              <div style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2px", lineHeight: 1 }}>{stat.value}</div>
              <div className="text-caption" style={{ marginBottom: "2px" }}>{stat.label}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* ============ CONTENT GRID ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        {/* ---- Recommended for You ---- */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 className="text-heading" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} color="var(--accent-light)" strokeWidth={2} />
              Recommended for You
            </h2>
            <Link href="/student/opportunities" style={{ textDecoration: "none" }}>
              <button className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: "12px" }}>
                View All <ChevronRight size={14} />
              </button>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {topMatches.map((match, index) => {
              const isApplied = appliedJobs.has(match.opportunityId);
              return (
                <div
                  key={match.opportunityId}
                  className="card"
                  style={{
                    padding: "20px",
                    cursor: "pointer",
                    animationDelay: `${index * 0.06}s`,
                  }}
                  onClick={() => setSelectedMatch(match)}
                >
                  <div style={{ display: "flex", gap: "16px" }}>
                    {/* Company logo */}
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--text-tertiary)",
                        flexShrink: 0,
                      }}
                    >
                      {match.opportunity.companyLogo}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                        <h3 className="text-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "12px" }}>
                          {match.opportunity.title}
                        </h3>
                        <div
                          className={`match-pill ${match.score >= 90 ? "match-excellent" : match.score >= 75 ? "match-good" : "match-fair"}`}
                          style={{ flexShrink: 0 }}
                        >
                          {match.score}% Match
                        </div>
                      </div>

                      <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "10px" }}>
                        {match.opportunity.company}
                      </div>

                      {/* Matched skill tags */}
                      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
                        {match.matchedSkills.slice(0, 4).map((skill) => (
                          <span key={skill} className="badge badge-success" style={{ fontSize: "11px", padding: "3px 8px" }}>
                            ✓ {skill}
                          </span>
                        ))}
                        {match.skillGaps.slice(0, 2).map((gap) => (
                          <span key={gap} className="badge badge-warning" style={{ fontSize: "11px", padding: "3px 8px" }}>
                            ○ {gap}
                          </span>
                        ))}
                      </div>

                      {/* Meta row */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span className="badge badge-accent" style={{ fontSize: "11px", padding: "3px 9px", textTransform: "capitalize" }}>
                          {match.opportunity.type}
                        </span>
                        {match.opportunity.remote && (
                          <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                            <Wifi size={11} strokeWidth={1.5} /> Remote
                          </span>
                        )}
                        <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                          <MapPin size={11} strokeWidth={1.5} />
                          {match.opportunity.location.split(",")[0]}
                        </span>
                        <span className="text-caption" style={{ fontWeight: 600, color: "var(--text-secondary)" }}>
                          {match.opportunity.salary}
                        </span>
                        {isApplied && (
                          <span className="badge badge-success" style={{ fontSize: "10px", padding: "2px 7px" }}>
                            Applied ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Right Sidebar ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* AI Career Insights */}
          <div 
            className="card-accent" 
            style={{ 
              padding: "24px", 
              background: "linear-gradient(145deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.04) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.15)",
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ 
                width: "28px", 
                height: "28px", 
                borderRadius: "8px", 
                background: "var(--accent)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(99, 102, 241, 0.4)"
              }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <h3 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-light)" }}>
                AI CAREER INSIGHT
              </h3>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", lineHeight: 1.6 }}>
              <p style={{ color: "var(--text-primary)", fontWeight: 500, margin: 0 }}>
                You are strongest in modern full-stack development.
              </p>
              
              <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                Your biggest opportunity gap is <span style={{ color: "var(--warning)", fontWeight: 600 }}>AWS</span>.
              </p>
              
              <div style={{ 
                marginTop: "4px",
                padding: "12px 14px", 
                borderRadius: "var(--radius-sm)", 
                background: "rgba(0, 0, 0, 0.25)", 
                borderLeft: "3px solid var(--accent-light)",
                color: "var(--text-muted)",
                fontSize: "12.5px"
              }}>
                Learning AWS fundamentals and deploying one production project could significantly increase your compatibility with cloud-focused internships.
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card-static" style={{ padding: "20px" }}>
            <h3 className="text-title" style={{ marginBottom: "16px" }}>Your Skills</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {student.skills.slice(0, 8).map((skill) => {
                const pct = skill.level === "expert" ? 95 : skill.level === "advanced" ? 78 : skill.level === "intermediate" ? 55 : 30;
                const barColor = skill.level === "expert" ? "var(--success)" : skill.level === "advanced" ? "var(--accent-light)" : skill.level === "intermediate" ? "var(--warning)" : "var(--text-muted)";
                return (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ fontSize: "11px", color: barColor, fontWeight: 600, textTransform: "capitalize" }}>{skill.level}</span>
                    </div>
                    <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: "2px", background: barColor, transition: "width 1s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/student/profile" style={{ textDecoration: "none" }}>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: "14px", fontSize: "12px", padding: "8px" }}>
                View Full Profile <ChevronRight size={14} />
              </button>
            </Link>
          </div>

          {/* Activity */}
          <div className="card-static" style={{ padding: "20px" }}>
            <h3 className="text-title" style={{ marginBottom: "14px" }}>Recent Activity</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { text: "Resume analyzed by AI", time: "2h ago", color: "var(--accent)" },
                { text: "Matched: Google Intern", time: "1d ago", color: "var(--success)" },
                { text: "Profile updated", time: "3d ago", color: "var(--info)" },
                { text: "Applied: Razorpay", time: "5d ago", color: "var(--warning)" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: a.color, flexShrink: 0, boxShadow: `0 0 6px ${a.color}40` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 500 }}>{a.text}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ MATCH DETAIL MODAL ============ */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          isApplied={appliedJobs.has(selectedMatch.opportunityId)}
          onApply={() => handleApply(selectedMatch.opportunityId)}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </DashboardLayout>
  );
}
