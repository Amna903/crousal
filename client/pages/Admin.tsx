import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDropzone } from "react-dropzone";
import {
  Bold,
  Eye,
  Image as ImageIcon,
  Italic,
  List,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Underline as UnderlineIcon,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PageContent = Record<string, string>;
type AllContent = Record<string, PageContent>;
type PageField = {
  key: string;
  label: string;
  richText?: boolean;
  image?: boolean;
  multiline?: boolean;
};

type JsonObjectField = {
  key: string;
  label: string;
  multiline?: boolean;
};

type JsonFieldSchema =
  | { type: "string-list"; itemLabel: string }
  | { type: "tuple-list"; itemLabels: [string, string] }
  | { type: "object-list"; itemLabel: string; fields: JsonObjectField[] };

type RepeaterMeta = {
  title: string;
  description: string;
};

const PAGES = [
  { id: "global", label: "Global", path: "/" },
  { id: "home", label: "Home", path: "/" },
  { id: "atelie", label: "Ateliê", path: "/atelie" },
  { id: "delicias", label: "Delícias", path: "/delicias" },
  { id: "foodtruck", label: "Food Truck", path: "/food-truck" },
  { id: "arcadas", label: "Arcadas", path: "/arcadas" },
  { id: "lutece", label: "Lutèce", path: "/lutece" },
  { id: "contacto", label: "Contacto", path: "/contacto" },
] as const;

type PageId = (typeof PAGES)[number]["id"];

const PAGE_FIELDS: Record<PageId, PageField[]> = {
  global: [
    { key: "nav_links_json", label: "Navigation Links", multiline: true },
    { key: "nav_smart_quote_label", label: "Navbar Smart Quote Label" },
    { key: "home_footer_description", label: "Home Footer Description", richText: true },
    { key: "home_footer_brands_json", label: "Home Footer Brands", multiline: true },
    { key: "home_footer_company_json", label: "Home Footer Company Links", multiline: true },
    { key: "home_footer_social_json", label: "Home Footer Social Links", multiline: true },
    { key: "home_footer_brands_links_json", label: "Home Footer Brand Link Objects", multiline: true },
    { key: "home_footer_company_links_json", label: "Home Footer Company Link Objects", multiline: true },
    { key: "home_footer_contact_json", label: "Home Footer Contact", multiline: true },
    { key: "home_footer_copyright", label: "Home Footer Copyright" },
    { key: "home_footer_region", label: "Home Footer Region" },
    { key: "home_testimonials_label", label: "Home Testimonials Label" },
    { key: "home_testimonials_heading", label: "Home Testimonials Heading" },
    { key: "home_testimonials_json", label: "Home Testimonials", multiline: true },
  ],
  home: [
    { key: "hero_badge", label: "Badge Text" },
    { key: "hero_heading", label: "Main Heading" },
    { key: "hero_subheading", label: "Subheading" },
    { key: "hero_description", label: "Description", richText: true },
    { key: "hero_cta", label: "CTA Button Text" },
    { key: "brands_label", label: "Brands Section Label" },
    { key: "brands_heading", label: "Brands Section Heading" },
    { key: "brand_delicias_name", label: "Delícias Card Title" },
    { key: "brand_delicias_tagline", label: "Delícias Card Tagline" },
    { key: "brand_delicias_description", label: "Delícias Card Description", richText: true },
    { key: "brand_delicias_button", label: "Delícias Button Text" },
    { key: "brand_delicias_image", label: "Delícias Card Image", image: true },
    { key: "brand_foodtruck_name", label: "Food Truck Card Title" },
    { key: "brand_foodtruck_tagline", label: "Food Truck Card Tagline" },
    { key: "brand_foodtruck_description", label: "Food Truck Card Description", richText: true },
    { key: "brand_foodtruck_button", label: "Food Truck Button Text" },
    { key: "brand_foodtruck_image", label: "Food Truck Card Image", image: true },
    { key: "brand_atelie_name", label: "Ateliê Card Title" },
    { key: "brand_atelie_tagline", label: "Ateliê Card Tagline" },
    { key: "brand_atelie_description", label: "Ateliê Card Description", richText: true },
    { key: "brand_atelie_button", label: "Ateliê Button Text" },
    { key: "brand_atelie_image", label: "Ateliê Card Image", image: true },
    { key: "brand_arcadas_name", label: "Arcadas Card Title" },
    { key: "brand_arcadas_tagline", label: "Arcadas Card Tagline" },
    { key: "brand_arcadas_description", label: "Arcadas Card Description", richText: true },
    { key: "brand_arcadas_button", label: "Arcadas Button Text" },
    { key: "brand_arcadas_image", label: "Arcadas Card Image", image: true },
    { key: "brand_lutece_name", label: "Lutèce Card Title" },
    { key: "brand_lutece_tagline", label: "Lutèce Card Tagline" },
    { key: "brand_lutece_description", label: "Lutèce Card Description", richText: true },
    { key: "brand_lutece_button", label: "Lutèce Button Text" },
    { key: "brand_lutece_image", label: "Lutèce Card Image", image: true },
    { key: "values_label", label: "Values Section Label" },
    { key: "values_heading", label: "Values Section Heading" },
    { key: "value_1_title", label: "Value 1 Title" },
    { key: "value_1_description", label: "Value 1 Description", richText: true },
    { key: "value_2_title", label: "Value 2 Title" },
    { key: "value_2_description", label: "Value 2 Description", richText: true },
    { key: "value_3_title", label: "Value 3 Title" },
    { key: "value_3_description", label: "Value 3 Description", richText: true },
    { key: "contact_label", label: "Contact Section Label" },
    { key: "contact_heading", label: "Contact Section Heading" },
    { key: "contact_description", label: "Contact Description", richText: true },
    { key: "contact_phone", label: "Contact Phone" },
    { key: "contact_email", label: "Contact Email" },
    { key: "contact_location", label: "Contact Location" },
  ],
  atelie: [
    { key: "hero_badge_1", label: "Badge 1" },
    { key: "hero_badge_2", label: "Badge 2" },
    { key: "hero_heading", label: "Main Heading" },
    { key: "hero_subheading", label: "Subheading" },
    { key: "hero_description", label: "Description", richText: true },
    { key: "process_label", label: "Process Label" },
    { key: "process_title", label: "Process Title" },
    { key: "process_steps_json", label: "Process Steps JSON", multiline: true },
    { key: "portfolio_label", label: "Portfolio Label" },
    { key: "portfolio_title", label: "Portfolio Title" },
    { key: "portfolio_cards_json", label: "Portfolio Cards JSON", multiline: true },
    { key: "stats_json", label: "Stats JSON", multiline: true },
    { key: "collections_label", label: "Collections Label" },
    { key: "collections_title", label: "Collections Title" },
    { key: "collections_json", label: "Collections JSON", multiline: true },
    { key: "testimonials_label", label: "Testimonials Label" },
    { key: "testimonials_title", label: "Testimonials Title" },
    { key: "testimonials_json", label: "Testimonials JSON", multiline: true },
    { key: "quote_label", label: "Quote Label" },
    { key: "quote_title", label: "Quote Title" },
    { key: "quote_description", label: "Quote Description", richText: true },
    { key: "quote_highlights_json", label: "Quote Highlights JSON", multiline: true },
    { key: "quote_banner", label: "Quote Banner" },
    { key: "footer_description", label: "Footer Description", richText: true },
    { key: "footer_contact_json", label: "Footer Contact JSON", multiline: true },
  ],
  delicias: [
    { key: "hero_heading", label: "Main Heading" },
    { key: "hero_subheading", label: "Subheading" },
    { key: "hero_quote", label: "Hero Quote" },
    { key: "hero_description", label: "Description", richText: true },
    { key: "hero_cta", label: "CTA Button Text" },
    { key: "hero_visual_image", label: "Hero Visual Image", image: true },
    { key: "nav_brand_label", label: "Navigation Brand Label" },
    { key: "nav_links_json", label: "Navigation Links", multiline: true },
    { key: "nav_smart_quote_label", label: "Navigation Smart Quote Label" },
    { key: "stores_title", label: "Stores Section Title" },
    { key: "stores_description", label: "Stores Section Description", richText: true },
    { key: "stores_json", label: "Stores JSON", multiline: true },
    { key: "gallery_title", label: "Gallery Section Title" },
    { key: "gallery_filters_json", label: "Gallery Filters JSON", multiline: true },
    { key: "gallery_items_json", label: "Gallery Items JSON", multiline: true },
    { key: "testimonials_title", label: "Testimonials Section Title" },
    { key: "testimonials_json", label: "Testimonials JSON", multiline: true },
    { key: "footer_description", label: "Footer Description", richText: true },
    { key: "footer_menu_links_json", label: "Footer Menu Links JSON", multiline: true },
    { key: "footer_brand_links_json", label: "Footer Brand Links JSON", multiline: true },
    { key: "footer_menu_links_full_json", label: "Footer Menu Link Objects", multiline: true },
    { key: "footer_brand_links_full_json", label: "Footer Brand Link Objects", multiline: true },
    { key: "footer_legal_links_json", label: "Footer Legal Links JSON", multiline: true },
    { key: "footer_legal_links_full_json", label: "Footer Legal Link Objects", multiline: true },
    { key: "footer_copyright", label: "Footer Copyright" },
    { key: "footer_contact_json", label: "Footer Contact JSON", multiline: true },
  ],
  foodtruck: [
    { key: "hero_badge_1", label: "Badge 1" },
    { key: "hero_badge_2", label: "Badge 2" },
    { key: "hero_heading", label: "Main Heading" },
    { key: "hero_subheading", label: "Subheading" },
    { key: "hero_description", label: "Description", richText: true },
    { key: "location_label", label: "Location Label" },
    { key: "location_title", label: "Location Title" },
    { key: "location_description", label: "Location Description", richText: true },
    { key: "location_button", label: "Location Button Text" },
    { key: "features_json", label: "Feature Cards JSON", multiline: true },
    { key: "gallery_label", label: "Gallery Label" },
    { key: "gallery_title", label: "Gallery Title" },
    { key: "gallery_filters_json", label: "Gallery Filters JSON", multiline: true },
    { key: "gallery_cards_json", label: "Gallery Cards JSON", multiline: true },
    { key: "events_label", label: "Events Label" },
    { key: "events_title", label: "Events Title" },
    { key: "events_json", label: "Events JSON", multiline: true },
    { key: "reservation_label", label: "Reservation Label" },
    { key: "reservation_title", label: "Reservation Title" },
    { key: "reservation_description", label: "Reservation Description", richText: true },
    { key: "reservation_highlights_json", label: "Reservation Highlights JSON", multiline: true },
    { key: "reservation_banner", label: "Reservation Banner" },
    { key: "testimonials_label", label: "Testimonials Label" },
    { key: "testimonials_title", label: "Testimonials Title" },
    { key: "testimonials_json", label: "Testimonials JSON", multiline: true },
    { key: "menu_label", label: "Menu Label" },
    { key: "menu_title", label: "Menu Title" },
    { key: "menu_items_json", label: "Menu Items JSON", multiline: true },
    { key: "footer_description", label: "Footer Description", richText: true },
    { key: "footer_copyright", label: "Footer Copyright" },
    { key: "footer_contact_json", label: "Footer Contact JSON", multiline: true },
  ],
  arcadas: [
    { key: "nav_brand_label", label: "Nav Brand Label" },
    { key: "nav_brand_suffix", label: "Nav Brand Suffix" },
    { key: "hero_badge_1", label: "Badge 1" },
    { key: "hero_badge_2", label: "Badge 2" },
    { key: "hero_eyebrow", label: "Hero Eyebrow" },
    { key: "hero_heading", label: "Hero Heading" },
    { key: "hero_subheading", label: "Hero Subheading" },
    { key: "hero_quote", label: "Hero Quote" },
    { key: "hero_description", label: "Hero Description", richText: true },
    { key: "hero_cta_primary", label: "Hero CTA Primary" },
    { key: "hero_cta_secondary", label: "Hero CTA Secondary" },
    { key: "hero_visual_image", label: "Hero Visual Image", image: true },
    { key: "hero_card_quote", label: "Hero Card Quote" },
    { key: "stats_json", label: "Stats Highlights JSON", multiline: true },
    { key: "story_label", label: "Story Section Label" },
    { key: "story_title", label: "Story Section Title" },
    { key: "story_description", label: "Story Description", richText: true },
    { key: "features_json", label: "Features JSON", multiline: true },
    { key: "menu_label", label: "Menu Section Label" },
    { key: "menu_title", label: "Menu Section Title" },
    { key: "menu_cards_json", label: "Menu Items JSON", multiline: true },
    { key: "day_label", label: "Day Section Label" },
    { key: "day_title", label: "Day Section Title" },
    { key: "moments_json", label: "Day Moments JSON", multiline: true },
    { key: "quote_text", label: "Quote Band Text" },
    { key: "quote_caption", label: "Quote Band Caption" },
    { key: "gallery_label", label: "Gallery Section Label" },
    { key: "gallery_title", label: "Gallery Section Title" },
    { key: "gallery_filters_json", label: "Gallery Filters JSON", multiline: true },
    { key: "gallery_items_json", label: "Gallery Items JSON", multiline: true },
    { key: "testimonials_label", label: "Testimonials Label" },
    { key: "testimonials_title", label: "Testimonials Title" },
    { key: "testimonials_json", label: "Testimonials JSON", multiline: true },
    { key: "order_label", label: "Order Section Label" },
    { key: "order_title", label: "Order Section Title" },
    { key: "order_description", label: "Order Description", richText: true },
    { key: "order_highlights_json", label: "Order Highlights JSON", multiline: true },
    { key: "order_banner", label: "Order Reassurance Banner" },
    { key: "visit_label", label: "Visit Section Label" },
    { key: "visit_title", label: "Visit Section Title" },
    { key: "visit_address_title", label: "Address Card Title" },
    { key: "visit_address", label: "Address", multiline: true },
    { key: "visit_hours_title", label: "Hours Card Title" },
    { key: "visit_hours", label: "Hours", multiline: true },
    { key: "visit_phone_title", label: "Phone Card Title" },
    { key: "visit_phone_1", label: "Phone 1" },
    { key: "visit_phone_2", label: "Phone 2" },
    { key: "visit_maps_url", label: "Google Maps URL" },
    { key: "visit_maps_label", label: "Maps Button Label" },
    { key: "visit_instagram", label: "Instagram Handle" },
    { key: "visit_instagram_url", label: "Instagram URL" },
    { key: "footer_title", label: "Footer Title" },
    { key: "footer_tagline", label: "Footer Tagline" },
    { key: "footer_description", label: "Footer Description", richText: true },
    { key: "footer_copyright", label: "Footer Copyright" },
    { key: "footer_contact_json", label: "Footer Contact JSON", multiline: true },
  ],
  lutece: [
    { key: "nav_brand_label", label: "Nav Brand Label" },
    { key: "nav_brand_suffix", label: "Nav Brand Suffix" },
    { key: "hero_badge_1", label: "Badge 1" },
    { key: "hero_badge_2", label: "Badge 2" },
    { key: "hero_eyebrow", label: "Hero Eyebrow" },
    { key: "hero_heading", label: "Hero Heading" },
    { key: "hero_subheading", label: "Hero Subheading" },
    { key: "hero_quote", label: "Hero Quote" },
    { key: "hero_description", label: "Hero Description", richText: true },
    { key: "hero_cta_primary", label: "Hero CTA Primary" },
    { key: "hero_cta_secondary", label: "Hero CTA Secondary" },
    { key: "hero_image_1", label: "Hero Collage Image 1", image: true },
    { key: "hero_image_2", label: "Hero Collage Image 2", image: true },
    { key: "hero_image_3", label: "Hero Collage Image 3", image: true },
    { key: "stats_json", label: "Stats Highlights JSON", multiline: true },
    { key: "craft_label", label: "Craft Section Label" },
    { key: "craft_title", label: "Craft Section Title" },
    { key: "craft_description", label: "Craft Section Description", richText: true },
    { key: "craft_items_json", label: "Craft Items JSON", multiline: true },
    { key: "menu_label", label: "Menu Section Label" },
    { key: "menu_title", label: "Menu Section Title" },
    { key: "menu_cards_json", label: "Menu Items JSON", multiline: true },
    { key: "atmosphere_label", label: "Atmosphere Section Label" },
    { key: "atmosphere_title", label: "Atmosphere Section Title" },
    { key: "atmosphere_description", label: "Atmosphere Description", richText: true },
    { key: "gallery_label", label: "Gallery Section Label" },
    { key: "gallery_title", label: "Gallery Section Title" },
    { key: "gallery_filters_json", label: "Gallery Filters JSON", multiline: true },
    { key: "gallery_items_json", label: "Gallery Items JSON", multiline: true },
    { key: "showcase_title", label: "Showcase Title" },
    { key: "showcase_quote", label: "Showcase Quote" },
    { key: "testimonials_label", label: "Testimonials Label" },
    { key: "testimonials_title", label: "Testimonials Title" },
    { key: "testimonials_json", label: "Testimonials JSON", multiline: true },
    { key: "order_label", label: "Order Section Label" },
    { key: "order_title", label: "Order Section Title" },
    { key: "order_description", label: "Order Description", richText: true },
    { key: "order_highlights_json", label: "Order Highlights JSON", multiline: true },
    { key: "order_banner", label: "Order Reassurance Banner" },
    { key: "visit_label", label: "Visit Label" },
    { key: "visit_title", label: "Visit Title", multiline: true },
    { key: "visit_address", label: "Address", multiline: true },
    { key: "visit_hours", label: "Hours" },
    { key: "visit_phone", label: "Phone" },
    { key: "visit_maps_url", label: "Google Maps URL" },
    { key: "visit_maps_label", label: "Maps Button Label" },
    { key: "visit_note", label: "Visit Note Card" },
    { key: "visit_image", label: "Visit Section Image", image: true },
    { key: "footer_title", label: "Footer Title" },
    { key: "footer_tagline", label: "Footer Tagline" },
    { key: "footer_description", label: "Footer Description", richText: true },
    { key: "footer_copyright", label: "Footer Copyright" },
    { key: "footer_contact_json", label: "Footer Contact JSON", multiline: true },
  ],
  contacto: [
    { key: "hero_title", label: "Hero Title" },
    { key: "hero_subtitle", label: "Hero Subtitle" },
    { key: "step1_title", label: "Step 1 Title" },
    { key: "step1_subtitle", label: "Step 1 Subtitle" },
    { key: "step2_title", label: "Step 2 Title" },
    { key: "step2_subtitle", label: "Step 2 Subtitle" },
    { key: "step3_title", label: "Step 3 Title" },
    { key: "step3_subtitle", label: "Step 3 Subtitle" },
    { key: "step4_title", label: "Step 4 Title" },
    { key: "step4_subtitle", label: "Step 4 Subtitle" },
    { key: "step5_title", label: "Step 5 Title" },
    { key: "step5_subtitle", label: "Step 5 Subtitle" },
    { key: "brand_cards_json", label: "Brand Cards", multiline: true },
    { key: "event_cards_json", label: "Event Cards", multiline: true },
    { key: "step3_guest_suffix", label: "Step 3 Guest Suffix" },
    { key: "step3_scale_json", label: "Step 3 Scale Labels", multiline: true },
    { key: "step3_presets_json", label: "Step 3 Presets", multiline: true },
    { key: "step4_date_label", label: "Step 4 Date Label" },
    { key: "step4_time_label", label: "Step 4 Time Label" },
    { key: "step4_time_helper", label: "Step 4 Time Helper" },
    { key: "step5_form_fields_json", label: "Step 5 Form Fields", multiline: true },
    { key: "whatsapp_helper", label: "WhatsApp Helper Text" },
    { key: "date_placeholder", label: "Date Placeholder" },
    { key: "time_placeholder", label: "Time Placeholder" },
    { key: "submit_label", label: "Submit Button Label" },
    { key: "footer_text", label: "Footer Text" },
  ],
};

const JSON_FIELD_SCHEMAS: Record<string, JsonFieldSchema> = {
  process_steps_json: {
    type: "object-list",
    itemLabel: "Step",
    fields: [
      { key: "number", label: "Number" },
      { key: "title", label: "Title" },
      { key: "description", label: "Description", multiline: true },
    ],
  },
  portfolio_cards_json: {
    type: "object-list",
    itemLabel: "Portfolio Card",
    fields: [
      { key: "category", label: "Category" },
      { key: "title", label: "Title" },
      { key: "subtitle", label: "Subtitle" },
      { key: "image", label: "Image URL" },
      { key: "large", label: "Large Card (true/false)" },
    ],
  },
  stats_json: {
    type: "object-list",
    itemLabel: "Stat",
    fields: [
      { key: "value", label: "Value" },
      { key: "label", label: "Label" },
    ],
  },
  collections_json: {
    type: "object-list",
    itemLabel: "Collection Card",
    fields: [
      { key: "line", label: "Line" },
      { key: "title", label: "Title" },
      { key: "desc", label: "Description", multiline: true },
      { key: "image", label: "Image URL" },
    ],
  },
  testimonials_json: {
    type: "object-list",
    itemLabel: "Testimonial",
    fields: [
      { key: "initials", label: "Initials" },
      { key: "name", label: "Name" },
      { key: "meta", label: "Meta (Food Truck/Delicias)" },
      { key: "role", label: "Role (Atelie)" },
      { key: "quote", label: "Quote", multiline: true },
      { key: "description", label: "Description (Delicias)", multiline: true },
    ],
  },
  quote_highlights_json: { type: "string-list", itemLabel: "Highlight" },
  footer_contact_json: {
    type: "object-list",
    itemLabel: "Contact",
    fields: [
      { key: "type", label: "Type (phone/email/whatsapp/location)" },
      { key: "text", label: "Text" },
    ],
  },
  home_footer_contact_json: {
    type: "object-list",
    itemLabel: "Home Footer Contact",
    fields: [
      { key: "type", label: "Type (phone/email/location)" },
      { key: "text", label: "Text" },
    ],
  },
  nav_links_json: {
    type: "object-list",
    itemLabel: "Navigation Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  home_testimonials_json: {
    type: "object-list",
    itemLabel: "Home Testimonial",
    fields: [
      { key: "quote", label: "Quote", multiline: true },
      { key: "author", label: "Author" },
      { key: "role", label: "Role" },
      { key: "brand", label: "Brand" },
      { key: "brandColor", label: "Brand Color (#hex)" },
      { key: "stars", label: "Stars" },
      { key: "avatar", label: "Avatar (2 letters)" },
    ],
  },
  brand_cards_json: {
    type: "object-list",
    itemLabel: "Brand Card",
    fields: [
      { key: "icon", label: "Emoji/Icon" },
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "color", label: "Tailwind Color Class" },
    ],
  },
  event_cards_json: {
    type: "object-list",
    itemLabel: "Event Card",
    fields: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
      { key: "icon", label: "Icon key (utensils/calendar/music/send)" },
    ],
  },
  step3_scale_json: { type: "string-list", itemLabel: "Scale Label" },
  step3_presets_json: { type: "string-list", itemLabel: "Preset Guest Count" },
  step5_form_fields_json: {
    type: "object-list",
    itemLabel: "Form Field",
    fields: [
      { key: "label", label: "Label" },
      { key: "placeholder", label: "Placeholder" },
    ],
  },
  home_footer_social_json: {
    type: "object-list",
    itemLabel: "Social Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  home_footer_brands_links_json: {
    type: "object-list",
    itemLabel: "Footer Brand Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  home_footer_company_links_json: {
    type: "object-list",
    itemLabel: "Footer Company Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  footer_menu_links_full_json: {
    type: "object-list",
    itemLabel: "Footer Menu Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  footer_brand_links_full_json: {
    type: "object-list",
    itemLabel: "Footer Brand Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  footer_legal_links_full_json: {
    type: "object-list",
    itemLabel: "Footer Legal Link",
    fields: [
      { key: "label", label: "Label" },
      { key: "href", label: "Href" },
    ],
  },
  stores_json: {
    type: "object-list",
    itemLabel: "Store",
    fields: [
      { key: "name", label: "Store Name" },
      { key: "address", label: "Address" },
      { key: "hours", label: "Hours" },
      { key: "detail", label: "Phone/Detail" },
      { key: "tags", label: "Tags" },
      { key: "icon", label: "Icon (optional: plane/store)" },
    ],
  },
  gallery_filters_json: { type: "string-list", itemLabel: "Filter" },
  gallery_items_json: {
    type: "object-list",
    itemLabel: "Gallery Item",
    fields: [
      { key: "image", label: "Image URL" },
      { key: "title", label: "Title" },
      { key: "subtitle", label: "Subtitle" },
      { key: "tag", label: "Tag" },
      { key: "large", label: "Large Card (true/false)" },
    ],
  },
  footer_menu_links_json: { type: "string-list", itemLabel: "Menu Link" },
  footer_brand_links_json: { type: "string-list", itemLabel: "Brand Link" },
  features_json: {
    type: "object-list",
    itemLabel: "Feature",
    fields: [
      { key: "title", label: "Title" },
      { key: "body", label: "Body", multiline: true },
    ],
  },
  gallery_cards_json: {
    type: "object-list",
    itemLabel: "Gallery Card",
    fields: [
      { key: "tag", label: "Tag" },
      { key: "title", label: "Title" },
      { key: "image", label: "Image URL" },
      { key: "large", label: "Large Card (true/false)" },
    ],
  },
  moments_json: {
    type: "object-list",
    itemLabel: "Day Moment",
    fields: [
      { key: "time", label: "Time" },
      { key: "title", label: "Title" },
      { key: "text", label: "Text" },
      { key: "image", label: "Image URL" },
    ],
  },
  craft_items_json: {
    type: "object-list",
    itemLabel: "Craft Item",
    fields: [
      { key: "n", label: "Number (01)" },
      { key: "t", label: "Title" },
      { key: "d", label: "Description" },
    ],
  },
  showcase_json: {
    type: "object-list",
    itemLabel: "Showcase Item",
    fields: [
      { key: "title", label: "Title" },
      { key: "image", label: "Image URL" },
    ],
  },
  events_json: {
    type: "object-list",
    itemLabel: "Event",
    fields: [
      { key: "day", label: "Day" },
      { key: "month", label: "Month" },
      { key: "title", label: "Title" },
      { key: "place", label: "Place" },
    ],
  },
  reservation_highlights_json: { type: "string-list", itemLabel: "Reservation Highlight" },
  order_highlights_json: { type: "string-list", itemLabel: "Order Highlight" },
  menu_items_json: { type: "tuple-list", itemLabels: ["Item Name", "Price"] },
  menu_cards_json: {
    type: "object-list",
    itemLabel: "Menu Item",
    fields: [
      { key: "name", label: "Item Name" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price" },
      { key: "description", label: "Description", multiline: true },
      { key: "tag", label: "Tag / Badge (optional)" },
    ],
  },
};

