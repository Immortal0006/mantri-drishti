import React from 'react';
import type { OverviewStats } from '../types/project';
import {
  MapPin,
  PieChart,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { RiskDistributionChart, StateRiskChart, WorkTypeChart } from './RiskCharts';

interface AnalyticsViewProps {
  overview: OverviewStats | null;
  onSelectState: (state: string) => void;
  onSelectSector: (sector: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  overview,
  onSelectState,
  onSelectSector,
}) => {
  if (!overview) return null;

  return (
    <div className="analytics-root">
      {/* Top Banner: Multi-Engine Intelligence Methodology */}
      <div className="methodology-card">
        <div className="methodology-header">
          <div className="m-icon-wrap">
            <Cpu size={22} />
          </div>
          <div>
            <h2 className="m-title">Four-Engine Intelligence Architecture</h2>
            <p className="m-desc">
              Mantri Drishti avoids false alarms by synthesizing four statistically rigorous analytical engines into a calibrated Risk Score (0–100) and Confidence Index.
            </p>
          </div>
        </div>

        <div className="methodology-grid">
          <div className="m-pillar">
            <div className="m-pillar-head">
              <span className="pillar-num">01</span>
              <span className="pillar-name">Rule Engine</span>
              <span className="pillar-wt">35%</span>
            </div>
            <p className="pillar-text">
              Deterministic checks on extreme financial mismatches (expenditure &gt; 80% with progress &lt; 40%), severe timeline gaps, and stalled projects.
            </p>
          </div>

          <div className="m-pillar">
            <div className="m-pillar-head">
              <span className="pillar-num">02</span>
              <span className="pillar-name">Isolation Forest</span>
              <span className="pillar-wt">30%</span>
            </div>
            <p className="pillar-text">
              Unsupervised machine learning across 8 multidimensional features detecting non-linear multidimensional outliers without human bias.
            </p>
          </div>

          <div className="m-pillar">
            <div className="m-pillar-head">
              <span className="pillar-num">03</span>
              <span className="pillar-name">Similarity Engine</span>
              <span className="pillar-wt">15%</span>
            </div>
            <p className="pillar-text">
              TF-IDF text matching + Haversine geospatial proximity (&lt;2km) + contractor and timeline overlap to pinpoint duplicate or ghost works.
            </p>
          </div>

          <div className="m-pillar">
            <div className="m-pillar-head">
              <span className="pillar-num">04</span>
              <span className="pillar-name">Peer Benchmark</span>
              <span className="pillar-wt">20%</span>
            </div>
            <p className="pillar-text">
              Contextual peer cohort evaluation using Interquartile Range (IQR) statistics across identical work categories and state conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Plotly Charts Grid */}
      <div className="charts-grid" aria-label="Interactive Risk Analytics Charts">
        <div className="chart-card">
          <RiskDistributionChart overview={overview} />
        </div>
        <div className="chart-card">
          <StateRiskChart overview={overview} />
        </div>
        <div className="chart-card">
          <WorkTypeChart overview={overview} />
        </div>
      </div>

      {/* Two-Column Grid: State Risk Rankings + Sector Distribution */}
      <div className="analytics-two-col">
        {/* State Rankings Card */}
        <div className="analytics-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <MapPin size={18} className="card-icon cyan" />
              <h3>State Risk Profile & Monitored Volume</h3>
            </div>
            <span className="card-sub-tag">6 States Audited</span>
          </div>

          <div className="state-ranking-list">
            {overview.top_states.map((st, idx) => {
              const riskTier =
                st.avg_risk >= 60 ? 'critical' : st.avg_risk >= 45 ? 'high' : 'medium';

              return (
                <div key={idx} className="state-rank-item">
                  <div className="rank-left">
                    <span className="state-rank-num telemetry-num">#{idx + 1}</span>
                    <div className="state-info">
                      <span className="state-title">{st.state}</span>
                      <span className="state-count-label">
                        {st.count} Works Monitored
                      </span>
                    </div>
                  </div>

                  <div className="rank-right">
                    <div className="state-risk-meter-wrap">
                      <div className="state-risk-label-row">
                        <span className="state-risk-lbl">Avg Risk:</span>
                        <span className={`state-risk-score telemetry-num ${riskTier}`}>
                          {st.avg_risk.toFixed(1)}
                        </span>
                      </div>
                      <div className="mini-meter-track">
                        <div
                          className={`mini-meter-fill ${riskTier}`}
                          style={{ width: `${Math.min(100, st.avg_risk)}%` }}
                        />
                      </div>
                    </div>

                    <button
                      className="state-filter-action"
                      onClick={() => onSelectState(st.state)}
                      title={`Filter project table to ${st.state}`}
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector Distribution Card */}
        <div className="analytics-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <PieChart size={18} className="card-icon indigo" />
              <h3>Sector Breakdown & Expenditure Categories</h3>
            </div>
            <span className="card-sub-tag">10 Work Types</span>
          </div>

          <div className="sector-breakdown-list">
            {overview.work_type_breakdown.map((wt, idx) => {
              const maxCount = 20;
              const barWidth = Math.round((wt.count / maxCount) * 100);

              return (
                <div key={idx} className="sector-item">
                  <div className="sector-info-row">
                    <span className="sector-name">{wt.work_type}</span>
                    <span className="sector-count telemetry-num">{wt.count} works</span>
                  </div>
                  <div className="sector-bar-track">
                    <div className="sector-bar-fill" style={{ width: `${barWidth}%` }} />
                  </div>
                  <button
                    className="sector-filter-link"
                    onClick={() => onSelectSector(wt.work_type)}
                  >
                    Explore {wt.work_type} projects →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
