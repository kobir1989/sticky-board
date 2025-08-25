import { Grip, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { DEFAULT_COLORS } from '@/constants';

interface NoteProps {
  x: number;
  y: number;
}

const Note = ({ x, y }: NoteProps) => {
  return (
    <motion.div
      className={`flex min-h-[13rem] min-w-[16rem] flex-col justify-between rounded-2xl border-2 border-orange-300 bg-[#fef3c7] p-4`}
      style={{
        position: 'absolute',
        left: x,
        top: y
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grip size={15} className="cursor-grab text-gray-500" />
          <div className="flex gap-0.5">
            {DEFAULT_COLORS.map((color) => (
              <div
                key={color.id}
                className={`h-[1rem] w-[1rem] rounded-full border-2 border-white ${color.background}`}
              />
            ))}
          </div>
        </div>
        <Trash2 className="text-gray-500" size={15} />
      </div>
      <div className="mb-2 h-full w-full rounded-lg shadow-sm">
        <textarea
          name=""
          id=""
          className="line-clamp-2 h-full w-full resize-none p-2 text-sm font-bold text-gray-700 outline-none"
          rows={5}
        ></textarea>
      </div>
      <div>
        <p className="text-[12px] font-bold text-gray-500">11:13 AM - 8/25/2025</p>
      </div>
    </motion.div>
  );
};

export default Note;
