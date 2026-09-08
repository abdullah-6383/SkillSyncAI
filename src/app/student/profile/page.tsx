"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { students } from "@/lib/mock-data";
import {
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Star,
  Award,
  ExternalLink,
  Briefcase,
} from "lucide-react";

const student = students[0];

export default function StudentProfile() {
  return (
    <DashboardLayout role="student">
      <div style={{ marginBottom: "28px" }}>
        <h1 className="text-heading" style={{ fontSize: "22px" }}>My Profile</h1>
        <p className="text-body" style={{ marginTop: "4px" }}>Manage your skills and experience</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px" }}>
        {/* Left — Profile Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="card-accent" style={{ padding: "28px", textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
                color: "white",
                margin: "0 auto 14px",
              }}
            >
              {student.avatar}
            </div>
            <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "3px" }}>
              {student.name}
            </h2>
            <p className="text-caption">{student.title}</p>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
              {[
                { icon: <Mail size={14} />, text: student.email },
                { icon: <GraduationCap size={14} />, text: student.university },
                { icon: <Calendar size={14} />, text: `Class of ${student.graduationYear}` },
                { icon: <Star size={14} />, text: `GPA: ${student.gpa}/4.0` },
                { icon: <MapPin size={14} />, text: "Chennai, India" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    fontSize: "12.5px",
                    color: "var(--text-secondary)",
                    padding: "7px 10px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span style={{ color: "var(--accent-light)", flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="card-static" style={{ padding: "20px" }}>
            <h3 className="text-title" style={{ fontSize: "14px", marginBottom: "8px" }}>About</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {student.bio}
            </p>
          </div>
        </div>

        {/* Right — Skills & Experience */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Skills */}
          <div className="card-static" style={{ padding: "24px" }}>
            <h3 className="text-title" style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <Award size={15} color="var(--accent-light)" strokeWidth={2} />
              Skills & Proficiency
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {student.skills.map((skill) => {
                const classMap: Record<string, string> = {
                  expert: "badge-success",
                  advanced: "badge-accent",
                  intermediate: "badge-warning",
                  beginner: "badge-default",
                };
                return (
                  <span key={skill.name} className={`badge ${classMap[skill.level] || "badge-default"}`}>
                    {skill.name}
                    <span style={{ opacity: 0.6, fontSize: "10px", textTransform: "capitalize" }}>
                      · {skill.level}
                    </span>
                  </span>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              {[
                { label: "Expert", cls: "badge-success" },
                { label: "Advanced", cls: "badge-accent" },
                { label: "Intermediate", cls: "badge-warning" },
              ].map((l) => (
                <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--text-muted)" }}>
                  <span className={`badge ${l.cls}`} style={{ width: "8px", height: "8px", padding: 0, borderRadius: "50%" }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="card-static" style={{ padding: "24px" }}>
            <h3 className="text-title" style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <Briefcase size={15} color="var(--accent-light)" strokeWidth={2} />
              Experience
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {student.experience.map((exp, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: "16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "6px" }}>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 600 }}>{exp.title}</h4>
                      <p style={{ fontSize: "13px", color: "var(--accent-light)", fontWeight: 500 }}>{exp.company}</p>
                    </div>
                    <span className="text-caption">{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card-static" style={{ padding: "24px" }}>
            <h3 className="text-title" style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
              <GraduationCap size={15} color="var(--accent-light)" strokeWidth={2} />
              Education
            </h3>
            <div
              style={{
                padding: "14px",
                borderRadius: "var(--radius-md)",
                background: "var(--accent-muted)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: 500 }}>{student.education}</p>
              <p className="text-caption" style={{ marginTop: "3px" }}>GPA: {student.gpa}/4.0</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
