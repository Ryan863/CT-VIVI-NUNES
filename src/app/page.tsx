"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  ChevronDown,
  Navigation,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  Sun,
  ShieldCheck,
  Zap,
  Users,
  Award,
  ArrowRight,
  Flame,
  Dumbbell,
  Trophy,
} from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ==========================================
// 1. CONSTANTES GLOBAIS DE MANUTENÇÃO RÁPIDA
// ==========================================
export const ASSETS = {
  heroDesktop: "/vivinunes/telainicialdesktop.jpg",
  heroMobile: "/vivinunes/telainicialmobile.jpg",
  officialLogo: "/vivinunes/logo.jpg",
};

export const CONTACTS = {
  jefe: {
    name: "Jefe",
    role: "Reservas de Quadra & Locações",
    phoneDisplay: "(49) 99948-6797",
    whatsappUrl:
      "https://wa.me/5549999486797?text=Ol%C3%A1+Jefe%2C+visitei+o+site+do+CT+Vivi+Nunes+e+gostaria+de+consultar+hor%C3%A1rios+para+loca%C3%A7%C3%A3o+de+quadra.",
    beachTennisUrl:
      "https://wa.me/5549999486797?text=Ol%C3%A1+Jefe%2C+gostaria+de+consultar+hor%C3%A1rios+para+jogar+Beach+Tennis+no+CT+Vivi+Nunes.",
    voleiUrl:
      "https://wa.me/5549999486797?text=Ol%C3%A1+Jefe%2C+gostaria+de+consultar+hor%C3%A1rios+para+jogar+V%C3%B4lei+de+Praia+no+CT+Vivi+Nunes.",
    futevoleiUrl:
      "https://wa.me/5549999486797?text=Ol%C3%A1+Jefe%2C+gostaria+de+consultar+hor%C3%A1rios+para+jogar+Futev%C3%B4lei+no+CT+Vivi+Nunes.",
    funcionalUrl:
      "https://wa.me/5549999486797?text=Ol%C3%A1+Jefe%2C+gostaria+de+informa%C3%A7%C3%B5es+sobre+loca%C3%A7%C3%A3o+de+quadras+e+areia.",
  },
  viviane: {
    name: "Profª. Vivi Nunes",
    role: "Ex-Atleta Profissional & Aulas de Vôlei de Praia",
    phoneDisplay: "(49) 99804-3322",
    whatsappUrl:
      "https://wa.me/5549998043322?text=Ol%C3%A1+Prof.+Vivi%2C+visitei+o+site+e+gostaria+de+informa%C3%A7%C3%B5es+sobre+as+aulas+de+V%C3%B4lei+de+Praia.",
  },
  location: {
    address:
      "R. Benedito Tomaz Scussiato, 200 - Bairro Santa Lúcia, Videira - SC, 89565-350",
    shortAddress: "Santa Lúcia, Videira - SC",
    googleMapsDirections:
      "https://www.google.com/maps/search/?api=1&query=R.+Benedito+Tomaz+Scussiato%2C+200+-+Santa+L%C3%BAcia%2C+Videira+-+SC%2C+89565-350",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Rua+Benedito+Tomaz+Scussiato,+200+-+Santa+L%C3%BAcia,+Videira+-+SC,+89565-350&output=embed",
  },
  social: {
    instagram: "https://www.instagram.com/ct_vivinunes",
    handle: "@ct_vivinunes",
  },
};

