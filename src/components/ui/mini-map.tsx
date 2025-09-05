import { useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';

const MiniMap = () => {
  const { notes, x, y, scale } = useAppSelector((store) => store.noteSlice);
  const ref = useRef(null);

  const miniMapWidth = 200;
  const miniMapHeight = 230;

  const minimapScale = 0.05;

  const viewportWidth = window.innerWidth * minimapScale;
  const viewportHeight = window.innerHeight * minimapScale;

  const viewportX = -x * minimapScale;
  const viewportY = -y * minimapScale;

  return (
    <div
      className={`rounded-2xl bg-white/80 p-2 shadow-2xl backdrop-blur-sm`}
      style={{
        width: miniMapWidth,
        height: miniMapHeight
      }}
    >
      <div
        ref={ref}
        className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-gray-100/50 p-1"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: `${20}px ${20}px`
        }}
      >
        {/* Viewport Rectangle */}
        <div
          className={`absolute rounded-lg border-2 border-blue-400 bg-blue-500/10`}
          style={{
            width: viewportWidth / scale,
            height: viewportHeight / scale,
            left: viewportX / scale,
            top: viewportY / scale
          }}
        />

        {/* Notes */}
        {notes.map((note) => (
          <div
            key={note.id}
            className={`absolute h-[0.5rem] w-[0.5rem] rounded-full bg-${note.color.background}`}
            style={{
              left: note.position.x * minimapScale,
              top: note.position.y * minimapScale
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniMap;
