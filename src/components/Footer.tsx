import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          className="footer-logo-company"
          src="img/LOGO SAN MARTIN LACTEOS S.A.S.jpg"
          alt="San Martín Lácteos"
          loading="lazy"
        />
        <img
          className="footer-logo-mascot"
          src="img/TOROS ICONO DEL TORNEO.jpg"
          alt="Toros San Martín 2026"
          loading="lazy"
        />
        <strong>
          TORNEO SAN MARTÍN <span className="gold-txt">2026</span>
        </strong>
      </div>
      <span className="footer-copy">
        FÚTBOL 5 · SAN MARTÍN LÁCTEOS S.A.S. · PRIMERO LAS PERSONAS
      </span>
    </footer>
  );
};
