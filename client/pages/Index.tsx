import Navbar from "../components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import ValuesSection from "@/components/ValuesSection";
import ContactSection from "@/components/ContactSection";
import RichTextContent from "@/components/RichTextContent";
import { useContent } from "@/hooks/useContent";
import { parseContentJson } from "@/lib/content";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const FooterPhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15.4688 0.84375C15.8125 0.9375 16.0625 1.21875 16.0625 1.5625C16.0625 9.59375 9.5625 16.0625 1.5625 16.0625C1.1875 16.0625 0.90625 15.8438 0.8125 15.5L0.0625 12.25C0 11.9062 0.15625 11.5312 0.5 11.375L4 9.875C4.3125 9.75 4.65625 9.84375 4.875 10.0938L6.4375 12C8.875 10.8438 10.8438 8.84375 11.9688 6.46875L10.0625 4.90625C9.8125 4.6875 9.71875 4.34375 9.84375 4.03125L11.3438 0.53125C11.5 0.1875 11.875 0 12.2188 0.09375L15.4688 0.84375Z" fill="#CFA459"/>
  </svg>
);

const FooterMailIcon = () => (
  <svg width="16" height="12" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M23.5312 5.95312C23.7188 5.8125 24 5.95312 24 6.1875V15.75C24 17.0156 22.9688 18 21.75 18H2.25C0.984375 18 0 17.0156 0 15.75V6.1875C0 5.95312 0.234375 5.8125 0.421875 5.95312C1.5 6.79688 2.85938 7.82812 7.64062 11.2969C8.625 12 10.3125 13.5469 12 13.5469C13.6406 13.5469 15.375 12 16.3125 11.2969C21.0938 7.82812 22.4531 6.79688 23.5312 5.95312ZM12 12C10.875 12.0469 9.32812 10.6406 8.53125 10.0781C2.29688 5.57812 1.82812 5.15625 0.421875 4.03125C0.140625 3.84375 0 3.51562 0 3.14062V2.25C0 1.03125 0.984375 0 2.25 0H21.75C22.9688 0 24 1.03125 24 2.25V3.14062C24 3.51562 23.8125 3.84375 23.5312 4.03125C22.125 5.15625 21.6562 5.57812 15.4219 10.0781C14.625 10.6406 13.0781 12.0469 12 12Z" fill="#CFA459"/>
  </svg>
);

const FooterLocationIcon = () => (
  <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5.375 15.6875C0.8125 9.125 0 8.4375 0 6C0 2.6875 2.65625 0 6 0C9.3125 0 12 2.6875 12 6C12 8.4375 11.1562 9.125 6.59375 15.6875C6.3125 16.125 5.65625 16.125 5.375 15.6875ZM6 8.5C7.375 8.5 8.5 7.40625 8.5 6C8.5 4.625 7.375 3.5 6 3.5C4.59375 3.5 3.5 4.625 3.5 6C3.5 7.40625 4.59375 8.5 6 8.5Z" fill="#967BB6"/>
    <path d="M5.375 15.6875C0.8125 9.125 0 8.4375 0 6C0 2.6875 2.65625 0 6 0C9.3125 0 12 2.6875 12 6C12 8.4375 11.1562 9.125 6.59375 15.6875C6.3125 16.125 5.65625 16.125 5.375 15.6875ZM6 8.5C7.375 8.5 8.5 7.40625 8.5 6C8.5 4.625 7.375 3.5 6 3.5C4.59375 3.5 3.5 4.625 3.5 6C3.5 7.40625 4.59375 8.5 6 8.5Z" fill="currentColor"/>
  </svg>
);

const WhatsAppSvgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.875 2.0625C13.1875 3.375 14 5.09375 14 6.96875C14 10.7812 10.8125 13.9062 6.96875 13.9062C5.8125 13.9062 4.6875 13.5938 3.65625 13.0625L0 14L0.96875 10.4062C0.375 9.375 0.03125 8.1875 0.03125 6.9375C0.03125 3.125 3.15625 0 6.96875 0C8.84375 0 10.5938 0.75 11.875 2.0625ZM6.96875 12.7188C10.1562 12.7188 12.8125 10.125 12.8125 6.96875C12.8125 5.40625 12.1562 3.96875 11.0625 2.875C9.96875 1.78125 8.53125 1.1875 7 1.1875C3.8125 1.1875 1.21875 3.78125 1.21875 6.9375C1.21875 8.03125 1.53125 9.09375 2.09375 10.0312L2.25 10.25L1.65625 12.375L3.84375 11.7812L4.03125 11.9062C4.9375 12.4375 5.9375 12.7188 6.96875 12.7188ZM10.1562 8.40625C10.3125 8.5 10.4375 8.53125 10.4688 8.625C10.5312 8.6875 10.5312 9.03125 10.375 9.4375C10.2188 9.84375 9.53125 10.2188 9.21875 10.25C8.65625 10.3438 8.21875 10.3125 7.125 9.8125C5.375 9.0625 4.25 7.3125 4.15625 7.21875C4.0625 7.09375 3.46875 6.28125 3.46875 5.40625C3.46875 4.5625 3.90625 4.15625 4.0625 3.96875C4.21875 3.78125 4.40625 3.75 4.53125 3.75C4.625 3.75 4.75 3.75 4.84375 3.75C4.96875 3.75 5.09375 3.71875 5.25 4.0625C5.375 4.40625 5.75 5.25 5.78125 5.34375C5.8125 5.4375 5.84375 5.53125 5.78125 5.65625C5.46875 6.3125 5.09375 6.28125 5.28125 6.59375C5.96875 7.75 6.625 8.15625 7.65625 8.65625C7.8125 8.75 7.90625 8.71875 8.03125 8.625C8.125 8.5 8.46875 8.09375 8.5625 7.9375C8.6875 7.75 8.8125 7.78125 8.96875 7.84375C9.125 7.90625 9.96875 8.3125 10.1562 8.40625Z" fill="#967BB6"/>
    <path d="M11.875 2.0625C13.1875 3.375 14 5.09375 14 6.96875C14 10.7812 10.8125 13.9062 6.96875 13.9062C5.8125 13.9062 4.6875 13.5938 3.65625 13.0625L0 14L0.96875 10.4062C0.375 9.375 0.03125 8.1875 0.03125 6.9375C0.03125 3.125 3.15625 0 6.96875 0C8.84375 0 10.5938 0.75 11.875 2.0625ZM6.96875 12.7188C10.1562 12.7188 12.8125 10.125 12.8125 6.96875C12.8125 5.40625 12.15625 3.96875 11.0625 2.875C9.96875 1.78125 8.53125 1.1875 7 1.1875C3.8125 1.1875 1.21875 3.78125 1.21875 6.9375C1.21875 8.03125 1.53125 9.09375 2.09375 10.0312L2.25 10.25L1.65625 12.375L3.84375 11.7812L4.03125 11.9062C4.9375 12.4375 5.9375 12.7188 6.96875 12.7188ZM10.1562 8.40625C10.3125 8.5 10.4375 8.53125 10.4688 8.625C10.5312 8.6875 10.5312 9.03125 10.375 9.4375C10.2188 9.84375 9.53125 10.2188 9.21875 10.25C8.65625 10.3438 8.21875 10.3125 7.125 9.8125C5.375 9.0625 4.25 7.3125 4.15625 7.21875C4.0625 7.09375 3.46875 6.28125 3.46875 5.40625C3.46875 4.5625 3.90625 4.15625 4.0625 3.96875C4.21875 3.78125 4.40625 3.75 4.53125 3.75C4.625 3.75 4.75 3.75 4.84375 3.75C4.96875 3.75 5.09375 3.71875 5.25 4.0625C5.375 4.40625 5.75 5.25 5.78125 5.34375C5.8125 5.4375 5.84375 5.53125 5.78125 5.65625C5.46875 6.3125 5.09375 6.28125 5.28125 6.59375C5.96875 7.75 6.625 8.15625 7.65625 8.65625C7.8125 8.75 7.90625 8.71875 8.03125 8.625C8.125 8.5 8.46875 8.09375 8.5625 7.9375C8.6875 7.75 8.8125 7.78125 8.96875 7.84375C9.125 7.90625 9.96875 8.3125 10.1562 8.40625Z" fill="currentColor"/>
  </svg>
);

