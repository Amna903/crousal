import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Coffee,
  Croissant,
  Flame,
  Heart,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  Wheat,
  X,
} from "lucide-react";
import RichTextContent from "@/components/RichTextContent";
import { useContent } from "@/hooks/useContent";
import { parseContentJson } from "@/lib/content";
import { normalizeNavLabel } from "@/lib/nav";

type StatItem = { value: string; label: string };
type CraftItem = { n: string; t: string; d: string };
type MenuItem = {
  name: string;
  category: string;
  price: string;
  description: string;
  tag?: string;
};
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
  { value: "24h", label: "Fermentação Lenta" },
  { value: "100%", label: "Manteiga Pura Francesa" },
  { value: "3x", label: "Fornadas Quentes Diárias" },
  { value: "4.9 ★", label: "Avaliação em Oeiras" },
];

const defaultCraft: CraftItem[] = [
  {
    n: "01",
    t: "Massa-Mãe & Fermentação Lenta",
    d: "Pão de digestão leve com 24 horas de repouso natural, côdea estaladiça e miolo aerado com farinhas selecionadas.",
  },
  {
    n: "02",
    t: "Pastelaria Fina & Viennoiserie",
    d: "Croissants e pain au chocolat com manteiga pura francesa, folhados lâmina a lâmina e tartes de fruta da época.",
  },
  {
    n: "03",
    t: "Cafetaria de Especialidade",
    d: "Café moído na hora para um espresso aveludado, cappuccinos e lattes servidos na esplanada da avenida.",
  },
  {
    n: "04",
    t: "Fornadas às 07h, 11h30 e 16h30",
    d: "Pão quente a fumegar três vezes ao dia para garantir frescura absoluta no café ou para levar para casa.",
  },
];

const defaultMenuItems: MenuItem[] = [
  {
    name: "Pão Rústico de Massa-Mãe (750g)",
    category: "Padaria Artesanal",
    price: "2,80 €",
    description: "Pão de trigo e centeio com fermentação de 24 horas, miolo elástico e côdea escura estaladiça.",
    tag: "Assinatura",
  },
  {
    name: "Baguete de Tradição Francesa",
    category: "Padaria Artesanal",
    price: "1,40 €",
    description: "Farinha T65 francesa, fermentação lenta e crosta dourada pontilhada de farinha.",
    tag: "Diário",
  },
  {
    name: "Pão de Centeio & Sementes",
    category: "Padaria Artesanal",
    price: "3,10 €",
    description: "Enriquecido com sementes de girassol, abóbora e sésamo tostadas.",
    tag: "Nutritivo",
  },
  {
    name: "Croissant Francês de Manteiga Pura",
    category: "Pastelaria Fina",
    price: "1,70 €",
    description: "Massa folhada artesanal com manteiga DOP de alta percentagem gorda, dourado e leve.",
    tag: "Especialidade",
  },
  {
    name: "Pastel de Nata Lutèce",
    category: "Pastelaria Fina",
    price: "1,35 €",
    description: "Folhado ultra estaladiço com creme rico de nata fresca e canela de Ceilão.",
    tag: "Clássico",
  },
  {
    name: "Pain au Chocolat de Paris",
    category: "Pastelaria Fina",
    price: "1,90 €",
    description: "Duas barras de chocolate belga 55% cacau envolvidas em massa folhada leve.",
    tag: "Favorito",
  },
  {
    name: "Tartelete de Frutos Silvestres",
    category: "Pastelaria Fina",
    price: "3,40 €",
    description: "Base sablée crocante, creme pasteleiro com baunilha de Bourbon e frutos frescos.",
    tag: "Doçaria Fina",
  },
  {
    name: "Tosta Lutèce em Pão de Massa-Mãe",
    category: "Pequeno-Almoço & Lanches",
    price: "4,90 €",
    description: "Queijo brie fundido, nozes, mel de flor de laranjeira e rúcula fresca.",
    tag: "Gourmet",
  },
  {
    name: "Croissant Misto Quente Prensado",
    category: "Pequeno-Almoço & Lanches",
    price: "2,90 €",
    description: "Com queijo emmental e fiambre da perna prensado na hora.",
    tag: "Conforto",
  },
  {
    name: "Espresso de Lote Superior",
    category: "Cafetaria & Bebidas",
    price: "0,95 €",
    description: "Blend arábica com notas de avelã tostada e cacau.",
    tag: "Cafetaria",
  },
  {
    name: "Cappuccino Lutèce com Canela",
    category: "Cafetaria & Bebidas",
    price: "2,20 €",
    description: "Creme aveludado de leite vaporizado polvilhado com cacau puro.",
    tag: "Barista",
  },
  {
    name: "Sumo Natural de Laranja do Algarve",
    category: "Cafetaria & Bebidas",
    price: "2,60 €",
    description: "Espremido na hora, doce e rico em vitamina C.",
    tag: "Fresco",
  },
];

