import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-dark-100/90 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="/#home"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <h1 className="text-2xl font-bold leading-none whitespace-nowrap sm:text-3xl lg:text-4xl">
            <span className="text-white">Divyansh</span>
            <span className="ml-2 text-purple">Thakur</span>
          </h1>
          <span className="h-3 w-3 rounded-full bg-purple sm:h-4 sm:w-4"></span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-white/80 transition duration-300 hover:text-purple"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-dark-100/95 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3 py-2 text-base font-medium text-white/80 transition hover:bg-white/10 hover:text-purple"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
