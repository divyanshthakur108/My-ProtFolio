import { useState, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

/* ─── Validation helpers ─────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const COOLDOWN_MS = 30_000; // 30-second spam cooldown

// Ordered list of field names — used to auto-focus the first invalid field
const FIELD_ORDER = ["name", "email", "subject", "message"];

/* ─── EmailJS credentials from .env ──────────────────── */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Log env-var status in development so missing .env is obvious
if (import.meta.env.DEV) {
  console.log("[Contact] VITE_EMAILJS_SERVICE_ID:", EMAILJS_SERVICE_ID ?? "❌ undefined");
  console.log("[Contact] VITE_EMAILJS_TEMPLATE_ID:", EMAILJS_TEMPLATE_ID ?? "❌ undefined");
  console.log("[Contact] VITE_EMAILJS_PUBLIC_KEY:", EMAILJS_PUBLIC_KEY ?? "❌ undefined");

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn(
      "[Contact] ⚠️ One or more EmailJS env vars are missing.\n" +
        "1. Copy .env.example → .env\n" +
        "2. Fill in your real EmailJS credentials\n" +
        "3. Restart the Vite dev server (npm run dev)"
    );
  }
}

/**
 * Validates all form fields and returns an errors object.
 * Empty object = all fields are valid.
 */
const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
};

/**
 * Focus the first invalid field based on FIELD_ORDER.
 * Uses the `contact-<name>` id convention from FloatingInput.
 */
const focusFirstInvalidField = (errors) => {
  for (const field of FIELD_ORDER) {
    if (errors[field]) {
      const element = document.getElementById(`contact-${field}`);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      break;
    }
  }
};

/* ─── Initial form state ─────────────────────────────── */
const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Custom hook encapsulating all contact form logic:
 * - Field state & change handling
 * - Validation with auto-focus on first invalid field
 * - EmailJS submission with async/await
 * - Spam protection (cooldown + honeypot)
 * - Toast state management
 *
 * @returns form state, handlers, and UI flags
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // bot trap

  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  // Spam cooldown tracking
  const lastSubmitTime = useRef(0);

  /** Update a single field and clear its error */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field error on edit
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  /** Show a toast notification */
  const showToast = useCallback((type, message) => {
    setToast({ visible: true, type, message });
  }, []);

  /** Hide the current toast */
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  /**
   * Handle form submission:
   * 1. Validate all fields first (ALWAYS)
   * 2. Honeypot check
   * 3. Cooldown check
   * 4. Check env vars
   * 5. Send via EmailJS
   * 6. Show toast
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // ── STEP 1: Validate all fields FIRST ──
      // This runs before anything else — no toast, no send, no bypass.
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        // Focus the first invalid field after React re-renders the errors
        requestAnimationFrame(() => focusFirstInvalidField(validationErrors));
        return; // ← STOP HERE — do NOT proceed
      }

      // ── STEP 2: Honeypot — silently reject bots ──
      // Only checked AFTER validation passes so empty forms never reach here
      if (honeypot) {
        // Pretend it succeeded — don't reveal the trap to the bot
        setFormData(INITIAL_FORM);
        return;
      }

      // ── STEP 3: Cooldown — prevent rapid resubmissions ──
      const now = Date.now();
      if (now - lastSubmitTime.current < COOLDOWN_MS) {
        const secondsLeft = Math.ceil(
          (COOLDOWN_MS - (now - lastSubmitTime.current)) / 1000
        );
        showToast("error", `Please wait ${secondsLeft}s before sending again.`);
        return;
      }

      // ── STEP 4: Check env vars before attempting to send ──
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.error("[Contact] EmailJS env vars are missing. Check .env file.");
        showToast(
          "error",
          "Email service is not configured. Please contact the site owner."
        );
        return;
      }

      // ── STEP 5: Send via EmailJS ──
      setIsSubmitting(true);

      try {
        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          submitted_at: new Date().toLocaleString("en-IN", {
            dateStyle: "full",
            timeStyle: "short",
          }),
        };

        // EmailJS v4.x: public key must be passed inside an options object
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          { publicKey: EMAILJS_PUBLIC_KEY }
        );

        // Success — clear form, record timestamp, show toast
        setFormData(INITIAL_FORM);
        setErrors({});
        lastSubmitTime.current = Date.now();
        showToast(
          "success",
          "Thank you! Your message has been sent successfully."
        );
      } catch (error) {
        // Show the actual EmailJS error for easier debugging
        console.error("EmailJS Error:", error);
        const errorText =
          error?.text || error?.message || "Unknown error occurred.";
        showToast("error", `Failed to send message: ${errorText}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, honeypot, showToast]
  );

  return {
    formData,
    errors,
    isSubmitting,
    honeypot,
    setHoneypot,
    toast,
    hideToast,
    handleChange,
    handleSubmit,
  };
};
