import React from 'react';
import { useTournament } from '../context/TournamentContext';

export const Header: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  const { mobileNavOpen, setMobileNavOpen } = useTournament();

  return (
    <>
      <div className="top-stripe" />
      <header className="site-header">
        <a href="#/inicio" className="brand-link" aria-label="Ir al inicio del Torneo San Martín 2026">
          <img
            className="header-logo-company"
            src="img/LOGO SAN MARTIN LACTEOS S.A.S.jpg"
            alt="Logo San Martín Lácteos"
            loading="lazy"
          />
          <img
            className="header-logo-mascot"
            src="img/TOROS ICONO DEL TORNEO.jpg"
            alt="Mascota oficial Toros San Martín 2026"
            loading="lazy"
          />
          <div className="header-titles">
            <span className="header-subtitle">SAN MARTÍN LÁCTEOS S.A.S.</span>
            <strong className="header-maintitle">
              <span className="header-title-text">TORNEO SAN MARTÍN</span>
              <span className="gold-badge">2026</span>
            </strong>
          </div>
        </a>

        <button
          id="btnMenu"
          className="btn-menu"
          aria-label="Abrir menú"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span className="menu-icon-bars" aria-hidden="true">
            {mobileNavOpen ? '✕' : '☰'}
          </span>
        </button>
      </header>
    </>
  );
};