export default function Index() {
  const g = useContent("global");
  const footerBrands = parseContentJson<string[]>(g.home_footer_brands_json, [
    "Delicias da Madalena",
    "Food Truck",
    "Atelie de Doces",
    "Cafe Arcadas do Jardim",
    "Pastelaria Lutece",
  ]);
  const footerCompany = parseContentJson<string[]>(g.home_footer_company_json, ["Sobre nos", "Contacto", "Carreiras", "Privacidade"]);
  const footerBrandLinks = parseContentJson<Array<{ label: string; href: string }>>(g.home_footer_brands_links_json, footerBrands.map((label) => ({ label, href: "#" })));
  const footerCompanyLinks = parseContentJson<Array<{ label: string; href: string }>>(g.home_footer_company_links_json, footerCompany.map((label) => ({ label, href: "#" })));
  const footerSocial = parseContentJson<Array<{ label: string; href: string }>>(g.home_footer_social_json, [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "WhatsApp", href: "#" },
  ]);
  const footerContact = parseContentJson<Array<{ type: string; text: string }>>(g.home_footer_contact_json, [
    { type: "location", text: "Patriota & Aeroporto, Luanda" },
    { type: "phone", text: "+244 999 999 999" },
    { type: "email", text: "info@dlm.ao" },
  ]);

  return (
    <div className="min-h-screen bg-dlm-cream">
      <Navbar />
      <main>
        <HeroSection />
        <BrandsSection />
        <ValuesSection />

        <ContactSection />
      </main>

      <footer className="bg-[#2c1c0f] px-5 pb-8 pt-20 text-white">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 md:flex-row md:gap-0">

          {/* Brand column */}
          <div className="flex-1 md:max-w-[430px]">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_footer)">
                  <path opacity="0.15" d="M19.7574 11.0711L11.2721 2.58584C10.491 1.8048 9.2247 1.8048 8.44365 2.58584L-0.0416375 11.0711C-0.822686 11.8522 -0.822686 13.1185 -0.0416375 13.8996L8.44365 22.3848C9.2247 23.1659 10.491 23.1659 11.2721 22.3848L19.7574 13.8996C20.5384 13.1185 20.5384 11.8522 19.7574 11.0711Z" fill="#C8A050"/>
                  <path d="M19.4038 11.7175L11.6257 3.93932C11.0399 3.35354 10.0901 3.35354 9.50434 3.93932L1.72616 11.7175C1.14037 12.3033 1.14037 13.253 1.72616 13.8388L9.50434 21.617C10.0901 22.2028 11.0399 22.2028 11.6257 21.617L19.4038 13.8388C19.9896 13.253 19.9896 12.3033 19.4038 11.7175Z" stroke="#C8A050" strokeWidth="2"/>
                  <path d="M19.0503 12.9497L13.3934 7.2928C13.0029 6.90228 12.3697 6.90228 11.9792 7.2928L6.32234 12.9497C5.93181 13.3402 5.93181 13.9733 6.32234 14.3639L11.9792 20.0207C12.3697 20.4113 13.0029 20.4113 13.3934 20.0207L19.0503 14.3639C19.4408 13.9733 19.4408 13.3402 19.0503 12.9497Z" stroke="#C8A050" strokeWidth="1.5"/>
                  <path d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z" fill="#C8A050"/>
                </g>
                <defs>
                  <clipPath id="clip0_footer">
                    <rect width="48" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col">
                <span className="font-playfair text-2xl font-bold leading-9 text-white">DLM</span>
                <span className="font-playfair text-[10px] font-bold uppercase tracking-[2.88px] text-dlm-gold">GROUP</span>
              </div>
            </div>

            {/* Description */}
            <RichTextContent
              className="mt-6 font-inter text-base font-light leading-[1.8] text-dlm-muted"
              content={
                g.home_footer_description ??
                "Uma holding dedicada à excelência artesanal, unindo marcas na arte da pastelaria, confeitaria e eventos."
              }
            />

            {/* Social icons */}
            <div className="mt-8 flex gap-4">
              {[
                { icon: <Instagram size={16} />, label: "Instagram" },
                { icon: <Facebook size={16} />, label: "Facebook" },
                { icon: <Linkedin size={16} />, label: "LinkedIn" },
                { icon: <WhatsAppSvgIcon />, label: "WhatsApp" },
              ].map(({ icon, label }) => {
                const dynamicLink = footerSocial.find((item) => item.label === label);
                return (
                <a
                  key={label}
                  href={dynamicLink?.href ?? "#"}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(200,160,80,0.30)] text-dlm-muted transition-colors hover:border-dlm-gold hover:text-dlm-gold"
                >
                  {icon}
                </a>
              );})}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-1 flex-col gap-10 md:flex-row md:justify-around">

            {/* Marcas */}
            <div>
              <h4 className="font-cormorant text-base font-bold uppercase tracking-[3.2px] text-dlm-gold">
                Marcas
              </h4>
              <ul className="mt-12 space-y-4 font-inter text-base font-light text-dlm-muted">
                {footerBrandLinks.map((item) => (
                  <li key={item.label}><a href={item.href} className="hover:text-dlm-gold transition-colors">{item.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="font-cormorant text-base font-bold uppercase tracking-[3.2px] text-dlm-gold">
                Empresa
              </h4>
              <ul className="mt-12 space-y-4 font-inter text-base font-light text-dlm-muted">
                {footerCompanyLinks.map((item) => (
                  <li key={item.label}><a href={item.href} className="hover:text-dlm-gold transition-colors">{item.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-cormorant text-base font-bold uppercase tracking-[3.2px] text-dlm-gold">
                Contacto
              </h4>
              <ul className="mt-12 space-y-4 font-inter text-base font-light text-dlm-muted">
                {footerContact.map((item) => (
                  <li key={`${item.type}-${item.text}`} className="flex items-start gap-3">
                    {item.type === "location" ? (
                      <span className="mt-0.5 shrink-0 text-dlm-gold"><FooterLocationIcon /></span>
                    ) : item.type === "phone" ? (
                      <span className="shrink-0"><FooterPhoneIcon /></span>
                    ) : (
                      <span className="shrink-0"><FooterMailIcon /></span>
                    )}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto mt-12 flex w-full max-w-[1400px] flex-col items-start justify-between gap-3 border-t border-dlm-gold/20 pt-6 font-inter text-sm font-light text-dlm-muted/70 md:flex-row md:items-center">
          <span>{g.home_footer_copyright ?? "© 2026 DLM Group. Todos os direitos reservados."}</span>
          <span>{g.home_footer_region ?? "Angola · Portugal"}</span>
        </div>
      </footer>
    </div>
  );
}
