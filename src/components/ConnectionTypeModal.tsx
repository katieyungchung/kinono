import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ConnectionTypeInfo } from '../utils/connectionTypes';

interface ConnectionTypeModalProps {
  connectionInfo: ConnectionTypeInfo;
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectionTypeModal({ connectionInfo, isOpen, onClose }: ConnectionTypeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm bg-gradient-to-br from-[#5A3D5C] to-[#7A5D7C] rounded-3xl overflow-hidden shadow-2xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="inline-block bg-[#D4F4E7]/20 border-2 border-[#D4F4E7] rounded-2xl px-6 py-3">
                  <h2 className="text-2xl font-bold text-[#D4F4E7]">
                    {connectionInfo.type}
                  </h2>
                </div>
              </div>

              <p className="text-white leading-relaxed text-lg">
                {connectionInfo.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
