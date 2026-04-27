import { useRef, useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * ScrollArea provides custom scrollbars while using native scrolling performance.
 * It hides the default browser scrollbars and replaces them with sleek, theme-aware ones.
 */
const ScrollArea = memo(function ScrollArea({ children, className = '', style = {}, height, orientation = 'vertical' }) {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollState({ scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth });
    }
  }, []);

  useEffect(() => {
    handleScroll(); // Init
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const showVerticalThumb = scrollState.scrollHeight > scrollState.clientHeight;
  const showHorizontalThumb = scrollState.scrollWidth > scrollState.clientWidth;

  // Calculate Thumb dimensions and positions
  const trackHeight = scrollState.clientHeight;
  const thumbHeight = Math.max((scrollState.clientHeight / scrollState.scrollHeight) * trackHeight, 30);
  const thumbTop = (scrollState.scrollTop / (scrollState.scrollHeight - scrollState.clientHeight)) * (trackHeight - thumbHeight);

  const trackWidth = scrollState.clientWidth;
  const thumbWidth = Math.max((scrollState.clientWidth / scrollState.scrollWidth) * trackWidth, 30);
  const thumbLeft = (scrollState.scrollLeft / (scrollState.scrollWidth - scrollState.clientWidth)) * (trackWidth - thumbWidth);

  return (
    <div 
      className={`scroll-area-wrapper ${className}`} 
      style={{ ...style, height: height || '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Scrollable content area"
    >
      <div 
        className={`scroll-viewport ${orientation}`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {children}
      </div>

      {showVerticalThumb && orientation !== 'horizontal' && (
        <div className={`scroll-track vertical ${isHovered || isDragging ? 'visible' : ''}`}>
          <div 
            className="scroll-thumb"
            style={{ 
              height: `${thumbHeight}px`, 
              transform: `translateY(${thumbTop || 0}px)` 
            }}
          />
        </div>
      )}

      {showHorizontalThumb && orientation !== 'vertical' && (
        <div className={`scroll-track horizontal ${isHovered || isDragging ? 'visible' : ''}`}>
          <div 
            className="scroll-thumb"
            style={{ 
              width: `${thumbWidth}px`, 
              transform: `translateX(${thumbLeft || 0}px)` 
            }}
          />
        </div>
      )}

      <style jsx>{`
        .scroll-area-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .scroll-viewport {
          width: 100%;
          height: 100%;
          overflow: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE */
        }

        .scroll-viewport::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .scroll-viewport.vertical {
          overflow-x: hidden;
        }

        .scroll-viewport.horizontal {
          overflow-y: hidden;
        }

        .scroll-track {
          position: absolute;
          background: transparent;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .scroll-track.visible {
          opacity: 1;
        }

        .scroll-track.vertical {
          top: 0;
          right: 2px;
          height: 100%;
          width: 6px;
        }

        .scroll-track.horizontal {
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 6px;
        }

        .scroll-thumb {
          background: var(--text-muted);
          border-radius: 4px;
          opacity: 0.5;
          transition: background 0.2s, opacity 0.2s;
        }

        .scroll-area-wrapper:hover .scroll-thumb {
          opacity: 0.8;
          background: var(--primary);
        }
      `}</style>
    </div>
  );
});

ScrollArea.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orientation: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
};

export default ScrollArea;
