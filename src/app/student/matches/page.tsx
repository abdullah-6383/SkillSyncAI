"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ScoreRing from "@/components/ScoreRing";
import MatchDetailModal from "@/components/MatchDetailModal";
import { students, getMatchesForStudent, type DetailedMatch, type Opportunity } from "@/lib/mock-data";
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Brain,
  Wifi,
} from "lucide-react";

const student = students[0];
const studentMatches = getMatchesForStudent(student.id);

export default function MatchesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(studentMatches[0]?.opportunityId || null);
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
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <Sparkles size={20} color="var(--accent-light)" strokeWidth={2} />
          <h1 className="text-heading" style={{ fontSize: "22px" }}>AI Matches</h1>
        </div>
        <p className="text-body">{studentMatches.length} opportunities matched to your skill profile</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {studentMatches.map((match) => {
          const isExpanded = expandedId === match.opportunityId;
          const isApplied = appliedJobs.has(match.opportunityId);
          return (
            <div key={match.opportunityId} className={isExpanded ? "card-accent" : "card"} style={{ padding: "20px", overflow: "hidden" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer" }}
                onClick={() => setExpandedId(isExpanded ? null : match.opportunityId)}
              >
                <ScoreRing score={match.score} size={60} strokeWidth={4} />
                <div
                  style={{
                    width: "42px", height: "42px", borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px", fontWeight: 700, color: "var(--text-tertiary)", flexShrink: 0,
                  }}
                >
                  {match.opportunity.companyLogo}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="text-title" style={{ marginBottom: "3px" }}>{match.opportunity.title}</h3>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>{match.opportunity.company}</div>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <MapPin size={11} strokeWidth={1.5} /> {match.opportunity.location.split(",")[0]}
                    </span>
                    {match.opportunity.remote && (
                      <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <Wifi size={11} strokeWidth={1.5} /> Remote
                      </span>
                    )}
                    <span className="badge badge-accent" style={{ fontSize: "11px", padding: "2px 8px" }}>{match.opportunity.salary}</span>
                    {isApplied && <span className="badge badge-success" style={{ fontSize: "10px", padding: "2px 7px" }}>Applied ✓</span>}
                  </div>
                </div>
                <div style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: "18px", paddingTop: "18px", borderTop: "1px solid var(--border-subtle)" }}>
                  {/* Breakdown bar */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "18px" }}>
                    {[
                      { label: "Skills", value: match.breakdown.skills },
                      { label: "Experience", value: match.breakdown.experience },
                      { label: "Projects", value: match.breakdown.projects },
                      { label: "Overall", value: match.breakdown.overall },
                    ].map((item) => {
                      const c = item.value >= 90 ? "var(--success)" : item.value >= 75 ? "var(--info)" : item.value >= 60 ? "var(--warning)" : "var(--danger)";
                      return (
                        <div key={item.label} style={{ padding: "10px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                          <div style={{ fontSize: "18px", fontWeight: 700, color: c }}>{item.value}%</div>
                          <div className="text-caption" style={{ fontSize: "10px" }}>{item.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ padding: "14px", borderRadius: "var(--radius-md)", background: "var(--success-muted)", border: "1px solid rgba(34,197,94,0.1)" }}>
                      <h4 style={{ fontSize: "12px", fontWeight: 600, color: "var(--success)", display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                        <CheckCircle size={13} /> Matched Skills
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        {match.matchedSkills.map((s) => (
                          <span key={s} style={{ fontSize: "12px", color: "var(--text-secondary)" }}>✓ {s}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "14px", borderRadius: "var(--radius-md)", background: match.skillGaps.length > 0 ? "var(--warning-muted)" : "var(--success-muted)", border: `1px solid ${match.skillGaps.length > 0 ? "rgba(234,179,8,0.1)" : "rgba(34,197,94,0.1)"}` }}>
                      <h4 style={{ fontSize: "12px", fontWeight: 600, color: match.skillGaps.length > 0 ? "var(--warning)" : "var(--success)", display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                        <AlertTriangle size={13} /> Skill Gaps
                      </h4>
                      {match.skillGaps.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          {match.skillGaps.map((g) => (
                            <span key={g} style={{ fontSize: "12px", color: "var(--text-secondary)" }}>○ {g}</span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "var(--success)" }}>✓ No gaps!</span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setSelectedMatch(match)}>
                      <Brain size={14} /> View Full Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
