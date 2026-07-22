import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
} from "react-icons/fi";
import FloatingInput from "./contact/FloatingInput";
import Toast from "./contact/Toast";
import { useContactForm } from "./contact/useContactForm";

/* ─── Static data ────────────────────────────────────── */
const contactInfo = [
  {
    icon: FiMapPin,
    title: "Location",
    description: "Chandigarh, India",
  },
  {
    icon: FiMail,
    title: "Email",
    description: "divyanshthakur327@gmail.com",
  },
  {
    icon: FiPhone,
    title: "Phone",
    description: "+91 7347567108",
  },
  {
    icon: FiClock,
    title: "Availability",
    description: "Available for Freelance",
  },
];

const socialLinks = [
  { icon: FiGithub, label: "GitHub", href: "#" },
  { icon: FiLinkedin, label: "LinkedIn", href: "#" },
  { icon: FiTwitter, label: "Twitter", href: "#" },
  { icon: FiInstagram, label: "Instagram", href: "#" },
];

/* ─── Loading spinner for the submit button ──────────── */
const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

/* ─── Contact Section ────────────────────────────────── */
export default function Contact() {
  const {
    formData,
    errors,
    isSubmitting,
    honeypot,
    setHoneypot,
    toast,
    hideToast,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section id="contact" className="w-full max-w-full overflow-hidden bg-dark-100 py-16 sm:py-25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">Get In</span>{" "}
            <span className="text-[#8B5CF6]">Touch</span>
          </h2>
          <p className="mt-3 text-sm text-gray-300 sm:mt-4 sm:text-lg">
            Have a project in mind or want to collaborate? Let&apos;s talk!
          </p>
        </motion.div>

        {/* ── Form + Info Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[3fr_2fr] lg:gap-10"
        >
          {/* ── Contact Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 rounded-3xl border border-gray-800 bg-[#121212]
              p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:space-y-6 sm:p-8"
            noValidate
          >
            {/* Honeypot field — hidden from real users, bots fill it */}
            <div className="h-0 overflow-hidden opacity-0" aria-hidden="true">
              <input
                type="text"
                name="_hp_field"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name + Email row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <FloatingInput
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <FloatingInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            {/* Subject */}
            <FloatingInput
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
            />

            {/* Message */}
            <FloatingInput
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              multiline
              rows={5}
            />

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className={`group inline-flex w-full items-center justify-center gap-2
                rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]
                px-6 py-4 text-base font-semibold text-white
                transition-all duration-300 ease-out
                hover:shadow-[0_20px_60px_rgba(139,92,246,0.35)]
                ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>

          {/* ── Contact Info + Social ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 rounded-3xl border border-gray-800 bg-[#121212]
              p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:space-y-8 sm:p-8"
          >
            {/* Info cards */}
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-gray-800
                      bg-dark-200 p-5"
                  >
                    <div
                      className="mt-1 flex h-12 w-12 items-center justify-center
                        rounded-3xl bg-[#8B5CF6]/10 text-[#8B5CF6]
                        shadow-[0_12px_30px_rgba(139,92,246,0.18)]"
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="rounded-3xl border border-gray-800 bg-dark-200 p-5">
              <h3 className="text-lg font-semibold text-white">Follow Me</h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
                className="mt-5 flex flex-wrap gap-4"
              >
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="flex h-14 w-14 items-center justify-center
                        rounded-full bg-[#2a2a2a] text-gray-300
                        transition duration-200 ease-out
                        hover:-translate-y-1 hover:scale-105
                        hover:bg-[#8B5CF6] hover:text-white"
                      aria-label={item.label}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Toast notification ── */}
      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={hideToast}
      />
    </section>
  );
}
