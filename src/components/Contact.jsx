import { useState } from "react";
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

const contactInfo = [
  {
    icon: FiMapPin,
    title: "Location",
    description: "Chandigarh, India",
  },
  {
    icon: FiMail,
    title: "Email",
    description: "divyanshthakur@email.com",
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
  {
    icon: FiGithub,
    label: "GitHub",
    href: "#",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: FiTwitter,
    label: "Twitter",
    href: "#",
  },
  {
    icon: FiInstagram,
    label: "Instagram",
    href: "#",
  },
];

const fieldClasses =
  "w-full rounded-xl border border-gray-700 bg-[#2a2a2a] px-5 text-white placeholder:text-gray-500 outline-none transition duration-200 ease-in-out focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <section id="contact" className="bg-dark-100 py-25 w-full">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">Get In</span>{" "}
            <span className="text-[#8B5CF6]">Touch</span>
          </h2>
          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            Have a project in mind or want to collaborate? Let&apos;s talk!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid gap-10 lg:grid-cols-[3fr_2fr]"
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 rounded-3xl border border-gray-800 bg-[#121212] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="space-y-2 text-sm text-gray-200">
                <span>Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`${fieldClasses} h-14`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </label>

              <label className="space-y-2 text-sm text-gray-200">
                <span>Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`${fieldClasses} h-14`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </label>
            </div>

            <label className="space-y-2 text-sm text-gray-200">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject of your message"
                className={`${fieldClasses} h-14`}
              />
            </label>

            <label className="space-y-2 text-sm text-gray-200">
              <span>Your Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                className={`${fieldClasses} h-45 resize-none p-5 pt-4`}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </label>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] px-6 py-4 text-base font-semibold text-white transition duration-200 ease-out hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(139,92,246,0.35)]"
            >
              Send Message
            </button>

            {successMessage && (
              <p className="rounded-2xl bg-emerald-500/10 px-5 py-3 text-sm text-emerald-300">
                {successMessage}
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 rounded-3xl border border-gray-800 bg-[#121212] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-gray-800 bg-dark-200 p-5"
                  >
                    <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#8B5CF6]/10 text-[#8B5CF6] shadow-[0_12px_30px_rgba(139,92,246,0.18)]">
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

            <div className="rounded-3xl border border-gray-800 bg-dark-200 p-5">
              <h3 className="text-lg font-semibold text-white">Follow Me</h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
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
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2a2a] text-gray-300 transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:rounded-full hover:bg-[#8B5CF6] hover:text-white"
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
    </section>
  );
}
