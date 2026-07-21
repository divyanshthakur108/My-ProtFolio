import { motion } from "framer-motion";

const ProfileImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Background glow blobs */}
      <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px] sm:h-80 sm:w-80" />
      <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-pink-500/15 blur-[90px] sm:h-72 sm:w-72" />
      <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[80px] sm:h-64 sm:w-64" />

      {/* Floating container */}
      <div className="profile-float relative">
        {/* Rotating gradient border */}
        <div className="absolute -inset-[3px] rounded-full overflow-hidden">
          <div className="rotating-gradient absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#ec4899,#3b82f6,#8b5cf6)]" />
        </div>

        {/* Glassmorphism outer ring */}
        <div
          className="relative rounded-full border border-white/20 bg-white/5 p-2 backdrop-blur-xl sm:p-3"
          style={{
            boxShadow: "0 0 80px rgba(168,85,247,.35)",
          }}
        >
          {/* Inner glow ring */}
          <div className="absolute inset-2 rounded-full border border-purple-500/20 sm:inset-3" />

          {/* Image container */}
          <div className="group relative overflow-hidden rounded-full">
            <img
              src="/images/profile.png"
              alt="Divyansh Thakur — Full Stack Developer"
              width={420}
              height={420}
              loading="lazy"
              className="h-[280px] w-[280px] rounded-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]"
            />
            {/* Hover overlay glow */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-purple-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileImage;
