import { useState } from "react";
import { CalendarDays, Music2, Send, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import type { ContactQuoteRequest, ContactQuoteResponse } from "@shared/api";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/hooks/useContent";
import { parseContentJson } from "@/lib/content";

const EventCasamentoIcon = () => (
  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.9998 0C31.3279 0 39.9998 4.84375 39.9998 11.25V18.9844C39.9998 25.0781 31.0154 30 19.9998 30C8.90606 30 -0.00019455 25.0781 -0.00019455 18.9844V11.25C-0.00019455 4.84375 8.59356 0 19.9998 0ZM19.9998 5C11.6404 5 4.99981 7.8125 4.99981 11.25C4.99981 12.0312 5.23418 12.7344 5.78106 13.3594C9.29668 11.3281 14.2967 10 19.9998 10C25.6248 10 30.6248 11.3281 34.1404 13.3594C34.6873 12.7344 34.9998 12.0312 34.9998 11.25C34.9998 7.8125 28.2811 5 19.9998 5ZM9.37481 15.7031C12.1092 16.875 15.8592 17.5 19.9998 17.5C24.0623 17.5 27.8123 16.875 30.5467 15.7031C27.8123 14.5312 24.2186 13.75 19.9998 13.75C15.7029 13.75 12.1092 14.5312 9.37481 15.7031Z" fill="#C8A050"/>
  </svg>
);

const EventCorporativoIcon = () => (
  <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.0627 37.5C34.5314 37.5 35.0002 37.9688 35.0002 38.4375V40H0.000195503V38.4375C0.000195503 37.9688 0.390821 37.5 0.937696 37.5H2.5002V1.875C2.5002 0.859375 3.28145 0 4.3752 0H30.6252C31.6408 0 32.5002 0.859375 32.5002 1.875V37.5H34.0627ZM10.0002 5.9375V9.0625C10.0002 9.60938 10.3908 10 10.9377 10H14.0627C14.5314 10 15.0002 9.60938 15.0002 9.0625V5.9375C15.0002 5.46875 14.5314 5 14.0627 5H10.9377C10.3908 5 10.0002 5.46875 10.0002 5.9375ZM10.0002 13.4375V16.5625C10.0002 17.1094 10.3908 17.5 10.9377 17.5H14.0627C14.5314 17.5 15.0002 17.1094 15.0002 16.5625V13.4375C15.0002 12.9688 14.5314 12.5 14.0627 12.5H10.9377C10.3908 12.5 10.0002 12.9688 10.0002 13.4375ZM14.0627 25C14.5314 25 15.0002 24.6094 15.0002 24.0625V20.9375C15.0002 20.4688 14.5314 20 14.0627 20H10.9377C10.3908 20 10.0002 20.4688 10.0002 20.9375V24.0625C10.0002 24.6094 10.3908 25 10.9377 25H14.0627ZM20.0002 37.5V30.9375C20.0002 30.4688 19.5314 30 19.0627 30H15.9377C15.3908 30 15.0002 30.4688 15.0002 30.9375V37.5H20.0002ZM25.0002 24.0625V20.9375C25.0002 20.4688 24.5314 20 24.0627 20H20.9377C20.3908 20 20.0002 20.4688 20.0002 20.9375V24.0625C20.0002 24.6094 20.3908 25 20.9377 25H24.0627C24.5314 25 25.0002 24.6094 25.0002 24.0625ZM25.0002 16.5625V13.4375C25.0002 12.9688 24.5314 12.5 24.0627 12.5H20.9377C20.3908 12.5 20.0002 12.9688 20.0002 13.4375V16.5625C20.0002 17.1094 20.3908 17.5 20.9377 17.5H24.0627C24.5314 17.5 25.0002 17.1094 25.0002 16.5625ZM25.0002 9.0625V5.9375C25.0002 5.46875 24.5314 5 24.0627 5H20.9377C20.3908 5 20.0002 5.46875 20.0002 5.9375V9.0625C20.0002 9.60938 20.3908 10 20.9377 10H24.0627C24.5314 10 25.0002 9.60938 25.0002 9.0625Z" fill="#C8A050"/>
  </svg>
);

const EventFestivalIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.7186 0.078125C36.9529 0 37.1873 0 37.4998 0C38.8279 0 39.9217 1.09375 39.9998 2.42188V29.9219C39.9998 32.7344 36.6404 34.9219 32.4998 34.9219C28.3592 34.9219 24.9998 32.7344 24.9998 29.9219C24.9998 27.1875 28.3592 24.9219 32.4998 24.9219C33.3592 25 34.1404 25.0781 34.9998 25.2344V10.8594L14.9998 16.7188V34.9219C14.9998 37.7344 11.6404 39.9219 7.49981 39.9219C3.35918 39.9219 -0.00019455 37.7344 -0.00019455 34.9219C-0.00019455 32.1875 3.35918 29.9219 7.49981 29.9219C8.35918 30 9.14043 30.0781 9.99981 30.2344V9.84375C9.99981 8.75 10.7029 7.8125 11.7186 7.42188L36.7186 0.078125Z" fill="#C8A050"/>
  </svg>
);

