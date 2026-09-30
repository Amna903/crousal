import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  deleteImageFromCloudinaryUrl,
  isManagedCloudinaryUrl,
} from "./cloudinary";

type ContentRow = {
  page: string;
  key: string;
  value: string;
  updated_at?: string;
};

let seedPromise: Promise<void> | null = null;
let supabaseClient: SupabaseClient | null = null;

function getSupabaseAdminClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY) must be set to use the CMS content store"
    );
  }

  supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseClient;
}

const deliciasStoresSeed = [
  {
    name: "Patriota",
    address: "Rua Comandante Ifeka, 27 - Luanda",
    hours: "7:00 - 20:00 (seg-sab) • 8:00-13:00 (dom)",
    detail: "+244 222 123 456",
    tags: "ambiente acolhedor • take-away",
  },
  {
    name: "Aeroporto · Partidas",
    address: "Piso 1, loja 2 - Aeroporto Internacional",
    hours: "5:00 - 22:00 • todos os dias",
    detail: "grab-and-go • pre-encomendas",
    tags: "para viajantes • rapido",
  },
  {
    name: "Aeroporto · Chegadas",
    address: "Piso 0, loja 7 - Aeroporto Internacional",
    hours: "5:00 - 22:00 • todos os dias",
    detail: "cafe & pastelaria • para viagem",
    tags: "chegadas • snacks",
  },
];

const deliciasGalleryFiltersSeed = ["TODOS", "#PASTELARIA", "#BOLOS", "#SALGADOS", "#INTERIOR"];

