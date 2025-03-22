import React, { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export function SplineScene() {
  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.80/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <spline-viewer 
        url="https://prod.spline.design/lbUNMSoGQJOXf0Aj/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
} 