const EventSocialIcon = () => (
  <svg width="51" height="41" viewBox="0 0 51 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50.0779 34.1406C50.2342 34.4531 50.0779 34.8438 49.7654 34.9219L37.0311 40.2344C36.7186 40.3906 36.4061 40.2344 36.2498 39.9219C35.5467 38.2812 36.3279 36.4844 37.8904 35.7812L39.6873 35.0781L36.5623 26.9531C36.2498 27.0312 35.8592 27.1094 35.5467 27.1094C31.4842 27.1094 27.8123 24.5312 26.7186 20.3906L25.1561 14.5312L23.5154 20.3906C22.4217 24.5312 18.7498 27.1094 14.6873 27.1094C14.3748 27.1094 13.9842 27.0312 13.6717 26.9531L10.5467 35.0781L12.3436 35.7812C13.9061 36.4844 14.6873 38.2812 13.9842 39.9219C13.8279 40.2344 13.5154 40.3906 13.2029 40.2344L0.468555 34.9219C0.156055 34.8438 -0.00019455 34.4531 0.156055 34.1406C0.85918 32.5781 2.65606 31.7969 4.21856 32.4219L5.93731 33.2031L8.98418 25.2344C5.23418 22.5 3.90606 17.3438 6.32793 13.2812L13.0467 1.48438C13.6717 0.46875 14.9998 0 16.1717 0.46875L25.1561 4.14062L34.0623 0.46875C35.2342 0 36.5623 0.46875 37.1873 1.48438L43.9061 13.2812C46.3279 17.3438 44.9998 22.5 41.2498 25.2344L44.2967 33.2031L46.0154 32.4219C47.5779 31.7969 49.4529 32.5781 50.0779 34.1406ZM21.6404 12.9688L23.1248 7.42188L15.7811 4.375L12.8904 9.29688L21.6404 12.9688ZM28.5936 12.9688L37.3436 9.29688L34.4529 4.375L27.1092 7.42188L28.5936 12.9688Z" fill="#C8A050"/>
  </svg>
);

const TimeInfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.9749 3.27826e-07C10.7999 3.27826e-07 13.9499 3.15 13.9499 6.975C13.9499 10.8281 10.7999 13.95 6.9749 13.95C3.12178 13.95 -9.76622e-05 10.8281 -9.76622e-05 6.975C-9.76622e-05 3.15 3.12178 3.27826e-07 6.9749 3.27826e-07ZM6.9749 3.09375C6.2999 3.09375 5.79365 3.62813 5.79365 4.275C5.79365 4.95 6.2999 5.45625 6.9749 5.45625C7.62178 5.45625 8.15615 4.95 8.15615 4.275C8.15615 3.62813 7.62178 3.09375 6.9749 3.09375ZM8.5499 10.2375V9.5625C8.5499 9.39375 8.38115 9.225 8.2124 9.225H7.8749V6.4125C7.8749 6.24375 7.70615 6.075 7.5374 6.075H5.7374C5.54053 6.075 5.3999 6.24375 5.3999 6.4125V7.0875C5.3999 7.28438 5.54053 7.425 5.7374 7.425H6.0749V9.225H5.7374C5.54053 9.225 5.3999 9.39375 5.3999 9.5625V10.2375C5.3999 10.4344 5.54053 10.575 5.7374 10.575H8.2124C8.38115 10.575 8.5499 10.4344 8.5499 10.2375Z" fill="#C8A050"/>
  </svg>
);

const WhatsAppContactIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.4375 2.68115C17.1437 4.3874 18.2 6.62178 18.2 9.05928C18.2 14.0155 14.0562 18.078 9.05937 18.078C7.55625 18.078 6.09375 17.6718 4.75312 16.9812L0 18.1999L1.25937 13.528C0.4875 12.1874 0.040625 10.6437 0.040625 9.01865C0.040625 4.0624 4.10312 -9.70364e-05 9.05937 -9.70364e-05C11.4969 -9.70364e-05 13.7719 0.974903 15.4375 2.68115ZM9.05937 16.5343C13.2031 16.5343 16.6562 13.1624 16.6562 9.05928C16.6562 7.02803 15.8031 5.15928 14.3812 3.7374C12.9594 2.31553 11.0906 1.54365 9.1 1.54365C4.95625 1.54365 1.58437 4.91553 1.58437 9.01865C1.58437 10.4405 1.99062 11.8218 2.72187 13.0405L2.925 13.3249L2.15312 16.0874L4.99687 15.3155L5.24062 15.478C6.41875 16.1687 7.71875 16.5343 9.05937 16.5343ZM13.2031 10.928C13.4062 11.0499 13.5687 11.0905 13.6094 11.2124C13.6906 11.2937 13.6906 11.7405 13.4875 12.2687C13.2844 12.7968 12.3906 13.2843 11.9844 13.3249C11.2531 13.4468 10.6844 13.4062 9.2625 12.7562C6.9875 11.7812 5.525 9.50615 5.40312 9.38428C5.28125 9.22178 4.50937 8.16553 4.50937 7.02803C4.50937 5.93115 5.07812 5.40303 5.28125 5.15928C5.48437 4.91553 5.72812 4.8749 5.89062 4.8749C6.0125 4.8749 6.175 4.8749 6.29687 4.8749C6.45937 4.8749 6.62187 4.83428 6.825 5.28115C6.9875 5.72803 7.475 6.8249 7.51562 6.94678C7.55625 7.06865 7.59687 7.19053 7.51562 7.35303C7.10937 8.20615 6.62187 8.16553 6.86562 8.57178C7.75937 10.0749 8.6125 10.603 9.95312 11.253C10.1562 11.3749 10.2781 11.3343 10.4406 11.2124C10.5625 11.0499 11.0094 10.5218 11.1312 10.3187C11.2937 10.0749 11.4562 10.1155 11.6594 10.1968C11.8625 10.278 12.9594 10.8062 13.2031 10.928Z" fill="#25D366"/>
  </svg>
);

const brandCards = [
  {
    icon: "🥐",
    name: "Delicias da Madalena",
    description: "Pastelaria tradicional · Patriota & Aeroporto",
    color: "text-[#E97451]",
  },
  {
    icon: "🚚",
    name: "Food Truck",
    description: "Eventos moveis · Festivais · Festas",
    color: "text-[#FF8C00]",
  },
  {
    icon: "🎂",
    name: "Atelie de Doces",
    description: "Alta confeitaria · Bolos de autor",
    color: "text-[#967BB6]",
  },
  {
    icon: "☕",
    name: "Cafe Arcadas do Jardim",
    description: "Pastelaria & cafe · Atouguia da Baleia",
    color: "text-[#294839]",
  },
  {
    icon: "🌾",
    name: "Pastelaria Lutece",
    description: "Fabrico artesanal · Oeiras",
    color: "text-[#0f1c2e]",
  },
];

