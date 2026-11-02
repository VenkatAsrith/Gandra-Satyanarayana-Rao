import React, { Children, isValidElement, cloneElement, useEffect, useRef, useState } from 'react';

/**
 * ScrollStack Component
 * Creates an interactive scroll-driven stacking card layout.
 * Engineered for high-class sticky stacking on BOTH Desktop and Mobile viewports.
 * Cards smoothly stack under the sticky header with progressive z-index,
 * elevation shadows, and subtle 3D scale-down as subsequent cards overlap them.
 */
export default function ScrollStack({ children, className = '', stackOffset = 28 }) {
  const validChildren = Children.toArray(children).filter(isValidElement);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [stackedStates, setStackedStates] = useState({});

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const isMobile = window.innerWidth <= 768;
        const newStates = {};

        itemRefs.current.forEach((el, index) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const targetTop = isMobile ? (74 + index * 16) : (92 + index * stackOffset);
          
          // Check if this card has reached its sticky dock point
          const isStuck = rect.top <= targetTop + 4;
          
          // Check if the next card has started overlapping this card
          let isCovered = false;
          if (index < itemRefs.current.length - 1) {
            const nextEl = itemRefs.current[index + 1];
            if (nextEl) {
              const nextRect = nextEl.getBoundingClientRect();
              const nextTargetTop = isMobile ? (74 + (index + 1) * 16) : (92 + (index + 1) * stackOffset);
              if (nextRect.top <= nextTargetTop + 30) {
                isCovered = true;
              }
            }
          }

          newStates[index] = { isStuck, isCovered };
        });

        setStackedStates(newStates);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [validChildren.length, stackOffset]);

  return (
    <div ref={containerRef} className={`scroll-stack-container ${className}`}>
      {validChildren.map((child, index) => {
        const state = stackedStates[index] || {};
        return cloneElement(child, {
          key: child.key || index,
          ref: (el) => (itemRefs.current[index] = el),
          stackIndex: index,
          totalItems: validChildren.length,
          topOffset: 92 + index * stackOffset,
          topOffsetMobile: 74 + index * 16,
          isStuck: state.isStuck,
          isCovered: state.isCovered
        });
      })}
    </div>
  );
}

/**
 * ScrollStackItem Component
 * Individual card within the ScrollStack.
 */
export const ScrollStackItem = React.forwardRef(function ScrollStackItem(
  {
    children,
    className = '',
    stackIndex = 0,
    topOffset = 92,
    topOffsetMobile = 74,
    accent = 'saffron',
    isStuck = false,
    isCovered = false,
    style = {},
    ...rest
  },
  ref
) {
  const itemStyle = {
    '--stack-top': `${topOffset}px`,
    '--stack-top-mobile': `${topOffsetMobile}px`,
    '--stack-index': stackIndex + 1,
    zIndex: stackIndex + 1,
    ...style
  };

  const stateClasses = [
    isStuck ? 'is-stuck' : '',
    isCovered ? 'is-covered' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={`scroll-stack-item accent-${accent} ${stateClasses} ${className}`}
      style={itemStyle}
      data-stack-index={stackIndex + 1}
      {...rest}
    >
      <div className="scroll-stack-card-inner">
        {children}
      </div>
    </div>
  );
});
