import RichTextContent from "@/components/RichTextContent";
import { useContent } from "@/hooks/useContent";

export default function HeroSection() {
  const c = useContent("home");

  const heroImage =
    c.hero_image ??
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80";

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-dlm-dark"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dlm-dark/90 via-dlm-dark/70 to-dlm-dark/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto">
        {/* Pill badge */}
        <div className="mb-8 px-7 py-3 rounded-full border border-dlm-gold/30 bg-black/20 backdrop-blur-sm">
          <span className="font-inter font-light text-[11px] tracking-[4.5px] uppercase text-dlm-gold">
            {c.hero_badge ?? "Comércio e Prestação de Serviços"}
          </span>
        </div>

        {/* Main Heading */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <h1 className="font-playfair font-bold text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(64px, 12vw, 112px)", letterSpacing: "-2px" }}>
            {c.hero_heading ?? "DLM"}
          </h1>
          <p className="font-cormorant font-normal text-dlm-gold tracking-[10px] uppercase"
             style={{ fontSize: "clamp(18px, 3.5vw, 40px)" }}>
            {c.hero_subheading ?? "The Power of Many"}
          </p>
        </div>

        {/* Subheading */}
        <RichTextContent
          className="mb-12 font-cormorant font-light italic text-white/90"
          content={
            c.hero_description ?? "Cinco experiências distintas · Uma holding de excelência"
          }
          style={{ fontSize: "clamp(18px, 2.5vw, 29px)" }}
        />

        {/* CTA Button */}
        <a
          href="#marcas"
          className="group relative inline-flex items-center gap-4 bg-dlm-gold rounded-full px-12 py-4 font-inter font-semibold text-[13px] tracking-[2.5px] uppercase text-dlm-dark hover:bg-dlm-gold/90 transition-all duration-300 shadow-[0_8px_28px_-8px_#C8A050]"
        >
          {c.hero_cta ?? "Descobrir Marcas"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>

      </div>

      {/* Scroll Indicator at hero image bottom */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-inter text-[10px] font-light uppercase tracking-[3px] text-dlm-muted">
          Explorar
        </span>
        <svg className="h-4 w-4 animate-bounce text-dlm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
