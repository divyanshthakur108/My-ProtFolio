import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Toast notification component
 * Displays success/error messages with auto-dismiss after 5 seconds.
 *
 * @param {{ type: "success"|"error", message: string, visible: boolean, onClose: () => void }} props
 */
const Toast = ({ type, message, visible, onClose }) => {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3
            rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-lg
            ${
              isSuccess
                ? "border-emerald-500/20 bg-emerald-950/80 text-emerald-200"
                : "border-red-500/20 bg-red-950/80 text-red-200"
            }`}
          role="alert"
        >
          {/* Icon */}
          <span className="shrink-0 text-lg">
            {isSuccess ? "✅" : "❌"}
          </span>

          {/* Message */}
          <p className="text-sm font-medium leading-snug">{message}</p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="ml-2 shrink-0 rounded-full p-1 opacity-60 transition
              hover:opacity-100"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
