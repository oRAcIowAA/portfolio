"use client";

import { useEffect, useState } from "react";

export function useDevice() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTouch: false,
    hasWebgl: true,
    isMounted: false,
  });

  useEffect(() => {
    const checkWebgl = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    };

    const handleResize = () => {
      const isMobileQuery = window.matchMedia("(max-width: 767px)").matches;
      const isTouchQuery = window.matchMedia("(pointer: coarse)").matches;
      const webglSupported = checkWebgl();

      setDevice({
        isMobile: isMobileQuery,
        isTouch: isTouchQuery,
        hasWebgl: webglSupported,
        isMounted: true,
      });
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}