const deliciasGalleryItemsSeed = [
  { title: "Croissants", category: "#Pastelaria", image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=1200&q=80" },
  { title: "Bolo de Aniversario", category: "#Bolos", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80", large: true },
  { title: "Cafe & Pasteis", category: "#Cafe", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80" },
  { title: "Pao Artesanal", category: "#Paes", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80" },
  { title: "Tortas Doces", category: "#Tortas", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1200&q=80" },
  { title: "Loja Patriota", category: "#Interior", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" },
  { title: "Doces Tipicos", category: "#Pastelaria", image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=1200&q=80" },
  { title: "Cupcakes", category: "#Bolos", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&q=80" },
];

const globalNavLinksSeed = [
  { label: "Inicio", href: "/" },
  { label: "Food Truck", href: "/food-truck" },
  { label: "Delicias", href: "/delicias" },
  { label: "Atelie", href: "/atelie" },
  { label: "Arcadas", href: "/arcadas" },
  { label: "Lutèce", href: "/lutece" },
  { label: "Contacto", href: "/contacto" },
];

const globalHomeTestimonialsSeed = [
  { quote: "As pastelarias da Madalena tem uma qualidade inigualavel.", author: "Ana Ferreira", role: "Cliente Fiel", brand: "Delicias da Madalena", brandColor: "#E97451", stars: 5, avatar: "AF" },
  { quote: "O Food Truck da DLM foi a escolha perfeita para o nosso evento.", author: "Carlos Mendes", role: "Diretor de Eventos", brand: "Food Truck", brandColor: "#FF8C00", stars: 5, avatar: "CM" },
  { quote: "O bolo do nosso casamento foi uma obra de arte.", author: "Sofia e Paulo", role: "Casal Feliz", brand: "Atelie de Doces", brandColor: "#967BB6", stars: 5, avatar: "SP" },
];

const globalHomeFooterSocialSeed = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "WhatsApp", href: "https://wa.me/244999999999" },
];

const globalHomeFooterBrandsLinksSeed = [
  { label: "Delicias da Madalena", href: "/delicias" },
  { label: "Food Truck", href: "/food-truck" },
  { label: "Atelie de Doces", href: "/atelie" },
  { label: "Cafe Arcadas do Jardim", href: "/arcadas" },
  { label: "Pastelaria Lutece", href: "/lutece" },
];

const globalHomeFooterCompanyLinksSeed = [
  { label: "Sobre nos", href: "/" },
  { label: "Contacto", href: "/contacto" },
  { label: "Carreiras", href: "/" },
  { label: "Privacidade", href: "/" },
];

const contactoBrandCardsSeed = [
  { icon: "🥐", name: "Delicias da Madalena", description: "Pastelaria tradicional · Patriota & Aeroporto", color: "text-[#E97451]" },
  { icon: "🚚", name: "Food Truck", description: "Eventos moveis · Festivais · Festas", color: "text-[#FF8C00]" },
  { icon: "🎂", name: "Atelie de Doces", description: "Alta confeitaria · Bolos de autor", color: "text-[#967BB6]" },
  { icon: "☕", name: "Cafe Arcadas do Jardim", description: "Pastelaria & cafe · Atouguia da Baleia", color: "text-[#294839]" },
  { icon: "🌾", name: "Pastelaria Lutece", description: "Fabrico artesanal · Oeiras", color: "text-[#0f1c2e]" },
];

const contactoEventCardsSeed = [
  { title: "Casamento", description: "Celebracao especial · Bolo de casamento", icon: "utensils" },
  { title: "Corporativo", description: "Eventos empresariais · Coffee breaks", icon: "calendar" },
  { title: "Festival", description: "Eventos ao ar livre · Grandes publicos", icon: "music" },
  { title: "Social", description: "Aniversarios · Festas privadas", icon: "send" },
];

const contactoFormFieldsSeed = [
  { label: "Nome completo *", placeholder: "Como prefere ser chamado" },
  { label: "Email *", placeholder: "seu@email.com" },
  { label: "WhatsApp *", placeholder: "+244 900 000 000" },
  { label: "Mensagem adicional (opcional)", placeholder: "Alguma preferencia especial?" },
];

const deliciasTestimonialsSeed = [
  {
    quote: '"O melhor pastel de nata de Luanda! Sempre que passo no aeroporto trago uma caixa para a familia. O atendimento e rapido e o cafe e excelente."',
    initials: "AM",
    name: "Ana Mendes",
    description: "cliente frequente • 12 avaliacoes",
  },
  {
    quote: '"Ambiente acolhedor no Patriota, parece uma padaria europeia. O atendimento e incrivel e os bolos sao sempre fresquinhos. Recomendo o pastel de Belem!"',
    initials: "JL",
    name: "Joao Lemos",
    description: "cliente desde 2020",
  },
  {
    quote: '"Encomendei um bolo para o aniversario da minha filha - perfeito, lindo e delicioso! Toda a familia adorou. A equipa e muito profissional e atenciosa."',
    initials: "CS",
    name: "Carla Santos",
    description: "cliente Atelie & Delicias",
  },
];

const foodtruckFeaturesSeed = [
  { title: "Horario Movel", body: "Qui-Sab: 17h-23h\nDom: 15h-21h\nSeg-Qua: eventos privados" },
  { title: "Disponibilidade", body: "Festas, casamentos, eventos corporativos.\nCapacidade para 50-500 pessoas." },
  { title: "Versatilidade", body: "Levamos a docaria DLM a qualquer lugar de Luanda.\nSetup em 30 minutos." },
];

const foodtruckGalleryFiltersSeed = ["Todos", "Festivais", "Casamentos", "Empresas", "Street Food"];

const foodtruckGalleryCardsSeed = [
  { tag: "Festivais", title: "Festival do Mangal 2025", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80", large: true },
  { tag: "Casamentos", title: "Ana e Joao", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80" },
  { tag: "Corporativo", title: "Unitel After Work", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80" },
  { tag: "Street Food", title: "Ilha do Cabo", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80" },
  { tag: "Festas", title: "Aniversario - Luanda Sul", image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1200&q=80" },
];

const foodtruckEventsSeed = [
  { day: "15", month: "MAR", title: "Festival da Cerveja", place: "Praia do Bispo" },
  { day: "22", month: "MAR", title: "Casamento - Sofia e Pedro", place: "Talatona (privado)" },
  { day: "28", month: "MAR", title: "Food Truck Fest", place: "Cidade Alta" },
];

const foodtruckMenuSeed = [
  ["Pastel de Nata", "350 Kz"],
  ["Bolo de Bolacha (fatia)", "400 Kz"],
  ["Mil-folhas", "450 Kz"],
  ["Brigadeiros (caixa 6)", "500 Kz"],
  ["Baguete Doce", "300 Kz"],
  ["Cafe + Pastel de Nata", "500 Kz"],
];

const foodtruckReservationHighlightsSeed = [
  "Capacidade: 50-500 pessoas",
  "Menu personalizavel com degustacao previa",
  "Equipa dedicada e atendimento premium",
  "Setup completo em 30 minutos",
];

const foodtruckTestimonialsSeed = [
  { initials: "MC", name: "Mariana Costa", meta: "Casamento - 180 convidados", quote: "O Food Truck DLM foi o sucesso do nosso casamento. Os doces sao incriveis e a equipa super profissional." },
  { initials: "PL", name: "Paulo Lopes", meta: "Unitel - 300 pessoas", quote: "Contratamos para o festival da empresa e foi um enorme sucesso. Atendimento rapido e sabor impecavel." },
  { initials: "AS", name: "Ana Santos", meta: "Eventos privados", quote: "Ja nos seguiram em 3 festas diferentes. O conceito e fantastico e o design do food truck e lindissimo." },
];

const atelieProcessSeed = [
  { number: "01", title: "Consulta", description: "Reunião para entender a visão, estilo e requisitos do seu evento ou celebração." },
  { number: "02", title: "Design", description: "Esboços e proposta artística com opções de sabores, cores e elementos decorativos." },
  { number: "03", title: "Execucao", description: "Produção artesanal com ingredientes premium e atenção a cada detalhe." },
  { number: "04", title: "Entrega", description: "Transporte especializado e montagem no local do evento com equipa dedicada." },
];

const ateliePortfolioSeed = [
  { category: "Casamentos", title: "Casamento Sofia e Pedro", subtitle: "Bolo de 5 andares · Flores naturais", image: "/atelie/unsplash_image_0.jpg", large: true },
  { category: "Corporativo", title: "Unitel · 20 anos", subtitle: "Bolo institucional com logo", image: "/atelie/unsplash_image_1.jpg" },
  { category: "Aniversarios", title: "50 anos · Dr. Antonio", subtitle: "Bolo de chocolate com gold leaf", image: "/atelie/unsplash_image_3.jpg" },
  { category: "Eventos", title: "Mesa de doces · Festa de gala", subtitle: "Buffet premium", image: "/atelie/unsplash_image_4.jpg" },
  { category: "Colecoes", title: "Colecao Ouro", subtitle: "Edicao limitada", image: "/atelie/unsplash_image_5.jpg" },
  { category: "Casamentos", title: "Cupcakes de casamento", subtitle: "120 unidades personalizadas", image: "/atelie/unsplash_image_6.jpg" },
  { category: "Eventos", title: "Mesa de doces · Festa de gala", subtitle: "Buffet premium", image: "/atelie/unsplash_image_7.jpg" },
];

const atelieStatsSeed = [
  { value: "250+", label: "Casamentos" },
  { value: "500+", label: "Eventos" },
  { value: "15", label: "Anos de experiencia" },
  { value: "100%", label: "Artesanal" },
];

const atelieCollectionsSeed = [
  { line: "Colecao Premium", title: "Ouro", desc: "Folha de ouro comestivel, frutos secos e chocolate belga", image: "/atelie/unsplash_image_5.jpg" },
  { line: "Colecao Primavera", title: "Flores", desc: "Flores comestiveis, sabores leves e frescos", image: "/atelie/unsplash_image_6.jpg" },
  { line: "Colecao Outono", title: "Vintage", desc: "Sabores tradicionais portugueses com apresentacao contemporanea", image: "/atelie/unsplash_image_7.jpg" },
];

const atelieTestimonialsSeed = [
  { initials: "MC", name: "Mariana Costa", role: "Casamento - 250 convidados", quote: "O bolo do nosso casamento foi uma verdadeira obra de arte. Ficou exatamente como imaginamos e o sabor foi surpreendente." },
  { initials: "PL", name: "Paulo Lopes", role: "Unitel - Evento corporativo", quote: "Encomendamos para aniversario da empresa e foi um sucesso. Um bolo institucional sofisticado com o nosso logo em chocolate." },
  { initials: "AS", name: "Ana Santos", role: "Cliente frequente", quote: "Ja recomendamos varias vezes para casais especiais e nunca desilude. A atencao ao detalhe e a qualidade dos ingredientes e excepcional." },
];

const arcadasStatsSeed = [
  { value: "30+", label: "Anos no Largo" },
  { value: "100%", label: "Bolos Caseiros" },
  { value: "07h", label: "Forno Quente Diário" },
  { value: "4.9 ★", label: "Avaliação no Google" },
];

const arcadasFeaturesSeed = [
  { title: "Esplanada Virada para o Jardim", body: "Desfrute do sol e da brisa fresca com vista desimpedida para o jardim e para a histórica igreja do largo." },
  { title: "Bolos de Fabrico Caseiro", body: "Receitas de família com ovos frescos, citrinos do pomar e doçaria regional confecionada todos os dias." },
  { title: "Ponto de Encontro da Vila", body: "O café onde a comunidade de Atouguia da Baleia se reúne há décadas para conversar sem pressa." },
];

const arcadasMenuSeed = [
  { name: "Pastel de Nata das Arcadas", category: "Pastelaria Caseira", price: "1,30 €", description: "Massa folhada crocante com creme suave de nata e canela acabado de sair do forno.", tag: "Assinatura" },
  { name: "Queijada Tradicional de Peniche", category: "Pastelaria Caseira", price: "1,50 €", description: "Receita histórica com queijo fresco e raspas de limão da horta.", tag: "Receita Antiga" },
  { name: "Torta Húmida de Laranja", category: "Pastelaria Caseira", price: "2,20 €", description: "Fatia generosa e sumarenta com laranjas doces do pomar.", tag: "Favorito" },
  { name: "Bolo Caseiro de Cenoura & Noz", category: "Pastelaria Caseira", price: "2,00 €", description: "Massa fofa artesanal com nozes tostadas e cobertura suave.", tag: "Caseiro" },
  { name: "Torrada em Pão de Aldeia", category: "Pequeno-Almoço & Lanche", price: "1,80 €", description: "Duas fatias grossas de pão rústico tostadas com manteiga dos Açores.", tag: "Pequeno-Almoço" },
  { name: "Galão Direto em Copo de Vidro", category: "Pequeno-Almoço & Lanche", price: "1,40 €", description: "Café encorpado com leite fresco vaporizado e espuma cremosa.", tag: "Clássico" },
  { name: "Croissant Quente com Compota", category: "Pequeno-Almoço & Lanche", price: "1,90 €", description: "Croissant tostado servido com compota caseira de frutos da época.", tag: "Lanche" },
  { name: "Café de Lote Especial", category: "Cafetaria Especial", price: "0,90 €", description: "Lote de arábicas selecionadas com torra equilibrada e creme aveludado.", tag: "Cafetaria" },
  { name: "Chá Biológico de Ervas do Jardim", category: "Cafetaria Especial", price: "1,60 €", description: "Infusão natural servida em bule com menta fresca e camomila.", tag: "Biológico" },
  { name: "Empada Caseira de Galinha do Campo", category: "Salgados de Conforto", price: "1,80 €", description: "Massa tenra quebradiça recheada com galinha estufada e ervas aromáticas.", tag: "Salgado" },
  { name: "Pastel de Bacalhau Tradicional", category: "Salgados de Conforto", price: "1,60 €", description: "Feito com bacalhau desfiado, batata e salsa fresca.", tag: "Tradicional" },
  { name: "Tosta Mista em Pão Rústico", category: "Salgados de Conforto", price: "3,50 €", description: "Queijo derretido, fiambre selecionado e orégãos campestres.", tag: "Almoço Rápido" },
];

const arcadasGalleryFiltersSeed = ["Todos", "Esplanada", "Bolos & Forno", "Cafetaria", "O Largo"];

const arcadasGalleryItemsSeed = [
  { title: "Esplanada ao Sol", subtitle: "Vista sobre o jardim e a igreja", tag: "Esplanada", image: "https://images.pexels.com/photos/15157808/pexels-photo-15157808.jpeg?auto=compress&cs=tinysrgb&w=1200", large: true },
  { title: "Pastéis de Nata Quentes", subtitle: "Fornadas a cada manhã", tag: "Bolos & Forno", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80" },
  { title: "Café & Conversa", subtitle: "O ritual diário da vila", tag: "Cafetaria", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&q=80" },
  { title: "Bolos de Fabrico Próprio", subtitle: "Receitas guardadas com carinho", tag: "Bolos & Forno", image: "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=1000" },
  { title: "O Largo de Atouguia", subtitle: "Paz, sombra e árvores centenárias", tag: "O Largo", image: "https://images.pexels.com/photos/15157808/pexels-photo-15157808.jpeg?auto=compress&cs=tinysrgb&w=1000" },
  { title: "Lanche da Tarde", subtitle: "Torradas em pão caseiro", tag: "Cafetaria", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1000&q=80" },
];

const arcadasTestimonialsSeed = [
  { initials: "MS", name: "Manuel Silveira", meta: "Cliente habitual · Atouguia da Baleia", quote: "O melhor pastel de nata da região de Peniche. A esplanada em frente à igreja é o sítio mais relaxante para começar a manhã com um bom café e os jornais." },
  { initials: "TF", name: "Teresa Fernandes", meta: "Peniche", quote: "Bolos caseiros de verdade, feitos com ovos frescos e receitas tradicionais. A torta de laranja e as queijadas são de comer e chorar por mais!" },
  { initials: "DR", name: "Duarte & Rita", meta: "Visitantes de Lisboa", quote: "Paragem obrigatória sempre que vamos para o mar em Peniche ou Baleal. O atendimento é caloroso e o pão quente da manhã é insuperável." },
];

const arcadasOrderHighlightsSeed = [
  "Bolos de aniversário e celebrações familiares por encomenda",
  "Caixas de pastelaria variada prontas para take-away",
  "Salgados e empadas caseiras para eventos e festas",
  "Encomendas antecipadas por telefone ou WhatsApp",
];

const arcadasFooterContactSeed = [
  { type: "location", text: "Largo N. Sra. da Conceição 13, Atouguia da Baleia, Peniche" },
  { type: "phone", text: "+351 262 750 944" },
  { type: "whatsapp", text: "+351 924 033 353" },
  { type: "email", text: "arcadas@dlm.ao" },
];

const luteceStatsSeed = [
  { value: "24h", label: "Fermentação Lenta" },
  { value: "100%", label: "Manteiga Pura Francesa" },
  { value: "3x", label: "Fornadas Quentes Diárias" },
  { value: "4.9 ★", label: "Avaliação em Oeiras" },
];

const luteceCraftSeed = [
  { n: "01", t: "Massa-Mãe & Fermentação Lenta", d: "Pão de digestão leve com 24 horas de repouso natural, côdea estaladiça e miolo aerado com farinhas selecionadas." },
  { n: "02", t: "Pastelaria Fina & Viennoiserie", d: "Croissants e pain au chocolat com manteiga pura francesa, folhados lâmina a lâmina e tartes de fruta da época." },
  { n: "03", t: "Cafetaria de Especialidade", d: "Café moído na hora para um espresso aveludado, cappuccinos e lattes servidos na esplanada da avenida." },
  { n: "04", t: "Fornadas às 07h, 11h30 e 16h30", d: "Pão quente a fumegar três vezes ao dia para garantir frescura absoluta no café ou para levar para casa." },
];

const luteceMenuSeed = [
  { name: "Pão Rústico de Massa-Mãe (750g)", category: "Padaria Artesanal", price: "2,80 €", description: "Pão de trigo e centeio com fermentação de 24 horas, miolo elástico e côdea escura estaladiça.", tag: "Assinatura" },
  { name: "Baguete de Tradição Francesa", category: "Padaria Artesanal", price: "1,40 €", description: "Farinha T65 francesa, fermentação lenta e crosta dourada pontilhada de farinha.", tag: "Diário" },
  { name: "Pão de Centeio & Sementes", category: "Padaria Artesanal", price: "3,10 €", description: "Enriquecido com sementes de girassol, abóbora e sésamo tostadas.", tag: "Nutritivo" },
  { name: "Croissant Francês de Manteiga Pura", category: "Pastelaria Fina", price: "1,70 €", description: "Massa folhada artesanal com manteiga DOP de alta percentagem gorda, dourado e leve.", tag: "Especialidade" },
  { name: "Pastel de Nata Lutèce", category: "Pastelaria Fina", price: "1,35 €", description: "Folhado ultra estaladiço com creme rico de nata fresca e canela de Ceilão.", tag: "Clássico" },
  { name: "Pain au Chocolat de Paris", category: "Pastelaria Fina", price: "1,90 €", description: "Duas barras de chocolate belga 55% cacau envolvidas em massa folhada leve.", tag: "Favorito" },
  { name: "Tartelete de Frutos Silvestres", category: "Pastelaria Fina", price: "3,40 €", description: "Base sablée crocante, creme pasteleiro com baunilha de Bourbon e frutos frescos.", tag: "Doçaria Fina" },
  { name: "Tosta Lutèce em Pão de Massa-Mãe", category: "Pequeno-Almoço & Lanches", price: "4,90 €", description: "Queijo brie fundido, nozes, mel de flor de laranjeira e rúcula fresca.", tag: "Gourmet" },
  { name: "Croissant Misto Quente Prensado", category: "Pequeno-Almoço & Lanches", price: "2,90 €", description: "Com queijo emmental e fiambre da perna prensado na hora.", tag: "Conforto" },
  { name: "Espresso de Lote Superior", category: "Cafetaria & Bebidas", price: "0,95 €", description: "Blend arábica com notas de avelã tostada e cacau.", tag: "Cafetaria" },
  { name: "Cappuccino Lutèce com Canela", category: "Cafetaria & Bebidas", price: "2,20 €", description: "Creme aveludado de leite vaporizado polvilhado com cacau puro.", tag: "Barista" },
  { name: "Sumo Natural de Laranja do Algarve", category: "Cafetaria & Bebidas", price: "2,60 €", description: "Espremido na hora, doce e rico em vitamina C.", tag: "Fresco" },
];

const luteceGalleryFiltersSeed = ["Todos", "Pão & Forno", "Pastelaria Fina", "Avenida & Esplanada"];

const luteceGalleryItemsSeed = [
  { title: "Pão de Fermentação Lenta", subtitle: "Massa-mãe viva e crosta crocante", tag: "Pão & Forno", image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1200", large: true },
  { title: "Croissants de Manteiga Pura", subtitle: "Folhados artesanais todos os dias", tag: "Pastelaria Fina", image: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1000" },
  { title: "Café da Manhã na Avenida", subtitle: "A esplanada acolhedora de Oeiras", tag: "Avenida & Esplanada", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80" },
  { title: "Vitrine de Doçaria & Tartes", subtitle: "Alta pastelaria europeia", tag: "Pastelaria Fina", image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1000" },
  { title: "Fornada da Manhã", subtitle: "Baguetes acabadas de sair", tag: "Pão & Forno", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80" },
  { title: "Pain au Chocolat & Viennoiserie", subtitle: "Com chocolate belga de alta pureza", tag: "Pastelaria Fina", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&q=80" },
];

const luteceTestimonialsSeed = [
  { initials: "MB", name: "Mariana Bernardes", meta: "Cliente diária · Oeiras", quote: "O melhor pão de fermentação lenta da linha de Cascais e Oeiras! A baguete e os croissants têm um nível de confeção que compete com as melhores boulangeries de Paris." },
  { initials: "GA", name: "Gonçalo Alpoim", meta: "Arquiteto · Escritório em Oeiras", quote: "O ritual da manhã na esplanada da Sá Carneiro é essencial. O pastel de nata é ultra estaladiço e o atendimento é sempre acolhedor e atencioso." },
  { initials: "PV", name: "Patrícia Vieira", meta: "Diretora de Recursos Humanos", quote: "Encomendámos várias caixas de viennoiserie sortida e mini-salgados para um pequeno-almoço corporativo da empresa e foi um sucesso total. Todos adoraram." },
];

const luteceOrderHighlightsSeed = [
  "Caixas de viennoiserie e folhados para coffee breaks executivos em Oeiras",
  "Pães artesanais inteiros fatiados e encomendas com antecedência",
  "Tartes especiais e bolos para comemorações e aniversários",
  "Apoio dedicado por WhatsApp e orçamento ágil no Smart Quote",
];

const luteceFooterContactSeed = [
  { type: "location", text: "Av. Dr. Francisco de Sá Carneiro 9B, 2780-185 Oeiras" },
  { type: "phone", text: "+351 21 442 0793" },
  { type: "whatsapp", text: "+351 924 033 353" },
  { type: "email", text: "lutece@dlm.ao" },
];

const atelieQuoteHighlightsSeed = [
  "Consultoria especializada com a nossa equipa de cake designers",
  "Degustacao gratuita de sabores e recheios",
  "Entrega e montagem no local do evento",
  "Servico premium para casamentos e eventos corporativos",
];

const defaults: Array<[string, string, string]> = [
  // ── Home ───────────────────────────────────────────────────────────────────
  ["home", "hero_image",       "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80"],
  ["home", "hero_badge",       "Comércio e Prestação de Serviços"],
  ["home", "hero_heading",     "DLM"],
  ["home", "hero_subheading",  "The Power of Many"],
  ["home", "hero_description", "Cinco experiências distintas · Uma holding de excelência"],
  ["home", "hero_cta",         "Descobrir Marcas"],
  ["home", "brands_label", "As Nossas Marcas"],
  ["home", "brands_heading", "Cinco almas, um só grupo"],
  ["home", "brand_delicias_name", "Delícias da Madalena"],
  ["home", "brand_delicias_tagline", "\"Tradition meets the future\""],
  ["home", "brand_delicias_description", "Pastelaria tradicional com três localizações: Patriota e duas lojas no Aeroporto. O sabor acolhedor de Luanda com conveniência grab-and-go."],
  ["home", "brand_delicias_button", "Visit Brand"],
  ["home", "brand_delicias_image", "https://api.builder.io/api/v1/image/assets/TEMP/7912d49f071a55f3e5f2293b26d3d6f990e3d2b0?width=848"],
  ["home", "brand_foodtruck_name", "Food Truck"],
  ["home", "brand_foodtruck_tagline", "\"Sweetness on Wheels\""],
  ["home", "brand_foodtruck_description", "Eventos, festivais e celebrações. Leve a experiência DLM para qualquer lugar em Luanda com versatilidade e sabor."],
  ["home", "brand_foodtruck_button", "Visit Brand"],
  ["home", "brand_foodtruck_image", "https://api.builder.io/api/v1/image/assets/TEMP/ef66fdaa704c28fe88170a673dda309a0d2ffda3?width=848"],
  ["home", "brand_atelie_name", "Ateliê de Doces"],
  ["home", "brand_atelie_tagline", "\"Where Art Becomes Cake\""],
  ["home", "brand_atelie_description", "Alta confeitaria para casamentos e eventos corporativos. Bolos de autor que transformam momentos em arte."],
  ["home", "brand_atelie_button", "Visit Brand"],
  ["home", "brand_atelie_image", "https://api.builder.io/api/v1/image/assets/TEMP/247c2c6a4c24fa7f4c41c62420514cc80eaba319?width=848"],
  ["home", "brand_arcadas_name", "Café Arcadas do Jardim"],
  ["home", "brand_arcadas_tagline", "\"Uma pausa com sabor a casa\""],
  ["home", "brand_arcadas_description", "Pastelaria e café em Atouguia da Baleia, Peniche — bolos caseiros e esplanada virada para o jardim."],
  ["home", "brand_arcadas_button", "Conhecer"],
  ["home", "brand_arcadas_image", "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=1000"],
  ["home", "brand_lutece_name", "Pastelaria Lutèce"],
  ["home", "brand_lutece_tagline", "\"Fabrico Artesanal\""],
  ["home", "brand_lutece_description", "Pão fresco e pastelaria de fabrico próprio em Oeiras. O ritual diário do café, da manhã ao fim da tarde."],
  ["home", "brand_lutece_button", "Conhecer"],
  ["home", "brand_lutece_image", "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1000"],
  ["home", "values_label", "A DLM"],
  ["home", "values_heading", "Excelência em cada detalhe"],
  ["home", "value_1_title", "Qualidade Artesanal"],
  ["home", "value_1_description", "Ingredientes selecionados e processos tradicionais que garantem o sabor autêntico em cada produto."],
  ["home", "value_2_title", "Tradição Centenária"],
  ["home", "value_2_description", "Décadas de experiência na arte da pastelaria, confeitaria e panificação portuguesa."],
  ["home", "value_3_title", "Compromisso Local"],
  ["home", "value_3_description", "Produção sustentável e apoio aos produtores locais, respeitando o ambiente e a comunidade."],
  ["home", "contact_label", "Contacto"],
  ["home", "contact_heading", "Fale connosco"],
  ["home", "contact_description", "Para encomendas especiais, parcerias ou qualquer questão, estamos disponíveis."],
  ["home", "contact_phone", "+244 999 999 999"],
  ["home", "contact_email", "info@dlm.ao"],
  ["home", "contact_location", "Luanda, Angola"],

  // ── Global / Shared UI ───────────────────────────────────────────────────
  ["global", "nav_links_json", JSON.stringify(globalNavLinksSeed)],
  ["global", "nav_smart_quote_label", "Smart Quote"],
  ["global", "home_footer_description", "Uma holding dedicada a excelencia artesanal, unindo marcas na arte da pastelaria, confeitaria e eventos."],
  ["global", "home_footer_brands_json", JSON.stringify(["Delicias da Madalena", "Food Truck", "Atelie de Doces", "Cafe Arcadas do Jardim", "Pastelaria Lutece"])],
  ["global", "home_footer_company_json", JSON.stringify(["Sobre nos", "Contacto", "Carreiras", "Privacidade"])],
  ["global", "home_footer_social_json", JSON.stringify(globalHomeFooterSocialSeed)],
  ["global", "home_footer_brands_links_json", JSON.stringify(globalHomeFooterBrandsLinksSeed)],
  ["global", "home_footer_company_links_json", JSON.stringify(globalHomeFooterCompanyLinksSeed)],
  ["global", "home_footer_contact_json", JSON.stringify([
    { type: "location", text: "Patriota & Aeroporto, Luanda" },
    { type: "phone", text: "+244 999 999 999" },
    { type: "email", text: "info@dlm.ao" },
  ])],
  ["global", "home_footer_copyright", "© 2026 DLM Group. Todos os direitos reservados."],
  ["global", "home_footer_region", "Angola · Portugal"],
  ["global", "home_testimonials_heading", "O que dizem sobre nos"],
  ["global", "home_testimonials_label", "Testemunhos"],
  ["global", "home_testimonials_json", JSON.stringify(globalHomeTestimonialsSeed)],

  // ── Contacto / Smart Quote ───────────────────────────────────────────────
  ["contacto", "hero_title", "Smart Quote"],
  ["contacto", "hero_subtitle", "5 passos · O seu orcamento personalizado"],
  ["contacto", "step1_title", "Escolha a marca"],
  ["contacto", "step1_subtitle", "Selecione qual dos nossos servicos pretende"],
  ["contacto", "step2_title", "Tipo de evento"],
  ["contacto", "step2_subtitle", "Selecione a ocasiao para o seu pedido"],
  ["contacto", "step3_title", "Numero de convidados"],
  ["contacto", "step3_subtitle", "Indique a escala do seu evento"],
  ["contacto", "step4_title", "Data e horario"],
  ["contacto", "step4_subtitle", "Quando sera o seu evento?"],
  ["contacto", "step5_title", "Os seus dados"],
  ["contacto", "step5_subtitle", "Para finalizarmos o seu orcamento"],
  ["contacto", "brand_cards_json", JSON.stringify(contactoBrandCardsSeed)],
  ["contacto", "event_cards_json", JSON.stringify(contactoEventCardsSeed)],
  ["contacto", "step3_guest_suffix", "convidados"],
  ["contacto", "step3_scale_json", JSON.stringify(["10", "100", "200", "300", "400", "500+"])],
  ["contacto", "step3_presets_json", JSON.stringify(["50", "100", "200", "300"])],
  ["contacto", "step4_date_label", "Data do evento"],
  ["contacto", "step4_time_label", "Horario"],
  ["contacto", "step4_time_helper", "O horario pode ser ajustado posteriormente."],
  ["contacto", "step5_form_fields_json", JSON.stringify(contactoFormFieldsSeed)],
  ["contacto", "whatsapp_helper", "Numero principal para contacto em Angola"],
  ["contacto", "date_placeholder", "mm/dd/yyyy"],
  ["contacto", "time_placeholder", "07:00 PM"],
  ["contacto", "submit_label", "Solicitar orcamento"],
  ["contacto", "footer_text", "© 2026 DLM Group · Smart Quote · 5 passos para o seu orcamento personalizado"],

  // ── Ateliê ─────────────────────────────────────────────────────────────────
  ["atelie", "hero_image",       "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=2200&q=80"],
  ["atelie", "hero_badge_1",     "DLM Group"],
  ["atelie", "hero_badge_2",     "Alta confeitaria artistica"],
  ["atelie", "hero_heading",     "Atelie de Doces"],
  ["atelie", "hero_subheading",  "Where Art Becomes Cake"],
  ["atelie", "hero_description", "Luxury, Artistic, Premium - Bolos de autor para momentos inesqueciveis."],
  ["atelie", "process_label", "O nosso processo"],
  ["atelie", "process_title", "Da consulta à obra de arte"],
  ["atelie", "process_steps_json", JSON.stringify(atelieProcessSeed)],
  ["atelie", "portfolio_label", "Portfolio"],
  ["atelie", "portfolio_title", "Obras de arte comestiveis"],
  ["atelie", "portfolio_cards_json", JSON.stringify(ateliePortfolioSeed)],
  ["atelie", "stats_json", JSON.stringify(atelieStatsSeed)],
  ["atelie", "collections_label", "Colecoes Exclusivas"],
  ["atelie", "collections_title", "Edicoes limitadas"],
  ["atelie", "collections_json", JSON.stringify(atelieCollectionsSeed)],
  ["atelie", "testimonials_label", "Depoimentos"],
  ["atelie", "testimonials_title", "O que dizem os clientes"],
  ["atelie", "testimonials_json", JSON.stringify(atelieTestimonialsSeed)],
  ["atelie", "quote_label", "Pedido personalizado"],
  ["atelie", "quote_title", "Crie o bolo dos seus sonhos"],
  ["atelie", "quote_description", "Cada bolo e uma peca unica, criada especialmente para si. Conte-nos a sua visao e nos transformaremos em arte comestivel."],
  ["atelie", "quote_highlights_json", JSON.stringify(atelieQuoteHighlightsSeed)],
  ["atelie", "quote_banner", "Pedidos com antecedencia minima de 15 dias"],
  ["atelie", "footer_description", "Alta confeitaria artistica para momentos inesqueciveis. Bolos de autor que transformam celebracoes em obras de arte."],
  ["atelie", "footer_contact_json", JSON.stringify([
    { type: "phone", text: "+244 923 456 789" },
    { type: "whatsapp", text: "+244 923 456 789" },
    { type: "email", text: "atelie@dlm.ao" },
    { type: "location", text: "Luanda, Angola (por marcacao)" },
  ])],

  // ── Delícias ───────────────────────────────────────────────────────────────
  ["delicias", "hero_heading",     "Delicias da Madalena"],
  ["delicias", "hero_subheading",  "TRADICAO & FUTURO"],
  ["delicias", "hero_quote", "Tradition meets the future."],
  ["delicias", "hero_description", "Tres localizacoes: Patriota e duas lojas no Aeroporto Internacional. O sabor acolhedor de Luanda, agora com a conveniencia grab-and-go para viajantes e o ambiente aconchegante para os locais."],
  ["delicias", "hero_cta",         "VER MENU COMPLETO"],
  ["delicias", "hero_visual_image", "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1200&q=80"],
  ["delicias", "nav_brand_label", "DELICIAS"],
  ["delicias", "nav_links_json", JSON.stringify(globalNavLinksSeed)],
  ["delicias", "nav_smart_quote_label", "SMART QUOTE"],
  ["delicias", "stores_title", "Nossas lojas"],
  ["delicias", "stores_description", "Encontre a Delicias mais proxima - Patriota & Aeroporto (2 lojas)"],
  ["delicias", "stores_json", JSON.stringify(deliciasStoresSeed)],
  ["delicias", "gallery_title", "Galeria de sabores"],
  ["delicias", "gallery_filters_json", JSON.stringify(deliciasGalleryFiltersSeed)],
  ["delicias", "gallery_items_json", JSON.stringify(deliciasGalleryItemsSeed)],
  ["delicias", "testimonials_title", "O que dizem os nossos clientes"],
  ["delicias", "testimonials_json", JSON.stringify(deliciasTestimonialsSeed)],
  ["delicias", "footer_description", "Delicias da Madalena e uma marca do grupo DLM, com sabor tradicional e energia contemporanea para Luanda."],
  ["delicias", "footer_menu_links_json", JSON.stringify(["Menu completo", "Loja Patriota", "Aeroporto partidas", "Aeroporto chegadas", "Encomendas especiais"])],
  ["delicias", "footer_brand_links_json", JSON.stringify(["Food Truck · eventos", "Atelie de Doces · cakes", "DLM Group · corporate"])],
  ["delicias", "footer_menu_links_full_json", JSON.stringify([
    { label: "Menu completo", href: "/delicias" },
    { label: "Loja Patriota", href: "/delicias" },
    { label: "Aeroporto partidas", href: "/delicias" },
    { label: "Aeroporto chegadas", href: "/delicias" },
    { label: "Encomendas especiais", href: "/contacto" },
  ])],
  ["delicias", "footer_brand_links_full_json", JSON.stringify([
    { label: "Food Truck · eventos", href: "/food-truck" },
    { label: "Atelie de Doces · cakes", href: "/atelie" },
    { label: "DLM Group · corporate", href: "/" },
  ])],
  ["delicias", "footer_legal_links_json", JSON.stringify(["Politica de privacidade", "Termos de uso", "Cookies"])],
  ["delicias", "footer_legal_links_full_json", JSON.stringify([
    { label: "Politica de privacidade", href: "/" },
    { label: "Termos de uso", href: "/" },
    { label: "Cookies", href: "/" },
  ])],
  ["delicias", "footer_copyright", "© 2026 Delicias da Madalena · uma marca DLM Group"],
  ["delicias", "footer_contact_json", JSON.stringify([
    { type: "phone", text: "+244 999 999 999" },
    { type: "email", text: "delicias@dlm.ao" },
    { type: "whatsapp", text: "+244 923 456 789" },
    { type: "location", text: "Patriota & Aeroporto · Luanda, Angola" },
  ])],

  // ── Food Truck ─────────────────────────────────────────────────────────────
  ["foodtruck", "hero_image",       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2200&q=80"],
  ["foodtruck", "hero_badge_1",     "DLM Group"],
  ["foodtruck", "hero_badge_2",     "Docaria sobre rodas"],
  ["foodtruck", "hero_heading",     "Food Truck"],
  ["foodtruck", "hero_subheading",  "Sweetness on Wheels"],
  ["foodtruck", "hero_description", "Energetic, Fast, Social - A docaria DLM vai aonde voce estiver."],
  ["foodtruck", "location_label", "Localizacao em tempo real"],
  ["foodtruck", "location_title", "Praca da Independencia, Luanda"],
  ["foodtruck", "location_description", "Hoje ate as 22:00 - Amanha: Parque da Cidade (15h-23h)"],
  ["foodtruck", "location_button", "Como chegar"],
  ["foodtruck", "features_json", JSON.stringify(foodtruckFeaturesSeed)],
  ["foodtruck", "gallery_label", "Galeria"],
  ["foodtruck", "gallery_title", "Momentos sobre rodas"],
  ["foodtruck", "gallery_filters_json", JSON.stringify(foodtruckGalleryFiltersSeed)],
  ["foodtruck", "gallery_cards_json", JSON.stringify(foodtruckGalleryCardsSeed)],
  ["foodtruck", "events_label", "Agenda"],
  ["foodtruck", "events_title", "Proximos Eventos"],
  ["foodtruck", "events_json", JSON.stringify(foodtruckEventsSeed)],
  ["foodtruck", "reservation_label", "Reservas"],
  ["foodtruck", "reservation_title", "Leve o Food Truck ao seu evento"],
  ["foodtruck", "reservation_description", "Transforme o seu evento numa experiência inesquecível com a doçaria DLM sobre rodas. Atendemos casamentos, empresas, festivais e festas privadas."],
  ["foodtruck", "reservation_highlights_json", JSON.stringify(foodtruckReservationHighlightsSeed)],
  ["foodtruck", "reservation_banner", "Próximas datas disponíveis: 5, 6, 12, 13 Abril"],
  ["foodtruck", "testimonials_label", "Depoimentos"],
  ["foodtruck", "testimonials_title", "O que dizem os clientes"],
  ["foodtruck", "testimonials_json", JSON.stringify(foodtruckTestimonialsSeed)],
  ["foodtruck", "menu_label", "Menu sobre rodas"],
  ["foodtruck", "menu_title", "Doces que encantam"],
  ["foodtruck", "menu_items_json", JSON.stringify(foodtruckMenuSeed)],
  ["foodtruck", "footer_description", "Docaria artesanal sobre rodas. Levamos a tradicao portuguesa a todos os eventos em Luanda com energia, velocidade e sabor."],
  ["foodtruck", "footer_copyright", "© 2026 Food Truck DLM - Uma marca do grupo DLM"],
  ["foodtruck", "footer_contact_json", JSON.stringify([
    { type: "phone", text: "+244 923 456 789" },
    { type: "whatsapp", text: "+244 923 456 789" },
    { type: "email", text: "foodtruck@dlm.ao" },
    { type: "location", text: "Luanda, Angola (movel)" },
  ])],
  ["atelie", "footer_copyright", "© 2026 Atelie de Doces - Uma marca do grupo DLM"],

  // ── Arcadas ──────────────────────────────────────────────────────────────
  ["arcadas", "nav_brand_label", "ARCADAS"],
  ["arcadas", "nav_brand_suffix", "do Jardim"],
  ["arcadas", "hero_badge_1", "Tradição & Esplanada"],
  ["arcadas", "hero_badge_2", "Atouguia da Baleia · Peniche"],
  ["arcadas", "hero_eyebrow", "Atouguia da Baleia · Peniche"],
  ["arcadas", "hero_heading", "Café Arcadas"],
  ["arcadas", "hero_subheading", "do Jardim"],
  ["arcadas", "hero_quote", "Uma pausa com sabor a casa."],
  ["arcadas", "hero_description", "Pastelaria, café e bolos caseiros no largo histórico — esplanada virada para o jardim e a igreja. O refúgio acolhedor onde a doçaria tradicional encontra a brisa fresca da costa."],
  ["arcadas", "hero_cta_primary", "Ver Menu da Casa"],
  ["arcadas", "hero_cta_secondary", "Visitar Esplanada"],
  ["arcadas", "hero_visual_image", "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["arcadas", "hero_card_quote", "Sente-se. Está em casa."],
  ["arcadas", "stats_json", JSON.stringify(arcadasStatsSeed)],
  ["arcadas", "story_label", "Tradição no Largo"],
  ["arcadas", "story_title", "Onde o tempo abranda e o café tem sabor a casa"],
  ["arcadas", "story_description", "No coração de Atouguia da Baleia, em frente ao jardim florido e à igreja matriz, o Café Arcadas do Jardim é o ponto de encontro de gerações. Entre o pão quente da manhã, os pastéis dourados e a conversa amena na esplanada, preservamos a hospitalidade mais genuína de Portugal."],
  ["arcadas", "features_json", JSON.stringify(arcadasFeaturesSeed)],
  ["arcadas", "menu_label", "Especialidades da Casa"],
  ["arcadas", "menu_title", "Doces do forno, fatias caseiras & café com história"],
  ["arcadas", "menu_cards_json", JSON.stringify(arcadasMenuSeed)],
  ["arcadas", "day_label", "Um dia nas Arcadas"],
  ["arcadas", "day_title", "Pequenos rituais, grandes pausas"],
  ["arcadas", "moments_json", JSON.stringify([
    { time: "07:00", title: "Pão quente", text: "O dia começa no forno com aroma a pão fresco e café acabado de moer.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80" },
    { time: "10:30", title: "Café na esplanada", text: "Frente ao jardim e à igreja — jornais do dia, sol suave e conversa boa.", image: "https://images.pexels.com/photos/15157808/pexels-photo-15157808.jpeg?auto=compress&cs=tinysrgb&w=900" },
    { time: "16:00", title: "Doce da tarde", text: "Uma pausa sem pressa com torta de laranja, chá de ervas e queijadas caseiras.", image: "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=900" },
  ])],
  ["arcadas", "quote_text", "“Mais do que um café — um ponto de encontro no largo.”"],
  ["arcadas", "quote_caption", "Atouguia da Baleia · Peniche"],
  ["arcadas", "gallery_label", "Galeria & Vida na Praça"],
  ["arcadas", "gallery_title", "Momentos partilhados à mesa"],
  ["arcadas", "gallery_filters_json", JSON.stringify(arcadasGalleryFiltersSeed)],
  ["arcadas", "gallery_items_json", JSON.stringify(arcadasGalleryItemsSeed)],
  ["arcadas", "testimonials_label", "Vozes da Casa"],
  ["arcadas", "testimonials_title", "Histórias à volta de uma chávena de café"],
  ["arcadas", "testimonials_json", JSON.stringify(arcadasTestimonialsSeed)],
  ["arcadas", "order_label", "Ocasiões Especiais"],
  ["arcadas", "order_title", "Encomende os Nossos Bolos Caseiros para a Sua Festa"],
  ["arcadas", "order_description", "Bolos de aniversário inteiros, caixas de pastelaria tradicional e empadas caseiras para celebrações de família ou encontros com amigos."],
  ["arcadas", "order_highlights_json", JSON.stringify(arcadasOrderHighlightsSeed)],
  ["arcadas", "order_banner", "Encomendas com 24h a 48h de antecedência · Take-Away disponível"],
  ["arcadas", "visit_label", "A nossa casa"],
  ["arcadas", "visit_title", "Venha conhecer"],
  ["arcadas", "visit_address_title", "Morada"],
  ["arcadas", "visit_address", "Largo Nossa Sra. da Conceição 13\n2525-057 Atouguia da Baleia"],
  ["arcadas", "visit_hours_title", "Horário"],
  ["arcadas", "visit_hours", "Todos os dias\n07:00 – 20:00"],
  ["arcadas", "visit_phone_title", "Telefone"],
  ["arcadas", "visit_phone_1", "262 750 944"],
  ["arcadas", "visit_phone_2", "924 033 353"],
  ["arcadas", "visit_maps_url", "https://maps.google.com/?q=Caf%C3%A9+Arcadas+do+Jardim,+Atouguia+da+Baleia"],
  ["arcadas", "visit_maps_label", "Ver no mapa"],
  ["arcadas", "visit_instagram", "@pastelariarcadasjardim"],
  ["arcadas", "visit_instagram_url", "https://instagram.com/pastelariarcadasjardim"],
  ["arcadas", "footer_title", "ARCADAS DO JARDIM"],
  ["arcadas", "footer_tagline", "Uma marca DLM Group"],
  ["arcadas", "footer_description", "Pastelaria e café em Atouguia da Baleia — o sabor de casa no coração de Peniche, onde a tradição e a esplanada florida acolhem quem chega."],
  ["arcadas", "footer_copyright", "© 2026 Café Arcadas do Jardim · Uma marca do grupo DLM"],
  ["arcadas", "footer_contact_json", JSON.stringify(arcadasFooterContactSeed)],

  // ── Lutèce ───────────────────────────────────────────────────────────────
  ["lutece", "nav_brand_label", "LUTÈCE"],
  ["lutece", "nav_brand_suffix", "Fabrico Artesanal"],
  ["lutece", "hero_badge_1", "Fabrico Próprio Artesanal"],
  ["lutece", "hero_badge_2", "Oeiras · Lisboa"],
  ["lutece", "hero_eyebrow", "Oeiras · Lisboa"],
  ["lutece", "hero_heading", "Pastelaria Lutèce"],
  ["lutece", "hero_subheading", "Fabrico Artesanal"],
  ["lutece", "hero_quote", "O perfume do pão acabado de cozer e o estaladiço da melhor pastelaria fina."],
  ["lutece", "hero_description", "Pão fresco de fermentação lenta, viennoiserie folhada a manteiga pura e pastelaria fina de fabrico próprio. O ritual diário de quem conhece Oeiras da primeira fornada da manhã ao café da tarde."],
  ["lutece", "hero_cta_primary", "Menu do Forno & Vitrine"],
  ["lutece", "hero_cta_secondary", "Visitar Loja em Oeiras"],
  ["lutece", "hero_image_1", "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1200"],
  ["lutece", "hero_image_2", "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=900"],
  ["lutece", "hero_image_3", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"],
  ["lutece", "stats_json", JSON.stringify(luteceStatsSeed)],
  ["lutece", "craft_label", "O ofício"],
  ["lutece", "craft_title", "Do forno para a mesa: a nobreza dos ingredientes e o tempo certo"],
  ["lutece", "craft_description", "Fabrico próprio todos os dias na Av. Sá Carneiro — métodos ancestrais de panificação, manteiga com denominação de origem e fornadas quentes cronometradas ao longo do dia."],
  ["lutece", "craft_items_json", JSON.stringify(luteceCraftSeed)],
  ["lutece", "menu_label", "Menu do Forno & Vitrine"],
  ["lutece", "menu_title", "Pães de massa-mãe, viennoiserie dourada & cafetaria fina"],
  ["lutece", "menu_cards_json", JSON.stringify(luteceMenuSeed)],
  ["lutece", "atmosphere_label", "Avenida Sá Carneiro"],
  ["lutece", "atmosphere_title", "A pausa perfeita no ritmo vibrante de Oeiras"],
  ["lutece", "atmosphere_description", "Entre o murmúrio da avenida e a tranquilidade da nossa esplanada, a Lutèce é o ponto de encontro de quem aprecia os prazeres simples mas perfeitos: uma baguete ainda quente no saco de papel, um croissant amanteigado a desfazer-se na mão e o melhor café."],
  ["lutece", "gallery_label", "Vitrine & Atmosfera"],
  ["lutece", "gallery_title", "Momentos acabados de sair do forno"],
  ["lutece", "gallery_filters_json", JSON.stringify(luteceGalleryFiltersSeed)],
  ["lutece", "gallery_items_json", JSON.stringify(luteceGalleryItemsSeed)],
  ["lutece", "showcase_title", "Na vitrine"],
  ["lutece", "showcase_quote", "Peça de olhos fechados."],
  ["lutece", "showcase_json", JSON.stringify(luteceGalleryItemsSeed.slice(0, 5))],
  ["lutece", "testimonials_label", "Depoimentos"],
  ["lutece", "testimonials_title", "O que dizem os apreciadores do bom pão"],
  ["lutece", "testimonials_json", JSON.stringify(luteceTestimonialsSeed)],
  ["lutece", "order_label", "Empresas & Ocasiões Especiais"],
  ["lutece", "order_title", "Encomendas para Coffee Breaks, Empresas e Ocasiões Especiais"],
  ["lutece", "order_description", "Caixas executivas de viennoiserie sortida, mini-folhados, tartes e pães rústicos fatiados para reuniões e celebrações em Oeiras e Lisboa."],
  ["lutece", "order_highlights_json", JSON.stringify(luteceOrderHighlightsSeed)],
  ["lutece", "order_banner", "Catering executivo e encomendas especiais com antecedência mínima de 24h"],
  ["lutece", "visit_label", "Visite-nos"],
  ["lutece", "visit_title", "Oeiras,\nà mesa."],
  ["lutece", "visit_address", "Av. Dr. Francisco de Sá Carneiro 9B\n2780-185 Oeiras"],
  ["lutece", "visit_hours", "Todos os dias · 07:00–20:00"],
  ["lutece", "visit_phone", "21 442 0793"],
  ["lutece", "visit_maps_url", "https://maps.google.com/?q=Pastelaria+Lutece+Fabrico+Artesanal,+Oeiras"],
  ["lutece", "visit_maps_label", "Como chegar"],
  ["lutece", "visit_note", "Consumo no local · Take-away · Entregas"],
  ["lutece", "visit_image", "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1400"],
  ["lutece", "footer_title", "Pastelaria Lutèce"],
  ["lutece", "footer_tagline", "Fabrico Artesanal · Uma marca DLM Group"],
  ["lutece", "footer_description", "Pão fresco de fermentação natural e pastelaria fina de fabrico próprio em Oeiras. O encanto da tradição europeia com o atendimento de bairro."],
  ["lutece", "footer_copyright", "© 2026 Pastelaria Lutèce · Uma marca do grupo DLM"],
  ["lutece", "footer_contact_json", JSON.stringify(luteceFooterContactSeed)],
];

async function insertMissingDefaults() {
  const supabase = getSupabaseAdminClient();
  const { data: existingRows, error: existingError } = await supabase
    .from("content")
    .select("page, key");

  if (existingError) {
    throw new Error(
      `Failed to read content rows from Supabase: ${existingError.message}`
    );
  }

  const existingKeys = new Set(
    (existingRows ?? []).map((row) => `${row.page}:${row.key}`)
  );
  const missingRows = defaults
    .filter(([page, key]) => !existingKeys.has(`${page}:${key}`))
    .map(([page, key, value]) => ({
      page,
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

  if (missingRows.length === 0) {
    return;
  }

  const { error: insertError } = await supabase
    .from("content")
    .insert(missingRows);

  if (insertError) {
    throw new Error(
      `Failed to seed default content in Supabase: ${insertError.message}`
    );
  }
}

export async function ensureContentSeeded() {
  if (!seedPromise) {
    seedPromise = insertMissingDefaults().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }

  await seedPromise;
}

export async function getPageContent(page: string) {
  await ensureContentSeeded();

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content")
    .select("key, value")
    .eq("page", page);

  if (error) {
    throw new Error(`Failed to load content for page ${page}: ${error.message}`);
  }

  const content: Record<string, string> = {};
  for (const row of data ?? []) {
    content[row.key] = row.value;
  }

  return content;
}

export async function getAllContent() {
  await ensureContentSeeded();

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("content")
    .select("page, key, value")
    .order("page")
    .order("key");

  if (error) {
    throw new Error(`Failed to load CMS content: ${error.message}`);
  }

  const result: Record<string, Record<string, string>> = {};
  for (const row of (data ?? []) as ContentRow[]) {
    if (!result[row.page]) {
      result[row.page] = {};
    }
    result[row.page][row.key] = row.value;
  }

  return result;
}

export async function upsertContent(rows: Array<{ page: string; key: string; value: string }>) {
  await ensureContentSeeded();

  const supabase = getSupabaseAdminClient();

  const { data: existingRows, error: existingError } = await supabase
    .from("content")
    .select("page, key, value");

  if (existingError) {
    throw new Error(
      `Failed to read existing content before save: ${existingError.message}`
    );
  }

  const existingMap = new Map<string, string>();
  for (const row of (existingRows ?? []) as ContentRow[]) {
    existingMap.set(`${row.page}:${row.key}`, row.value);
  }

  const replacedUrlCandidates = new Set<string>();
  for (const row of rows) {
    const oldValue = existingMap.get(`${row.page}:${row.key}`) ?? "";
    const oldUrls = extractManagedImageUrls(oldValue);
    const newUrls = extractManagedImageUrls(row.value);

    for (const oldUrl of oldUrls) {
      if (!newUrls.has(oldUrl)) {
        replacedUrlCandidates.add(oldUrl);
      }
    }
  }

  const payload = rows.map((row) => ({
    ...row,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("content")
    .upsert(payload, { onConflict: "page,key" });

  if (error) {
    throw new Error(`Failed to save CMS content: ${error.message}`);
  }

  if (replacedUrlCandidates.size === 0) {
    return;
  }

  const { data: allRowsAfterSave, error: afterSaveError } = await supabase
    .from("content")
    .select("value");

  if (afterSaveError) {
    throw new Error(
      `Saved content but failed to verify image references: ${afterSaveError.message}`
    );
  }

  const allValues = (allRowsAfterSave ?? []).map((row) => row.value);

  for (const url of replacedUrlCandidates) {
    const isStillReferenced = allValues.some((value) => value.includes(url));
    if (isStillReferenced) {
      continue;
    }

    try {
      await deleteImageFromCloudinaryUrl(url);
    } catch (cleanupError) {
      // Do not fail save operations if media cleanup fails.
      console.warn("Failed to delete replaced Cloudinary image", {
        url,
        error: cleanupError instanceof Error ? cleanupError.message : cleanupError,
      });
    }
  }
}

function extractManagedImageUrls(rawValue: string) {
  const urls = new Set<string>();
  const matches = rawValue.match(/https?:\/\/[^\s"'<>]+/g) ?? [];

  for (const match of matches) {
    const normalized = match.trim();
    if (isManagedCloudinaryUrl(normalized)) {
      urls.add(normalized);
    }
  }

  return urls;
}
