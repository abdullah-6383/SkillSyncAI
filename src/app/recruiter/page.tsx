"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { opportunities, students, detailedMatches, getMatchesForOpportunity } from "@/lib/mock-data";
import {
  Briefcase,
  Users,
  Target,
  TrendingUp,
  ChevronLeft,
  Search,
  MapPin,
  Clock,
  Sparkles,
  Award,
  CheckCircle,
  AlertCircle,
  FolderGit2,
  Brain,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function RecruiterDashboard() {
  const [selectedOppId, setSelectedOppId] = useState<string | null>(null);

  const selectedOpp = selectedOppId ? opportunities.find((o) => o.id === selectedOppId) : null;
  const rankedCandidates = selectedOppId ? getMatchesForOpportunity(selectedOppId).sort((a, b) => b.score - a.score) : [];

  return (
    <DashboardLayout role="recruiter">
      {/* ============ HERO HEADER ============ */}
      <div
        style={{
          marginBottom: "36px",
          padding: "36px",
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)",
          border: "1px solid rgba(34, 197, 94, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative" }}>
          <div className="badge badge-success" style={{ marginBottom: "16px", fontSize: "11px", fontWeight: 600 }}>
            <Sparkles size={12} /> AI-Powered Recruitment
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "8px" }}>
            Find the right talent <span style={{ color: "var(--success)" }}>faster.</span>
          </h1>
          <p className="text-body" style={{ maxWidth: "420px" }}>
            Identify top candidates instantly based on verified skills and real-world project experience.
          </p>
        </div>
      </div>

      {/* ============ STATS ============ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "36px" }}>
        {[
          { value: "4", label: "Active Opportunities", sub: "Currently hiring", icon: Briefcase, accent: "var(--success)", bg: "var(--success-muted)" },
          { value: "128", label: "Candidates", sub: "Skill-matched", icon: Users, accent: "var(--info)", bg: "var(--info-muted)" },
          { value: "84%", label: "Average Match", sub: "High quality pipeline", icon: Target, accent: "var(--accent-light)", bg: "var(--accent-muted)" },
          { value: "17", label: "Shortlisted", sub: "Ready to interview", icon: TrendingUp, accent: "var(--warning)", bg: "var(--warning-muted)" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card" style={{ padding: "20px" }}>
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

      {/* ============ DYNAMIC CONTENT ============ */}
      {!selectedOpp ? (
        // OPPORTUNITIES LIST
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 className="text-heading" style={{ fontSize: "18px", marginBottom: "4px" }}>Your Opportunities</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "20px" }}>
            {opportunities.map((opp) => (
              <div key={opp.id} className="card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700 }}>
                    {opp.companyLogo}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px", color: "var(--text-primary)" }}>{opp.title}</h3>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", color: "var(--text-secondary)", fontSize: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={12} /> {opp.location}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users size={12} /> {opp.applicants} applied</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "20px", flex: 1 }}>
                  <div className="text-overline" style={{ marginBottom: "8px", fontSize: "10px" }}>Required Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {opp.requiredSkills.slice(0, 5).map(rs => (
                      <span key={rs.name} className="badge badge-default" style={{ fontSize: "11px" }}>{rs.name}</span>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  onClick={() => setSelectedOppId(opp.id)}
                  style={{ width: "100%", padding: "10px", fontSize: "13px" }}
                >
                  <Search size={14} /> Find Best Candidates
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // RANKED CANDIDATES LIST
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          {/* Back button & Title */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button 
                className="btn btn-ghost" 
                onClick={() => setSelectedOppId(null)}
                style={{ padding: "6px 12px" }}
              >
                <ChevronLeft size={16} /> Back
              </button>
              <div>
                <h2 className="text-heading" style={{ fontSize: "20px", margin: 0 }}>Top Candidates for {selectedOpp.title}</h2>
                <p className="text-caption" style={{ margin: "4px 0 0" }}>Ranked by AI skill & project matching</p>
              </div>
            </div>
            
            <button className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: "12px" }}>
              <Filter size={14} /> Filter
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {rankedCandidates.map((candidateMatch, index) => {
              const s = students.find(x => x.id === candidateMatch.studentId);
              if (!s) return null;

              const isTop = index === 0;

              return (
                <div 
                  key={s.id} 
                  className={isTop ? "card-accent" : "card-static"}
                  style={{ 
                    padding: "24px",
                    background: isTop ? "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(59, 130, 246, 0.04))" : undefined,
                    border: isTop ? "1px solid rgba(34, 197, 94, 0.2)" : undefined,
                  }}
                >
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      {/* Rank & Avatar */}
                      <div style={{ position: "relative" }}>
                        <div style={{ 
                          width: "56px", 
                          height: "56px", 
                          borderRadius: "50%", 
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-default)",
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "var(--text-primary)"
                        }}>
                          {s.avatar}
                        </div>
                        <div style={{ 
                          position: "absolute", 
                          top: -6, 
                          right: -6, 
                          width: "24px", 
                          height: "24px", 
                          borderRadius: "50%", 
                          background: isTop ? "var(--warning)" : "var(--bg-app)",
                          border: "2px solid var(--bg-card)",
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 800,
                          color: isTop ? "#000" : "var(--text-secondary)"
                        }}>
                          #{index + 1}
                        </div>
                      </div>

                      <div>
                        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                          {s.name}
                        </h3>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                          {s.title}
                        </p>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div style={{ textAlign: "right" }}>
                      <div className="text-overline" style={{ marginBottom: "6px" }}>AI Match</div>
                      <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--success)", lineHeight: 1 }}>
                        {candidateMatch.score}%
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    {/* Matching Skills */}
                    <div style={{ padding: "16px", borderRadius: "var(--radius-sm)", background: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.1)" }}>
                      <h4 style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--success)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>
                        <CheckCircle size={14} /> Matching Skills
                      </h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {candidateMatch.matchedSkills.map(skill => (
                          <span key={skill} className="badge badge-success" style={{ fontSize: "11px", fontWeight: 600 }}>✓ {skill}</span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div style={{ padding: "16px", borderRadius: "var(--radius-sm)", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                      <h4 style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--danger)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>
                        <AlertCircle size={14} /> Missing Skills
                      </h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {candidateMatch.skillGaps.length > 0 ? candidateMatch.skillGaps.map(skill => (
                          <span key={skill} className="badge" style={{ background: "rgba(239, 68, 68, 0.15)", color: "var(--danger)", fontSize: "11px", fontWeight: 600 }}>○ {skill}</span>
                        )) : (
                          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>No critical gaps identified</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Relevant Project & Explanation */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "16px" }}>
                    {/* Relevant Project */}
                    <div style={{ padding: "16px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-default)" }}>
                      <h4 style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-light)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>
                        <FolderGit2 size={14} /> Relevant Project
                      </h4>
                      <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                        {candidateMatch.relevantProject}
                      </p>
                    </div>

                    {/* AI Explanation */}
                    <div style={{ padding: "16px", borderRadius: "var(--radius-sm)", background: "var(--accent-muted)", border: "1px solid rgba(99, 102, 241, 0.15)" }}>
                      <h4 style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-light)", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px" }}>
                        <Brain size={14} /> AI Recommendation
                      </h4>
                      <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-primary)", fontStyle: "italic", margin: 0 }}>
                        "{candidateMatch.explanation}"
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                    <button className="btn btn-ghost" style={{ fontSize: "13px", padding: "8px 16px" }}>View Full Profile</button>
                    <button className="btn btn-primary" style={{ fontSize: "13px", padding: "8px 16px", background: "var(--success)" }}>Shortlist Candidate</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
