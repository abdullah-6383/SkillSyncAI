"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { students } from "@/lib/mock-data";
import {
  FileText,
  Upload,
  Sparkles,
  Zap,
  Plus,
  Trash2,
  CheckCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Edit2,
  Save,
  Layers,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: string;
  proficiency: "Advanced" | "Intermediate" | "Beginner" | string;
}

interface StructuredProfile {
  headline: string;
  summary: string;
  skills: SkillItem[];
  projects: string[];
  experience: string[];
  education: string[];
  strengths: string[];
}

const LOADING_STEPS = [
  "Reading your resume...",
  "Identifying skills...",
  "Understanding experience...",
  "Building your talent profile...",
];

const sampleResume = students[0].resumeText;

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState(sampleResume);
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [profile, setProfile] = useState<StructuredProfile | null>(null);
  const [error, setError] = useState("");

  // New Skill form state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");
  const [newSkillProficiency, setNewSkillProficiency] = useState<"Advanced" | "Intermediate" | "Beginner">("Intermediate");
  const [showAddForm, setShowAddForm] = useState(false);

  // Cycling loading animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (analyzing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 750);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      try {
        setAnalyzing(true);
        setLoadingStep(0); // "Reading your resume..."
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            setResumeText(data.text);
          }
        } else {
          setError("Failed to extract text from PDF");
        }
      } catch (err) {
        setError("Error uploading PDF");
      } finally {
        setAnalyzing(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setResumeText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setAnalyzing(true);
    setError("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "analyze-resume",
          data: { resumeText },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const data: StructuredProfile = await res.json();
      setProfile(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Editable Skill functions
  const handleRemoveSkill = (index: number) => {
    if (!profile) return;
    const updated = [...profile.skills];
    updated.splice(index, 1);
    setProfile({ ...profile, skills: updated });
  };

  const handleProficiencyChange = (index: number, proficiency: string) => {
    if (!profile) return;
    const updated = [...profile.skills];
    updated[index] = { ...updated[index], proficiency };
    setProfile({ ...profile, skills: updated });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !newSkillName.trim()) return;

    const updated = [
      ...profile.skills,
      {
        name: newSkillName.trim(),
        category: newSkillCategory,
        proficiency: newSkillProficiency,
      },
    ];

    setProfile({ ...profile, skills: updated });
    setNewSkillName("");
    setShowAddForm(false);
  };

  // Group skills by category
  const groupedSkills = profile
    ? profile.skills.reduce((acc, skill, idx) => {
        const cat = skill.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push({ ...skill, originalIndex: idx });
        return acc;
      }, {} as Record<string, (SkillItem & { originalIndex: number })[]>)
    : {};

  return (
    <DashboardLayout role="student">
      {/* Header Banner */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <Sparkles size={22} color="var(--accent-light)" strokeWidth={2} />
          <h1 className="text-heading" style={{ fontSize: "24px" }}>
            Turn your resume into a skill profile.
          </h1>
        </div>
        <p className="text-body" style={{ color: "var(--text-secondary)" }}>
          AI-powered talent matching based on your skills, projects and experience.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: profile ? "420px 1fr" : "1fr", gap: "24px" }}>
        {/* Left Column: Input & Upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="card-static" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={16} color="var(--accent-light)" />
                <h3 className="text-title" style={{ fontSize: "15px" }}>Resume Input</h3>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setResumeText(sampleResume)}
                style={{ fontSize: "12px", padding: "4px 10px", height: "auto" }}
              >
                Load Sample
              </button>
            </div>

            {/* Dropzone for TXT/PDF */}
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                border: "2px dashed var(--border-color)",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.02)",
                cursor: "pointer",
                marginBottom: "16px",
                transition: "all 0.2s ease",
              }}
            >
              <Upload size={20} color="var(--accent-light)" style={{ marginBottom: "8px" }} />
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                Upload Resume (.txt, .pdf, .md)
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-caption)", marginTop: "2px" }}>
                Click to browse or drag and drop
              </span>
              <input
                type="file"
                accept=".txt,.pdf,.md,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>

            {/* Textarea */}
            <textarea
              className="input"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={14}
              placeholder="Paste your raw resume text here..."
              style={{
                width: "100%",
                fontFamily: "monospace",
                fontSize: "12px",
                lineHeight: "1.5",
                marginBottom: "16px",
                resize: "vertical",
              }}
            />

            {/* Analyze Button */}
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={analyzing || !resumeText.trim()}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 600,
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
              }}
            >
              {analyzing ? (
                <>
                  <div className="spinner" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Zap size={16} /> Analyze with AI
                </>
              )}
            </button>

            {error && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--danger-muted)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "var(--danger)",
                  fontSize: "13px",
                }}
              >
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Loading or Result */}
        <div>
          {/* Animated Loading Screen */}
          {analyzing && (
            <div
              className="card-static"
              style={{
                padding: "100px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                background: "linear-gradient(180deg, var(--bg-card), var(--bg-surface))",
                minHeight: "450px",
              }}
            >
              <div style={{ position: "relative", marginBottom: "24px" }}>
                <div className="spinner" style={{ width: "48px", height: "48px", borderWidth: "3px" }} />
                <Sparkles
                  size={20}
                  color="var(--accent-light)"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>

              {/* Animated Message Cycling */}
              <h3
                key={loadingStep}
                className="gradient-text"
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  animation: "fadeIn 0.3s ease-in-out",
                }}
              >
                {LOADING_STEPS[loadingStep]}
              </h3>

              <div style={{ display: "flex", gap: "6px", marginTop: "16px" }}>
                {LOADING_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "32px",
                      height: "4px",
                      borderRadius: "2px",
                      background: idx <= loadingStep ? "var(--accent-light)" : "var(--border-color)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
              <p className="text-caption" style={{ marginTop: "16px" }}>
                Groq & Gemini AI Processing
              </p>
            </div>
          )}

          {/* Initial Empty State */}
          {!analyzing && !profile && (
            <div
              className="card-static"
              style={{
                padding: "80px 40px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "450px",
                borderStyle: "dashed",
              }}
            >
              <Sparkles size={40} color="var(--accent-light)" style={{ marginBottom: "16px", opacity: 0.7 }} />
              <h3 className="text-title" style={{ fontSize: "18px", marginBottom: "8px" }}>
                Ready for AI Extraction
              </h3>
              <p className="text-body" style={{ maxWidth: "380px", margin: "0 auto" }}>
                Click <strong>"Analyze with AI"</strong> to extract verified skills, proficiency breakdown, and structured experience.
              </p>
            </div>
          )}

          {/* Extracted AI Skill Profile Result */}
          {profile && !analyzing && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Profile Overview Card */}
              <div
                className="card-accent"
                style={{
                  padding: "24px",
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05))",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Award size={18} color="var(--accent-light)" />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--accent-light)",
                    }}
                  >
                    AI SKILL PROFILE
                  </span>
                </div>
                <h2 className="text-heading" style={{ fontSize: "20px", marginBottom: "8px" }}>
                  {profile.headline}
                </h2>
                <p className="text-body" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  {profile.summary}
                </p>
              </div>

              {/* Skills Section Grouped by Category */}
              <div className="card-static" style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Layers size={18} color="var(--accent-light)" />
                    <h3 className="text-title" style={{ fontSize: "16px" }}>Extracted Skills & Competencies</h3>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{ fontSize: "12px", gap: "4px" }}
                  >
                    <Plus size={14} /> Add Skill
                  </button>
                </div>

                {/* Add New Skill Form */}
                {showAddForm && (
                  <form
                    onSubmit={handleAddSkill}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "20px",
                      padding: "12px",
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <input
                      className="input"
                      placeholder="Skill Name (e.g. Docker)"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      style={{ flex: 2, fontSize: "13px" }}
                      required
                    />
                    <select
                      className="input"
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      style={{ flex: 1, fontSize: "13px" }}
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="Tools">Tools</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                    <select
                      className="input"
                      value={newSkillProficiency}
                      onChange={(e) => setNewSkillProficiency(e.target.value as any)}
                      style={{ flex: 1, fontSize: "13px" }}
                    >
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                    <button className="btn btn-primary" type="submit" style={{ fontSize: "12px", padding: "0 14px" }}>
                      Save
                    </button>
                  </form>
                )}

                {/* Skill Groups */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {Object.entries(groupedSkills).map(([category, items]) => (
                    <div key={category}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-light)" }} />
                        {category}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
                        {items.map((skill) => {
                          const profColorMap: Record<string, string> = {
                            Advanced: "var(--success)",
                            Intermediate: "var(--accent-light)",
                            Beginner: "var(--warning)",
                          };

                          const badgeClassMap: Record<string, string> = {
                            Advanced: "badge-success",
                            Intermediate: "badge-accent",
                            Beginner: "badge-warning",
                          };

                          return (
                            <div
                              key={skill.originalIndex}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "10px 14px",
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-sm)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                                {skill.name}
                              </span>

                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <select
                                  value={skill.proficiency}
                                  onChange={(e) => handleProficiencyChange(skill.originalIndex, e.target.value)}
                                  className={`badge ${badgeClassMap[skill.proficiency] || "badge-default"}`}
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    cursor: "pointer",
                                    padding: "2px 8px",
                                    fontSize: "11px",
                                  }}
                                >
                                  <option value="Advanced" style={{ background: "#1e1e2e", color: "#fff" }}>Advanced</option>
                                  <option value="Intermediate" style={{ background: "#1e1e2e", color: "#fff" }}>Intermediate</option>
                                  <option value="Beginner" style={{ background: "#1e1e2e", color: "#fff" }}>Beginner</option>
                                </select>

                                <button
                                  onClick={() => handleRemoveSkill(skill.originalIndex)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-caption)",
                                    cursor: "pointer",
                                    padding: "2px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  title="Remove skill"
                                >
                                  <Trash2 size={13} hover-color="var(--danger)" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights: Projects, Experience, Education & Strengths */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* Projects */}
                <div className="card-static" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <FolderGit2 size={16} color="var(--accent-light)" />
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>Extracted Projects</h4>
                  </div>
                  <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    {profile.projects?.map((proj, i) => (
                      <li key={i}>{proj}</li>
                    ))}
                  </ul>
                </div>

                {/* Experience */}
                <div className="card-static" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Briefcase size={16} color="var(--success)" />
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>Work Experience</h4>
                  </div>
                  <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    {profile.experience?.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    ))}
                  </ul>
                </div>

                {/* Education */}
                <div className="card-static" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <GraduationCap size={16} color="var(--warning)" />
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>Education</h4>
                  </div>
                  <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    {profile.education?.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                </div>

                {/* Strengths */}
                <div className="card-static" style={{ padding: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <CheckCircle size={16} color="var(--accent-light)" />
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>Core Strengths</h4>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {profile.strengths?.map((str, i) => (
                      <span key={i} className="badge badge-accent" style={{ fontSize: "11px" }}>
                        {str}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