const defaultGalleryFilters: string[] = ["Todos", "Pão & Forno", "Pastelaria Fina", "Avenida & Esplanada"];

const defaultGalleryItems: GalleryItem[] = [
  {
    title: "Pão de Fermentação Lenta",
    subtitle: "Massa-mãe viva e crosta crocante",
    tag: "Pão & Forno",
    image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1200",
    large: true,
  },
  {
    title: "Croissants de Manteiga Pura",
    subtitle: "Folhados artesanais todos os dias",
    tag: "Pastelaria Fina",
    image: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    title: "Café da Manhã na Avenida",
    subtitle: "A esplanada acolhedora de Oeiras",
    tag: "Avenida & Esplanada",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80",
  },
  {
    title: "Vitrine de Doçaria & Tartes",
    subtitle: "Alta pastelaria europeia",
    tag: "Pastelaria Fina",
    image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    title: "Fornada da Manhã",
    subtitle: "Baguetes acabadas de sair",
    tag: "Pão & Forno",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80",
  },
  {
    title: "Pain au Chocolat & Viennoiserie",
    subtitle: "Com chocolate belga de alta pureza",
    tag: "Pastelaria Fina",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&q=80",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    initials: "MB",
    name: "Mariana Bernardes",
    meta: "Cliente diária · Oeiras",
    quote:
      "O melhor pão de fermentação lenta da linha de Cascais e Oeiras! A baguete e os croissants têm um nível de confeção que compete com as melhores boulangeries de Paris.",
  },
  {
    initials: "GA",
    name: "Gonçalo Alpoim",
    meta: "Arquiteto · Escritório em Oeiras",
    quote:
      "O ritual da manhã na esplanada da Sá Carneiro é essencial. O pastel de nata é ultra estaladiço e o atendimento é sempre acolhedor e atencioso.",
  },
  {
    initials: "PV",
    name: "Patrícia Vieira",
    meta: "Diretora de Recursos Humanos",
    quote:
      "Encomendámos várias caixas de viennoiserie sortida e mini-salgados para um pequeno-almoço corporativo da empresa e foi um sucesso total. Todos adoraram.",
  },
];

const defaultOrderHighlights: string[] = [
  "Caixas executivas de viennoiserie e folhados para coffee breaks em Oeiras",
  "Pães artesanais inteiros fatiados e encomendas com antecedência",
  "Tartes especiais e bolos para comemorações e aniversários de empresa",
  "Apoio dedicado por WhatsApp e orçamento ágil no Smart Quote",
];

const defaultFooterContact: ContactItem[] = [
  { type: "location", text: "Av. Dr. Francisco de Sá Carneiro 9B, 2780-185 Oeiras" },
  { type: "phone", text: "+351 21 442 0793" },
  { type: "whatsapp", text: "+351 924 033 353" },
  { type: "email", text: "lutece@dlm.ao" },
];

