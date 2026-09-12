import React from 'react';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { RiskBand } from '../types/project';

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedState: string;
  onStateChange: (st: string) => void;
  selectedWorkType: string;
  onWorkTypeChange: (wt: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onReset: () => void;
  totalFiltered: number;
  totalProjects: number;
  selectedRiskBand: RiskBand;
}

const STATES = [
  'All States',
  'Rajasthan',
  'Maharashtra',
  'Uttar Pradesh',
  'Tamil Nadu',
  'Karnataka',
  'Madhya Pradesh',
];

const WORK_TYPES = [
  'All Sectors',
  'Road Construction',
  'Drinking Water Supply',
  'School Building',
  'Community Hall',
  'Drainage System',
  'Public Toilet',
  'Bridge Construction',
  'Street Lighting',
  'Health Sub-Center',
  'Anganwadi Center',
];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedState,
  onStateChange,
  selectedWorkType,
  onWorkTypeChange,
  sortBy,
  onSortByChange,
  onReset,
  totalFiltered,
  totalProjects,
  selectedRiskBand,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedState !== 'All States' ||
    selectedWorkType !== 'All Sectors' ||
    selectedRiskBand !== 'all' ||
    sortBy !== 'risk';

  return (
    <div className="filter-toolbar-root">
      <div className="filter-controls-row">
        {/* Search Field */}
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by ID, contractor, work description, constituency..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* State Selector */}
        <div className="filter-select-group">
          <label className="select-label">STATE</label>
          <select
            className="filter-select"
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
          >
            {STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Work Type Selector */}
        <div className="filter-select-group">
          <label className="select-label">SECTOR</label>
          <select
            className="filter-select"
            value={selectedWorkType}
            onChange={(e) => onWorkTypeChange(e.target.value)}
          >
            {WORK_TYPES.map((wt) => (
              <option key={wt} value={wt}>
                {wt}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Selector */}
        <div className="filter-select-group">
          <label className="select-label">SORT ORDER</label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="risk">Highest Risk First</option>
            <option value="risk_asc">Lowest Risk First</option>
            <option value="gap">Largest Progress Gap</option>
            <option value="delay">Most Delayed Works</option>
            <option value="amount">Sanctioned Amount</option>
            <option value="district">District (A–Z)</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button className="reset-filter-btn" onClick={onReset} title="Reset all filters">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Result Count and Active Indicators */}
      <div className="filter-status-row">
        <div className="result-count">
          Showing <span className="telemetry-num highlighted">{totalFiltered}</span> of{' '}
          <span className="telemetry-num">{totalProjects}</span> monitored works
        </div>

        {hasActiveFilters && (
          <div className="active-tag-chips">
            <span className="filter-badge-icon">
              <SlidersHorizontal size={12} />
            </span>
            {selectedState !== 'All States' && (
              <span className="filter-tag">State: {selectedState}</span>
            )}
            {selectedWorkType !== 'All Sectors' && (
              <span className="filter-tag">Sector: {selectedWorkType}</span>
            )}
            {selectedRiskBand !== 'all' && (
              <span className={`filter-tag ${selectedRiskBand}`}>
                Risk: {selectedRiskBand.toUpperCase()}
              </span>
            )}
            {searchQuery.trim() && (
              <span className="filter-tag">Query: "{searchQuery.trim()}"</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
