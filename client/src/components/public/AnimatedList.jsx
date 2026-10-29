import React, { useRef } from 'react';
import { resolveMediaUrl } from '../../services/api';

/**
 * AnimatedList Component
 * Interactive animated list for video documentation and media records.
 * Supports theme ('dark' | 'light'), animation styles ('pop' | 'slide' | 'fade'),
 * keyboard navigation, and active item indicators.
 */
export default function AnimatedList({
  items = [],
  onItemSelect,
  activeIndex = 0,
  animation = 'pop',
  theme = 'dark',
  className = ''
}) {
  const listRef = useRef(null);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % items.length;
      onItemSelect && onItemSelect(items[next], next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      onItemSelect && onItemSelect(items[prev], prev);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onItemSelect && onItemSelect(items[index], index);
    }
  };

  return (
    <div
      ref={listRef}
      className={`animated-list-container theme-${theme} anim-${animation} ${className}`}
      role="listbox"
      aria-label="Official Video Records Playlist"
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={item.id || item._id || index}
            role="option"
            aria-selected={isActive}
            tabIndex={0}
            className={`animated-list-item ${isActive ? 'is-active' : ''}`}
            onClick={() => onItemSelect && onItemSelect(item, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ '--item-stagger': `${index * 0.05}s` }}
          >
            {item.thumbnailUrl && (
              <div className="anim-list-thumb">
                <img
                  src={resolveMediaUrl(item.thumbnailUrl)}
                  alt={item.title}
                  loading="lazy"
                />
                {item.duration && (
                  <span className="anim-list-duration">▶ {item.duration}</span>
                )}
              </div>
            )}

            <div className="anim-list-content">
              <div className="anim-list-header-row">
                <span className="anim-list-meta">
                  {item.meta || item.categoryLabel || item.category || 'Video'}
                </span>
                {item.dateFormatted && (
                  <span className="anim-list-date">{item.dateFormatted}</span>
                )}
              </div>
              <h4 className="anim-list-title">{item.title}</h4>
              {item.description && (
                <p className="anim-list-desc">{item.description}</p>
              )}
            </div>

            <div className="anim-list-active-indicator" aria-hidden="true">
              <span className="play-pulse-icon">▶</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
