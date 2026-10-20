import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const NavDrawer: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  const { mobileNavOpen, setMobileNavOpen } = useTournament();

  if (!mobileNavOpen) return null;

  const links = [
    { route: 'inicio', href: '#/inicio', label: 'INICIO' },
    { route: 'masculino', href: '#/masculino', label: 'MASCULINO' },
    { route: 'femenino', href: '#/femenino', label: 'FEMENINO' },
    { route: 'calendario', href: '#/calendario', label: 'CALENDARIO' },
    { route: 'recuerdos', href: '#/recuerdos', label: 'RECUERDOS' },
    { route: 'torneo', href: '#/torneo', label: 'TORNEO' }
  ];

  return (
    <>
      <div
        id="navBackdrop"
        className="nav-backdrop active"
        onClick={() => setMobileNavOpen(false)}
      />
      <nav id="mainNav" className="main-nav open" aria-label="Menú principal">
        <div className="nav-header">
          <span className="nav-title">MENÚ PRINCIPAL</span>
          <button
            id="btnCloseNav"
            className="btn-close-nav"
            aria-label="Cerrar menú"
            onClick={() => setMobileNavOpen(false)}
          >
            ✕
          </button>
        </div>
        <ul className="nav-list">
          {links.map(l => (
            <li key={l.route}>
              <a
                href={l.href}
                className={`nav-link ${currentRoute === l.route ? 'active' : ''}`}
                onClick={() => setMobileNavOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-footer">
          <small>FÚTBOL 5 · EDICIÓN OFICIAL 2026</small>
        </div>
      </nav>
    </>
  );
};
