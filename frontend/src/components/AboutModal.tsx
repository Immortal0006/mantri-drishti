import React from 'react';
import { X, Eye, Shield, Terminal } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
  isBackendLive: boolean;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose, isBackendLive }) => {
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="about-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="about-modal-header">
          <div className="about-title-group">
            <Eye size={20} className="text-cyan" />
            <h2>About Mantri Drishti Intelligence Platform</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="about-modal-body">
          <div className="about-hero-box">
            <h3 className="about-headline">"AI Flags. AI Explains. Humans Verify."</h3>
            <p className="about-sub">
              Mantri Drishti is an AI-powered Risk Intelligence platform designed for the Member of Parliament Local Area Development Scheme (MPLADS). It transforms raw financial disbursements, timeline milestones, and geospatial coordinates into calibrated, explainable audit dossiers.
            </p>
          </div>

          <div className="about-section">
            <h4 className="about-sec-title">
              <Shield size={16} />
              <span>Multi-Signal Intelligence Protocol</span>
            </h4>
            <p className="about-text">
              Traditional audit software uses rigid binary thresholds that produce excessive false positives or miss subtle corruption schemes. Mantri Drishti fuses four independent analytical engines:
            </p>
            <ul className="about-list">
              <li>
                <strong>Rule Engine (35% Weight):</strong> Flags mathematical anomalies such as &gt;80% funds disbursed with &lt;40% physical progress on the ground.
              </li>
              <li>
                <strong>Isolation Forest ML (30% Weight):</strong> An unsupervised scikit-learn model analyzing 8 multi-dimensional behavioral features to isolate non-linear statistical outliers.
              </li>
              <li>
                <strong>Similarity Engine (15% Weight):</strong> TF-IDF text similarity + Haversine geospatial proximity (&lt;2km) + contractor entity clustering to catch duplicate billing on the same road or community hall.
              </li>
              <li>
                <strong>Peer Benchmarking (20% Weight):</strong> Interquartile Range (IQR) calculations grouping projects by sector and state to measure realistic spending velocities.
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h4 className="about-sec-title">
              <Terminal size={16} />
              <span>Backend API Server Status</span>
            </h4>
            <p className="about-text">
              Status:{' '}
              <span className={isBackendLive ? 'text-emerald font-bold' : 'text-amber font-bold'}>
                {isBackendLive
                  ? 'Active (Connected to http://127.0.0.1:8000)'
                  : 'Offline (Operating on synthetic demonstration dataset)'}
              </span>
            </p>
            {!isBackendLive && (
              <div className="terminal-code-box">
                <span className="code-comment"># To launch the live FastAPI intelligence backend:</span>
                <span className="code-line">cd backend</span>
                <span className="code-line">python -m uvicorn app.main:app --reload --port 8000</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
