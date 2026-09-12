import type { OverviewStats, RiskBand } from '../types/project';
import { AlertTriangle, Clock, Layers, ShieldAlert, FolderKanban } from 'lucide-react';

interface TelemetryBarProps {
  overview: OverviewStats | null;
  selectedRiskBand: RiskBand;
  onSelectRiskBand: (band: RiskBand) => void;
  isLoading: boolean;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({
  overview,
  selectedRiskBand,
  onSelectRiskBand,
  isLoading,
}) => {
  if (isLoading || !overview) {
    return (
      <div className="telemetry-bar-skeleton">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="kpi-skeleton-card" />
        ))}
      </div>
    );
  }

  const total = overview.total_projects || 1;
  const dist = overview.risk_distribution;
  const criticalPct = Math.round((dist.critical / total) * 100);
  const highPct = Math.round((dist.high / total) * 100);
  const mediumPct = Math.round((dist.medium / total) * 100);
  const lowPct = Math.round((dist.low / total) * 100);

  return (
    <section className="telemetry-section" aria-label="Executive Intelligence Overview">
      {/* Top row: 5 Primary Metric Cards */}
      <div className="kpi-cards-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrap neutral">
            <FolderKanban size={18} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Monitored Works</span>
            <span className="kpi-value telemetry-num">{overview.total_projects}</span>
          </div>
          <div className="kpi-subtext">Across 6 States & 10 Sectors</div>
        </div>

        <div className="kpi-card priority-high">
          <div className="kpi-icon-wrap warning">
            <AlertTriangle size={18} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Requires Attention</span>
            <span className="kpi-value telemetry-num warning-text">
              {overview.projects_requiring_attention}
            </span>
          </div>
          <div className="kpi-subtext">Fused Risk Score ≥ 60.0</div>
        </div>

        <div className="kpi-card priority-critical">
          <div className="kpi-icon-wrap critical">
            <ShieldAlert size={18} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">High-Risk Signals</span>
            <span className="kpi-value telemetry-num critical-text">
              {overview.high_risk_signals}
            </span>
          </div>
          <div className="kpi-subtext">Immediate Verification Needed (≥80)</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={18} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Timeline Delays</span>
            <span className="kpi-value telemetry-num">{overview.delayed_projects}</span>
          </div>
          <div className="kpi-subtext">Past Scheduled Completion Date</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap cyan">
            <Layers size={18} />
          </div>
          <div className="kpi-meta">
            <span className="kpi-label">Potential Overlaps</span>
            <span className="kpi-value telemetry-num cyan-text">
              {overview.potential_overlap_signals}
            </span>
          </div>
          <div className="kpi-subtext">Spatial/Textual Duplicate Pairs</div>
        </div>
      </div>

      {/* Bottom row: Calibrated Risk Distribution Meter & Filter Bar */}
      <div className="risk-distribution-container">
        <div className="dist-header">
          <span className="dist-title">PORTFOLIO RISK DISTRIBUTION</span>
          <span className="dist-hint">Click a tier to filter project list</span>
        </div>

        {/* Visual Stacked Progress Bar */}
        <div className="stacked-meter-track" role="meter" aria-label="Risk Distribution">
          <div
            className="meter-segment critical"
            style={{ width: `${criticalPct}%` }}
            title={`Critical Risk (≥80): ${dist.critical} works (${criticalPct}%)`}
          />
          <div
            className="meter-segment high"
            style={{ width: `${highPct}%` }}
            title={`High Risk (60-79): ${dist.high} works (${highPct}%)`}
          />
          <div
            className="meter-segment medium"
            style={{ width: `${mediumPct}%` }}
            title={`Medium Risk (40-59): ${dist.medium} works (${mediumPct}%)`}
          />
          <div
            className="meter-segment low"
            style={{ width: `${lowPct}%` }}
            title={`Low Risk (<40): ${dist.low} works (${lowPct}%)`}
          />
        </div>

        {/* Interactive Filter Pills */}
        <div className="risk-pills-row">
          <button
            className={`risk-filter-pill all ${selectedRiskBand === 'all' ? 'active' : ''}`}
            onClick={() => onSelectRiskBand('all')}
          >
            <span className="pill-dot all" />
            <span className="pill-name">All Works</span>
            <span className="pill-count telemetry-num">{overview.total_projects}</span>
          </button>

          <button
            className={`risk-filter-pill critical ${selectedRiskBand === 'critical' ? 'active' : ''}`}
            onClick={() => onSelectRiskBand('critical')}
          >
            <span className="pill-dot critical" />
            <span className="pill-name">Critical (80–100)</span>
            <span className="pill-count telemetry-num">{dist.critical}</span>
          </button>

          <button
            className={`risk-filter-pill high ${selectedRiskBand === 'high' ? 'active' : ''}`}
            onClick={() => onSelectRiskBand('high')}
          >
            <span className="pill-dot high" />
            <span className="pill-name">High (60–79)</span>
            <span className="pill-count telemetry-num">{dist.high}</span>
          </button>

          <button
            className={`risk-filter-pill medium ${selectedRiskBand === 'medium' ? 'active' : ''}`}
            onClick={() => onSelectRiskBand('medium')}
          >
            <span className="pill-dot medium" />
            <span className="pill-name">Medium (40–59)</span>
            <span className="pill-count telemetry-num">{dist.medium}</span>
          </button>

          <button
            className={`risk-filter-pill low ${selectedRiskBand === 'low' ? 'active' : ''}`}
            onClick={() => onSelectRiskBand('low')}
          >
            <span className="pill-dot low" />
            <span className="pill-name">Low (0–39)</span>
            <span className="pill-count telemetry-num">{dist.low}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
