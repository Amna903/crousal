import { Link } from "react-router-dom";
import { Coffee, Wheat } from "lucide-react";
import RichTextContent from "@/components/RichTextContent";
import { useContent } from "@/hooks/useContent";

const brands = [
  {
    nameKey: "brand_delicias_name",
    taglineKey: "brand_delicias_tagline",
    descriptionKey: "brand_delicias_description",
    imageKey: "brand_delicias_image",
    buttonKey: "brand_delicias_button",
    fallbackName: "Delícias da Madalena",
    fallbackTagline: '"Tradition meets the future"',
    fallbackDescription:
      "Pastelaria tradicional com três localizações: Patriota e duas lojas no Aeroporto. O sabor acolhedor de Luanda com conveniência grab-and-go.",
    fallbackImage: "https://api.builder.io/api/v1/image/assets/TEMP/7912d49f071a55f3e5f2293b26d3d6f990e3d2b0?width=848",
    fallbackButton: "Visit Brand",
    gradient: "from-[#E97451]/95 via-dlm-dark/60 to-dlm-dark/30",
    buttonFrom: "#E97451",
    buttonTo: "#D45E3E",
    buttonShadow: "rgba(233,116,81,0.5)",
    href: "/delicias",
    icon: (
      <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 30C32.7344 30 32.5 27.5 29.1406 27.5C25.7812 27.5 25.4688 30 23.2812 30C21.1719 30 20.8594 27.5 17.5 27.5C14.1406 27.5 13.75 30 11.6406 30C9.45312 30 9.21875 27.5 5.78125 27.5C2.42188 27.5 2.1875 30 0 30V23.75C0 21.7188 1.64062 20 3.75 20H5V8.75H10V20H15V8.75H20V20H25V8.75H30V20H31.25C33.2812 20 35 21.7188 35 23.75V30ZM35 40H0V32.5C3.35938 32.5 3.59375 30 5.78125 30C7.96875 30 8.28125 32.5 11.6406 32.5C15 32.5 15.3125 30 17.5 30C19.6875 30 19.9219 32.5 23.2812 32.5C26.7188 32.5 26.9531 30 29.1406 30C31.25 30 31.5625 32.5 35 32.5V40ZM7.5 7.5C6.09375 7.5 5 6.40625 5 5C5 2.57812 7.5 3.20312 7.5 0C8.4375 0 10 2.34375 10 4.375C10 6.48438 8.82812 7.5 7.5 7.5ZM17.5 7.5C16.0938 7.5 15 6.40625 15 5C15 2.57812 17.5 3.20312 17.5 0C18.4375 0 20 2.34375 20 4.375C20 6.48438 18.8281 7.5 17.5 7.5ZM27.5 7.5C26.0938 7.5 25 6.40625 25 5C25 2.57812 27.5 3.20312 27.5 0C28.4375 0 30 2.34375 30 4.375C30 6.48438 28.8281 7.5 27.5 7.5Z" fill="#CFA459"/>
      </svg>
    ),
  },
  {
    nameKey: "brand_foodtruck_name",
    taglineKey: "brand_foodtruck_tagline",
    descriptionKey: "brand_foodtruck_description",
    imageKey: "brand_foodtruck_image",
    buttonKey: "brand_foodtruck_button",
    fallbackName: "Food Truck",
    fallbackTagline: '"Sweetness on Wheels"',
    fallbackDescription:
      "Eventos, festivais e celebrações. Leve a experiência DLM para qualquer lugar em Luanda com versatilidade e sabor.",
    fallbackImage: "https://api.builder.io/api/v1/image/assets/TEMP/ef66fdaa704c28fe88170a673dda309a0d2ffda3?width=848",
    fallbackButton: "Visit Brand",
    gradient: "from-[#FF8C00]/95 via-dlm-dark/60 to-dlm-dark/30",
    buttonFrom: "#FF8C00",
    buttonTo: "#E07B00",
    buttonShadow: "rgba(255,140,0,0.5)",
    href: "/food-truck",
    icon: (
      <svg className="w-10 h-10 text-dlm-gold" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5S5.17 15.5 6 15.5s1.5.67 1.5 1.5S6.83 18.5 6 18.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
  },
  {
    nameKey: "brand_atelie_name",
    taglineKey: "brand_atelie_tagline",
    descriptionKey: "brand_atelie_description",
    imageKey: "brand_atelie_image",
    buttonKey: "brand_atelie_button",
    fallbackName: "Ateliê de Doces",
    fallbackTagline: '"Where Art Becomes Cake"',
    fallbackDescription:
      "Alta confeitaria para casamentos e eventos corporativos. Bolos de autor que transformam momentos em arte.",
    fallbackImage: "https://api.builder.io/api/v1/image/assets/TEMP/247c2c6a4c24fa7f4c41c62420514cc80eaba319?width=848",
    fallbackButton: "Visit Brand",
    gradient: "from-[#967BB6]/95 via-dlm-dark/60 to-dlm-dark/30",
    buttonFrom: "#967BB6",
    buttonTo: "#7D64A0",
    buttonShadow: "rgba(150,123,182,0.5)",
    href: "/atelie",
    icon: (
      <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.25 35C41.875 35 42.5 35.625 42.5 36.25V38.75C42.5 39.4531 41.875 40 41.25 40H8.75C8.04688 40 7.5 39.4531 7.5 38.75V36.25C7.5 35.625 8.04688 35 8.75 35H41.25ZM46.25 10C48.2812 10 50 11.7188 50 13.75C50 15.8594 48.2812 17.5 46.25 17.5C46.0156 17.5 45.7812 17.5 45.625 17.5L40 32.5H10L4.29688 17.5C4.14062 17.5 3.90625 17.5 3.75 17.5C1.64062 17.5 0 15.8594 0 13.75C0 11.7188 1.64062 10 3.75 10C5.78125 10 7.5 11.7188 7.5 13.75C7.5 14.375 7.34375 14.8438 7.10938 15.3125L12.8125 18.75C13.9844 19.4531 15.5469 19.0625 16.25 17.8125L22.5781 6.64062C21.7969 6.01562 21.25 4.92188 21.25 3.75C21.25 1.71875 22.8906 0 25 0C27.0312 0 28.75 1.71875 28.75 3.75C28.75 4.92188 28.2031 6.01562 27.3438 6.64062L33.6719 17.8125C34.375 19.0625 35.9375 19.4531 37.1875 18.75L42.8125 15.3125C42.5781 14.8438 42.5 14.375 42.5 13.75C42.5 11.7188 44.1406 10 46.25 10Z" fill="#CFA459"/>
      </svg>
    ),
  },
  {
    nameKey: "brand_arcadas_name",
    taglineKey: "brand_arcadas_tagline",
    descriptionKey: "brand_arcadas_description",
    imageKey: "brand_arcadas_image",
    buttonKey: "brand_arcadas_button",
    fallbackName: "Café Arcadas do Jardim",
    fallbackTagline: '"Uma pausa com sabor a casa"',
    fallbackDescription:
      "Pastelaria e café em Atouguia da Baleia, Peniche — bolos caseiros e esplanada virada para o jardim.",
    fallbackImage: "https://images.pexels.com/photos/12800606/pexels-photo-12800606.jpeg?auto=compress&cs=tinysrgb&w=1000",
    fallbackButton: "Conhecer",
    gradient: "from-[#5A8F6D]/95 via-dlm-dark/60 to-dlm-dark/30",
    buttonFrom: "#5A8F6D",
    buttonTo: "#457A58",
    buttonShadow: "rgba(90,143,109,0.5)",
    href: "/arcadas",
    icon: <Coffee className="text-[#C8A050]" />,
  },
  {
    nameKey: "brand_lutece_name",
    taglineKey: "brand_lutece_tagline",
    descriptionKey: "brand_lutece_description",
    imageKey: "brand_lutece_image",
    buttonKey: "brand_lutece_button",
    fallbackName: "Pastelaria Lutèce",
    fallbackTagline: '"Fabrico Artesanal"',
    fallbackDescription:
      "Pão fresco e pastelaria de fabrico próprio em Oeiras. O ritual diário do café, da manhã ao fim da tarde.",
    fallbackImage: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1000",
    fallbackButton: "Conhecer",
    gradient: "from-[#C8A050]/95 via-dlm-dark/60 to-dlm-dark/30",
    buttonFrom: "#C8A050",
    buttonTo: "#A88840",
    buttonShadow: "rgba(200,160,80,0.5)",
    href: "/lutece",
    icon: <Wheat className="text-[#C8A050]" />,
  },
];

export default function BrandsSection() {
  const content = useContent("home");

  return (
    <section id="marcas" className="w-full bg-dlm-cream py-24 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center mb-16">
          <span className="font-inter font-semibold text-[12px] tracking-[3.84px] uppercase text-dlm-gold mb-3">
            {content.brands_label ?? "As Nossas Marcas"}
          </span>
          <h2
            className="font-playfair font-semibold text-dlm-brown text-center mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-1px" }}
          >
            {content.brands_heading ?? "Cinco almas, um só grupo"}
          </h2>
          <div className="w-20 h-0.5 bg-dlm-gold" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {brands.map((brand) => (
            <div
              key={brand.nameKey}
              className="relative rounded-3xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(45,30,20,0.20)] group cursor-pointer"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={content[brand.imageKey] ?? brand.fallbackImage}
                alt={content[brand.nameKey] ?? brand.fallbackName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className={`absolute inset-0 bg-gradient-to-t ${brand.gradient}`} />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center [&>svg]:h-10 [&>svg]:w-10 [&>svg]:shrink-0">
                    {brand.icon}
                  </div>

                  <h3 className="font-playfair font-bold text-white text-3xl mb-2 leading-tight">
                    {content[brand.nameKey] ?? brand.fallbackName}
                  </h3>

                  <p className="font-cormorant italic font-bold text-white/80 text-base mb-3">
                    {content[brand.taglineKey] ?? brand.fallbackTagline}
                  </p>

                  <RichTextContent
                    className="mb-6 min-h-[84px] font-inter text-sm font-light leading-relaxed text-white/90"
                    content={content[brand.descriptionKey] ?? brand.fallbackDescription}
                  />

                  <Link
                    to={brand.href}
                    className="inline-flex items-center gap-3 rounded-full px-7 py-3 font-inter font-bold text-[14px] tracking-[1.7px] uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: `linear-gradient(103deg, ${brand.buttonFrom}, ${brand.buttonTo})`,
                      boxShadow: `0 10px 20px -8px ${brand.buttonShadow}`,
                    }}
                  >
                    {content[brand.buttonKey] ?? brand.fallbackButton} <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