export const FAQ_DATA = [
  {
    question: "Como funciona a estrutura de quadras do CT Vivi Nunes?",
    answer:
      "Nosso complexo conta com 3 quadras oficiais de areia higienizada: 2 quadras totalmente cobertas (Quadra 1 'Yago' e Quadra 2 'Eloá'), garantindo jogos e aulas confortáveis em qualquer condição climática (sol forte, chuva ou frio), e 1 quadra descoberta ao ar livre para quem aprecia o clima da praia. Todas possuem iluminação potente em refletores de LED.",
  },
  {
    question: "Quais aulas são oferecidas no complexo?",
    answer:
      "Oferecemos aulas exclusivas de Vôlei de Praia (feminino e masculino) para todas as idades e todos os níveis, ministradas diretamente pela Profª Vivi Nunes — ex-atleta profissional com múltiplos títulos estaduais e experiência em campeonatos nacionais. Atendemos desde iniciantes absolutos até atletas em aperfeiçoamento.",
  },
  {
    question: "Como funciona a locação de quadras avulsas e horários mensalistas?",
    answer:
      "Você pode alugar horários avulsos por hora para sua turma de amigos (Beach Tennis, Vôlei de Praia ou Futevôlei) ou fechar um plano mensalista com dia e horário fixo garantido toda semana. Basta enviar uma mensagem para o WhatsApp do Jefe para verificar a grade disponível.",
  },
  {
    question: "Qual é o horário de funcionamento das quadras?",
    answer:
      "Funcionamos todos os dias da semana até as 23:30 hrs! Nossa iluminação em refletores de LED de alta performance elimina sombras e pontos cegos, garantindo partidas noturnas com visibilidade perfeita.",
  },
  {
    question: "O complexo fornece raquetes e bolas para uso durante os jogos?",
    answer:
      "Sim! Nas aulas de Vôlei de Praia, todo o material esportivo oficial está incluso. Para locações avulsas ou mensalistas de Beach Tennis e Vôlei, também disponibilizamos suporte de bolas oficiais e suporte de raquetes mediante consulta prévia.",
  },
];

