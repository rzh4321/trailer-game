import { useState, useEffect, useRef } from 'react';

const useCellSize = () => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCellSize = () => {
      if (cellRef.current) {
        const { offsetWidth, offsetHeight } = cellRef.current;
        setCellSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [cellRef.current]);

  return { cellRef, cellSize };
};

export default useCellSize;