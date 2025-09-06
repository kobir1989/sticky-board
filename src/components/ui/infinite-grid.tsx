import { useMemo } from 'react';

interface InfiniteGridProps {
  canvasCoordinates: {
    x: number;
    y: number;
    scale: number;
  };
}

const InfiniteGrid = ({ canvasCoordinates }: InfiniteGridProps) => {
  const { x, y, scale } = canvasCoordinates;
  const {
    scaledGridSize,
    scaledMajorGridSize,
    offsetX,
    offsetY,
    majorOffsetX,
    majorOffsetY,
    minorOpacity,
    majorOpacity
  } = useMemo(() => {
    const baseGridSize = 20;
    const majorMultiplier = 5;
    let gridSize = baseGridSize;
    let majorGridSize = baseGridSize * majorMultiplier;

    if (scale < 0.25) {
      gridSize = baseGridSize * 8;
      majorGridSize = gridSize * 2;
    } else if (scale < 0.5) {
      gridSize = baseGridSize * 4;
      majorGridSize = gridSize * 2;
    } else if (scale < 1) {
      gridSize = baseGridSize * 2;
      majorGridSize = gridSize * 2.5;
    } else if (scale > 2) {
      gridSize = baseGridSize / 2;
      majorGridSize = baseGridSize * 2;
    }

    const scaledGridSize = gridSize * scale;
    const scaledMajorGridSize = majorGridSize * scale;

    const offsetX = x % scaledGridSize;
    const offsetY = y % scaledGridSize;
    const majorOffsetX = x % scaledMajorGridSize;
    const majorOffsetY = y % scaledMajorGridSize;

    const minorOpacity = Math.max(0.03, Math.min(0.15, scale * 0.3));
    const majorOpacity = Math.max(0.08, Math.min(0.25, scale * 0.5));

    return {
      scaledGridSize,
      scaledMajorGridSize,
      offsetX,
      offsetY,
      majorOffsetX,
      majorOffsetY,
      minorOpacity,
      majorOpacity
    };
  }, [x, y, scale]);

  if (scaledGridSize < 4 || scaledGridSize > 200) return null;

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      {/* Minor Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, ${minorOpacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, ${minorOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${scaledGridSize}px ${scaledGridSize}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`
        }}
      />

      {/* Major Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(100, 116, 139, ${majorOpacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, ${majorOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${scaledMajorGridSize}px ${scaledMajorGridSize}px`,
          backgroundPosition: `${majorOffsetX}px ${majorOffsetY}px`
        }}
      />

      {/* Origin Axes */}
      {scale > 0.1 && (
        <>
          <div
            className="absolute w-px bg-blue-400/30"
            style={{ left: x, top: 0, height: '100%' }}
          />
          <div
            className="absolute h-px bg-blue-400/30"
            style={{ top: y, left: 0, width: '100%' }}
          />
        </>
      )}
    </div>
  );
};

export default InfiniteGrid;