const REPEATER_META: Record<string, RepeaterMeta> = {
  menu_cards_json: {
    title: "Menu Items",
    description: "Add items to the menu with name, category, price, description and optional tag.",
  },
  order_highlights_json: {
    title: "Order Highlights",
    description: "Bullet points shown in the special orders / consultation banner.",
  },
  process_steps_json: {
    title: "Process Steps",
    description: "Add each stage of your process in order (number, title, description).",
  },
  portfolio_cards_json: {
    title: "Portfolio Cards",
    description: "Add portfolio cards with image URL and details.",
  },
  stats_json: {
    title: "Stats",
    description: "Add stat blocks shown in the highlighted stats strip.",
  },
  collections_json: {
    title: "Collection Cards",
    description: "Add collection cards with image, heading, and description.",
  },
  testimonials_json: {
    title: "Testimonials",
    description: "Add customer testimonials shown on this page.",
  },
  quote_highlights_json: {
    title: "Quote Highlights",
    description: "Short bullet points shown in the custom quote section.",
  },
  stores_json: {
    title: "Store Cards",
    description: "Each store card includes location, hours, and detail text.",
  },
  gallery_filters_json: {
    title: "Gallery Filters",
    description: "Buttons used to filter gallery categories.",
  },
  gallery_items_json: {
    title: "Gallery Items",
    description: "Gallery cards with image and tag information.",
  },
  footer_menu_links_json: {
    title: "Footer Menu Links",
    description: "Quick links shown in footer menus.",
  },
  footer_brand_links_json: {
    title: "Footer Brand Links",
    description: "Brand links shown in the footer section.",
  },
  features_json: {
    title: "Feature Cards",
    description: "Cards for feature highlights (title and body).",
  },
  gallery_cards_json: {
    title: "Gallery Cards",
    description: "Food Truck gallery cards with optional large card toggle.",
  },
  moments_json: {
    title: "Arcadas Day Moments",
    description: "Timeline cards for the Arcadas day section (time, title, text, image).",
  },
  craft_items_json: {
    title: "Lutèce Craft Items",
    description: "Numbered craft highlights on the Lutèce page.",
  },
  showcase_json: {
    title: "Lutèce Showcase",
    description: "Gallery items for the Lutèce vitrine section.",
  },
  events_json: {
    title: "Event Cards",
    description: "Upcoming event cards (day, month, title, place).",
  },
  reservation_highlights_json: {
    title: "Reservation Highlights",
    description: "Short points shown in the reservation section.",
  },
  menu_items_json: {
    title: "Menu Items",
    description: "Add menu item name and price.",
  },
  footer_contact_json: {
    title: "Footer Contact Items",
    description: "Contact rows with type and display text.",
  },
  home_footer_contact_json: {
    title: "Home Footer Contact",
    description: "Contact rows for the homepage footer.",
  },
  nav_links_json: {
    title: "Navigation Links",
    description: "Top navigation labels and routes.",
  },
  home_testimonials_json: {
    title: "Home Testimonials",
    description: "Cards shown in the homepage testimonials carousel.",
  },
  brand_cards_json: {
    title: "Brand Cards",
    description: "Cards shown in Smart Quote step 1.",
  },
  event_cards_json: {
    title: "Event Cards",
    description: "Cards shown in Smart Quote step 2.",
  },
  step3_scale_json: {
    title: "Step 3 Scale Labels",
    description: "Labels under the guest slider.",
  },
  step3_presets_json: {
    title: "Step 3 Presets",
    description: "Quick preset buttons for guest count.",
  },
  step5_form_fields_json: {
    title: "Step 5 Form Fields",
    description: "Contact form field labels and placeholders.",
  },
  home_footer_social_json: {
    title: "Home Footer Social Links",
    description: "Social icon labels and URLs.",
  },
  home_footer_brands_links_json: {
    title: "Home Footer Brand Links",
    description: "Brand labels and URLs in home footer.",
  },
  home_footer_company_links_json: {
    title: "Home Footer Company Links",
    description: "Company links and URLs in home footer.",
  },
  footer_menu_links_full_json: {
    title: "Footer Menu Link Objects",
    description: "Delicias footer menu labels with URLs.",
  },
  footer_brand_links_full_json: {
    title: "Footer Brand Link Objects",
    description: "Delicias footer brand labels with URLs.",
  },
  footer_legal_links_full_json: {
    title: "Footer Legal Link Objects",
    description: "Delicias footer legal labels with URLs.",
  },
};

