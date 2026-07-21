import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/divyanshthakur108",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/divyansh-thakur-0a944a36a/",
    icon: FiLinkedin,
  },
  {
    label: "Email",
    href: "mailto:divyanshthakur327@gmail.com",
    icon: FiMail,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SocialLinks = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 flex items-center gap-3"
      role="list"
      aria-label="Social media links"
    >
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            variants={itemVariants}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            role="listitem"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Icon size={20} aria-hidden="true" />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