// Registrar plugin client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showWaModal, setShowWaModal] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  // Monitorar scroll para exibir o botão flutuante apenas após scrollY > 400px
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Garantir refresh do ScrollTrigger após carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Animações sutis GSAP com clearProps
  useGSAP(
    () => {
      // Hero reveal
      gsap.fromTo(
        ".hero-reveal",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.1,
          clearProps: "all",
        }
      );

      // Section cards reveal
      gsap.fromTo(
        ".card-reveal",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: "#modalidades",
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#0F1115] text-[#F4F4F5] overflow-x-hidden selection:bg-amber-500 selection:text-stone-950 font-body"
    >
      {/* ============================================================== */}
      {/* A. NAVBAR EDITORIAL (Fixed com Glassmorphism & Botão Outline)  */}
      {/* ============================================================== */}
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0F1115]/85 backdrop-blur-md border-b border-white/[0.08]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo Tipográfica Oficial */}
          <Link
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl py-1 px-2 -ml-2 transition-colors hover:bg-white/5"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  CT
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  VIVI NUNES
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-amber-300 transition-colors -mt-0.5">
                Complexo de Areia • Videira - SC
              </span>
            </div>
          </Link>

          {/* Links Centrais de Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <Link
              href="#modalidades"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Modalidades
            </Link>
            <Link
              href="#locacao"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Locação
            </Link>
            <Link
              href="#professores"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Profª. Vivi Nunes
            </Link>
            <Link
              href="#estrutura"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Estrutura
            </Link>
            <Link
              href="#avaliacoes"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Avaliações
            </Link>
            <Link
              href="#localizacao"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Localização
            </Link>
          </nav>

          {/* CTA Direita Desktop: ESTILO OUTLINE (não concorre com Hero) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={CONTACTS.jefe.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border border-amber-500/80 text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar Quadra</span>
            </a>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200 hover:text-amber-400 transition-colors"
            aria-label="Abrir Menu de Navegação"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F1115]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4 text-base font-semibold text-zinc-200">
              <Link
                href="#modalidades"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Modalidades Esportivas</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
              <Link
                href="#locacao"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Locação & Mensalistas</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
              <Link
                href="#professores"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Profª. Vivi Nunes (Aulas)</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
              <Link
                href="#estrutura"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>3 Quadras & Estrutura</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
              <Link
                href="#avaliacoes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Avaliações Google (5.0★)</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>
              <Link
                href="#localizacao"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Localização no Santa Lúcia</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>

              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-bold text-center text-sm uppercase tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950 stroke-none" />
                  Reservar com Jefe no WhatsApp
                </a>
                <a
                  href={CONTACTS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl font-medium text-center text-xs text-zinc-300 bg-white/5 border border-white/10 flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-amber-400" />
                  Seguir @ct_vivinunes
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* B. 1ª DOBRA: HERO SECTION (Alinhamento Nobre & Contraste)      */}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative isolate min-h-[100dvh] flex flex-col justify-between pt-28 pb-14 px-4 sm:px-6 bg-[#0F1115] overflow-hidden"
      >
        {/* Layer 0: Imagem Desktop (16:9) */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Image
            src={ASSETS.heroDesktop}
            alt="Quadra de areia do CT Vivi Nunes em Videira"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Layer 0: Imagem Mobile (9:16) */}
        <div className="block md:hidden absolute inset-0 z-0">
          <Image
            src={ASSETS.heroMobile}
            alt="Quadra de areia com bola de vôlei do CT Vivi Nunes em Videira"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Layer 1: Overlays Direcionais (Leitura Perfeita sem preto puro) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0F1115]/90 via-[#0F1115]/65 md:via-[#0F1115]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0F1115] via-[#0F1115]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0F1115]/50 via-transparent to-transparent pointer-events-none" />

        {/* Layer 2: Conteúdo Hero Alinhado à Esquerda no Desktop */}
        <div className="relative z-10 max-w-[1200px] mx-auto my-auto w-full flex flex-col items-center md:items-start text-center md:text-left pt-6 pb-6">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Status Badge com toque de Verde Esmeralda */}
            <div className="hero-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C202B]/90 border border-white/[0.08] backdrop-blur-md mb-6 shadow-lg shadow-black/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Aberto Todos os Dias até as 23:30
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-xs text-zinc-300 font-medium hidden sm:inline">
                3 Quadras (2 Cobertas)
              </span>
            </div>

            {/* H1 Imponente com Outfit */}
            <h1 className="hero-reveal font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.12]">
              Viva a energia da praia no{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                coração de Videira
              </span>
              .
            </h1>

            {/* Subtítulo em Inter com cor cinza suave #A1A1AA */}
            <p className="hero-reveal mt-5 text-base sm:text-lg text-[#A1A1AA] font-normal leading-relaxed max-w-xl">
              Complexo com 3 quadras oficiais de areia higienizada para{" "}
              <strong className="text-white font-semibold">Beach Tennis</strong>,{" "}
              <strong className="text-white font-semibold">Vôlei de Praia</strong> e{" "}
              <strong className="text-white font-semibold">Futevôlei</strong>, além de aulas exclusivas com a ex-atleta profissional{" "}
              <strong className="text-amber-400 font-semibold">Vivi Nunes</strong>.
            </p>

            {/* Ação Dupla com Botão Solar Orange Primário */}
            <div className="hero-reveal mt-8 flex flex-col sm:flex-row items-center md:items-start gap-4 w-full sm:w-auto">
              <a
                href={CONTACTS.jefe.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-xl shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950 stroke-none" />
                <span>Alugar Quadra com Jefe</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <Link
                href="#professores"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-bold text-zinc-200 bg-[#1C202B]/80 hover:bg-[#1C202B] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Aulas com Profª Vivi</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Layer 2: Barra Inferior de Autoridade & Trust Badges */}
        <div className="hero-reveal relative z-10 max-w-[1200px] mx-auto w-full mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 py-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-zinc-300">
              5.0 no Google (Areia Limpa & Fofa)
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 py-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium text-zinc-300">
              3 Quadras: 2 Cobertas (Yago & Eloá) + 1 Aberta
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 py-1">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-medium text-zinc-300">
              Todos os Dias até 23:30 (Iluminação LED)
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.1 MODALIDADES (Fundo Intercalado #151821 & Vôlei em Destaque)  */}
      {/* ============================================================== */}
      <section
        id="modalidades"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#151821] border-t border-b border-white/[0.06] relative"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Sun className="w-3.5 h-3.5" />
              <span>Esporte & Lazer de Alto Padrão</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Modalidades em Areia de Alta Performance
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
              Estrutura planejada com areia higienizada, absorção de impacto e conforto total para jogos com amigos ou aulas com método profissional.
            </p>
          </div>

          {/* Grid de 4 Cards: display flex column com botões 100% alinhados na base */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: Beach Tennis */}
            <div className="card-clean rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10">
                    Mais Popular
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Sun className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Beach Tennis
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  O esporte que virou febre. Ritmo dinâmico, trocas de bola rápidas e clima leve para jogar em duplas.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Raquetes e bolas disponíveis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Horários avulsos ou mensalistas</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <a
                  href={CONTACTS.jefe.beachTennisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Alugar Beach Tennis</span>
                </a>
              </div>
            </div>

            {/* Card 2: Vôlei de Praia (DESTAQUE PRINCIPAL DA PROFª VIVI) */}
            <div className="card-featured rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
              {/* Glow sutil no card em destaque */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950">
                    Destaque • Aulas
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-extrabold text-white">
                  Vôlei de Praia
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Aulas técnicas exclusivas para todas as idades ministradas pela ex-atleta profissional Vivi Nunes, além de locações livres.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-zinc-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Aulas femininas e masculinas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Redes com altura oficial</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-amber-500/20">
                <a
                  href={CONTACTS.viviane.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950 stroke-none" />
                  <span>Aulas com Profª Vivi</span>
                </a>
              </div>
            </div>

            {/* Card 3: Futevôlei */}
            <div className="card-clean rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10">
                    Técnica Pura
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Futevôlei
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  Controle de bola, cabeceio e ataque de perna na areia macia. Perfeito para rachões e treinos entre amigos.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Bola Mikasa oficial disponível</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Quadras cobertas e descoberta</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <a
                  href={CONTACTS.jefe.futevoleiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Alugar Futevôlei</span>
                </a>
              </div>
            </div>

            {/* Card 4: Funcional na Areia */}
            <div className="card-clean rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10">
                    Alta Intensidade
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Funcional na Areia
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  Gasto calórico elevado e ganho de força do core, com a areia fofa protegendo joelhos, tornozelos e coluna.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Redução de impacto articular</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Horários livres e sob consulta</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <a
                  href={CONTACTS.jefe.funcionalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Areia</span>
                </a>
              </div>
            </div>
          </div>

          {/* Banner de Chamada para Locação Mensalista */}
          <div
            id="locacao"
            className="mt-12 rounded-2xl p-8 sm:p-10 card-clean border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="max-w-xl text-center md:text-left">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Planos Mensalistas & Horários Fixos
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
                Garanta o horário fixo da sua turma toda semana
              </h3>
              <p className="text-[#A1A1AA] text-sm mt-2 leading-relaxed">
                São 3 quadras oficiais (2 cobertas e 1 descoberta) funcionando todos os dias até as 23:30. Garanta o melhor horário sem filas.
              </p>
            </div>
            <a
              href={CONTACTS.jefe.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Consultar Grade com Jefe</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.2 SEÇÃO EDITORIAL: PROFª VIVI NUNES (EQUILIBRADA EM 2 COLUNAS) */}
      {/* ============================================================== */}
      <section
        id="professores"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1115] relative"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Liderança Técnica & Inspiração</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Aprenda com quem vive e respira o Vôlei de Praia
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
              Aulas exclusivas de Vôlei de Praia (feminino e masculino) para todas as idades e níveis, ministradas diretamente pela fundadora e idealizadora do CT.
            </p>
          </div>

          {/* Grid Editorial 2 Colunas com Altura Proporcional e Equilíbrio Perfeito */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Lado Esquerdo: Placeholder Vertical Sofisticado para Foto Oficial */}
            <div className="lg:col-span-5 flex flex-col">
              {/* <!-- TROCAR Pela Foto Real: Foto Oficial da Profª Vivi Nunes (Vertical 3:4 ou 4:5) --> */}
              <div className="card-clean rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden group border-amber-500/30">
                {/* Glow sutil */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Área da Foto com Proporção Vertical Definida (aspect 3:4) */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#151821] border border-white/[0.08] flex flex-col items-center justify-between p-6 text-center shadow-inner">
                  {/* Badge de cabeçalho */}
                  <div className="w-full flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Idealizadora do CT
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Centro do Placeholder */}
                  <div className="flex flex-col items-center justify-center my-auto py-4 z-10">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 via-white/5 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl mb-4">
                      <Trophy className="w-10 h-10" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-white">
                      Profª. Vivi Nunes
                    </h4>
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-1">
                      Ex-Atleta Profissional
                    </p>
                    <span className="mt-3 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-400 font-medium">
                      Foto oficial em ensaio fotográfico
                    </span>
                  </div>

                  {/* Badges na Base do Placeholder */}
                  <div className="w-full pt-3 border-t border-white/[0.08] flex items-center justify-around text-center text-[10px] uppercase tracking-wider text-zinc-400 z-10">
                    <div>
                      <span className="block font-bold text-white text-xs">Múltiplos</span>
                      <span>Títulos Estaduais</span>
                    </div>
                    <div className="h-5 w-px bg-white/10" />
                    <div>
                      <span className="block font-bold text-white text-xs">Nacional</span>
                      <span>Etapas de Elite</span>
                    </div>
                  </div>
                </div>

                {/* Rodapé do Card da Esquerda */}
                <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
                  <span>Atendimento Direto:</span>
                  <strong className="text-amber-400 font-bold">(49) 99804-3322</strong>
                </div>
              </div>
            </div>

            {/* Lado Direito: Bio da Atleta, Metodologia e Destaques das Aulas */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Carreira & Metodologia
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1 leading-snug">
                  Da alta performance competitiva para a formação de novos atletas
                </h3>
                <p className="mt-4 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  A <strong className="text-white font-medium">Profª Vivi Nunes</strong> é ex-atleta profissional de vôlei de quadra e vôlei de praia, com trajetória vitoriosa coroada por <strong className="text-white font-medium">vários títulos estaduais</strong> e participações marcantes em etapas de <strong className="text-white font-medium">campeonatos nacionais</strong>.
                </p>
                <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  Hoje vive integralmente da modalidade, transmitindo sua experiência aos alunos do complexo com uma metodologia dinâmica, acolhedora e focada em evolução real.
                </p>
              </div>

              {/* 3 Blocos de Destaque das Aulas com Check em Verde Esmeralda */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#1C202B] border border-white/[0.08] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                      Aulas Exclusivas de Vôlei de Praia (Feminino & Masculino)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5 leading-relaxed">
                      Turmas dedicadas exclusivamente ao voleibol de areia, garantindo evolução técnica em fundamentos e estratégia de jogo.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1C202B] border border-white/[0.08] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                      Para Todas as Idades & Todos os Níveis
                    </h4>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5 leading-relaxed">
                      Atendimento desde quem nunca jogou e quer começar do zero, até jogadores que buscam ritmo competitivo e potência.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1C202B] border border-white/[0.08] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                      Fundamentos Sólidos & Proteção Articular
                    </h4>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5 leading-relaxed">
                      Domínio de saque, manchete, levantamento, ataque e bloqueio na areia macia, com queima calórica e condicionamento sem sobrecarga.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão de Contato Direto */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={CONTACTS.viviane.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-stone-950 stroke-none" />
                  <span>Agendar Aula com Profª Vivi Nunes</span>
                </a>
                <span className="text-xs text-zinc-400">
                  WhatsApp: <strong className="text-white">(49) 99804-3322</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.3 ESTRUTURA: GALERIA DAS 3 QUADRAS & PILARES (#151821)       */}
      {/* ============================================================== */}
      <section
        id="estrutura"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#151821] border-t border-b border-white/[0.06] relative"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Infraestrutura Completa</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Nossa Estrutura: 3 Quadras Oficiais
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
              Conforto do início ao pós-jogo. Duas quadras cobertas para jogar protegido faça chuva ou sol, e uma quadra ao ar livre.
            </p>
          </div>

          {/* Grid da Galeria das 3 Quadras (Placeholders com Aspect-Ratio Definido) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* <!-- TROCAR Pela Foto Real: Quadra 1 Coberta (Yago) --> */}
            <div className="card-clean rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1C202B] border border-white/[0.08] flex flex-col items-center justify-center text-center p-4 shadow-inner mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-bold text-sm text-white">
                    Quadra 1 Coberta
                  </span>
                  <span className="text-xs font-semibold text-amber-400 mt-0.5">
                    Yago
                  </span>
                  <span className="mt-2 text-[10px] text-zinc-400 uppercase tracking-wider">
                    Foto real em breve
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Cobertura Completa</span>
                </div>
                <h4 className="font-heading font-bold text-base text-white">
                  Quadra 1 • Yago (Coberta)
                </h4>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Protegida contra vento, frio e chuva forte. Areia higienizada profunda e iluminação LED para jogos e treinos sem interrupções.
                </p>
              </div>
            </div>

            {/* <!-- TROCAR Pela Foto Real: Quadra 2 Coberta (Eloá) --> */}
            <div className="card-clean rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1C202B] border border-white/[0.08] flex flex-col items-center justify-center text-center p-4 shadow-inner mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-bold text-sm text-white">
                    Quadra 2 Coberta
                  </span>
                  <span className="text-xs font-semibold text-amber-400 mt-0.5">
                    Eloá
                  </span>
                  <span className="mt-2 text-[10px] text-zinc-400 uppercase tracking-wider">
                    Foto real em breve
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Cobertura Completa</span>
                </div>
                <h4 className="font-heading font-bold text-base text-white">
                  Quadra 2 • Eloá (Coberta)
                </h4>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Excelente ventilação e conforto térmico. Redes com regulagem oficial para Beach Tennis, Vôlei de Praia e Futevôlei.
                </p>
              </div>
            </div>

            {/* <!-- TROCAR Pela Foto Real: Quadra 3 Descoberta (Ao Ar Livre) --> */}
            <div className="card-clean rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1C202B] border border-white/[0.08] flex flex-col items-center justify-center text-center p-4 shadow-inner mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2">
                    <Sun className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-bold text-sm text-white">
                    Quadra 3 Descoberta
                  </span>
                  <span className="text-xs font-semibold text-amber-400 mt-0.5">
                    Open Air
                  </span>
                  <span className="mt-2 text-[10px] text-zinc-400 uppercase tracking-wider">
                    Foto real em breve
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Ambiente ao Ar Livre</span>
                </div>
                <h4 className="font-heading font-bold text-base text-white">
                  Quadra 3 • Descoberta
                </h4>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Toda a energia e liberdade da praia sob a brisa natural, equipada com refletores LED para manter as partidas acesas à noite.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Pilares de Conforto da Estrutura */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-clean rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-heading text-sm font-bold text-white">
                  Aberto Todos os Dias até 23:30
                </h5>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Iluminação noturna em LED sem pontos cegos nem ofuscamento para você jogar no melhor horário.
                </p>
              </div>
            </div>

            <div className="card-clean rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-heading text-sm font-bold text-white">
                  Areia Higienizada & Fofa
                </h5>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Tratamento preventivo constante contra fungos e bactérias. Toque macio que absorve impactos e protege articulações.
                </p>
              </div>
            </div>

            <div className="card-clean rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-heading text-sm font-bold text-white">
                  Vestiários & Convivência
                </h5>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Espaço social para confraternização e resenha pós-jogo, vestiários limpos e estacionamento facilitado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.4 PROVA SOCIAL REAL (Avaliações Google 5.0★)                 */}
      {/* ============================================================== */}
      <section
        id="avaliacoes"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1115]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>Nota Máxima no Google Reviews (5.0★)</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Quem joga no CT Vivi Nunes recomenda
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
              A opinião espontânea de quem frequenta nossas quadras todos os dias em Videira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-clean p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-200 italic font-normal leading-relaxed">
                  &ldquo;Amo esse lugar, quadras de areia sempre muito limpas e areia fofinha.&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs sm:text-sm">Gabriela Serena</h5>
                  <span className="text-[11px] text-zinc-400">Avaliação do Google</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">
                  G
                </div>
              </div>
            </div>

            <div className="card-clean p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-200 italic font-normal leading-relaxed">
                  &ldquo;Estrutura fantástica! As quadras cobertas salvam os dias de chuva e a iluminação à noite é excelente.&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs sm:text-sm">Matheus R.</h5>
                  <span className="text-[11px] text-zinc-400">Praticante de Vôlei</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">
                  M
                </div>
              </div>
            </div>

            <div className="card-clean p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-200 italic font-normal leading-relaxed">
                  &ldquo;Aulas com a Vivi são de outro nível. Ela tem uma paciência e técnica que faz a gente evoluir rápido.&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs sm:text-sm">Juliana P.</h5>
                  <span className="text-[11px] text-zinc-400">Aluna de Vôlei de Praia</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">
                  J
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.5 FAQ (Perguntas Frequentes #151821)                         */}
      {/* ============================================================== */}
      <section
        id="faq"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-[#151821] border-t border-b border-white/[0.06]"
      >
        <div className="max-w-[850px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Tire Suas Dúvidas
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((item, index) => (
              <div
                key={index}
                className="card-clean rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={activeFaq === index}
                >
                  <span className="font-heading font-semibold text-sm sm:text-base text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform duration-200 flex-shrink-0 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-white/[0.06]">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.6 LOCALIZAÇÃO: GOOGLE MAPS INTEGRADO & CONTATOS RÁPIDOS      */}
      {/* ============================================================== */}
      <section
        id="localizacao"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1115]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Venha Nos Conhecer
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1">
              Localização & Canais de Atendimento
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
              Nova sede ampla no bairro Santa Lúcia, em Videira - SC. Fácil estacionamento e acesso rápido.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Coluna Esquerda: IFRAME do Google Maps Integrado com Estilo Clean */}
            <div className="lg:col-span-7 flex flex-col justify-between card-clean rounded-2xl p-4 sm:p-5">
              <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-inner bg-[#151821] w-full h-[320px] sm:h-[380px] relative">
                <iframe
                  title="Localização do CT Vivi Nunes no Google Maps"
                  src={CONTACTS.location.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[25%] contrast-[1.05]"
                />
              </div>

              <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#A1A1AA] text-center sm:text-left">
                  <strong className="text-white block font-medium">Endereço Oficial:</strong>
                  <span>R. Benedito Tomaz Scussiato, 200 - Santa Lúcia, Videira - SC</span>
                </div>
                <a
                  href={CONTACTS.location.googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Abrir Rotas GPS</span>
                </a>
              </div>
            </div>

            {/* Coluna Direita: Cards de Atendimento e Informações */}
            <div className="lg:col-span-5 card-clean rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-4">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Aberto todos os dias até 23:30</span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  Fale Direto com os Responsáveis
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                  Clique para abrir a conversa no WhatsApp com a mensagem pronta:
                </p>

                <div className="mt-6 space-y-3">
                  {/* Card Jefe */}
                  <a
                    href={CONTACTS.jefe.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-[#151821] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-heading font-bold text-white text-sm">
                          Jefe (Locação de Quadras)
                        </h5>
                        <span className="text-xs text-[#A1A1AA]">
                          {CONTACTS.jefe.phoneDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Card Profª Vivi Nunes */}
                  <a
                    href={CONTACTS.viviane.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-[#151821] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-heading font-bold text-white text-sm">
                          Profª. Vivi Nunes (Aulas de Vôlei)
                        </h5>
                        <span className="text-xs text-[#A1A1AA]">
                          {CONTACTS.viviane.phoneDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Instagram */}
                  <a
                    href={CONTACTS.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-[#151821] hover:bg-white/5 border border-white/[0.08] flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 text-amber-400 flex items-center justify-center">
                        <InstagramIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-heading font-bold text-white text-sm">
                          Instagram Oficial
                        </h5>
                        <span className="text-xs text-[#A1A1AA]">
                          {CONTACTS.social.handle}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-center text-xs text-zinc-400">
                Atendimento rápido todos os dias no WhatsApp.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.7 FOOTER INSTITUCIONAL (#0A0C0E)                             */}
      {/* ============================================================== */}
      <footer className="relative bg-[#0A0C0E] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
            {/* Coluna 1: Logo & Resumo */}
            <div className="md:col-span-5 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                  CT
                </span>
                <span className="font-heading font-black text-2xl tracking-tight bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  VIVI NUNES
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed max-w-sm">
                Complexo Esportivo de Areia com 3 quadras oficiais (2 cobertas e 1 descoberta) para Beach Tennis, Vôlei de Praia e Futevôlei. Fundado em 2023 em Videira - SC.
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <a
                  href={CONTACTS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  aria-label="Instagram Oficial"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  aria-label="WhatsApp Central"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="md:col-span-3">
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
                Navegação
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                <li>
                  <Link href="#modalidades" className="hover:text-amber-400 transition-colors">
                    Modalidades
                  </Link>
                </li>
                <li>
                  <Link href="#locacao" className="hover:text-amber-400 transition-colors">
                    Locações & Mensalistas
                  </Link>
                </li>
                <li>
                  <Link href="#professores" className="hover:text-amber-400 transition-colors">
                    Profª. Vivi Nunes (Aulas)
                  </Link>
                </li>
                <li>
                  <Link href="#estrutura" className="hover:text-amber-400 transition-colors">
                    3 Quadras & Estrutura
                  </Link>
                </li>
                <li>
                  <Link href="#localizacao" className="hover:text-amber-400 transition-colors">
                    Localização no Santa Lúcia
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Atendimento */}
            <div className="md:col-span-4">
              <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
                Atendimento
              </h5>
              <div className="space-y-2 text-xs sm:text-sm text-[#A1A1AA]">
                <p>
                  <strong className="text-white">Locações (Jefe):</strong> (49) 99948-6797
                </p>
                <p>
                  <strong className="text-white">Aulas (Profª. Vivi Nunes):</strong> (49) 99804-3322
                </p>
                <p className="pt-1.5 text-zinc-400 text-xs">
                  R. Benedito Tomaz Scussiato, 200 - Santa Lúcia, Videira - SC
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
            <p>© 2026 CT Vivi Nunes. Todos os direitos reservados.</p>
            <p>Design esportivo clean & de alta conversão</p>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* D. FLOATING WHATSAPP CTA (Aparece somente após scrollY > 400px) */}
      {/* ============================================================== */}
      <aside
        aria-label="Atendimento WhatsApp CT Vivi Nunes"
        className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 transition-all duration-300 ${
          showFloatingBtn
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Modal de canais de WhatsApp */}
        {showWaModal && (
          <div className="w-72 p-4 rounded-2xl bg-[#1C202B]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Falar pelo WhatsApp
              </span>
              <button
                onClick={() => setShowWaModal(false)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <a
                href={CONTACTS.jefe.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWaModal(false)}
                className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white flex items-center justify-between transition-colors text-xs font-semibold"
              >
                <span>Reservar Quadra (Jefe)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACTS.viviane.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWaModal(false)}
                className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white flex items-center justify-between transition-colors text-xs font-semibold"
              >
                <span>Aulas de Vôlei (Profª Vivi Nunes)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Botão Flutuante Principal */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWaModal(!showWaModal)}
            className="group relative flex items-center justify-center h-14 px-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-2xl shadow-orange-500/35 transition-transform active:scale-95 duration-200"
            aria-label="Abrir canais de WhatsApp"
          >
            {/* Pulsing beacon verde esmeralda */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300" />
            </span>
            <MessageCircle className="w-6 h-6 mr-2 fill-stone-950 stroke-none" />
            <span className="font-heading font-extrabold text-sm tracking-wide uppercase">
              Reservar Horário
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
