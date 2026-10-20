import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { StatusStrip } from './components/StatusStrip';
import { Footer } from './components/Footer';
import { MatchModal } from './components/MatchModal';
import { AficheModal } from './components/AficheModal';
import { RecuerdoModal } from './components/RecuerdoModal';
import { AbbrPopover } from './components/AbbrTip';
import { HomeView } from './views/HomeView';
import { BranchView } from './views/BranchView';
import { GeneralCalendarView } from './views/GeneralCalendarView';
import { RecuerdosView } from './views/RecuerdosView';
import { TorneoView } from './views/TorneoView';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('inicio');
  const [branchSub, setBranchSub] = useState<string>('resumen');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!hash || hash === 'inicio') {
        setCurrentRoute('inicio');
      } else if (hash.startsWith('masculino')) {
        setCurrentRoute('masculino');
        const parts = hash.split('/');
        setBranchSub(parts[1] || 'resumen');
      } else if (hash.startsWith('femenino')) {
        setCurrentRoute('femenino');
        const parts = hash.split('/');
        setBranchSub(parts[1] || 'resumen');
      } else if (hash.startsWith('calendario')) {
        setCurrentRoute('calendario');
      } else if (hash.startsWith('recuerdos')) {
        setCurrentRoute('recuerdos');
      } else if (hash.startsWith('torneo')) {
        setCurrentRoute('torneo');
      } else {
        setCurrentRoute('inicio');
      }
      window.scrollTo(0, 0);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectBranch = (branch: 'masculino' | 'femenino') => {
    window.location.hash = `#/${branch}`;
  };

  return (
    <>
      <Header currentRoute={currentRoute} />
      <NavDrawer currentRoute={currentRoute} />
      <StatusStrip />

      <main id="mainContent" className="main-content">
        {currentRoute === 'inicio' && <HomeView />}
        {currentRoute === 'masculino' && (
          <BranchView
            branchKey="masculino"
            initialSub={branchSub}
            onSelectBranch={handleSelectBranch}
          />
        )}
        {currentRoute === 'femenino' && (
          <BranchView
            branchKey="femenino"
            initialSub={branchSub}
            onSelectBranch={handleSelectBranch}
          />
        )}
        {currentRoute === 'calendario' && <GeneralCalendarView />}
        {currentRoute === 'recuerdos' && <RecuerdosView />}
        {currentRoute === 'torneo' && <TorneoView />}
      </main>

      <Footer />

      {/* Global Modals */}
      <MatchModal />
      <AficheModal />
      <RecuerdoModal />
      <AbbrPopover />
    </>
  );
};
