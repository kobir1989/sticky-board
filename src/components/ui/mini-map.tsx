import { MAP_SCALE, MAP_SIZE } from '@/constants';
import { navigateBoardFromMiniMap } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const MiniMap = () => {
  const { notes, x, y, scale } = useAppSelector((store) => store.noteSlice);
  const dispatch = useAppDispatch();

  const toMapCoords = (canvasX: number, canvasY: number) => ({
    x: canvasX * MAP_SCALE + MAP_SIZE / 2,
    y: canvasY * MAP_SCALE + MAP_SIZE / 2
  });

  // Calculate viewport size
  const viewportWidth = (window.innerWidth / scale) * MAP_SCALE;
  const viewportHeight = (window.innerHeight / scale) * MAP_SCALE;

  // Calculate viewport position
  const viewportCoords = toMapCoords(-x / scale, -y / scale);
  const viewportX = viewportCoords.x - viewportWidth / 2;
  const viewportY = viewportCoords.y - viewportHeight / 2;

  // Center crosshair styles
  const centerCrosshairX = MAP_SIZE / 2;
  const centerCrosshairY = MAP_SIZE / 2;

  // Viewport rectangle styles
  const viewportRectStyles = {
    left: Math.max(0, Math.min(MAP_SIZE - viewportWidth, viewportX)),
    top: Math.max(0, Math.min(MAP_SIZE - viewportHeight, viewportY)),
    width: Math.min(viewportWidth, MAP_SIZE),
    height: Math.min(viewportHeight, MAP_SIZE)
  };

  // Zoom percentage
  const zoomPercentage = Math.round(scale * 100);

  // Filter and map notes for rendering
  const visibleNotes = notes
    .map((note) => {
      const { x: noteX, y: noteY } = toMapCoords(note.position.x, note.position.y);
      return { ...note, noteX, noteY };
    })
    .filter((note) => {
      // Only render notes near the viewport
      return !(
        note.noteX < -50 ||
        note.noteX > MAP_SIZE + 50 ||
        note.noteY < -50 ||
        note.noteY > MAP_SIZE + 50
      );
    });

  const handleClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Convert minimap coordinates to canvas coordinates
    const canvasX = (clickX - MAP_SIZE / 2) / MAP_SCALE;
    const canvasY = (clickY - MAP_SIZE / 2) / MAP_SCALE;

    // Center the viewport on the clicked point
    const newCordX = -canvasX * scale + window.innerWidth / 2;
    const newCordY = -canvasY * scale + window.innerHeight / 2;

    dispatch(navigateBoardFromMiniMap({ x: newCordX, y: newCordY }));
  };

  return (
    <div className="fixed bottom-4 left-4 z-20">
      <div className="rounded-lg border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm">
        <div
          className="relative cursor-pointer overflow-hidden rounded border bg-gray-50"
          style={{ width: MAP_SIZE, height: MAP_SIZE }}
          onClick={handleClick}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px),linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Center crosshair */}
          <div className="absolute h-full w-px bg-blue-400/50" style={{ left: centerCrosshairX }} />
          <div className="absolute h-px w-full bg-blue-400/50" style={{ top: centerCrosshairY }} />

          {/* Notes */}
          {visibleNotes.map((note) => (
            <div
              key={note.id}
              className={`absolute h-2 w-2 rounded-full border border-white/50 shadow-sm ${note.color.dark}`}
              style={{
                left: note.noteX - 4,
                top: note.noteY - 4
              }}
            />
          ))}

          {/* Viewport rectangle */}
          <div
            className="absolute rounded border-2 border-blue-500 bg-blue-500/10"
            style={viewportRectStyles}
          />
        </div>

        {/* Zoom indicator */}
        <div className="mt-2 text-center text-xs text-gray-600">{zoomPercentage}%</div>
      </div>
    </div>
  );
};

export default MiniMap;
