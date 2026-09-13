import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './styles/dashboard.css';
import type { OverviewStats, ProjectSummary, RiskBand } from './types/project';
import { checkBackendHealth, fetchOverview, fetchProjects } from './services/api';
import { Header } from './components/Header';
import { TelemetryBar } from './components/TelemetryBar';
import { FilterToolbar } from './components/FilterToolbar';
import { ProjectTable } from './components/ProjectTable';
import { InvestigationDrawer } from './components/InvestigationDrawer';
import { DossierModal } from './components/DossierModal';
import { AnalyticsView } from './components/AnalyticsView';
import { GISMapView } from './components/GISMapView';
import { AboutModal } from './components/AboutModal';

export const App: React.FC = () => {
  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState<'projects' | 'analytics' | 'map'>('projects');
  const [selectedDrawerId, setSelectedDrawerId] = useState<string | null>(null);
  const [selectedDossierId, setSelectedDossierId] = useState<string | null>(null);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Data States
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isBackendLive, setIsBackendLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All Sectors');
  const [selectedRiskBand, setSelectedRiskBand] = useState<RiskBand>('all');
  const [sortBy, setSortBy] = useState<string>('risk');

  // Load Initial Data
  const loadData = useCallback(async () => {
    try {
      const [backendUp, overviewData, projectsData] = await Promise.all([
        checkBackendHealth(),
        fetchOverview(),
        fetchProjects({ sort_by: 'risk', limit: 100 }),
      ]);
      setIsBackendLive(backendUp);
      setOverview(overviewData);
      setProjects(projectsData);
    } catch (err) {
      console.error('Initial data loading error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Periodic health check ping every 30s
    const interval = setInterval(async () => {
      const up = await checkBackendHealth();
      setIsBackendLive(up);
    }, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Handle Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  // Keyboard shortcut listener (Escape to close modals/drawers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDossierId) {
          setSelectedDossierId(null);
        } else if (selectedDrawerId) {
          setSelectedDrawerId(null);
        } else if (showAboutModal) {
          setShowAboutModal(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDossierId, selectedDrawerId, showAboutModal]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('All States');
    setSelectedWorkType('All Sectors');
    setSelectedRiskBand('all');
    setSortBy('risk');
  };

  // Filter & Sort Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        // Search query check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchId = p.project_id.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchDist = p.district.toLowerCase().includes(q);
          const matchState = p.state.toLowerCase().includes(q);
          const matchConst = p.constituency.toLowerCase().includes(q);
          const matchContractor = p.contractor.toLowerCase().includes(q);
          if (!matchId && !matchDesc && !matchDist && !matchState && !matchConst && !matchContractor) {
            return false;
          }
        }

        // State filter
        if (selectedState !== 'All States' && p.state.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }

        // Work Type filter
        if (selectedWorkType !== 'All Sectors' && p.work_type !== selectedWorkType) {
          return false;
        }

        // Risk Band filter
        if (selectedRiskBand !== 'all') {
          const score = p.risk_score ?? 0;
          if (selectedRiskBand === 'critical' && score < 80) return false;
          if (selectedRiskBand === 'high' && (score < 60 || score >= 80)) return false;
          if (selectedRiskBand === 'medium' && (score < 40 || score >= 60)) return false;
          if (selectedRiskBand === 'low' && score >= 40) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'risk') {
          return (b.risk_score ?? 0) - (a.risk_score ?? 0);
        }
        if (sortBy === 'risk_asc') {
          return (a.risk_score ?? 0) - (b.risk_score ?? 0);
        }
        if (sortBy === 'amount') {
          return b.sanctioned_amount - a.sanctioned_amount;
        }
        if (sortBy === 'gap') {
          const gapA = 100 - a.physical_progress;
          const gapB = 100 - b.physical_progress;
          return gapB - gapA;
        }
        if (sortBy === 'delay') {
          return (b.risk_score ?? 0) - (a.risk_score ?? 0);
        }
        if (sortBy === 'district') {
          return a.district.localeCompare(b.district);
        }
        return 0;
      });
  }, [projects, searchQuery, selectedState, selectedWorkType, selectedRiskBand, sortBy]);

  // Selected project for drawer
  const drawerProjectSummary = useMemo(() => {
    return projects.find((p) => p.project_id === selectedDrawerId) || null;
  }, [projects, selectedDrawerId]);

  // Selected project for dossier modal
  const dossierProjectSummary = useMemo(() => {
    return projects.find((p) => p.project_id === selectedDossierId) || null;
  }, [projects, selectedDossierId]);

  // Quick navigation helpers from Analytics tab
  const handleSelectStateFromAnalytics = (state: string) => {
    setSelectedState(state);
    setActiveTab('projects');
  };

  const handleSelectSectorFromAnalytics = (sector: string) => {
    setSelectedWorkType(sector);
    setActiveTab('projects');
  };

  return (
    <div className="app-shell">
      {/* Top Telemetry Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isBackendLive={isBackendLive}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenAbout={() => setShowAboutModal(true)}
      />

      {/* Main Workspace Body */}
      <main className="main-content">
        {/* Macro KPI & Portfolio Risk Meter */}
        <TelemetryBar
          overview={overview}
          selectedRiskBand={selectedRiskBand}
          onSelectRiskBand={setSelectedRiskBand}
          isLoading={isLoading}
        />

        {activeTab === 'projects' ? (
          <>
            {/* Filter & Search Toolbar */}
            <FilterToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedState={selectedState}
              onStateChange={setSelectedState}
              selectedWorkType={selectedWorkType}
              onWorkTypeChange={setSelectedWorkType}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onReset={handleResetFilters}
              totalFiltered={filteredProjects.length}
              totalProjects={projects.length}
              selectedRiskBand={selectedRiskBand}
            />

            {/* Ranked Project Explorer Table */}
            <ProjectTable
              projects={filteredProjects}
              selectedProjectId={selectedDrawerId}
              onSelectProject={(id) => setSelectedDrawerId(id)}
              onOpenDossier={(id) => setSelectedDossierId(id)}
              isLoading={isLoading}
            />
          </>
        ) : activeTab === 'analytics' ? (
          /* Macro Geo & Sector Analytics View */
          <AnalyticsView
            overview={overview}
            onSelectState={handleSelectStateFromAnalytics}
            onSelectSector={handleSelectSectorFromAnalytics}
          />
        ) : (
          /* GIS Risk Map View */
          <GISMapView
            projects={projects}
            onOpenDrawer={(id) => setSelectedDrawerId(id)}
            onOpenDossier={(id) => setSelectedDossierId(id)}
          />
        )}
      </main>

      {/* Slide-over Investigation Drawer */}
      {selectedDrawerId && (
        <InvestigationDrawer
          projectId={selectedDrawerId}
          projectSummary={drawerProjectSummary}
          onClose={() => setSelectedDrawerId(null)}
          onOpenFullDossier={(id) => {
            setSelectedDrawerId(null);
            setSelectedDossierId(id);
          }}
        />
      )}

      {/* Full Investigation Dossier Modal */}
      {selectedDossierId && (
        <DossierModal
          projectId={selectedDossierId}
          projectSummary={dossierProjectSummary}
          onClose={() => setSelectedDossierId(null)}
        />
      )}

      {/* About & Methodology Dialog */}
      {showAboutModal && (
        <AboutModal
          onClose={() => setShowAboutModal(false)}
          isBackendLive={isBackendLive}
        />
      )}
    </div>
  );
};

export default App;
