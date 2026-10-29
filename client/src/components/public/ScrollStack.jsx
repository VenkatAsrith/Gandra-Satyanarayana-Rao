import React, { Children, isValidElement, cloneElement } from 'react';

/**
 * ScrollStack Component
 * Creates an interactive scroll-driven stacking card layout for biographical/timeline chapters.
 * Desktop: Cards stack gracefully with sticky positioning and staggered z-index.
 * Mobile: Falls back to natural touch-friendly stream to avoid trapping scroll.
 */
export default function ScrollStack({ children, className = '', stackOffset = 28 }) {
  const validChildren = Children.toArray(children).filter(isValidElement);

  return (
    <div className={`scroll-stack-container ${className}`}>
      {validChildren.map((child, index) => {
        // Pass index and stack offset to each item
        return cloneElement(child, {
          key: child.key || index,
          stackIndex: index,
          totalItems: validChildren.length,
          topOffset: 92 + index * stackOffset
        });
      })}
    </div>
  );
}

/**
 * ScrollStackItem Component
 * Individual card within the ScrollStack.
 */
export function ScrollStackItem({
  children,
  className = '',
  stackIndex = 0,
  topOffset = 92,
  accent = 'saffron',
  style = {},
  ...rest
}) {
  const itemStyle = {
    '--stack-top': `${topOffset}px`,
    '--stack-index': stackIndex + 1,
    zIndex: stackIndex + 1,
    ...style
  };

  return (
    <div
      className={`scroll-stack-item accent-${accent} ${className}`}
      style={itemStyle}
      {...rest}
    >
      <div className="scroll-stack-card-inner">
        {children}
      </div>
    </div>
  );
}
