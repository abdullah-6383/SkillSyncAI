"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Sparkles, Plus, Briefcase, CheckCircle, Zap } from "lucide-react";

interface AnalysisResult {
  requiredSkills: { name: string; importance: string }[];
  summary: string;
  keyResponsibilities: string[];
  cultureFit: string;
}

export default function CreateOpportunity() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAnalyze = async () => {
    if (!title.trim() || !description.trim()) return;
    setAnalyzing(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyze-opportunity", data: { title, company, description } }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Analysis failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to analyze.";
      setError(message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout role="recruiter">
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <Plus size={20} color="var(--success)" strokeWidth={2} />
          <h1 className="text-heading" style={{ fontSize: "22px" }}>Create Opportunity</h1>
        </div>
        <p className="text-body">AI will automatically extract required skills from your description</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Form */}
        <div className="card-static" style={{ padding: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                Job Title *
              </label>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full-Stack Software Engineer Intern"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                Company
              </label>
              <input
                type="text"
                className="input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                Job Description *
              </label>
              <textarea
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={14}
                placeholder="Paste the full job description here. Include responsibilities, requirements, and qualifications..."
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={analyzing || !title.trim() || !description.trim()}
              style={{ width: "100%" }}
            >
              {analyzing ? (
                <><div className="spinner" /> Analyzing with Gemini...</>
              ) : (
                <><Zap size={15} /> Analyze & Extract Skills</>
              )}
            </button>
            {error && (
              <div style={{ padding: "12px", borderRadius: "var(--radius-sm)", background: "var(--danger-muted)", border: "1px solid rgba(239,68,68,0.15)", color: "var(--danger)", fontSize: "13px" }}>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          {analyzing && (
            <div className="card-static" style={{ padding: "80px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
              <div className="spinner" style={{ width: "28px", height: "28px" }} />
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Analyzing job description...</p>
            </div>
          )}

          {result && !analyzing && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Ideal Candidate */}
              <div
                className="card-accent"
                style={{ padding: "20px", background: "linear-gradient(135deg, rgba(34,197,94,0.05), transparent)" }}
              >
                <h3 style={{ fontSize: "13px", fontWeight: 600, color: "var(--success)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <Briefcase size={13} /> Ideal Candidate
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {result.summary}
                </p>
              </div>

              {/* Extracted Skills */}
              <div className="card-static" style={{ padding: "20px" }}>
                <h3 className="text-title" style={{ fontSize: "13px", marginBottom: "12px" }}>
                  Required Skills
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {result.requiredSkills.map((skill, i) => {
                    const cls: Record<string, string> = {
                      required: "badge-danger",
                      preferred: "badge-accent",
                      "nice-to-have": "badge-default",
                    };
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <span style={{ fontSize: "13px", fontWeight: 500 }}>{skill.name}</span>
                        <span className={`badge ${cls[skill.importance] || "badge-default"}`} style={{ fontSize: "10px", padding: "2px 8px", textTransform: "capitalize" }}>
                          {skill.importance}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Responsibilities */}
              {result.keyResponsibilities && result.keyResponsibilities.length > 0 && (
                <div className="card-static" style={{ padding: "20px" }}>
                  <h3 className="text-title" style={{ fontSize: "13px", marginBottom: "10px" }}>
                    Key Responsibilities
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {result.keyResponsibilities.map((r, i) => (
                      <div key={i} style={{ fontSize: "13px", color: "var(--text-secondary)", padding: "4px 0" }}>
                        • {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Culture Fit */}
              {result.cultureFit && (
                <div className="card-static" style={{ padding: "20px" }}>
                  <h3 className="text-title" style={{ fontSize: "13px", marginBottom: "8px" }}>Culture Fit</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {result.cultureFit}
                  </p>
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={handleSave}
                style={{
                  width: "100%",
                  background: saved ? "var(--success)" : undefined,
                }}
              >
                {saved ? (
                  <><CheckCircle size={15} /> Saved!</>
                ) : (
                  <><Plus size={15} /> Save & Find Candidates</>
                )}
              </button>
            </div>
          )}

          {!result && !analyzing && (
            <div
              className="card-static"
              style={{
                padding: "80px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "400px",
              }}
            >
              <Briefcase size={36} color="var(--text-muted)" strokeWidth={1.2} />
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Fill in job details and analyze</p>
              <p className="text-caption">AI will extract skills and build candidate criteria</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
