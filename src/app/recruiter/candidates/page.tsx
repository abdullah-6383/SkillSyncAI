"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ScoreRing from "@/components/ScoreRing";
import { opportunities, getMatchesForOpportunity } from "@/lib/mock-data";
import {
  Target,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Mail,
  Award,
  Crown,
  Briefcase,
} from "lucide-react";

export default function CandidateRankings() {
  const [selectedOpp, setSelectedOpp] = useState(opportunities[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentOpp = opportunities.find((o) => o.id === selectedOpp)!;
  const rankedCandidates = getMatchesForOpportunity(selectedOpp);

  return (
    <DashboardLayout role="recruiter">
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <Target size={20} color="var(--success)" strokeWidth={2} />
          <h1 className="text-heading" style={{ fontSize: "22px" }}>Candidate Rankings</h1>
        </div>
        <p className="text-body">Candidates ranked by AI skill-matching analysis</p>
      </div>

      <div className="card-static" style={{ padding: "20px", marginBottom: "20px" }}>
        <label className="text-overline" style={{ display: "block", marginBottom: "8px" }}>Select Opportunity</label>
        <select
          className="input"
          value={selectedOpp}
          onChange={(e) => { setSelectedOpp(e.target.value); setExpandedId(null); }}
          style={{ maxWidth: "520px" }}
        >
          {opportunities.map((opp) => (
            <option key={opp.id} value={opp.id}>{opp.title} — {opp.company}</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: "16px", marginTop: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", fontWeight: 500 }}>{currentOpp.company}</span>
          <span className="text-caption">{currentOpp.location}</span>
          <span className="text-caption">{currentOpp.salary}</span>
          <span className="text-caption">{currentOpp.applicants} applicants</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
          {currentOpp.requiredSkills.map((skill) => {
            const cls: Record<string, string> = { required: "badge-danger", preferred: "badge-accent", "nice-to-have": "badge-default" };
            return (
              <span key={skill.name} className={`badge ${cls[skill.importance] || "badge-default"}`} style={{ fontSize: "11px" }}>
                {skill.name}
                <span style={{ opacity: 0.6, fontSize: "9px", marginLeft: "3px" }}>{skill.importance}</span>
              </span>
            );
          })}
        </div>
      </div>

      {rankedCandidates.length === 0 ? (
        <div className="card-static" style={{ padding: "80px 40px", textAlign: "center" }}>
          <Target size={36} color="var(--text-muted)" strokeWidth={1.2} style={{ margin: "0 auto 10px" }} />
          <p className="text-body">No AI-matched candidates for this opportunity yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {rankedCandidates.map((match, index) => {
            const isExpanded = expandedId === match.studentId;
            return (
              <div key={match.studentId} className={isExpanded ? "card-accent" : "card"} style={{ padding: "18px", overflow: "hidden" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}
                  onClick={() => setExpandedId(isExpanded ? null : match.studentId)}
                >
                  <div
                    style={{
                      width: "28px", height: "28px", borderRadius: "var(--radius-sm)",
                      background: index === 0 ? "linear-gradient(135deg, #f59e0b, #d97706)" : index === 1 ? "linear-gradient(135deg, #9ca3af, #71717a)" : index === 2 ? "linear-gradient(135deg, #b45309, #92400e)" : "rgba(255,255,255,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 700, color: index < 3 ? "white" : "var(--text-muted)", flexShrink: 0,
                    }}
                  >
                    {index === 0 ? <Crown size={14} /> : `#${index + 1}`}
                  </div>
                  <ScoreRing score={match.score} size={50} strokeWidth={3.5} />
                  <div
                    style={{
                      width: "38px", height: "38px", borderRadius: "var(--radius-sm)",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0,
                    }}
                  >
                    {match.student.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2px" }}>{match.student.name}</h3>
                    <div className="text-caption">{match.student.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{match.student.university}</div>
                  </div>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", maxWidth: "180px", flexShrink: 0 }}>
                    {match.matchedSkills.slice(0, 3).map((skill) => (
                      <span key={skill} className="badge badge-success" style={{ fontSize: "10px", padding: "2px 7px" }}>✓ {skill}</span>
                    ))}
                  </div>
                  <div style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px" }}>
                      {match.explanation}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "14px" }}>
                      {(["skills", "experience", "projects", "overall"] as const).map((key) => {
                        const val = match.breakdown[key];
                        const c = val >= 90 ? "var(--success)" : val >= 75 ? "var(--info)" : val >= 60 ? "var(--warning)" : "var(--danger)";
                        return (
                          <div key={key} style={{ padding: "10px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                            <div style={{ fontSize: "18px", fontWeight: 700, color: c }}>{val}%</div>
                            <div className="text-caption" style={{ fontSize: "10px", textTransform: "capitalize" }}>{key}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                      <div style={{ padding: "14px", borderRadius: "var(--radius-md)", background: "var(--success-muted)", border: "1px solid rgba(34,197,94,0.1)" }}>
                        <h4 style={{ fontSize: "12px", fontWeight: 600, color: "var(--success)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}><CheckCircle size={12} /> Strengths</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          {match.strengths.map((s, i) => <span key={i} style={{ fontSize: "11px", color: "var(--text-secondary)" }}>✓ {s}</span>)}
                        </div>
                      </div>
                      <div style={{ padding: "14px", borderRadius: "var(--radius-md)", background: match.skillGaps.length > 0 ? "var(--warning-muted)" : "var(--success-muted)", border: `1px solid ${match.skillGaps.length > 0 ? "rgba(234,179,8,0.1)" : "rgba(34,197,94,0.1)"}` }}>
                        <h4 style={{ fontSize: "12px", fontWeight: 600, color: match.skillGaps.length > 0 ? "var(--warning)" : "var(--success)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}><AlertTriangle size={12} /> Gaps</h4>
                        {match.skillGaps.length > 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                            {match.skillGaps.map((g, i) => <span key={i} style={{ fontSize: "11px", color: "var(--text-secondary)" }}>○ {g}</span>)}
                          </div>
                        ) : <span style={{ fontSize: "11px", color: "var(--success)" }}>✓ No gaps!</span>}
                      </div>
                      <div style={{ padding: "14px", borderRadius: "var(--radius-md)", background: "var(--accent-muted)", border: "1px solid rgba(99,102,241,0.1)" }}>
                        <h4 style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent-light)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}><Award size={12} /> Info</h4>
                        <div style={{ fontSize: "11px", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><GraduationCap size={10} /> {match.student.education}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Mail size={10} /> {match.student.email}</span>
                          <span>GPA: {match.student.gpa}/4.0</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-primary" style={{ padding: "8px 18px", fontSize: "13px" }}><Mail size={14} /> Contact</button>
                      <button className="btn btn-ghost" style={{ padding: "8px 18px", fontSize: "13px" }}><Briefcase size={14} /> Shortlist</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
