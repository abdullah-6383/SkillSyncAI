"use client";

import { useEffect, useState } from "react";
import ScoreRing from "@/components/ScoreRing";
import type { DetailedMatch, Opportunity } from "@/lib/mock-data";
import { students } from "@/lib/mock-data";
import {
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
  MapPin,
  Wifi,
  Users,
  Calendar,
  Brain,
  Send,
  Check,
  Zap,
  Target,
} from "lucide-react";

interface Props {
  match: DetailedMatch & { opportunity: Opportunity };
  isApplied: boolean;
  onApply: () => void;
  onClose: () => void;
}

interface AIAnalysisResult {
  matchScore: number;
  skillScore: number;
  experienceScore: number;
  projectScore: number;
  matchingSkills: string[];
  partialMatches: string[];
  missingSkills: string[];
  relevantProjects: string[];
  strengths: string[];
  recommendations: string[];
  explanation: string;
}

export default function MatchDetailModal({ match, isApplied, onApply, onClose }: Props) {
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const student = students[0]; // Active student

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Loading animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (analyzing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 600);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  const handleRunAIMatch = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "live-match",
          data: { student, opportunity: match.opportunity },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const loadingStepsText = [
    "Analyzing your actual skills...",
    "Reviewing your project experience...",
    "Evaluating opportunity requirements...",
    "Calculating true compatibility..."
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          animation: "fadeIn 0.2s ease forwards",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          overflow: "auto",
          background: "var(--bg-card)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          animation: "fadeInUp 0.3s ease forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-tertiary)",
            zIndex: 20,
            transition: "all 0.15s ease",
          }}
        >
          <X size={16} />
        </button>

        {/* ============ SCORE HERO ============ */}
        <div
          style={{
            padding: "40px 36px 28px",
            borderBottom: "1px solid var(--border-subtle)",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px", position: "relative" }}>
            <ScoreRing score={aiResult ? aiResult.matchScore : match.score} size={100} strokeWidth={6} />
            {aiResult && (
              <div style={{ position: "absolute", top: -10, right: 260 }}>
                <div className="badge badge-accent" style={{ background: "var(--accent)", color: "#fff", animation: "pulse 2s infinite" }}>
                  <Sparkles size={11} /> AI Verified
                </div>
              </div>
            )}
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "4px" }}>
            {match.opportunity.title}
          </h2>
          <p style={{ fontSize: "14px", color: "var(--accent-light)", fontWeight: 500, marginBottom: "16px" }}>
            {match.opportunity.company}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
            <span className="badge badge-accent" style={{ textTransform: "capitalize" }}>
              {match.opportunity.type}
            </span>
            {match.opportunity.remote && (
              <span className="badge badge-default"><Wifi size={11} /> Remote</span>
            )}
            <span className="badge badge-default"><MapPin size={11} /> {match.opportunity.location.split(",")[0]}</span>
            <span className="badge badge-default">{match.opportunity.salary}</span>
          </div>

          {!aiResult && !analyzing && (
            <button
              className="btn btn-primary"
              onClick={handleRunAIMatch}
              style={{ padding: "10px 24px", fontSize: "14px", margin: "0 auto", borderRadius: "100px", boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)" }}
            >
              <Zap size={16} /> Run Deep AI Match
            </button>
          )}

          {analyzing && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div className="spinner" style={{ width: "24px", height: "24px" }} />
              <div className="gradient-text" style={{ fontSize: "14px", fontWeight: 600 }}>{loadingStepsText[loadingStep]}</div>
            </div>
          )}
        </div>

        <div style={{ padding: "28px 36px 36px" }}>
          {aiResult ? (
            // ============ AI GENERATED RESULT ============
            <div style={{ animation: "fadeIn 0.4s ease" }}>
              
              {/* Progress Bars */}
              <div style={{ marginBottom: "28px" }}>
                <h3 className="text-overline" style={{ marginBottom: "16px" }}>Compatibility Breakdown</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Skill Compatibility", value: aiResult.skillScore, color: "var(--success)" },
                    { label: "Experience", value: aiResult.experienceScore, color: "var(--info)" },
                    { label: "Project Relevance", value: aiResult.projectScore, color: "var(--accent-light)" }
                  ].map(stat => (
                    <div key={stat.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 500 }}>{stat.label}</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: stat.color }}>{stat.value}%</span>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${stat.value}%`, height: "100%", background: stat.color, borderRadius: "3px", transition: "width 1s ease-out" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Lists */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                {/* Strengths / Matches */}
                <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.15)" }}>
                  <h4 style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--success)", marginBottom: "12px", letterSpacing: "0.5px" }}>
                    Matching Skills
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {aiResult.matchingSkills.map(s => (
                      <div key={s} style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                        <span style={{ color: "var(--success)", fontWeight: 700, marginRight: "8px" }}>✓</span>{s}
                      </div>
                    ))}
                    {aiResult.partialMatches.map(s => (
                      <div key={s} style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--warning)", fontWeight: 700, marginRight: "8px", fontSize: "14px" }}>◐</span>{s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gaps */}
                <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                  <h4 style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--danger)", marginBottom: "12px", letterSpacing: "0.5px" }}>
                    Skill Gaps
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {aiResult.missingSkills.length > 0 ? (
                      aiResult.missingSkills.map(s => (
                        <div key={s} style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                          <span style={{ color: "var(--danger)", fontWeight: 700, marginRight: "8px", fontSize: "14px" }}>○</span>{s}
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>None identified.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Explanations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "var(--bg-app)", border: "1px solid var(--border-default)" }}>
                  <h4 style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-light)", marginBottom: "10px" }}>
                    <Brain size={14} /> Why this match?
                  </h4>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
                    {aiResult.explanation}
                  </p>
                </div>

                <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "var(--bg-app)", border: "1px solid var(--border-default)" }}>
                  <h4 style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", color: "var(--warning)", marginBottom: "10px" }}>
                    <Target size={14} /> How to improve
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "13.5px", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                    {aiResult.recommendations.map((rec, i) => (
                      <li key={i} style={{ marginBottom: "4px" }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // ============ STATIC FALLBACK (Before AI runs) ============
            <div style={{ opacity: analyzing ? 0.3 : 1, transition: "opacity 0.3s ease" }}>
              <div style={{ marginBottom: "28px" }}>
                <h3 className="text-overline" style={{ marginBottom: "14px" }}>Quick Breakdown</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {[
                    { label: "Skills", value: match.breakdown.skills },
                    { label: "Experience", value: match.breakdown.experience },
                    { label: "Projects", value: match.breakdown.projects },
                    { label: "Overall", value: match.breakdown.overall },
                  ].map((item) => {
                    const c = item.value >= 90 ? "var(--success)" : item.value >= 75 ? "var(--info)" : "var(--warning)";
                    return (
                      <div key={item.label} style={{ padding: "16px 12px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                        <div style={{ fontSize: "24px", fontWeight: 700, color: c, letterSpacing: "-0.02em", marginBottom: "2px" }}>{item.value}%</div>
                        <div className="text-caption">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
                <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: "var(--success-muted)", border: "1px solid rgba(34, 197, 94, 0.12)" }}>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--success)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <CheckCircle size={14} /> Why you're a strong match
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {match.matchedSkills.map((skill) => (
                      <div key={skill} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-primary)" }}>
                        <span style={{ color: "var(--success)", fontWeight: 600 }}>✓</span>{skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "18px", borderRadius: "var(--radius-md)", background: match.skillGaps.length > 0 ? "var(--warning-muted)" : "var(--success-muted)", border: `1px solid ${match.skillGaps.length > 0 ? "rgba(234, 179, 8, 0.12)" : "rgba(34, 197, 94, 0.12)"}` }}>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, color: match.skillGaps.length > 0 ? "var(--warning)" : "var(--success)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <AlertCircle size={14} /> Skill gaps
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {match.skillGaps.map((gap) => (
                      <div key={gap} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-primary)" }}>
                        <span style={{ color: "var(--warning)", fontWeight: 600 }}>○</span>{gap}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ OPPORTUNITY META & ACTION ============ */}
          <div style={{ display: "flex", gap: "16px", padding: "14px 16px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", marginBottom: "24px", flexWrap: "wrap" }}>
            <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users size={12} /> {match.opportunity.applicants} applicants</span>
            <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={12} /> Deadline: {match.opportunity.deadline}</span>
            <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={12} /> {match.opportunity.location}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={(e) => { e.stopPropagation(); if (!isApplied) onApply(); }}
            disabled={isApplied}
            style={{ width: "100%", padding: "14px", fontSize: "15px", fontWeight: 600, background: isApplied ? "var(--success)" : undefined, cursor: isApplied ? "default" : "pointer" }}
          >
            {isApplied ? <><Check size={17} /> Application Submitted</> : <><Send size={16} /> Apply Now</>}
          </button>
        </div>
      </div>
    </div>
  );
}
