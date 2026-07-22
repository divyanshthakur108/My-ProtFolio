import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — A 60 FPS, GPU-accelerated custom cursor component.
 *
 * Features:
 * - Direct DOM manipulation via requestAnimationFrame for zero-rerender performance.
 * - Smooth lerp (linear interpolation) outer ring easing behind a responsive dot.
 * - Event-delegated hover detection for buttons, links, project cards, and inputs.
 * - "VIEW" text indicator inside ring when hovering over project cards.
 * - Automatically disabled on touch devices and for users with prefers-reduced-motion.
 * - Non-blocking (pointer-events: none) to guarantee 100% click/scroll accessibility.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  // Mouse targets & interpolated positions
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  // Hover states
  const [hoverState, setHoverState] = useState("default"); // 'default' | 'hover' | 'project' | 'text'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // ── 1. Accessibility & Touch Detection ──────────────────────────
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (touchQuery.matches || motionQuery.matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    // ── 2. Mouse Movement Tracking ─────────────────────────────────
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // ── 3. Hover State Detection (Event Delegation) ────────────────
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check for Project Cards
      const isProjectCard = target.closest("#projects article") || target.closest('[data-cursor="project"]');
      if (isProjectCard) {
        setHoverState("project");
        return;
      }

      // Check for Text inputs
      const isTextInput = target.closest('input[type="text"], input[type="email"], textarea');
      if (isTextInput) {
        setHoverState("text");
        return;
      }

      // Check for Interactive elements (buttons, links, clickable items)
      const isClickable = target.closest(
        'a, button, input[type="submit"], [role="button"], .cursor-pointer, summary'
      );
      if (isClickable) {
        setHoverState("hover");
        return;
      }

      setHoverState("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // ── 4. 60 FPS Animation Loop (LERP Easing) ────────────────────
    let animationFrameId;

    const render = () => {
      // Linear interpolation helper: lerp(start, end, factor)
      const ease = 0.18;
      ring.current.x += (mouse.current.x - ring.current.x) * ease;
      ring.current.y += (mouse.current.y - ring.current.y) * ease;

      // Update Dot position (instantaneous)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      // Update Ring position (smooth interpolated)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // Don't render cursor on mobile/touch devices or reduced-motion environments
  if (isTouchDevice) return null;

  // Determine scale & classes based on hover state
  let ringStyleClasses = "w-9 h-9 border border-purple-400/50 bg-purple-500/10";
  let dotStyleClasses = "w-2 h-2 bg-purple-400";
  let showViewText = false;

  if (hoverState === "hover") {
    ringStyleClasses = "w-14 h-14 border-2 border-purple-400 bg-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]";
    dotStyleClasses = "w-1.5 h-1.5 bg-white opacity-80";
  } else if (hoverState === "project") {
    ringStyleClasses = "w-20 h-20 border-2 border-purple-400 bg-purple-600/30 backdrop-blur-xs shadow-[0_0_25px_rgba(139,92,246,0.4)]";
    dotStyleClasses = "w-0 h-0 opacity-0"; // Hide central dot when showing VIEW
    showViewText = true;
  } else if (hoverState === "text") {
    ringStyleClasses = "w-6 h-6 border border-purple-400/40 bg-transparent";
    dotStyleClasses = "w-1 h-3 rounded-none bg-purple-400";
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Smooth Circular Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,box-shadow] duration-300 ease-out will-change-transform ${ringStyleClasses}`}
      >
        {showViewText && (
          <span
            ref={textRef}
            className="text-[10px] font-bold tracking-widest text-white uppercase select-none drop-shadow-md animate-fade-in"
          >
            VIEW
          </span>
        )}
      </div>

      {/* Inner Central Cursor Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,opacity] duration-200 ease-out will-change-transform ${dotStyleClasses}`}
      />
    </div>
  );
};

export default CustomCursor;
