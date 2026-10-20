import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { ABBR_DICTIONARY } from '../utils/shields';

export const AbbrTip: React.FC<{
  abbrKey: string;
  customLabel?: string;
  className?: string;
}> = ({ abbrKey, customLabel, className = '' }) => {
  const { showAbbrTooltip, hideAbbrTooltip } = useTournament();
  const item = ABBR_DICTIONARY[abbrKey];
  const label = customLabel !== undefined ? customLabel : item?.code || abbrKey;
  const title = item?.title || label;

  return (
    <span
      className={`abbr-tip ${className}`}
      role="button"
      tabIndex={0}
      aria-label={title}
      title={title}
      onClick={e => {
        e.stopPropagation();
        showAbbrTooltip(abbrKey, e.currentTarget);
      }}
      onMouseEnter={e => showAbbrTooltip(abbrKey, e.currentTarget)}
      onMouseLeave={hideAbbrTooltip}
    >
      {label}
    </span>
  );
};

export const AbbrPopover: React.FC = () => {
  const { activeAbbrTooltip, hideAbbrTooltip } = useTournament();
  if (!activeAbbrTooltip) return null;

  const { title, rect } = activeAbbrTooltip;
  const top = rect.bottom + window.scrollY + 6;
  const left = Math.max(10, Math.min(window.innerWidth - 220, rect.left + window.scrollX - 40));

  return (
    <div
      className="abbr-popover"
      role="tooltip"
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 99999,
        display: 'block'
      }}
      onClick={hideAbbrTooltip}
    >
      <span>{title}</span>
    </div>
  );
};