function parseJsonArray(value: string): unknown[] {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function RepeaterHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <p className="text-xs uppercase tracking-widest text-dlm-gold">{title}</p>
      <Button type="button" size="sm" variant="outline" onClick={onAdd} className="gap-1 border-gray-600 text-gray-300 hover:text-white">
        <Plus size={14} />
        Add
      </Button>
    </div>
  );
}

function JsonArrayEditor({
  pageId,
  contentKey,
  schema,
  meta,
  value,
  token,
  onChange,
}: {
  pageId: PageId;
  contentKey: string;
  schema: JsonFieldSchema;
  meta?: RepeaterMeta;
  value: string;
  token: string;
  onChange: (value: string) => void;
}) {
  const rawItems = parseJsonArray(value);

  const save = (items: unknown[]) => {
    onChange(JSON.stringify(items, null, 2));
  };

  if (schema.type === "string-list") {
    const items = rawItems.map((item) => String(item ?? ""));
    return (
      <div className="rounded-lg border border-gray-700 bg-[#0f1322] p-3">
        {meta && (
          <div className="mb-3 rounded-md border border-gray-700 bg-[#13131f] px-3 py-2">
            <p className="text-sm font-semibold text-white">{meta.title}</p>
            <p className="text-xs text-gray-400">{meta.description}</p>
          </div>
        )}
        <RepeaterHeader title={schema.itemLabel} onAdd={() => save([...items, ""])} />
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={`${contentKey}-${index}`} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = event.target.value;
                  save(next);
                }}
                className="border-gray-700 bg-[#1a1a2e] text-white"
              />
              <Button type="button" size="icon" variant="ghost" onClick={() => save(items.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-400">
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (schema.type === "tuple-list") {
    const items = rawItems.map((item) => {
      if (Array.isArray(item)) {
        return [String(item[0] ?? ""), String(item[1] ?? "")] as [string, string];
      }
      return ["", ""] as [string, string];
    });
    return (
      <div className="rounded-lg border border-gray-700 bg-[#0f1322] p-3">
        {meta && (
          <div className="mb-3 rounded-md border border-gray-700 bg-[#13131f] px-3 py-2">
            <p className="text-sm font-semibold text-white">{meta.title}</p>
            <p className="text-xs text-gray-400">{meta.description}</p>
          </div>
        )}
        <RepeaterHeader title="Menu Items" onAdd={() => save([...items, ["", ""]])} />
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={`${contentKey}-${index}`} className="grid grid-cols-[1fr_180px_auto] gap-2">
              <Input
                value={item[0]}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = [event.target.value, next[index][1]];
                  save(next);
                }}
                placeholder={schema.itemLabels[0]}
                className="border-gray-700 bg-[#1a1a2e] text-white"
              />
              <Input
                value={item[1]}
                onChange={(event) => {
                  const next = [...items];
                  next[index] = [next[index][0], event.target.value];
                  save(next);
                }}
                placeholder={schema.itemLabels[1]}
                className="border-gray-700 bg-[#1a1a2e] text-white"
              />
              <Button type="button" size="icon" variant="ghost" onClick={() => save(items.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-400">
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const items = rawItems.map((item) => (typeof item === "object" && item !== null ? { ...(item as Record<string, unknown>) } : {}));
  return (
    <div className="rounded-lg border border-gray-700 bg-[#0f1322] p-3">
      {meta && (
        <div className="mb-3 rounded-md border border-gray-700 bg-[#13131f] px-3 py-2">
          <p className="text-sm font-semibold text-white">{meta.title}</p>
          <p className="text-xs text-gray-400">{meta.description}</p>
        </div>
      )}
      <RepeaterHeader title={schema.itemLabel} onAdd={() => save([...items, {}])} />
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${contentKey}-${index}`} className="rounded-lg border border-gray-700 bg-[#13131f] p-3">
            <div className="mb-2 flex justify-end">
              <Button type="button" size="icon" variant="ghost" onClick={() => save(items.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-400">
                <Trash2 size={14} />
              </Button>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {schema.fields.map((field) => {
                const fieldValue = String(item[field.key] ?? "");
                const isBooleanField = field.key === "large";
                return (
                  <div key={`${contentKey}-${index}-${field.key}`} className={field.multiline ? "md:col-span-2" : ""}>
                    <Label className="mb-1 block text-xs text-gray-400">{field.label}</Label>
                    {isBooleanField ? (
                      <label className="flex items-center gap-2 rounded-md border border-gray-700 bg-[#1a1a2e] px-3 py-2 text-sm text-gray-200">
                        <input
                          type="checkbox"
                          checked={fieldValue === "true"}
                          onChange={(event) => {
                            const next = [...items];
                            next[index] = { ...next[index], [field.key]: event.target.checked };
                            save(next);
                          }}
                        />
                        Highlight as large card
                      </label>
                    ) : field.multiline ? (
                      <Textarea
                        value={fieldValue}
                        onChange={(event) => {
                          const next = [...items];
                          next[index] = { ...next[index], [field.key]: event.target.value };
                          save(next);
                        }}
                        className="min-h-[90px] border-gray-700 bg-[#1a1a2e] text-white"
                      />
                    ) : (
                      <Input
                        value={fieldValue}
                        onChange={(event) => {
                          const next = [...items];
                          next[index] = { ...next[index], [field.key]: event.target.value };
                          save(next);
                        }}
                        className="border-gray-700 bg-[#1a1a2e] text-white"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {schema.fields.some((f) => f.key === "image") && (
              <div className="mt-3">
                <Label className="mb-2 block text-xs text-gray-400">Upload Image</Label>
                <ImageDropZone
                  page={pageId}
                  contentKey={`${contentKey}_${index}_image`}
                  currentUrl={String(item.image ?? "")}
                  token={token}
                  onUploaded={(url) => {
                    const next = [...items];
                    next[index] = { ...next[index], image: url };
                    save(next);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#1a1a2e]">
      <div className="flex items-center gap-1 border-b border-gray-700 bg-[#16213e] px-3 py-2">
        <ToolbarBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <Bold size={14} />
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <Italic size={14} />
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
          <UnderlineIcon size={14} />
        </ToolbarBtn>
        <div className="mx-1 h-4 w-px bg-gray-600" />
        <ToolbarBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
          <List size={14} />
        </ToolbarBtn>
        <div className="mx-1 h-4 w-px bg-gray-600" />
        <ToolbarBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <RotateCcw size={14} />
        </ToolbarBtn>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[100px] p-3 text-sm text-gray-200 prose prose-invert max-w-none focus:outline-none [&_.ProseMirror]:min-h-[80px] [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}

function ToolbarBtn({
  children,
  active,
  onClick,
  title,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "rounded p-1.5 transition-colors",
        active ? "bg-dlm-gold text-dlm-dark" : "text-gray-400 hover:bg-gray-700 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function ImageDropZone({
  page,
  contentKey,
  currentUrl,
  token,
  onUploaded,
}: {
  page: string;
  contentKey: string;
  currentUrl: string;
  token: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setPreview(URL.createObjectURL(file));
      setUploading(true);

      const form = new FormData();
      form.append("image", file);
      form.append("page", page);
      form.append("key", contentKey);

      try {
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const { url } = (await response.json()) as { url: string };
        onUploaded(url);
        toast({ title: "Image uploaded successfully" });
      } catch {
        toast({ title: "Upload failed", variant: "destructive" });
        setPreview(null);
      } finally {
        setUploading(false);
      }
    },
    [contentKey, onUploaded, page, toast, token],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const displayUrl = preview ?? currentUrl;

  return (
    <div className="space-y-3">
      {displayUrl && (
        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-gray-700">
          <img src={displayUrl} alt="Content preview" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-end bg-black/30 p-2">
            <span className="truncate text-xs text-white/70">{preview ? "New image (unsaved)" : currentUrl}</span>
          </div>
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          isDragActive ? "border-dlm-gold bg-dlm-gold/10" : "border-gray-600 hover:border-gray-500 hover:bg-gray-800/30",
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-dlm-gold border-t-transparent" />
            <span className="text-sm text-gray-400">Uploading...</span>
          </div>
        ) : (
          <>
            <ImageIcon size={24} className="text-gray-500" />
            <p className="text-sm text-gray-400">{isDragActive ? "Drop the image here" : "Drag and drop an image, or click to browse"}</p>
            <p className="text-xs text-gray-600">PNG, JPG, WEBP — max 10 MB</p>
          </>
        )}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as { token?: string; error?: string };
      if (!response.ok || !data.token) {
        setError(data.error ?? "Login failed");
        return;
      }

      localStorage.setItem("dlm_admin_token", data.token);
      onLogin(data.token);
      toast({ title: "Welcome back" });
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d1a] p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dlm-gold/30 bg-dlm-gold/10">
            <Lock size={24} className="text-dlm-gold" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-white">DLM Admin</h1>
          <p className="text-sm text-gray-400">Content Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-700 bg-[#13131f] p-8">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Admin Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoFocus
              className="border-gray-700 bg-[#1a1a2e] text-white placeholder:text-gray-600 focus-visible:ring-dlm-gold"
            />
          </div>

          {error && <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={loading || !password} className="w-full bg-dlm-gold font-semibold text-dlm-dark hover:bg-dlm-gold/90">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function PageEditor({
  pageId,
  content,
  token,
  onChange,
}: {
  pageId: PageId;
  content: PageContent;
  token: string;
  onChange: (key: string, value: string) => void;
}) {
  const fields = PAGE_FIELDS[pageId];
  const imageFields = fields.filter((field) => field.image);
  const textFields = fields.filter((field) => !field.image);
  const hasHeroImage = pageId !== "delicias" && pageId !== "arcadas" && pageId !== "lutece";

  return (
    <div className="space-y-8">
      {hasHeroImage && (
        <div className="space-y-3 rounded-xl border border-gray-700 bg-[#13131f] p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-dlm-gold">
            <Upload size={14} />
            Hero Background Image
          </h3>
          <ImageDropZone
            page={pageId}
            contentKey="hero_image"
            currentUrl={content.hero_image ?? ""}
            token={token}
            onUploaded={(url) => onChange("hero_image", url)}
          />
        </div>
      )}

      {imageFields.length > 0 && (
        <div className="space-y-5 rounded-xl border border-gray-700 bg-[#13131f] p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-dlm-gold">
            <ImageIcon size={14} />
            Section Images
          </h3>
          {imageFields.map((field) => (
            <div key={field.key} className="space-y-3">
              <Label className="text-sm text-gray-300">{field.label}</Label>
              <ImageDropZone
                page={pageId}
                contentKey={field.key}
                currentUrl={content[field.key] ?? ""}
                token={token}
                onUploaded={(url) => onChange(field.key, url)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-5 rounded-xl border border-gray-700 bg-[#13131f] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-dlm-gold">Text Content</h3>
        {textFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="text-sm text-gray-300">{field.label}</Label>
            {field.richText ? (
              <RichTextEditor value={content[field.key] ?? ""} onChange={(value) => onChange(field.key, value)} />
            ) : field.multiline ? (
              JSON_FIELD_SCHEMAS[field.key] ? (
                <JsonArrayEditor
                  pageId={pageId}
                  contentKey={field.key}
                  schema={JSON_FIELD_SCHEMAS[field.key]}
                  meta={REPEATER_META[field.key]}
                  value={content[field.key] ?? ""}
                  token={token}
                  onChange={(value) => onChange(field.key, value)}
                />
              ) : (
                <Textarea
                  value={content[field.key] ?? ""}
                  onChange={(event) => onChange(field.key, event.target.value)}
                  className="min-h-[180px] border-gray-700 bg-[#1a1a2e] font-mono text-xs text-white placeholder:text-gray-600 focus-visible:ring-dlm-gold"
                />
              )
            ) : (
              <Input
                value={content[field.key] ?? ""}
                onChange={(event) => onChange(field.key, event.target.value)}
                className="border-gray-700 bg-[#1a1a2e] text-white placeholder:text-gray-600 focus-visible:ring-dlm-gold"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [allContent, setAllContent] = useState<AllContent>({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<PageId>("global");
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/content")
      .then((response) => response.json())
      .then((data: AllContent) => setAllContent(data))
      .catch(() => toast({ title: "Failed to load content", variant: "destructive" }));
  }, [toast]);

  const handleChange = (page: PageId, key: string, value: string) => {
    setAllContent((previous) => ({
      ...previous,
      [page]: { ...(previous[page] ?? {}), [key]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates: Array<{ page: string; key: string; value: string }> = [];
      for (const [page, fields] of Object.entries(allContent)) {
        for (const [key, value] of Object.entries(fields)) {
          updates.push({ page, key, value });
        }
      }

      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Save failed");
      }

      toast({ title: "Changes saved successfully" });
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    const page = PAGES.find((item) => item.id === activeTab);
    if (page) {
      window.open(page.path, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0d0d1a]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dlm-gold/30 bg-dlm-gold/10">
              <span className="font-playfair text-sm font-bold text-dlm-gold">D</span>
            </div>
            <span className="font-playfair text-lg font-bold">DLM Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePreview} className="gap-1.5 border-gray-700 text-gray-300 hover:text-white">
              <Eye size={14} />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5 bg-dlm-gold font-semibold text-dlm-dark hover:bg-dlm-gold/90">
              <Save size={14} />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <button type="button" onClick={onLogout} title="Logout" className="ml-2 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6">
          <h2 className="font-playfair text-2xl font-bold">Content Manager</h2>
          <p className="mt-1 text-sm text-gray-400">Edit page content, upload images, then save to publish.</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PageId)}>
          <TabsList className="mb-6 border border-gray-700 bg-[#13131f]">
            {PAGES.map((page) => (
              <TabsTrigger key={page.id} value={page.id} className="data-[state=active]:bg-dlm-gold data-[state=active]:text-dlm-dark">
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PAGES.map((page) => (
            <TabsContent key={page.id} value={page.id}>
              <PageEditor
                pageId={page.id}
                content={allContent[page.id] ?? {}}
                token={token}
                onChange={(key, value) => handleChange(page.id, key, value)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("dlm_admin_token"));

  return (
    <>
      <Toaster />
      {token ? (
        <Dashboard
          token={token}
          onLogout={() => {
            localStorage.removeItem("dlm_admin_token");
            setToken(null);
          }}
        />
      ) : (
        <LoginScreen onLogin={setToken} />
      )}
    </>
  );
}
