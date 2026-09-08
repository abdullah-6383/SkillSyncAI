"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { opportunities } from "@/lib/mock-data";
import { MapPin, Users, Briefcase, DollarSign, Calendar, ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function OpportunitiesPage() {
  return (
    <DashboardLayout role="student">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 className="text-heading" style={{ fontSize: "22px" }}>Opportunities</h1>
          <p className="text-body" style={{ marginTop: "4px" }}>
            {opportunities.length} opportunities matching your profile
          </p>
        </div>
        <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: "13px" }}>
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {opportunities.map((opp) => {
          const typeClass: Record<string, string> = {
            internship: "badge-accent",
            "full-time": "badge-success",
            "part-time": "badge-default",
            freelance: "badge-warning",
          };

          return (
            <div key={opp.id} className="card" style={{ padding: "22px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                {/* Logo */}
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
                  {opp.companyLogo}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3px" }}>
                    <h3 className="text-title">{opp.title}</h3>
                    <span className={`badge ${typeClass[opp.type] || "badge-default"}`} style={{ fontSize: "11px", padding: "3px 8px", textTransform: "capitalize" }}>
                      {opp.type}
                    </span>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--accent-light)", fontWeight: 500, marginBottom: "8px" }}>
                    {opp.company}
                  </p>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>
                    {opp.description}
                  </p>

                  {/* Skills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                    {opp.requiredSkills.map((skill) => {
                      const cls: Record<string, string> = {
                        required: "badge-danger",
                        preferred: "badge-accent",
                        "nice-to-have": "badge-default",
                      };
                      return (
                        <span key={skill.name} className={`badge ${cls[skill.importance] || "badge-default"}`} style={{ fontSize: "11px", padding: "3px 8px" }}>
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                    <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={12} strokeWidth={1.5} /> {opp.location}
                    </span>
                    <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <DollarSign size={12} strokeWidth={1.5} /> {opp.salary}
                    </span>
                    <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Users size={12} strokeWidth={1.5} /> {opp.applicants}
                    </span>
                    <span className="text-caption" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={12} strokeWidth={1.5} /> {opp.deadline}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <Link href="/student/matches" style={{ textDecoration: "none", alignSelf: "center" }}>
                  <button className="btn btn-soft" style={{ padding: "8px 16px", fontSize: "13px" }}>
                    <Briefcase size={14} /> Match <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
