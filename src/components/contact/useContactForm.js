import { useState, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

/* ─── Validation helpers ─────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const COOLDOWN_MS = 30_000; // 30-second spam cooldown

// Ordered list of field names — used to auto-focus the first invalid field
const FIELD_ORDER = ["name", "email", "subject", "message"];

/** Helper to mask sensitive keys for secure logging */
const maskKey = (key) => {
  if (!key) return "❌ undefined";
  if (key.length <= 6) return `${key[0]}***${key[key.length - 1]}`;
  return `${key.slice(0, 3)}***${key.slice(-3)}`;
};

/* ─── Config helper ─────────────────────────────────── */
const getContactConfig = () => {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const targetEmail = import.meta.env.VITE_CONTACT_EMAIL;

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return { web3Key, targetEmail, serviceId, templateId, publicKey };
};

// Log status in development
if (import.meta.env.DEV) {
  const { web3Key, targetEmail, serviceId, templateId, publicKey } = getContactConfig();
  console.log("[Contact System] Web3Forms Access Key:", maskKey(web3Key));
  console.log("[Contact System] Direct Target Email:", targetEmail ?? "❌ Not set in .env");
  console.log("[Contact System] EmailJS Service ID:", serviceId ?? "❌ Not set");
  console.log("[Contact System] EmailJS Template ID:", templateId ?? "❌ Not set");
  console.log("[Contact System] EmailJS Public Key:", maskKey(publicKey));
}

/** Validates form data */
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

/** Focus the first invalid field */
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

/* Initial form state */
const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const useContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const lastSubmitTime = useRef(0);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const showToast = useCallback((type, message) => {
    setToast({ visible: true, type, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  /**
   * Send submission directly to Gmail using Web3Forms or FormSubmit or EmailJS
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Step 1: Validate form
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        requestAnimationFrame(() => focusFirstInvalidField(validationErrors));
        return;
      }

      // Step 2: Honeypot check for bot protection
      if (honeypot) {
        setFormData(INITIAL_FORM);
        return;
      }

      // Step 3: Spam cooldown check
      const now = Date.now();
      if (now - lastSubmitTime.current < COOLDOWN_MS) {
        const secondsLeft = Math.ceil(
          (COOLDOWN_MS - (now - lastSubmitTime.current)) / 1000
        );
        showToast("error", `Please wait ${secondsLeft}s before sending again.`);
        return;
      }

      const { web3Key, targetEmail, serviceId, templateId, publicKey } =
        getContactConfig();

      setIsSubmitting(true);

      try {
        // ── METHOD A: Web3Forms (Zero dashboard, 1 key in .env) ──
        if (web3Key) {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: web3Key,
              name: formData.name.trim(),
              email: formData.email.trim(),
              subject: formData.subject.trim(),
              message: formData.message.trim(),
            }),
          });

          const data = await res.json();
          if (data.success) {
            setFormData(INITIAL_FORM);
            setErrors({});
            lastSubmitTime.current = Date.now();
            showToast(
              "success",
              "Thank you! Your message has been sent directly to Gmail."
            );
            return;
          } else {
            throw new Error(data.message || "Web3Forms submission failed");
          }
        }

        // ── METHOD B: Direct Gmail Delivery via FormSubmit (Zero Dashboard, Zero Sign-up) ──
        const destinationEmail = targetEmail || "divyanshthakur327@gmail.com";
        if (destinationEmail && destinationEmail.includes("@")) {
          const res = await fetch(
            `https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                name: formData.name.trim(),
                email: formData.email.trim(),
                _subject: `New Portfolio Message: ${formData.subject.trim()}`,
                message: formData.message.trim(),
              }),
            }
          );

          const data = await res.json();
          if (data.success === "true" || data.success === true) {
            setFormData(INITIAL_FORM);
            setErrors({});
            lastSubmitTime.current = Date.now();
            showToast(
              "success",
              "Thank you! Your message has been sent to your Gmail inbox."
            );
            return;
          }
        }

        // ── METHOD C: EmailJS Fallback ──
        if (serviceId && templateId && publicKey) {
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

          await emailjs.send(serviceId, templateId, templateParams, {
            publicKey,
          });

          setFormData(INITIAL_FORM);
          setErrors({});
          lastSubmitTime.current = Date.now();
          showToast(
            "success",
            "Thank you! Your message has been sent successfully."
          );
          return;
        }

        throw new Error("No email service configured.");
      } catch (error) {
        console.error("Contact Form Error:", error);
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


