import React from 'react';
import type { ProjectSummary } from '../types/project';
import {
  FileText,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Building,
} from 'lucide-react';

interface ProjectTableProps {
  projects: ProjectSummary[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onOpenDossier: (projectId: string) => void;
  isLoading: boolean;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onOpenDossier,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="table-skeleton-wrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="table-row-skeleton" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="table-empty-state">
        <AlertCircle size={36} className="empty-icon" />
        <h3 className="empty-title">No Monitored Works Match Your Filters</h3>
        <p className="empty-desc">
          Try broadening your search query, selecting "All States", or clearing active risk band filters.
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(2)} L`;
  };

  const getRiskBadgeClass = (score: number | null | undefined) => {
    if (score === null || score === undefined) return 'low';
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  };

  return (
    <div className="table-container">
      <table className="project-data-table">
        <thead>
          <tr>
            <th className="th-id">PROJECT ID</th>
            <th className="th-work">SECTOR & LOCATION</th>
            <th className="th-financial">SANCTIONED & SPENT</th>
            <th className="th-progress">PROGRESS VS EXPECTED</th>
            <th className="th-timeline">TIMELINE / DELAY</th>
            <th className="th-risk">FUSED RISK</th>
            <th className="th-signal">PRIMARY SIGNAL</th>
            <th className="th-actions">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, index) => {
            const riskClass = getRiskBadgeClass(p.risk_score);
            const spentRatio = Math.min(100, Math.round((p.expenditure / p.sanctioned_amount) * 100));
            const isSelected = p.project_id === selectedProjectId;

            return (
              <tr
                key={p.project_id}
                className={`table-row ${isSelected ? 'row-selected' : ''} row-${riskClass}`}
                onClick={() => onSelectProject(p.project_id)}
              >
                {/* Project ID */}
                <td className="td-id">
                  <div className="id-cell">
                    <span className="rank-num">#{index + 1}</span>
                    <span className="project-id-badge telemetry-num">{p.project_id}</span>
                  </div>
                </td>

                {/* Work Type & Location */}
                <td className="td-work">
                  <div className="work-cell">
                    <div className="work-type-title">{p.work_type}</div>
                    <div className="work-desc" title={p.description}>
                      {p.description}
                    </div>
                    <div className="location-meta">
                      <MapPin size={12} className="meta-icon" />
                      <span>
                        {p.district}, {p.state} ({p.constituency})
                      </span>
                    </div>
                  </div>
                </td>

                {/* Financials */}
                <td className="td-financial">
                  <div className="financial-cell">
                    <div className="sanctioned-row">
                      <span className="fin-label">Sanctioned:</span>
                      <span className="telemetry-num fin-val">{formatCurrency(p.sanctioned_amount)}</span>
                    </div>
                    <div className="spent-row">
                      <span className="fin-label">Disbursed:</span>
                      <span className="telemetry-num fin-val highlight">{formatCurrency(p.expenditure)}</span>
                    </div>
                    <div className="ratio-bar-wrap" title={`Spent: ${spentRatio}% of sanctioned amount`}>
                      <div className="ratio-bar-fill" style={{ width: `${spentRatio}%` }} />
                      <span className="ratio-text telemetry-num">{spentRatio}%</span>
                    </div>
                  </div>
                </td>

                {/* Physical Progress vs Expected */}
                <td className="td-progress">
                  <div className="progress-cell">
                    <div className="progress-numbers">
                      <span className="progress-actual telemetry-num">
                        {p.physical_progress.toFixed(1)}%
                      </span>
                      <span className="progress-label">completed</span>
                    </div>
                    <div className="dual-progress-track">
                      <div
                        className="dual-progress-fill"
                        style={{ width: `${Math.min(100, p.physical_progress)}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Timeline / Delay */}
                <td className="td-timeline">
                  <div className="timeline-cell">
                    <div className="timeline-dates">
                      <span>{p.start_date}</span> → <span>{p.expected_completion}</span>
                    </div>
                    {p.risk_score && p.risk_score >= 60 ? (
                      <span className="delay-badge overdue">
                        <Clock size={11} />
                        <span>Timeline Lag</span>
                      </span>
                    ) : (
                      <span className="delay-badge on-schedule">
                        <Clock size={11} />
                        <span>Nominal</span>
                      </span>
                    )}
                  </div>
                </td>

                {/* Risk Score & Confidence */}
                <td className="td-risk">
                  <div className="risk-cell">
                    <div className={`risk-score-pill ${riskClass}`}>
                      <span className="score-value telemetry-num">
                        {p.risk_score ? p.risk_score.toFixed(1) : '—'}
                      </span>
                      <span className="score-tier">{riskClass.toUpperCase()}</span>
                    </div>
                    {p.confidence_score !== null && p.confidence_score !== undefined && (
                      <div className="confidence-indicator" title="Model confidence score">
                        <ShieldCheck size={11} className="conf-icon" />
                        <span className="conf-num telemetry-num">{p.confidence_score.toFixed(0)}%</span>
                        <span className="conf-label">conf</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Primary Signal */}
                <td className="td-signal">
                  <div className="signal-cell" title={p.main_signal || 'No anomalies detected'}>
                    <span className="signal-text">{p.main_signal || 'Normal operational trajectory'}</span>
                    <div className="agency-subtext">
                      <Building size={11} />
                      <span className="agency-name">{p.contractor}</span>
                    </div>
                  </div>
                </td>

                {/* Action CTA */}
                <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                  <div className="action-buttons-group">
                    <button
                      className="audit-cta-btn"
                      onClick={() => onSelectProject(p.project_id)}
                      title="Inspect 5D Fingerprint & Engines"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight size={13} />
                    </button>
                    <button
                      className="dossier-cta-btn"
                      onClick={() => onOpenDossier(p.project_id)}
                      title="Open Official Audit Dossier"
                    >
                      <FileText size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
