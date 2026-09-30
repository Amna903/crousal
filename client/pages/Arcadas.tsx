import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cake,
  Calendar,
  CheckCircle2,
  Clock,
  Coffee,
  HeartHandshake,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Trees,
  Utensils,
  Wheat,
  X,
} from "lucide-react";
import RichTextContent from "@/components/RichTextContent";
import { useContent } from "@/hooks/useContent";
import { parseContentJson } from "@/lib/content";
import { normalizeNavLabel } from "@/lib/nav";

type StatItem = { value: string; label: string };
type FeatureItem = { title: string; body: string };
type MenuItem = {
  name: string;
  category: string;
  price: string;
  description: string;
  tag?: string;
};
type MomentItem = { time: string; title: string; text: string; image: string };
type GalleryItem = {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  large?: boolean;
};
type TestimonialItem = {
  initials: string;
  name: string;
  meta: string;
  quote: string;
};
type ContactItem = { type: string; text: string };

const defaultStats: StatItem[] = [
  { value: "30+", label: "Anos no Largo" },
  { value: "100%", label: "Bolos Caseiros" },
  { value: "07h", label: "Forno Quente Diário" },
  { value: "4.9 ★", label: "Avaliação no Google" },
];

const defaultFeatures: FeatureItem[] = [
  {
    title: "Esplanada Virada para o Jardim",
    body: "Desfrute do sol e da brisa fresca com vista desimpedida para o jardim e para a histórica igreja do largo.",
  },
  {
    title: "Bolos de Fabrico Caseiro",
    body: "Receitas de família com ovos frescos, citrinos do pomar e doçaria regional confecionada todos os dias.",
  },
  {
    title: "Ponto de Encontro da Vila",
    body: "O café onde a comunidade de Atouguia da Baleia se reúne há décadas para conversar sem pressa.",
  },
];

const defaultMenuItems: MenuItem[] = [
  {
    name: "Pastel de Nata das Arcadas",
    category: "Pastelaria Caseira",
    price: "1,30 €",
    description: "Massa folhada crocante com creme suave de nata e canela acabado de sair do forno.",
    tag: "Assinatura",
  },
  {
    name: "Queijada Tradicional de Peniche",
    category: "Pastelaria Caseira",
    price: "1,50 €",
    description: "Receita histórica com queijo fresco e raspas de limão da horta.",
    tag: "Receita Antiga",
  },
  {
    name: "Torta Húmida de Laranja",
    category: "Pastelaria Caseira",
    price: "2,20 €",
    description: "Fatia generosa e sumarenta com laranjas doces do pomar.",
    tag: "Favorito",
  },
  {
    name: "Bolo Caseiro de Cenoura & Noz",
    category: "Pastelaria Caseira",
    price: "2,00 €",
    description: "Massa fofa artesanal com nozes tostadas e cobertura suave.",
    tag: "Caseiro",
  },
  {
    name: "Torrada em Pão de Aldeia",
    category: "Pequeno-Almoço & Lanche",
    price: "1,80 €",
    description: "Duas fatias grossas de pão rústico tostadas com manteiga dos Açores.",
    tag: "Pequeno-Almoço",
  },
  {
    name: "Galão Direto em Copo de Vidro",
    category: "Pequeno-Almoço & Lanche",
    price: "1,40 €",
    description: "Café encorpado com leite fresco vaporizado e espuma cremosa.",
    tag: "Clássico",
  },
  {
    name: "Croissant Quente com Compota",
    category: "Pequeno-Almoço & Lanche",
    price: "1,90 €",
    description: "Croissant tostado servido com compota caseira de frutos da época.",
    tag: "Lanche",
  },
  {
    name: "Café de Lote Especial",
    category: "Cafetaria Especial",
    price: "0,90 €",
    description: "Lote de arábicas selecionadas com torra equilibrada e creme aveludado.",
    tag: "Cafetaria",
  },
  {
    name: "Chá Biológico de Ervas do Jardim",
    category: "Cafetaria Especial",
    price: "1,60 €",
    description: "Infusão natural servida em bule com menta fresca e camomila.",
    tag: "Biológico",
  },
  {
    name: "Empada Caseira de Galinha do Campo",
    category: "Salgados de Conforto",
    price: "1,80 €",
    description: "Massa tenra quebradiça recheada com galinha estufada e ervas aromáticas.",
    tag: "Salgado",
  },
  {
    name: "Pastel de Bacalhau Tradicional",
    category: "Salgados de Conforto",
    price: "1,60 €",
    description: "Feito com bacalhau desfiado, batata e salsa fresca.",
    tag: "Tradicional",
  },
  {
    name: "Tosta Mista em Pão Rústico",
    category: "Salgados de Conforto",
    price: "3,50 €",
    description: "Queijo derretido, fiambre selecionado e orégãos campestres.",
    tag: "Almoço Rápido",
  },
];

