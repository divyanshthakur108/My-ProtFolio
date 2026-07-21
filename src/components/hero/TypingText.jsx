import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const phrases = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Backend Developer",
];

const TypingText = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setIsDeleting(true);
        setSpeed(1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => prev + 1);
        setSpeed(80);
      } else {
        setSpeed(isDeleting ? 40 : 80);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, speed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-5 flex items-center gap-1"
      role="status"
      aria-live="polite"
      aria-label={`Current role: ${phrases[phraseIndex % phrases.length]}`}
    >
      <span className="text-2xl font-semibold text-white/90 sm:text-3xl lg:text-4xl">
        {text}
      </span>
      <span
        className="typing-cursor text-2xl sm:text-3xl lg:text-4xl"
        aria-hidden="true"
      >
        |
      </span>
    </motion.div>
  );
};

export default TypingText;
