import { useState, useEffect, useRef, useCallback } from "react";

const useCellSize = () => {
  // const cellRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });

  // const updateCellSize = (node) => {
  //     console.log('DNOIABDOIS')
  //     const { offsetWidth, offsetHeight } = cellRef.current;
  //     setCellSize({ width: offsetWidth, height: offsetHeight });
  //   }

  const cellRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const { offsetHeight, offsetWidth } = node;
      setCellSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", cellRef as any);
    return () => window.removeEventListener("resize", cellRef as any);
  }, [cellRef]);

  return { cellRef, cellSize };
};

export default useCellSize;