const defaultMoments: MomentItem[] = [
  {
    time: "07:00",
    title: "Pão quente",
    text: "O dia começa no forno com aroma a pão fresco e café acabado de moer.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
  },
  {
    time: "10:30",
    title: "Café na esplanada",
    text: "Frente ao jardim e à igreja — jornais do dia, sol suave e conversa boa.",
    image: "https://images.pexels.com/photos/15157808/pexels-photo-15157808.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    time: "16:00",
    title: "Doce da tarde",
    text: "Uma pausa sem pressa com torta de laranja, chá de ervas e queijadas caseiras.",
    image: "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

const defaultGalleryFilters: string[] = ["Todos", "Esplanada", "Bolos & Forno", "Cafetaria", "O Largo"];

const defaultGalleryItems: GalleryItem[] = [
  {
    title: "Esplanada ao Sol",
    subtitle: "Vista sobre o jardim e a igreja",
    tag: "Esplanada",
    image: "https://images.pexels.com/photos/15157808/pexels-photo-15157808.jpeg?auto=compress&cs=tinysrgb&w=1200",
    large: true,
  },
  {
    title: "Pastéis de Nata Quentes",
    subtitle: "Fornadas a cada manhã",
    tag: "Bolos & Forno",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80",
  },
  {
    title: "Café & Conversa",
    subtitle: "O ritual diário da vila",
    tag: "Cafetaria",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&q=80",
  },
  {
    title: "Bolos de Fabrico Próprio",
    subtitle: "Receitas guardadas com carinho",
    tag: "Bolos & Forno",
    image: "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    title: "O Largo de Atouguia",
    subtitle: "Paz, sombra e árvores centenárias",
    tag: "O Largo",
    image: "https://images.pexels.com/photos/15157808/pexels-photo-15157808.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    title: "Lanche da Tarde",
    subtitle: "Torradas em pão caseiro",
    tag: "Cafetaria",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1000&q=80",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    initials: "MS",
    name: "Manuel Silveira",
    meta: "Cliente habitual · Atouguia da Baleia",
    quote:
      "O melhor pastel de nata da região de Peniche. A esplanada em frente à igreja é o sítio mais relaxante para começar a manhã com um bom café e os jornais.",
  },
  {
    initials: "TF",
    name: "Teresa Fernandes",
    meta: "Peniche",
    quote:
      "Bolos caseiros de verdade, feitos com ovos frescos e receitas tradicionais. A torta de laranja e as queijadas são de comer e chorar por mais!",
  },
  {
    initials: "DR",
    name: "Duarte & Rita",
    meta: "Visitantes de Lisboa",
    quote:
      "Paragem obrigatória sempre que vamos para o mar em Peniche ou Baleal. O atendimento é caloroso e o pão quente da manhã é insuperável.",
  },
];

const defaultOrderHighlights: string[] = [
  "Bolos de aniversário e celebrações familiares por encomenda",
  "Caixas de pastelaria tradicional variada prontas para take-away",
  "Salgados e empadas caseiras para eventos e festas",
  "Encomendas antecipadas por telefone ou WhatsApp com apoio dedicado",
];

const defaultFooterContact: ContactItem[] = [
  { type: "location", text: "Largo N. Sra. da Conceição 13, Atouguia da Baleia, Peniche" },
  { type: "phone", text: "+351 262 750 944" },
  { type: "whatsapp", text: "+351 924 033 353" },
  { type: "email", text: "arcadas@dlm.ao" },
];

export default function Arcadas() {
  const c = useContent("arcadas");
  const g = useContent("global");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("Todos");
  const [selectedGalleryTag, setSelectedGalleryTag] = useState("Todos");

  const navLinks = parseContentJson<Array<{ label: string; href: string }>>(g.nav_links_json, [
    { label: "Início", href: "/" },
    { label: "Food Truck", href: "/food-truck" },
    { label: "Delícias", href: "/delicias" },
    { label: "Ateliê", href: "/atelie" },
    { label: "Arcadas", href: "/arcadas" },
    { label: "Lutèce", href: "/lutece" },
    { label: "Contacto", href: "/contacto" },
  ]);

  const stats = parseContentJson<StatItem[]>(c.stats_json, defaultStats);
  const features = parseContentJson<FeatureItem[]>(c.features_json, defaultFeatures);
  const menuItems = parseContentJson<MenuItem[]>(c.menu_cards_json, defaultMenuItems);
  const moments = parseContentJson<MomentItem[]>(c.moments_json, defaultMoments);
  const galleryFilters = parseContentJson<string[]>(c.gallery_filters_json, defaultGalleryFilters);
  const galleryItems = parseContentJson<GalleryItem[]>(c.gallery_items_json, defaultGalleryItems);
  const testimonials = parseContentJson<TestimonialItem[]>(c.testimonials_json, defaultTestimonials);
  const orderHighlights = parseContentJson<string[]>(c.order_highlights_json, defaultOrderHighlights);
  const footerContact = parseContentJson<ContactItem[]>(c.footer_contact_json, defaultFooterContact);

  const menuCategories = useMemo(() => {
    const set = new Set<string>();
    menuItems.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["Todos", ...Array.from(set)];
  }, [menuItems]);

  const filteredMenuItems = useMemo(() => {
    if (selectedMenuCategory === "Todos") return menuItems;
    return menuItems.filter((i) => i.category === selectedMenuCategory);
  }, [menuItems, selectedMenuCategory]);

  const filteredGalleryItems = useMemo(() => {
    if (selectedGalleryTag === "Todos") return galleryItems;
    return galleryItems.filter((item) => item.tag === selectedGalleryTag);
  }, [galleryItems, selectedGalleryTag]);

  const phone1 = c.visit_phone_1 ?? "262 750 944";
  const phone2 = c.visit_phone_2 ?? "924 033 353";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF6EE] text-[#2F3E34] selection:bg-[#5A8F6D] selection:text-white">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#5A8F6D]/20 bg-[#385e45]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5">
          <Link to="/arcadas" className="group flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#d8e8d0] transition-transform duration-300 group-hover:scale-105">
              <Trees className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-playfair text-xl font-bold tracking-wider">
                {c.nav_brand_label ?? "ARCADAS"}
              </span>
              <span className="font-cormorant text-xs italic text-[#d8e8d0]">
                {c.nav_brand_suffix ?? "do Jardim · Peniche"}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => {
              const isActive = item.href === "/arcadas";
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-inter text-[11px] font-medium uppercase tracking-[2.24px] transition-colors ${
                    isActive
                      ? "relative text-white font-semibold after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:bg-[#d8e8d0]"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {normalizeNavLabel(item.label)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#menu"
              className="font-inter text-[11px] font-semibold uppercase tracking-[1.5px] text-[#d8e8d0] hover:text-white"
            >
              Menu
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-[#d8e8d0] bg-white/5 px-6 py-2.5 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-[#d8e8d0] transition-all duration-300 hover:bg-white hover:text-[#385e45] shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {g.nav_smart_quote_label ?? "Smart Quote"}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#31533d] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 font-inter text-xs font-medium uppercase tracking-wider ${
                    item.href === "/arcadas" ? "font-bold text-white" : "text-white/80"
                  }`}
                >
                  {normalizeNavLabel(item.label)}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  to="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d8e8d0] px-5 py-3 font-inter text-xs font-bold uppercase tracking-wider text-[#2F4A38]"
                >
                  Smart Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-4 border-[#5A8F6D] bg-[linear-gradient(135deg,#e9f2e7_0%,#fbf6ee_50%,#f5ece0_100%)]">
        {/* Soft background decor */}
        <div className="pointer-events-none absolute -left-20 top-20 select-none font-playfair text-[260px] font-bold leading-none text-[#5A8F6D]/5">
          A
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#5A8F6D]/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-16 md:grid-cols-12 md:gap-14 md:py-24 lg:px-10">
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5A8F6D]/30 bg-[#5A8F6D]/10 px-4 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d694c]">
                <Wheat className="h-3.5 w-3.5 text-[#5A8F6D]" />
                {c.hero_badge_1 ?? "Tradição & Esplanada"}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#2F4A38]/10 px-3.5 py-1.5 font-inter text-[11px] font-medium uppercase tracking-[0.16em] text-[#2F4A38]">
                {c.hero_badge_2 ?? "Atouguia da Baleia · Peniche"}
              </span>
            </div>

            <p className="mt-5 font-inter text-[11px] font-bold uppercase tracking-[0.3em] text-[#5A8F6D]">
              {c.hero_eyebrow ?? "No Largo da Igreja Matriz"}
            </p>

            <h1 className="mt-3 font-playfair text-[clamp(2.8rem,5.5vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#243d2c]">
              {c.hero_heading ?? "Café Arcadas"}
              <span className="mt-1 block font-cormorant text-[0.6em] font-normal italic text-[#4a7a5c]">
                {c.hero_subheading ?? "do Jardim"}
              </span>
            </h1>

            <p className="mt-5 max-w-xl font-cormorant text-2xl italic leading-snug text-[#4a584e]">
              {c.hero_quote ?? "Uma pausa com sabor a casa."}
            </p>

            <RichTextContent
              className="mt-5 max-w-xl font-inter text-base font-normal leading-relaxed text-[#4A584E]"
              content={
                c.hero_description ??
                "Pastelaria tradicional, café de lote selecionado e bolos caseiros confecionados todos os dias. A nossa esplanada no largo é o ponto de encontro acolhedor onde a hospitalidade portuguesa ganha vida."
              }
            />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-3 rounded-full bg-[#5A8F6D] px-8 py-4 font-inter text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_-8px_rgba(90,143,109,0.55)] transition-all duration-300 hover:scale-105 hover:bg-[#487959] active:scale-95"
              >
                {c.hero_cta_primary ?? "Ver Menu da Casa"} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#visitar"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#5A8F6D] bg-white/60 px-8 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.16em] text-[#376145] backdrop-blur-sm transition-all duration-300 hover:bg-[#5A8F6D]/10"
              >
                {c.hero_cta_secondary ?? "Visitar Esplanada"}
              </a>
            </div>

            {/* Quick Micro Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#5A8F6D]/20 pt-6 text-xs text-[#5C6B5F]">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-[#5A8F6D]" />
                <span>Café moído na hora</span>
              </div>
              <div className="flex items-center gap-2">
                <Cake className="h-4 w-4 text-[#5A8F6D]" />
                <span>Bolos de forno diários</span>
              </div>
              <div className="flex items-center gap-2">
                <Trees className="h-4 w-4 text-[#5A8F6D]" />
                <span>Esplanada arborizada</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative md:col-span-5">
            <div className="relative mx-auto max-w-[480px]">
              {/* Decorative arched border */}
              <div className="absolute -inset-3 rounded-[38%_62%_55%_45%/45%_55%_45%_55%] border-2 border-dashed border-[#5A8F6D]/40" />

              <div className="relative overflow-hidden rounded-[36%_64%_52%_48%/48%_52%_48%_52%] bg-white shadow-[0_30px_60px_-20px_rgba(47,74,56,0.35)] transition-transform duration-700 hover:scale-[1.01]">
                <img
                  src={
                    c.hero_visual_image ??
                    "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  }
                  alt="Café e pastelaria Arcadas do Jardim"
                  className="aspect-[4/5] w-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243d2c]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 left-4 rounded-2xl border border-[#d8e8d0] bg-white/95 p-4 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] backdrop-blur-md md:-left-6 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5A8F6D]/15 text-[#5A8F6D]">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-cormorant text-xl font-bold italic leading-tight text-[#243d2c]">
                      {c.hero_card_quote ?? "Sente-se. Está em casa."}
                    </p>
                    <p className="mt-0.5 font-inter text-[11px] font-medium text-[#5c6b5f]">
                      Atouguia da Baleia · Peniche
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating floating pill */}
              <div className="absolute -top-3 right-4 flex items-center gap-1.5 rounded-full border border-[#CFA459]/40 bg-white px-4 py-1.5 text-xs font-semibold text-[#243d2c] shadow-md">
                <Star className="h-3.5 w-3.5 fill-[#CFA459] text-[#CFA459]" />
                <span>4.9 ★ no Largo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="border-b border-[#5A8F6D]/20 bg-[#355941] py-10 text-white">
        <div className="mx-auto max-w-[1300px] px-5">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={`${stat.label}-${idx}`}
                className="flex flex-col items-center border-l border-white/15 px-4 text-center first:border-l-0"
              >
                <span className="font-playfair text-3xl font-bold tracking-tight text-[#d8e8d0] md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY / HERITAGE SECTION ─────────────────────────────────────── */}
      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5A8F6D]">
              <Sparkles className="h-3.5 w-3.5" />
              {c.story_label ?? "Tradição no Largo"}
            </span>
            <h2 className="mt-3 font-playfair text-3xl font-bold tracking-tight text-[#243d2c] md:text-5xl">
              {c.story_title ?? "Onde o tempo abranda e o café tem sabor a casa"}
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-20 bg-[#5A8F6D]" />
            <RichTextContent
              className="mt-6 font-inter text-base font-light leading-relaxed text-[#5C6B5F]"
              content={
                c.story_description ??
                "No coração de Atouguia da Baleia, em frente ao jardim florido e à igreja matriz, o Café Arcadas do Jardim é o ponto de encontro de gerações. Entre o pão quente da manhã, os pastéis dourados e a conversa amena na esplanada, preservamos a hospitalidade mais genuína de Portugal."
              }
            />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => {
              const icons = [Trees, Cake, HeartHandshake];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={`${feature.title}-${idx}`}
                  className="group relative rounded-[28px] border border-[#d8e8d0] bg-[#FAF6EE] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#5A8F6D] hover:shadow-[0_20px_40px_-15px_rgba(90,143,109,0.2)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5A8F6D]/15 text-[#3d694c] transition-colors duration-300 group-hover:bg-[#5A8F6D] group-hover:text-white">
                    <IconComp className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-playfair text-2xl font-bold text-[#243d2c]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 font-inter text-sm leading-relaxed text-[#5C6B5F]">
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MENU & SPECIALITIES SECTION ─────────────────────────────────── */}
      <section id="menu" className="scroll-mt-20 bg-[#FAF6EE] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5A8F6D]">
              {c.menu_label ?? "Especialidades da Casa"}
            </span>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-[#243d2c] md:text-5xl">
              {c.menu_title ?? "Doces do forno, fatias caseiras & café com história"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#5A8F6D]" />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {menuCategories.map((cat) => {
              const active = selectedMenuCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedMenuCategory(cat)}
                  className={`rounded-full px-5 py-2.5 font-inter text-xs font-semibold tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-[#5A8F6D] text-white shadow-md shadow-[#5A8F6D]/30"
                      : "bg-white text-[#4A584E] hover:bg-[#e9f2e7] border border-[#d8e8d0]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Menu Cards Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMenuItems.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#d8e8d0] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#5A8F6D]/60 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-playfair text-xl font-bold text-[#243d2c] group-hover:text-[#385e45] transition-colors">
                      {item.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#5A8F6D]/15 px-3 py-1 font-inter text-sm font-bold text-[#2b5238]">
                      {item.price}
                    </span>
                  </div>

                  <p className="mt-2.5 font-inter text-sm leading-relaxed text-[#5C6B5F]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#f0f4ee] pt-3 text-xs">
                  <span className="font-inter font-medium text-[#7d9183]">
                    {item.category}
                  </span>
                  {item.tag && (
                    <span className="rounded-md bg-[#eef5ec] px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-wider text-[#3d694c]">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footnote callout */}
          <div className="mt-12 text-center">
            <p className="font-cormorant text-lg italic text-[#5C6B5F]">
              Disponibilidade diária sujeita às fornadas do dia. Encomendas de bolos inteiros sob consulta.
            </p>
          </div>
        </div>
      </section>

      {/* ── UM DIA NAS ARCADAS (TIMELINE) ────────────────────────────────── */}
      <section id="dia" className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-14 max-w-xl">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5A8F6D]">
              {c.day_label ?? "Um dia nas Arcadas"}
            </span>
            <h2 className="mt-3 font-playfair text-3xl font-bold tracking-tight text-[#243d2c] md:text-5xl">
              {c.day_title ?? "Pequenos rituais, grandes pausas"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#5A8F6D]" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {moments.map((m, i) => (
              <article
                key={`${m.title}-${i}`}
                className="group relative overflow-hidden rounded-[28px] border border-[#d8e8d0] bg-[#FAF6EE] p-3 transition-all duration-500 hover:shadow-lg hover:border-[#5A8F6D]"
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={m.image}
                    alt={m.title}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#2F4A38]/90 px-4 py-1.5 font-inter text-xs font-bold text-white backdrop-blur-sm">
                    <Clock className="h-3 w-3 text-[#d8e8d0]" />
                    {m.time}
                  </span>
                </div>
                <div className="p-5">
                  <span className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-[#5A8F6D]">
                    Momento 0{i + 1}
                  </span>
                  <h3 className="mt-1 font-playfair text-2xl font-bold text-[#243d2c]">
                    {m.title}
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-[#5C6B5F]">
                    {m.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BAND ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#385e45] px-5 py-20 text-center text-white md:py-24">
        <div className="pointer-events-none absolute -right-12 top-0 select-none font-playfair text-[200px] font-bold text-white/5">
          ”
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="font-cormorant text-[clamp(1.8rem,4vw,2.8rem)] italic leading-snug text-[#f3f8f1]">
            {c.quote_text ?? "“Mais do que um café — um ponto de encontro no largo.”"}
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#d8e8d0]/60" />
          <p className="mt-4 font-inter text-xs uppercase tracking-[0.24em] text-[#d8e8d0]">
            {c.quote_caption ?? "Atouguia da Baleia · Peniche"}
          </p>
        </div>
      </section>

      {/* ── FILTERABLE GALLERY ───────────────────────────────────────────── */}
      <section id="galeria" className="bg-[#FAF6EE] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5A8F6D]">
              {c.gallery_label ?? "Galeria & Vida na Praça"}
            </span>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-[#243d2c] md:text-5xl">
              {c.gallery_title ?? "Momentos partilhados à mesa"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#5A8F6D]" />
          </div>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {galleryFilters.map((filter) => {
              const active = selectedGalleryTag === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedGalleryTag(filter)}
                  className={`rounded-full px-5 py-2 font-inter text-xs font-semibold tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-[#5A8F6D] text-white shadow-md shadow-[#5A8F6D]/30"
                      : "bg-white text-[#4A584E] hover:bg-[#e9f2e7] border border-[#d8e8d0]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGalleryItems.map((item, idx) => (
              <figure
                key={`${item.title}-${idx}`}
                className={`group relative overflow-hidden rounded-[24px] bg-white shadow-sm transition-all duration-500 hover:shadow-xl ${
                  item.large ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243d2c]/90 via-[#243d2c]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wider text-[#d8e8d0] backdrop-blur-sm mb-2">
                    {item.tag}
                  </span>
                  <h3 className="font-playfair text-xl font-bold leading-snug md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-inter text-xs font-light text-white/80">
                    {item.subtitle}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5A8F6D]">
              {c.testimonials_label ?? "Vozes da Casa"}
            </span>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-[#243d2c] md:text-5xl">
              {c.testimonials_title ?? "Histórias à volta de uma chávena de café"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#5A8F6D]" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((test, idx) => (
              <div
                key={`${test.name}-${idx}`}
                className="relative flex flex-col justify-between rounded-[28px] border border-[#d8e8d0] bg-[#FAF6EE] p-8 shadow-sm transition-all duration-300 hover:border-[#5A8F6D] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#CFA459]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 font-cormorant text-xl italic leading-relaxed text-[#2F3E34]">
                    "{test.quote}"
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-[#5A8F6D]/15 pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5A8F6D] font-playfair text-sm font-bold text-white shadow-sm">
                    {test.initials}
                  </div>
                  <div>
                    <p className="font-playfair text-base font-bold text-[#243d2c]">
                      {test.name}
                    </p>
                    <p className="font-inter text-xs text-[#5C6B5F]">{test.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION & CAKE ORDER CALLOUT BANNER ─────────────────────── */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-[1300px]">
          <div className="relative overflow-hidden rounded-[36px] border border-[#5A8F6D]/30 bg-[linear-gradient(135deg,#31533d_0%,#437253_60%,#355c43_100%)] p-8 text-white shadow-xl md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-inter text-xs font-semibold uppercase tracking-wider text-[#d8e8d0]">
                  <Cake className="h-4 w-4" />
                  {c.order_label ?? "Ocasiões Especiais"}
                </span>

                <h3 className="mt-4 font-playfair text-3xl font-bold leading-tight md:text-4xl">
                  {c.order_title ?? "Encomende os Nossos Bolos Caseiros para a Sua Festa"}
                </h3>

                <RichTextContent
                  className="mt-4 font-inter text-sm font-light leading-relaxed text-[#e0eee1]"
                  content={
                    c.order_description ??
                    "Bolos de aniversário inteiros, caixas de pastelaria tradicional e empadas caseiras para celebrações de família ou encontros com amigos em Peniche e arredores."
                  }
                />

                <ul className="mt-6 space-y-2.5">
                  {orderHighlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2.5 font-inter text-xs text-white/90">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d8e8d0]" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {c.order_banner && (
                  <div className="mt-6 inline-block rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-inter text-xs font-semibold text-[#d8e8d0]">
                    {c.order_banner}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
                <a
                  href="https://wa.me/351924033353?text=Olá!%20Gostaria%20de%20fazer%20uma%20encomenda%20no%20Café%20Arcadas%20do%20Jardim."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-inter text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" /> Encomendar por WhatsApp
                </a>

                <Link
                  to="/contacto"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 font-inter text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#2F4A38] sm:w-auto"
                >
                  Pedir Orçamento Smart Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIT & LOCATION ─────────────────────────────────────────────── */}
      <section id="visitar" className="scroll-mt-20 bg-[#FAF6EE] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5A8F6D]">
              {c.visit_label ?? "A nossa casa"}
            </span>
            <h2 className="mt-3 font-playfair text-3xl font-bold text-[#243d2c] md:text-5xl">
              {c.visit_title ?? "Venha conhecer"}
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-20 bg-[#5A8F6D]" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#d5e3d4] bg-white p-8 shadow-sm transition-all hover:border-[#5A8F6D] hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5A8F6D]/15 text-[#5A8F6D]">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-playfair text-xl font-bold text-[#243d2c]">
                {c.visit_address_title ?? "Morada"}
              </h3>
              <p className="mt-2.5 whitespace-pre-line font-inter text-sm leading-relaxed text-[#5C6B5F]">
                {c.visit_address ?? "Largo Nossa Sra. da Conceição 13\n2525-057 Atouguia da Baleia"}
              </p>
            </div>

            <div className="rounded-[28px] border border-[#d5e3d4] bg-white p-8 shadow-sm transition-all hover:border-[#5A8F6D] hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5A8F6D]/15 text-[#5A8F6D]">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-playfair text-xl font-bold text-[#243d2c]">
                {c.visit_hours_title ?? "Horário"}
              </h3>
              <p className="mt-2.5 whitespace-pre-line font-inter text-sm leading-relaxed text-[#5C6B5F]">
                {c.visit_hours ?? "Todos os dias\n07:00 – 20:00"}
              </p>
            </div>

            <div className="rounded-[28px] border border-[#d5e3d4] bg-white p-8 shadow-sm transition-all hover:border-[#5A8F6D] hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5A8F6D]/15 text-[#5A8F6D]">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-playfair text-xl font-bold text-[#243d2c]">
                {c.visit_phone_title ?? "Telefone"}
              </h3>
              <div className="mt-2.5 space-y-1 font-inter text-sm text-[#5C6B5F]">
                <a
                  href={`tel:+351${phone1.replace(/\s/g, "")}`}
                  className="block hover:text-[#5A8F6D] hover:underline"
                >
                  {phone1}
                </a>
                <a
                  href={`tel:+351${phone2.replace(/\s/g, "")}`}
                  className="block hover:text-[#5A8F6D] hover:underline"
                >
                  {phone2}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={
                c.visit_maps_url ??
                "https://maps.google.com/?q=Caf%C3%A9+Arcadas+do+Jardim,+Atouguia+da+Baleia"
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#5A8F6D] px-8 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {c.visit_maps_label ?? "Ver no Google Maps"} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={c.visit_instagram_url ?? "https://instagram.com/pastelariarcadasjardim"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#5A8F6D]/40 bg-white px-7 py-3 font-inter text-xs font-semibold text-[#385e45] transition-all hover:bg-[#e9f2e7]"
            >
              <Instagram className="h-4 w-4 text-[#5A8F6D]" />
              {c.visit_instagram ?? "@pastelariarcadasjardim"}
            </a>
          </div>
        </div>
      </section>

      {/* ── FULL BRANDED FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t-[5px] border-[#5A8F6D] bg-[#243d2c] px-5 py-16 text-[#e8f0e4]">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Brand Intro */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#d8e8d0]">
                  <Trees className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-playfair text-2xl font-bold text-white">
                    {c.footer_title ?? "ARCADAS DO JARDIM"}
                  </p>
                  <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-[#b8d4c0]">
                    {c.footer_tagline ?? "Uma marca DLM Group"}
                  </p>
                </div>
              </div>

              <RichTextContent
                className="mt-5 max-w-md font-inter text-sm font-light leading-relaxed text-[#d8e8d0]/80"
                content={
                  c.footer_description ??
                  "Pastelaria e café em Atouguia da Baleia — o sabor de casa no coração de Peniche, onde a tradição e a esplanada florida acolhem quem chega."
                }
              />
            </div>

            {/* Brands Links */}
            <div className="lg:col-span-2">
              <p className="font-cormorant text-lg font-bold uppercase tracking-[0.16em] text-[#d8e8d0]">
                Marcas DLM
              </p>
              <ul className="mt-4 space-y-2.5 font-inter text-xs font-light text-white/80">
                <li>
                  <Link to="/delicias" className="transition hover:text-white hover:underline">
                    Delícias da Madalena
                  </Link>
                </li>
                <li>
                  <Link to="/food-truck" className="transition hover:text-white hover:underline">
                    Food Truck
                  </Link>
                </li>
                <li>
                  <Link to="/atelie" className="transition hover:text-white hover:underline">
                    Ateliê de Doces
                  </Link>
                </li>
                <li>
                  <Link to="/arcadas" className="font-semibold text-white">
                    Café Arcadas
                  </Link>
                </li>
                <li>
                  <Link to="/lutece" className="transition hover:text-white hover:underline">
                    Pastelaria Lutèce
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <p className="font-cormorant text-lg font-bold uppercase tracking-[0.16em] text-[#d8e8d0]">
                Explorar
              </p>
              <ul className="mt-4 space-y-2.5 font-inter text-xs font-light text-white/80">
                <li>
                  <a href="#menu" className="transition hover:text-white hover:underline">
                    Menu da Casa
                  </a>
                </li>
                <li>
                  <a href="#dia" className="transition hover:text-white hover:underline">
                    Um Dia no Largo
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="transition hover:text-white hover:underline">
                    Galeria de Fotos
                  </a>
                </li>
                <li>
                  <a href="#visitar" className="transition hover:text-white hover:underline">
                    Como Chegar
                  </a>
                </li>
                <li>
                  <Link to="/contacto" className="transition hover:text-white hover:underline">
                    Smart Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div className="lg:col-span-3">
              <p className="font-cormorant text-lg font-bold uppercase tracking-[0.16em] text-[#d8e8d0]">
                Contacto
              </p>
              <ul className="mt-4 space-y-3 font-inter text-xs font-light text-white/80">
                {footerContact.map((item, idx) => (
                  <li key={`${item.type}-${idx}`} className="flex items-start gap-2.5">
                    {item.type === "location" && <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d8e8d0]" />}
                    {item.type === "phone" && <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#d8e8d0]" />}
                    {item.type === "whatsapp" && <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#d8e8d0]" />}
                    {item.type === "email" && <span className="text-[#d8e8d0]">@</span>}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#b8d4c0]/70 md:flex-row">
            <p>{c.footer_copyright ?? "© 2026 Café Arcadas do Jardim · Uma marca do grupo DLM"}</p>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-white transition">
                DLM Group Holding
              </Link>
              <Link to="/contacto" className="hover:text-white transition">
                Contacto Central
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/351924033353?text=Olá!%20Gostaria%20de%20fazer%20uma%20encomenda%20ou%20saber%20mais%20sobre%20o%20Café%20Arcadas%20do%20Jardim."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-7 right-7 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
