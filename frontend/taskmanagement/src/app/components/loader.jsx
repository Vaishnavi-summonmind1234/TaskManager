import React from "react";

const TopLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Animated Line */}
      <div className="h-1 bg-purple-600 animate-pulse"></div>

      {/* Spinner (top right corner) */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default TopLoader;
