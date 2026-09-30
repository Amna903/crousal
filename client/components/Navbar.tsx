import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { parseContentJson } from "@/lib/content";
import { normalizeNavLabel } from "@/lib/nav";

const DLMLogo = () => (
  <div className="flex items-center gap-3">
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#navbar-clip)">
        <path opacity="0.15" d="M19.7574 11.0711L11.2721 2.58578C10.491 1.80473 9.2247 1.80473 8.44365 2.58578L-0.0416375 11.0711C-0.822686 11.8521 -0.822686 13.1184 -0.0416375 13.8995L8.44365 22.3848C9.2247 23.1658 10.491 23.1658 11.2721 22.3848L19.7574 13.8995C20.5384 13.1184 20.5384 11.8521 19.7574 11.0711Z" fill="#C8A050"/>
        <path d="M19.4038 11.7175L11.6257 3.93934C11.0399 3.35356 10.0901 3.35356 9.50434 3.93934L1.72616 11.7175C1.14037 12.3033 1.14037 13.2531 1.72616 13.8388L9.50434 21.617C10.0901 22.2028 11.0399 22.2028 11.6257 21.617L19.4038 13.8388C19.9896 13.2531 19.9896 12.3033 19.4038 11.7175Z" stroke="#C8A050" strokeWidth="2"/>
        <path d="M19.0503 12.9498L13.3934 7.29292C13.0029 6.90239 12.3697 6.90239 11.9792 7.29292L6.32234 12.9498C5.93181 13.3403 5.93181 13.9735 6.32234 14.364L11.9792 20.0208C12.3697 20.4114 13.0029 20.4114 13.3934 20.0208L19.0503 14.364C19.4408 13.9735 19.4408 13.3403 19.0503 12.9498Z" stroke="#C8A050" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="4" fill="#C8A050"/>
      </g>
      <defs>
        <clipPath id="navbar-clip">
          <rect width="48" height="48" fill="white"/>
        </clipPath>
      </defs>
    </svg>
    <div className="flex flex-col leading-none">
      <span className="font-playfair font-bold text-xl text-white tracking-wider">DLM</span>
      <span className="font-inter font-bold text-[9px] text-dlm-gold tracking-[3px] uppercase">GROUP</span>
    </div>
  </div>
);

export default function Navbar() {
  const g = useContent("global");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = parseContentJson(g.nav_links_json, [
    { label: "Início", href: "/" },
    { label: "Food Truck", href: "/food-truck" },
    { label: "Delícias", href: "/delicias" },
    { label: "Ateliê", href: "/atelie" },
    { label: "Arcadas", href: "/arcadas" },
    { label: "Lutèce", href: "/lutece" },
    { label: "Contacto", href: "/contacto" },
  ]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dlm-dark/95 backdrop-blur-sm shadow-[0_20px_40px_-12px_rgba(45,30,20,0.4)]"
          : "bg-dlm-dark"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <DLMLogo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-inter font-medium text-[11px] tracking-[2.24px] uppercase transition-colors ${
                i === 0
                  ? "text-white relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-dlm-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {normalizeNavLabel(link.label)}
            </Link>
          ))}
        </div>

        {/* Smart Quote Button */}
        <div className="hidden md:flex items-center">
          <a
            href="/contacto"
            className="font-inter font-semibold text-[11px] tracking-[2.24px] uppercase text-dlm-gold border border-dlm-gold/80 bg-dlm-gold/5 rounded-full px-8 py-2.5 hover:bg-dlm-gold/10 transition-colors"
          >
            {g.nav_smart_quote_label ?? "Smart Quote"}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dlm-dark border-t border-dlm-gold/20 px-5 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-inter font-medium text-[11px] tracking-[2.24px] uppercase text-white/80 hover:text-dlm-gold transition-colors"
            >
              {normalizeNavLabel(link.label)}
            </a>
          ))}
          <a
            href="/contacto"
            onClick={() => setMobileOpen(false)}
            className="font-inter font-semibold text-[11px] tracking-[2.24px] uppercase text-dlm-gold border border-dlm-gold/80 rounded-full px-6 py-2.5 text-center hover:bg-dlm-gold/10 transition-colors"
          >
            {g.nav_smart_quote_label ?? "Smart Quote"}
          </a>
        </div>
      )}
    </nav>
  );
}
