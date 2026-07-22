import { useState } from "react";

/**
 * Floating-label input/textarea with focus animation and purple glow.
 *
 * @param {{ label: string, name: string, type?: string, value: string, onChange: Function, error?: string, multiline?: boolean, rows?: number }} props
 */
const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  multiline = false,
  rows = 5,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  const Component = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      {/* The input / textarea */}
      <Component
        id={`contact-${name}`}
        type={multiline ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={multiline ? rows : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`peer w-full rounded-xl border bg-[#1e1e1e]/60 px-5
          text-white outline-none backdrop-blur-sm
          transition-all duration-300 ease-out
          placeholder-transparent
          ${multiline ? "resize-none pb-4 pt-7" : "h-14 pt-5 pb-2"}
          ${
            error
              ? "border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
              : "border-white/[0.08] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]"
          }`}
        placeholder={label}
      />

      {/* Floating label */}
      <label
        htmlFor={`contact-${name}`}
        className={`pointer-events-none absolute left-5 transition-all duration-200 ease-out
          ${
            isActive
              ? "top-2 text-[11px] font-medium text-purple-400"
              : "top-4 text-sm text-gray-500"
          }`}
      >
        {label}
      </label>

      {/* Error message */}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1.5 pl-1 text-xs font-medium text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