const eventCards = [
  {
    title: "Casamento",
    description: "Celebracao especial · Bolo de casamento",
    icon: <UtensilsCrossed className="h-7 w-7 text-[#C8A050]" />,
  },
  {
    title: "Corporativo",
    description: "Eventos empresariais · Coffee breaks",
    icon: <CalendarDays className="h-7 w-7 text-[#C8A050]" />,
  },
  {
    title: "Festival",
    description: "Eventos ao ar livre · Grandes publicos",
    icon: <Music2 className="h-7 w-7 text-[#C8A050]" />,
  },
  {
    title: "Social",
    description: "Aniversarios · Festas privadas",
    icon: <Send className="h-7 w-7 text-[#C8A050]" />,
  },
];

const stageHeader = (step: number, title: string, subtitle: string) => (
  <div className="mb-6">
    <div className="flex items-center gap-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A050] font-inter text-base font-bold text-white">
        {step}
      </span>
      <h2 className="font-playfair text-[34px] font-bold leading-tight text-[#4D3522]">{title}</h2>
    </div>
    <p className="ml-14 mt-2 font-inter text-base font-light text-[#CBB89E]">{subtitle}</p>
  </div>
);

export default function Contacto() {
  const c = useContent("contacto");
  const brandItems = parseContentJson(c.brand_cards_json, brandCards);
  const eventItems = parseContentJson(c.event_cards_json, eventCards.map((event) => ({
    title: event.title,
    description: event.description,
    icon: event.title.toLowerCase() === "casamento" ? "casamento"
        : event.title.toLowerCase() === "corporativo" ? "corporativo"
        : event.title.toLowerCase() === "festival" ? "festival"
        : "social",
  })));
  const step3Scale = parseContentJson<string[]>(c.step3_scale_json, ["10", "100", "200", "300", "400", "500+"]);
  const step3Presets = parseContentJson<string[]>(c.step3_presets_json, ["50", "100", "200", "300"]);
  const formFields = parseContentJson<Array<{ label: string; placeholder: string }>>(c.step5_form_fields_json, [
    { label: "Nome completo *", placeholder: "Como prefere ser chamado" },
    { label: "Email *", placeholder: "seu@email.com" },
    { label: "WhatsApp *", placeholder: "+244 900 000 000" },
    { label: "Mensagem adicional (opcional)", placeholder: "Alguma preferencia especial?" },
  ]);
  const { toast } = useToast();
  const [selectedBrand, setSelectedBrand] = useState(brandItems[0]?.name ?? brandCards[0].name);
  const [selectedEvent, setSelectedEvent] = useState(eventItems[0]?.title ?? eventCards[0].title);
  const [guestCount, setGuestCount] = useState(150);
  const [eventDate, setEventDate] = useState("2026-04-15");
  const [eventTime, setEventTime] = useState("19:00");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState("");

  const getEventIcon = (key: string, title?: string) => {
    const normalized = (title ?? key).toLowerCase();

    if (normalized.includes("casamento")) return <EventCasamentoIcon />;
    if (normalized.includes("corporativo")) return <EventCorporativoIcon />;
    if (normalized.includes("festival")) return <EventFestivalIcon />;
    if (normalized.includes("social")) return <EventSocialIcon />;
    if (key === "utensils") return <UtensilsCrossed className="h-7 w-7 text-[#C8A050]" />;
    if (key === "calendar") return <CalendarDays className="h-7 w-7 text-[#C8A050]" />;
    if (key === "music") return <Music2 className="h-7 w-7 text-[#C8A050]" />;
    return <Send className="h-7 w-7 text-[#C8A050]" />;
  };

    const renderBrandIcon = (card: { icon: string }) => {
      return card.icon;
  };

    const getBrandAccentClass = (color: string) => {
      if (color === "text-[#E97451]") return "bg-[#E97451]";
      if (color === "text-[#FF8C00]") return "bg-[#FF8C00]";
      if (color === "text-[#967BB6]") return "bg-[#967BB6]";
      return "bg-[#C8A050]";
    };

    const progressStep = fullName.trim() && email.trim() && whatsapp.trim()
      ? 5
      : eventDate && eventTime
        ? 4
        : guestCount > 0
          ? 3
          : selectedEvent
            ? 2
            : 1;

    const progressWidthClass =
      progressStep >= 5 ? "w-full" :
      progressStep === 4 ? "w-3/4" :
      progressStep === 3 ? "w-2/4" :
      progressStep === 2 ? "w-1/4" :
      "w-0";

    const getProgressCircleClass = (step: number) =>
      step <= progressStep
        ? "border-[#C8A050] bg-[#C8A050] text-white shadow-[0_0_12px_0_#C8A050]"
        : "border-2 border-[#E0D6CC] bg-white text-[#4D3522]";

    const getFieldValue = (label: string) => {
      const normalized = label.toLowerCase();
      if (normalized.includes("nome")) return fullName;
      if (normalized.includes("email")) return email;
      if (normalized.includes("whatsapp")) return whatsapp;
      if (normalized.includes("mensagem")) return message;
      return "";
    };

    const setFieldValue = (label: string, value: string) => {
      const normalized = label.toLowerCase();
      if (normalized.includes("nome")) setFullName(value);
      else if (normalized.includes("email")) setEmail(value);
      else if (normalized.includes("whatsapp")) setWhatsapp(value);
      else if (normalized.includes("mensagem")) setMessage(value);
    };

    const handleSubmit = async () => {
      if (!selectedBrand || !selectedEvent || !eventDate || !eventTime || !fullName.trim() || !email.trim() || !whatsapp.trim()) {
        toast({
          title: "Campos incompletos",
          description: "Preencha os campos obrigatorios antes de enviar.",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        const payload: ContactQuoteRequest = {
          brand: selectedBrand,
          eventType: selectedEvent,
          guestCount,
          eventDate,
          eventTime,
          fullName: fullName.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          message: message.trim(),
        };

        const response = await fetch("/api/contact-quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: "Falha ao enviar pedido" }));
          throw new Error(error.message ?? "Falha ao enviar pedido");
        }

        const data = (await response.json()) as ContactQuoteResponse;
        setRequestId(data.requestId);
        toast({
          title: "Pedido enviado",
          description: `${data.message} · ${data.requestId}`,
        });
      } catch (error) {
        toast({
          title: "Falha ao enviar",
          description: error instanceof Error ? error.message : "Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#FAF5ED]">
      <header className="sticky top-0 z-50 border-b border-[#3E2A1A] bg-[#2C1C0F] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]">
        <div className="mx-auto flex h-[78px] w-full max-w-[1200px] items-center justify-between px-5">
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
          <Link
            to="/"
            className="rounded-full border-2 border-[#C8A050] px-6 py-2 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-[#C8A050]"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <section className="bg-[linear-gradient(100deg,#2C1C0F_0%,#4D3522_100%)] px-4 py-16 text-center text-white">
        <h1 className="font-playfair text-5xl font-extrabold tracking-[-1px] md:text-7xl">{c.hero_title ?? "Smart Quote"}</h1>
        <p className="mt-3 font-cormorant text-2xl font-light italic text-white/90">{c.hero_subtitle ?? "5 passos · O seu orcamento personalizado"}</p>
      </section>

      <main className="mx-auto mt-8 w-full max-w-[980px] px-4 pb-14 md:mt-10">
        <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)]">
          <div className="bg-[linear-gradient(90deg,#FFFFFF_0%,#F8F1E0_100%)] px-6 pb-4 pt-8 md:px-8">
            <div className="relative mb-5 h-[45px]">
              <div className="absolute left-0 right-0 top-5 h-[2px] bg-[#E0D6CC]" />
              <div className={`absolute left-0 top-5 h-[2px] bg-[#C8A050] shadow-[0_0_10px_0_#C8A050] ${progressWidthClass}`} />
              <div className="relative flex justify-between">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`inline-flex h-[45px] w-[45px] items-center justify-center rounded-full font-inter text-base font-bold transition-all ${getProgressCircleClass(n)}`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-[6px] rounded bg-[#E0D6CC]">
              <div className={`h-[6px] rounded bg-[#C8A050] shadow-[0_0_10px_0_#C8A050] ${progressWidthClass}`} />
            </div>
          </div>

          <div className="space-y-12 px-6 pb-10 pt-8 md:px-8">
            <section>
              {stageHeader(1, c.step1_title ?? "Escolha a marca", c.step1_subtitle ?? "Selecione qual dos nossos servicos pretende")}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {brandItems.map((card) => (
                    <button
                      key={card.name}
                      type="button"
                      onClick={() => setSelectedBrand(card.name)}
                      className={`relative overflow-hidden rounded-[32px] bg-[#F8F1E0] px-5 py-7 text-center transition-all ${selectedBrand === card.name ? "ring-2 ring-[#C8A050] shadow-[0_20px_40px_-18px_rgba(200,160,80,0.5)]" : "hover:shadow-[0_12px_30px_-18px_rgba(77,53,34,0.35)]"}`}
                    >
                      <span className={`absolute left-0 top-0 h-[5px] w-full ${getBrandAccentClass(card.color)}`} />
                      <div className="flex h-[92px] items-center justify-center">
                        <div className="flex min-h-[56px] items-center justify-center text-5xl">{renderBrandIcon(card)}</div>
                      </div>
                    <h3 className={`mt-2 font-playfair text-3xl font-bold leading-tight ${card.color}`}>{card.name}</h3>
                    <p className={`mt-2 font-inter text-sm font-light ${card.color}`}>{card.description}</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              {stageHeader(2, c.step2_title ?? "Tipo de evento", c.step2_subtitle ?? "Selecione a ocasiao para o seu pedido")}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {eventItems.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setSelectedEvent(item.title)}
                    className={`rounded-[32px] bg-[#F8F1E0] px-6 py-8 text-center transition-all ${selectedEvent === item.title ? "ring-2 ring-[#C8A050] shadow-[0_20px_40px_-18px_rgba(200,160,80,0.5)]" : "hover:shadow-[0_12px_30px_-18px_rgba(77,53,34,0.35)]"}`}
                  >
                    <div className="mx-auto flex w-fit items-center justify-center">{getEventIcon(item.icon, item.title)}</div>
                    <h3 className="mt-3 font-playfair text-[33px] font-bold text-[#4D3522]">{item.title}</h3>
                    <p className="mt-1 font-inter text-sm font-light text-[#4D3522]">{item.description}</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              {stageHeader(3, c.step3_title ?? "Numero de convidados", c.step3_subtitle ?? "Indique a escala do seu evento")}
              <div className="rounded-[32px] bg-[#F8F1E0] px-4 py-8 md:px-6">
                <p className="text-center font-playfair text-6xl font-extrabold text-[#C8A050]">{guestCount} <span className="text-lg font-normal">{c.step3_guest_suffix ?? "convidados"}</span></p>
                <input
                  type="range"
                  value={guestCount}
                  min={10}
                  max={500}
                  step={10}
                  onChange={(event) => setGuestCount(Number(event.target.value))}
                  aria-label="Numero de convidados"
                  title="Numero de convidados"
                  className="mt-5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-[14px] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#C8A050] [&::-moz-range-thumb]:shadow-[0_0_0_1px_rgba(255,255,255,0.85),0_0_20px_0_#C8A050] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-[4px] [&::-moz-range-track]:bg-[#E0D6CC] [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-[4px] [&::-webkit-slider-runnable-track]:bg-[#E0D6CC] [&::-webkit-slider-thumb]:mt-[-10px] [&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[14px] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#C8A050] [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(255,255,255,0.85),0_0_20px_0_#C8A050]"
                />
                <div className="mt-2 flex justify-between font-inter text-xs text-[#4D3522]">{step3Scale.map((value) => <span key={value}>{value}</span>)}</div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {step3Presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGuestCount(Number(preset))}
                      className={`rounded-full border-2 px-6 py-2 font-inter text-xs font-semibold transition-all ${guestCount === Number(preset) ? "border-[#C8A050] bg-[#C8A050] text-white shadow-[0_0_12px_0_#C8A050]" : "border-[#C8A050] bg-white text-[#C8A050]"}`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section>
              {stageHeader(4, c.step4_title ?? "Data e horario", c.step4_subtitle ?? "Quando sera o seu evento?")}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-[32px] bg-[#F8F1E0] p-6">
                  <p className="font-inter text-[11px] font-semibold uppercase tracking-[2px] text-[#C8A050]">{c.step4_date_label ?? "Data do evento"}</p>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(event) => setEventDate(event.target.value)}
                    aria-label="Data do evento"
                    title="Data do evento"
                    className="mt-3 w-full rounded-2xl border-2 border-[#E0D6CC] bg-white px-4 py-4 font-inter"
                  />
                  <div className="mt-4 rounded-2xl bg-white p-4">
                    <div className="grid grid-cols-7 text-center font-inter text-xs text-[#C8A050]">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, index) => <span key={`${d}-${index}`}>{d}</span>)}
                    </div>
                    <div className="mt-3 grid grid-cols-7 text-center font-inter text-sm text-[#4D3522]">
                      {[14, 15, 16, 17, 18, 19, 20].map((day) => (
                        <span key={day} className={day === 15 ? "mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#C8A050] text-white" : ""}>{day}</span>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-7 text-center font-inter text-sm text-[#4D3522]">
                      {[21, 22, 23, 24, 25, 26, 27].map((day) => <span key={day}>{day}</span>)}
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] bg-[#F8F1E0] p-6">
                  <p className="font-inter text-[11px] font-semibold uppercase tracking-[2px] text-[#C8A050]">{c.step4_time_label ?? "Horario"}</p>
                  <div className="mt-3 rounded-2xl border-2 border-[#E0D6CC] bg-white px-4 py-4 font-inter">
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(event) => setEventTime(event.target.value)}
                      aria-label="Horario do evento"
                      title="Horario do evento"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white px-4 py-4 font-inter text-sm text-[#4D3522]">
                    <TimeInfoIcon />{c.step4_time_helper ?? "O horario pode ser ajustado posteriormente."}
                  </div>
                </div>
              </div>
            </section>

            <section>
              {stageHeader(5, c.step5_title ?? "Os seus dados", c.step5_subtitle ?? "Para finalizarmos o seu orcamento")}
              <div className="rounded-[32px] bg-[#F8F1E0] p-6 md:p-8">
                <div className="space-y-4">
                  {formFields.map((field) => (
                    <div key={field.label}>
                      <label className="block pt-2 font-inter text-[11px] font-semibold uppercase tracking-[2px] text-[#C8A050]">{field.label}</label>
                      {field.label.toLowerCase().includes("whatsapp") ? <div className="mb-4 mt-3 flex items-center gap-2 rounded-2xl bg-[rgba(37,211,102,0.15)] px-4 py-4 font-inter text-sm text-[#4D3522]"><WhatsAppContactIcon />{c.whatsapp_helper ?? "Numero principal para contacto em Angola"}</div> : null}
                      {field.label.toLowerCase().includes("mensagem") ? (
                        <textarea
                          value={getFieldValue(field.label)}
                          onChange={(event) => setFieldValue(field.label, event.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[120px] w-full rounded-2xl border-2 border-[#E0D6CC] bg-white px-4 py-4 font-inter"
                        />
                      ) : (
                        <input
                          value={getFieldValue(field.label)}
                          onChange={(event) => setFieldValue(field.label, event.target.value)}
                          type={field.label.toLowerCase().includes("email") ? "email" : "text"}
                          placeholder={field.placeholder}
                          className="w-full rounded-2xl border-2 border-[#E0D6CC] bg-white px-4 py-4 font-inter"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="border-t-2 border-[#F8F1E0] pt-8 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex h-[54px] w-full max-w-[390px] items-center justify-center gap-3 rounded-[60px] bg-[#C8A050] font-inter text-[14px] font-bold uppercase tracking-[2.8px] text-[#2C1C0F] shadow-[0_10px_30px_-5px_#C8A050] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "A enviar..." : c.submit_label ?? "Solicitar orcamento"} <Send className="h-4 w-4" />
              </button>
              {requestId ? <p className="mt-4 text-sm font-medium text-[#4D3522]">Pedido registado com o codigo {requestId}</p> : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2C1C0F] px-4 py-10 text-center font-inter text-base font-light text-[#CBB89E]">
        {c.footer_text ?? "© 2026 DLM Group · Smart Quote · 5 passos para o seu orcamento personalizado"}
      </footer>
    </div>
  );
}