export default function Lutece() {
  const c = useContent("lutece");
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
  const craftItems = parseContentJson<CraftItem[]>(c.craft_items_json, defaultCraft);
  const menuItems = parseContentJson<MenuItem[]>(c.menu_cards_json, defaultMenuItems);
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

  const phone = c.visit_phone ?? "21 442 0793";
  const visitTitle = (c.visit_title ?? "Oeiras,\nà mesa.").split("\n");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF6F0] text-[#3C2F22] selection:bg-[#C8A050] selection:text-[#23160C]">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#C8A050]/25 bg-[#23160C]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5">
          <Link to="/lutece" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A050]/40 bg-[#C8A050]/15 text-[#C8A050] transition-transform duration-300 group-hover:scale-105">
              <Wheat className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-playfair text-xl font-bold tracking-[0.1em] text-white">
                {c.nav_brand_label ?? "LUTÈCE"}
              </span>
              <span className="font-inter text-[8px] font-semibold uppercase tracking-[0.28em] text-[#C8A050]">
                {c.nav_brand_suffix ?? "Fabrico Artesanal · Oeiras"}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => {
              const isActive = item.href === "/lutece";
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-inter text-[11px] font-medium uppercase tracking-[2.24px] transition-colors ${
                    isActive
                      ? "relative text-white font-semibold after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:bg-[#C8A050]"
                      : "text-white/70 hover:text-white"
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
              className="font-inter text-[11px] font-semibold uppercase tracking-[1.5px] text-[#C8A050] hover:text-white"
            >
              Menu
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-[#C8A050]/70 bg-[#C8A050]/10 px-6 py-2.5 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-[#C8A050] transition-all duration-300 hover:bg-[#C8A050] hover:text-[#23160C] shadow-sm"
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
          <div className="border-t border-white/10 bg-[#1c1108] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 font-inter text-xs font-medium uppercase tracking-wider ${
                    item.href === "/lutece" ? "font-bold text-[#C8A050]" : "text-white/80"
                  }`}
                >
                  {normalizeNavLabel(item.label)}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  to="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A050] px-5 py-3 font-inter text-xs font-bold uppercase tracking-wider text-[#23160C]"
                >
                  Smart Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#C8A050]/25 bg-[#23160C] text-white">
        <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#C8A050]/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 select-none font-playfair text-[260px] font-bold text-[#C8A050]/5">
          L
        </div>

        <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center px-5 py-16 md:px-10 md:py-24 lg:py-28 lg:pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8A050]/40 bg-[#C8A050]/15 px-4 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8A050]">
                <Wheat className="h-3.5 w-3.5" />
                {c.hero_badge_1 ?? "Fabrico Próprio Artesanal"}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1.5 font-inter text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
                {c.hero_badge_2 ?? "Oeiras · Lisboa"}
              </span>
            </div>

            <p className="mt-6 font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C8A050]">
              {c.hero_eyebrow ?? "Avenida Dr. Francisco de Sá Carneiro"}
            </p>

            <h1 className="mt-3 font-playfair text-[clamp(3rem,6.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
              {c.hero_heading ?? "Pastelaria Lutèce"}
            </h1>

            <p className="mt-3 font-cormorant text-[clamp(1.4rem,3vw,2rem)] font-semibold uppercase tracking-[0.22em] text-[#C8A050]">
              {c.hero_subheading ?? "Fabrico Artesanal"}
            </p>

            <p className="mt-5 max-w-xl font-cormorant text-2xl italic leading-snug text-[#f0e6d6]">
              {c.hero_quote ?? "O perfume do pão acabado de cozer e o estaladiço da melhor pastelaria fina."}
            </p>

            <RichTextContent
              className="mt-5 max-w-xl font-inter text-base font-light leading-relaxed text-white/75"
              content={
                c.hero_description ??
                "Pão fresco de fermentação lenta, viennoiserie folhada a manteiga pura e pastelaria fina de fabrico próprio. O ritual diário de quem conhece Oeiras da primeira fornada da manhã ao café da tarde."
              }
            />

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-3 rounded-full bg-[#C8A050] px-8 py-4 font-inter text-xs font-bold uppercase tracking-[0.16em] text-[#23160C] shadow-[0_12px_24px_-8px_rgba(200,160,80,0.5)] transition-all duration-300 hover:scale-105 hover:bg-[#d8b05e] active:scale-95"
              >
                {c.hero_cta_primary ?? "Menu do Forno & Vitrine"} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#loja"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3.5 font-inter text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
              >
                {c.hero_cta_secondary ?? "Visitar Loja em Oeiras"}
              </a>
            </div>

            {/* Quick Baker Quality Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-[#C8A050]" />
                <span>3 Fornadas ao dia</span>
              </div>
              <div className="flex items-center gap-2">
                <Croissant className="h-4 w-4 text-[#C8A050]" />
                <span>Manteiga pura de folhado</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-[#C8A050]" />
                <span>Café arábica superior</span>
              </div>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="relative grid grid-cols-2 gap-3 p-4 md:gap-4 md:p-8 lg:min-h-[640px]">
            <div className="row-span-2 overflow-hidden rounded-[32px] border border-[#C8A050]/20 shadow-2xl group">
              <img
                src={
                  c.hero_image_1 ??
                  "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt="Pão artesanal Lutèce"
                className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:min-h-full"
                fetchPriority="high"
              />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[#C8A050]/20 shadow-xl group">
              <img
                src={
                  c.hero_image_2 ??
                  "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=900"
                }
                alt="Vitrine de pastelaria fina"
                className="h-full min-h-[170px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[#C8A050]/20 shadow-xl group">
              <img
                src={
                  c.hero_image_3 ??
                  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"
                }
                alt="Café da manhã na esplanada"
                className="h-full min-h-[170px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating Quality Stamp */}
            <div className="absolute bottom-10 left-10 rounded-2xl border border-[#C8A050]/50 bg-[#23160C]/90 p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A050] text-[#23160C]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-playfair text-sm font-bold text-white">Fabrico Artesanal Diário</p>
                  <p className="font-inter text-[11px] text-[#C8A050]">Oeiras · Tradição Europeia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="border-b border-[#e8dcc8] bg-[#FAF6F0] py-10">
        <div className="mx-auto max-w-[1300px] px-5">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={`${stat.label}-${idx}`}
                className="flex flex-col items-center border-l border-[#C8A050]/30 px-4 text-center first:border-l-0"
              >
                <span className="font-playfair text-3xl font-black tracking-tight text-[#23160C] md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-[#7A6652]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRAFT & PILLARS SECTION ──────────────────────────────────────── */}
      <section id="oficio" className="border-b border-[#e8dcc8] bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A050]">
                {c.craft_label ?? "O ofício"}
              </span>
              <h2 className="mt-2 font-playfair text-3xl font-bold tracking-tight text-[#23160C] md:text-5xl">
                {c.craft_title ?? "Do forno para a mesa: a nobreza dos ingredientes e o tempo certo"}
              </h2>
              <div className="mt-4 h-[3px] w-20 bg-[#C8A050]" />
            </div>

            <RichTextContent
              className="max-w-md font-inter text-sm font-light leading-relaxed text-[#6a5a48]"
              content={
                c.craft_description ??
                "Fabrico próprio todos os dias na Av. Sá Carneiro — métodos ancestrais de panificação, manteiga com denominação de origem e fornadas quentes cronometradas ao longo do dia."
              }
            />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {craftItems.map((item) => (
              <article
                key={item.n}
                className="group relative rounded-2xl border-l-4 border-[#C8A050] bg-[#FAF6F0] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-playfair text-4xl font-black text-[#C8A050]/40 transition-colors group-hover:text-[#C8A050]">
                  {item.n}
                </span>
                <h3 className="mt-3 font-playfair text-xl font-bold text-[#23160C]">
                  {item.t}
                </h3>
                <p className="mt-2.5 font-inter text-sm leading-relaxed text-[#6a5a48]">
                  {item.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU & SPECIALITIES SECTION ─────────────────────────────────── */}
      <section id="menu" className="scroll-mt-20 bg-[#FAF6F0] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A050]">
              {c.menu_label ?? "Menu do Forno & Vitrine"}
            </span>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-[#23160C] md:text-5xl">
              {c.menu_title ?? "Pães de massa-mãe, viennoiserie dourada & cafetaria fina"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#C8A050]" />
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
                      ? "bg-[#23160C] text-[#C8A050] shadow-md border border-[#C8A050]"
                      : "bg-white text-[#594533] hover:bg-[#f3eadf] border border-[#e8dcc8]"
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
                className="group relative flex flex-col justify-between rounded-2xl border border-[#e8dcc8] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#C8A050] hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-playfair text-xl font-bold text-[#23160C] group-hover:text-[#8f6b24] transition-colors">
                      {item.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#C8A050]/20 px-3 py-1 font-inter text-sm font-bold text-[#6d4f13]">
                      {item.price}
                    </span>
                  </div>

                  <p className="mt-2.5 font-inter text-sm leading-relaxed text-[#6a5a48]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#f5ece0] pt-3 text-xs">
                  <span className="font-inter font-medium text-[#8f7d6d]">
                    {item.category}
                  </span>
                  {item.tag && (
                    <span className="rounded-md bg-[#FAF6F0] border border-[#C8A050]/30 px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-wider text-[#8f6b24]">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="mt-12 text-center">
            <p className="font-cormorant text-lg italic text-[#7A6652]">
              Fornadas quentes às 07:00, 11:30 e 16:30. Caixas de pequeno-almoço e pães sob encomenda.
            </p>
          </div>
        </div>
      </section>

      {/* ── ATMOSPHERE / AVENUE LIFE SECTION ─────────────────────────────── */}
      <section className="bg-white px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A050]">
                {c.atmosphere_label ?? "Avenida Sá Carneiro"}
              </span>
              <h2 className="mt-3 font-playfair text-3xl font-bold leading-tight text-[#23160C] md:text-5xl">
                {c.atmosphere_title ?? "A pausa perfeita no ritmo vibrante de Oeiras"}
              </h2>
              <div className="mt-4 h-[3px] w-20 bg-[#C8A050]" />

              <RichTextContent
                className="mt-6 font-inter text-base font-light leading-relaxed text-[#594533]"
                content={
                  c.atmosphere_description ??
                  "Entre o murmúrio da avenida e a tranquilidade da nossa esplanada, a Lutèce é o ponto de encontro de quem aprecia os prazeres simples mas perfeitos: uma baguete ainda quente no saco de papel, um croissant amanteigado a desfazer-se na mão e o melhor café."
                }
              />

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A050]/15 text-[#8f6b24]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-lg font-bold text-[#23160C]">O Ritual da Manhã</h4>
                    <p className="font-inter text-xs leading-relaxed text-[#6a5a48]">
                      Comece o dia com o jornal aberto, café acabado de moer e croissants quentes ao sol da esplanada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A050]/15 text-[#8f6b24]">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-lg font-bold text-[#23160C]">Lanches & Tostas Rústicas</h4>
                    <p className="font-inter text-xs leading-relaxed text-[#6a5a48]">
                      Pão de fermentação natural com queijos finos, compotas artesanais e quiches do dia para uma refeição ligeira.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A050]/15 text-[#8f6b24]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-lg font-bold text-[#23160C]">Caixas Take-Away para Casa ou Empresa</h4>
                    <p className="font-inter text-xs leading-relaxed text-[#6a5a48]">
                      Leve o sabor da pastelaria fina para o escritório em Oeiras ou para a mesa de domingo em família.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative mx-auto overflow-hidden rounded-[36px] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80"
                  alt="Pastelaria e esplanada Lutèce em Oeiras"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23160C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-cormorant text-2xl italic leading-snug">
                    "O ponto de encontro da avenida, onde cada detalhe é feito à mão."
                  </p>
                  <p className="mt-1 font-inter text-xs uppercase tracking-wider text-[#C8A050]">
                    Oeiras · Av. Sá Carneiro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERABLE GALLERY / VITRINE ──────────────────────────────────── */}
      <section id="galeria" className="bg-[#23160C] px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A050]">
              {c.gallery_label ?? "Vitrine & Atmosfera"}
            </span>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-white md:text-5xl">
              {c.gallery_title ?? "Momentos acabados de sair do forno"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#C8A050]" />
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
                      ? "bg-[#C8A050] text-[#23160C] shadow-md"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/15"
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
                className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#1a1007] shadow-xl transition-all duration-500 hover:border-[#C8A050]/60 ${
                  item.large ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23160C]/90 via-[#23160C]/40 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-block rounded-full bg-[#C8A050]/20 border border-[#C8A050]/40 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wider text-[#C8A050] backdrop-blur-sm mb-2">
                    {item.tag}
                  </span>
                  <h3 className="font-playfair text-xl font-bold leading-snug text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-inter text-xs font-light text-white/75">
                    {item.subtitle}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF6F0] px-5 py-20 md:py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex flex-col items-center text-center">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C8A050]">
              {c.testimonials_label ?? "Depoimentos"}
            </span>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-[#23160C] md:text-5xl">
              {c.testimonials_title ?? "O que dizem os apreciadores do bom pão"}
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[#C8A050]" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((test, idx) => (
              <div
                key={`${test.name}-${idx}`}
                className="relative flex flex-col justify-between rounded-[28px] border border-[#e8dcc8] bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#C8A050] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C8A050]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 font-cormorant text-xl italic leading-relaxed text-[#3C2F22]">
                    "{test.quote}"
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-[#f5ece0] pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C8A050] font-playfair text-sm font-bold text-[#23160C] shadow-sm">
                    {test.initials}
                  </div>
                  <div>
                    <p className="font-playfair text-base font-bold text-[#23160C]">
                      {test.name}
                    </p>
                    <p className="font-inter text-xs text-[#7A6652]">{test.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATERING & CORPORATE ORDERS CALLOUT BANNER ─────────────────────── */}
      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-[1300px]">
          <div className="relative overflow-hidden rounded-[36px] border border-[#C8A050]/40 bg-[linear-gradient(135deg,#1f130a_0%,#332012_50%,#24150b_100%)] p-8 text-white shadow-2xl md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#C8A050]/10 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A050]/50 bg-[#C8A050]/15 px-4 py-1.5 font-inter text-xs font-semibold uppercase tracking-wider text-[#C8A050]">
                  <Award className="h-4 w-4" />
                  {c.order_label ?? "Empresas & Ocasiões Especiais"}
                </span>

                <h3 className="mt-4 font-playfair text-3xl font-bold leading-tight md:text-4xl text-white">
                  {c.order_title ?? "Encomendas para Coffee Breaks, Empresas e Ocasiões Especiais"}
                </h3>

                <RichTextContent
                  className="mt-4 font-inter text-sm font-light leading-relaxed text-white/80"
                  content={
                    c.order_description ??
                    "Caixas executivas de viennoiserie sortida, mini-folhados, tartes e pães rústicos fatiados para reuniões e celebrações em Oeiras e Lisboa."
                  }
                />

                <ul className="mt-6 space-y-2.5">
                  {orderHighlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2.5 font-inter text-xs text-white/90">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C8A050]" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {c.order_banner && (
                  <div className="mt-6 inline-block rounded-xl border border-[#C8A050]/30 bg-[#C8A050]/10 px-4 py-2 font-inter text-xs font-semibold text-[#C8A050]">
                    {c.order_banner}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
                <a
                  href="https://wa.me/351924033353?text=Olá!%20Gostaria%20de%20fazer%20uma%20encomenda%20na%20Pastelaria%20Lutèce%20em%20Oeiras."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#C8A050] px-8 py-4 font-inter text-xs font-bold uppercase tracking-wider text-[#23160C] shadow-lg shadow-[#C8A050]/30 transition-all duration-300 hover:scale-105 hover:bg-[#d8b05e] active:scale-95 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" /> Encomendar por WhatsApp
                </a>

                <Link
                  to="/contacto"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 font-inter text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#23160C] sm:w-auto"
                >
                  Pedir Orçamento Smart Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIT & STORE LOCATION ───────────────────────────────────────── */}
      <section id="loja" className="scroll-mt-20 grid md:grid-cols-2">
        <div className="bg-[#C8A050] px-6 py-16 text-[#23160C] md:px-14 md:py-24">
          <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.28em]">
            {c.visit_label ?? "Visite-nos"}
          </span>
          <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight md:text-5xl">
            {visitTitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0" />
              <p className="whitespace-pre-line font-inter text-sm leading-relaxed font-medium">
                {c.visit_address ?? "Av. Dr. Francisco de Sá Carneiro 9B\n2780-185 Oeiras"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 shrink-0" />
              <p className="font-inter text-sm font-medium">
                {c.visit_hours ?? "Todos os dias · 07:00–20:00"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0" />
              <a
                href={`tel:+351${phone.replace(/\s/g, "")}`}
                className="font-inter text-sm font-bold hover:underline"
              >
                {phone}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={
                c.visit_maps_url ??
                "https://maps.google.com/?q=Pastelaria+Lutece+Fabrico+Artesanal,+Oeiras"
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#23160C] px-8 py-4 font-inter text-xs font-bold uppercase tracking-[0.16em] text-[#C8A050] shadow-md transition-all hover:scale-105 active:scale-95"
            >
              {c.visit_maps_label ?? "Como chegar no Maps"} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative min-h-[380px] bg-[#23160C]">
          <img
            src={
              c.visit_image ??
              "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1400"
            }
            alt="Interior pastelaria Lutèce"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#23160C]/35" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-[#FAF6F0]/95 p-6 shadow-xl backdrop-blur-md md:left-10 md:right-auto md:max-w-sm">
            <p className="font-cormorant text-2xl italic leading-snug text-[#23160C]">
              {c.visit_note ?? "Consumo no local · Take-away · Entregas"}
            </p>
            <p className="mt-1 font-inter text-xs text-[#6a5a48]">
              Pão quente a qualquer hora do dia na Av. Sá Carneiro
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL BRANDED FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t-[5px] border-[#C8A050] bg-[#1a1007] px-5 py-16 text-white">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Brand Intro */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A050]/20 text-[#C8A050]">
                  <Wheat className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-playfair text-2xl font-bold text-white">
                    {c.footer_title ?? "Pastelaria Lutèce"}
                  </p>
                  <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-[#C8A050]">
                    {c.footer_tagline ?? "Fabrico Artesanal · Uma marca DLM Group"}
                  </p>
                </div>
              </div>

              <RichTextContent
                className="mt-5 max-w-md font-inter text-sm font-light leading-relaxed text-white/70"
                content={
                  c.footer_description ??
                  "Pão fresco de fermentação natural e pastelaria fina de fabrico próprio em Oeiras. O encanto da tradição europeia com o atendimento de bairro."
                }
              />
            </div>

            {/* Brands Links */}
            <div className="lg:col-span-2">
              <p className="font-cormorant text-lg font-bold uppercase tracking-[0.16em] text-[#C8A050]">
                Marcas DLM
              </p>
              <ul className="mt-4 space-y-2.5 font-inter text-xs font-light text-white/75">
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
                  <Link to="/arcadas" className="transition hover:text-white hover:underline">
                    Café Arcadas
                  </Link>
                </li>
                <li>
                  <Link to="/lutece" className="font-semibold text-[#C8A050]">
                    Pastelaria Lutèce
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <p className="font-cormorant text-lg font-bold uppercase tracking-[0.16em] text-[#C8A050]">
                Explorar
              </p>
              <ul className="mt-4 space-y-2.5 font-inter text-xs font-light text-white/75">
                <li>
                  <a href="#menu" className="transition hover:text-white hover:underline">
                    Menu do Forno
                  </a>
                </li>
                <li>
                  <a href="#oficio" className="transition hover:text-white hover:underline">
                    O Nosso Ofício
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="transition hover:text-white hover:underline">
                    Galeria Vitrine
                  </a>
                </li>
                <li>
                  <a href="#loja" className="transition hover:text-white hover:underline">
                    Loja em Oeiras
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
              <p className="font-cormorant text-lg font-bold uppercase tracking-[0.16em] text-[#C8A050]">
                Contacto
              </p>
              <ul className="mt-4 space-y-3 font-inter text-xs font-light text-white/75">
                {footerContact.map((item, idx) => (
                  <li key={`${item.type}-${idx}`} className="flex items-start gap-2.5">
                    {item.type === "location" && <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A050]" />}
                    {item.type === "phone" && <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A050]" />}
                    {item.type === "whatsapp" && <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A050]" />}
                    {item.type === "email" && <span className="text-[#C8A050]">@</span>}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
            <p>{c.footer_copyright ?? "© 2026 Pastelaria Lutèce · Uma marca do grupo DLM"}</p>
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
        href="https://wa.me/351924033353?text=Olá!%20Gostaria%20de%20saber%20mais%20ou%20fazer%20uma%20encomenda%20na%20Pastelaria%20Lutèce."
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
