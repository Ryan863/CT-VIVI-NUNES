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
      "Nosso complexo dispõe de 3 quadras oficiais de areia higienizada: 2 quadras totalmente cobertas (Quadra 1 'Yago' e Quadra 2 'Eloá'), garantindo jogos confortáveis em qualquer condição climática (sol forte, chuva ou frio), e 1 quadra descoberta ao ar livre para quem aprecia o clima da praia. Todas contam com iluminação profissional em LED.",
  },
  {
    question: "Quais aulas são oferecidas no complexo?",
    answer:
      "Oferecemos aulas exclusivas de Vôlei de Praia (feminino e masculino) para todas as idades e todos os níveis, ministradas diretamente pela Profª Vivi Nunes — ex-atleta profissional de vôlei de quadra e praia com múltiplos títulos estaduais e passagens por campeonatos nacionais. Atendemos desde quem nunca tocou na bola até quem deseja aperfeiçoamento tático e de alto rendimento.",
  },
  {
    question: "Como funciona a locação de quadras avulsas e horários mensalistas?",
    answer:
      "Você pode alugar horários avulsos por hora para seu grupo de amigos (Beach Tennis, Vôlei de Praia ou Futevôlei) ou fechar um plano mensalista com dia e horário fixo garantido toda semana. Basta enviar uma mensagem para o WhatsApp do Jefe para verificar a disponibilidade da grade e reservar instantaneamente.",
  },
  {
    question: "Qual é o horário de funcionamento das quadras?",
    answer:
      "Funcionamos todos os dias da semana até as 23:30 hrs! Nossa iluminação potente em refletores de LED é calculada para eliminar sombras e pontos cegos, garantindo partidas noturnas com visibilidade perfeita.",
  },
  {
    question: "O complexo fornece raquetes e bolas para uso durante os jogos?",
    answer:
      "Sim! Nas aulas de Vôlei de Praia, todo o material esportivo oficial está 100% incluso. Para locações avulsas ou mensalistas de Beach Tennis e Vôlei, também disponibilizamos suporte de bolas oficiais e suporte de raquetes mediante consulta prévia.",
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

  // Garantir refresh do ScrollTrigger após carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations com clearProps para nunca travar visibilidade
  useGSAP(
    () => {
      // Navbar scroll background animation
      const navbar = document.getElementById("main-navbar");
      if (navbar) {
        ScrollTrigger.create({
          start: "top -60",
          onUpdate: (self) => {
            if (self.progress > 0) {
              navbar.classList.add(
                "bg-[#0B0C0E]/95",
                "backdrop-blur-xl",
                "border-white/10",
                "shadow-2xl"
              );
              navbar.classList.remove("bg-transparent", "border-transparent");
            } else {
              navbar.classList.remove(
                "bg-[#0B0C0E]/95",
                "backdrop-blur-xl",
                "border-white/10",
                "shadow-2xl"
              );
              navbar.classList.add("bg-transparent", "border-transparent");
            }
          },
        });
      }

      // Hero reveal
      gsap.fromTo(
        ".hero-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.1,
          clearProps: "all",
        }
      );

      // Bento cards reveal
      gsap.fromTo(
        ".bento-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: "#modalidades",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Teachers cards reveal seguro
      gsap.fromTo(
        ".teacher-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: "#professores",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Structure pillars reveal
      gsap.fromTo(
        ".structure-pillar",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: "#estrutura",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Testimonial cards reveal
      gsap.fromTo(
        ".testimonial-card",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: "#avaliacoes",
            start: "top 90%",
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
      className="relative min-h-screen bg-[#0B0C0E] text-[#F8FAFC] overflow-x-hidden selection:bg-amber-500 selection:text-black"
    >
      {/* ============================================================== */}
      {/* A. NAVBAR EDITORIAL (Sticky com Blur e Paleta Solar Refinada)  */}
      {/* ============================================================== */}
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Tipográfica Oficial (Cores Quentes/Solares e Elegantes) */}
          <Link
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl py-1 px-2 -ml-2 transition-colors hover:bg-white/5"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white font-syne">
                  CT
                </span>
                <span className="font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent font-syne drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">
                  VIVI NUNES
                </span>
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-stone-400 group-hover:text-amber-300 transition-colors -mt-0.5">
                Complexo de Areia • Videira
              </span>
            </div>
          </Link>

          {/* Links Centrais de Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
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
              Professores & Aulas
            </Link>
            <Link
              href="#estrutura"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Nossa Estrutura
            </Link>
            <Link
              href="#avaliacoes"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Avaliações (5.0★)
            </Link>
            <Link
              href="#localizacao"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Localização
            </Link>
          </nav>

          {/* CTA Direita Desktop (Dourado Solar de Alto Padrão) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={CONTACTS.jefe.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-stone-950 stroke-none" />
              <span>Reservar Quadra</span>
            </a>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-amber-400 transition-colors"
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
          <div className="lg:hidden bg-[#0B0C0E]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-5 text-base font-semibold text-slate-200">
              <Link
                href="#modalidades"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Modalidades Esportivas</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#locacao"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Locação de Quadras</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#professores"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Professores & Metodologia</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#estrutura"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Diferenciais da Estrutura</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#avaliacoes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Avaliações dos Alunos (5.0★)</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#localizacao"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-amber-400 flex items-center justify-between"
              >
                <span>Localização & Contato</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-bold text-center text-sm uppercase tracking-wide bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
                >
                  <MessageCircle className="w-5 h-5 fill-stone-950 stroke-none" />
                  Reservar com Jefe no WhatsApp
                </a>
                <a
                  href={CONTACTS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-medium text-center text-sm text-slate-300 bg-white/5 border border-white/10 flex items-center justify-center gap-2"
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
      {/* B. 1ª DOBRA: HERO SECTION (TEXTO NO LADO ESQUERDO NO DESKTOP)  */}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative isolate min-h-[100dvh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
      >
        {/* Layer 0: Imagem Desktop (16:9) em tela cheia com a bola e rede à direita */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Image
            src={ASSETS.heroDesktop}
            alt="Quadra de areia do CT Vivi Nunes com iluminação natural em Videira"
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

        {/* Layer 1: Overlay Inteligente (Degradê lateral à esquerda para leitura perfeita, mantendo a bola e o pôr do sol limpos à direita) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 md:via-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Layer 2: Conteúdo Hero Alinhado à Esquerda no Desktop (Espaço nobre aberto) */}
        <div className="relative z-10 max-w-7xl mx-auto my-auto w-full flex flex-col items-center md:items-start text-center md:text-left pt-6 pb-6">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Eyebrow Badge Editorial */}
            <div className="hero-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 backdrop-blur-md mb-6 shadow-lg shadow-black/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-amber-300">
                Complexo Esportivo de Areia • Videira - SC
              </span>
            </div>

            {/* H1 Imponente */}
            <h1 className="hero-reveal font-extrabold text-4xl sm:text-6xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Viva a energia da praia no{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                coração de Videira
              </span>
              .
            </h1>

            {/* Subtítulo */}
            <p className="hero-reveal mt-6 text-base sm:text-xl text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-xl">
              Complexo com <strong className="text-white font-bold">3 quadras de areia</strong> (2 cobertas e 1 descoberta) para <strong className="text-white font-bold">Beach Tennis</strong>, <strong className="text-white font-bold">Vôlei de Praia</strong> e <strong className="text-white font-bold">Futevôlei</strong>, além de aulas exclusivas com a ex-atleta profissional <strong className="text-amber-300 font-bold">Vivi Nunes</strong>.
            </p>

            {/* Ação Dupla */}
            <div className="hero-reveal mt-9 flex flex-col sm:flex-row items-center md:items-start gap-4 w-full sm:w-auto">
              {/* Botão Primário: WhatsApp Jefe (Dourado Solar de Alto Padrão) */}
              <a
                href={CONTACTS.jefe.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950 stroke-none" />
                <span>Alugar Quadra com Jefe</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Botão Secundário: Aulas de Vôlei com Vivi Nunes */}
              <Link
                href="#professores"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/40"
              >
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Aulas de Vôlei com Profª Vivi</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Layer 2: Barra Inferior de Autoridade / Trust Badges */}
        <div className="hero-reveal relative z-10 max-w-7xl mx-auto w-full mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 py-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow-md">
              5.0 no Google (Areia Higienizada)
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 py-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow-md">
              3 Quadras (2 Cobertas + 1 Descoberta)
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 py-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow-md">
              Aberto Todos os Dias até 23:30 (LED)
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.1 GRADE DE MODALIDADES E LOCAÇÃO (Bento Grid Sports Luxury)  */}
      {/* ============================================================== */}
      <section
        id="modalidades"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      >
        {/* Glow suave e quente */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
            <Sun className="w-3.5 h-3.5" />
            <span>O Melhor Piso para a Sua Performance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Modalidades em Areia de Alto Padrão
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Estrutura planejada para garantir máxima aderência, absorção de
            impacto e diversão entre amigos ou em nível competitivo.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Beach Tennis */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  Mais Popular
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Sun className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                Beach Tennis
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                O esporte que conquistou o Brasil. Ritmo dinâmico, trocas de bola
                rápidas e clima de confraternização perfeito para jogar em duplas.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Raquetes e bolas disponíveis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Horários avulsos ou mensalistas</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.beachTennisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Alugar Beach Tennis</span>
            </a>
          </div>

          {/* Card 2: Vôlei de Praia */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  Tradição & Salto
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                Vôlei de Praia
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Treinos de fundamentos (saque, manchete, levantamento e bloqueio),
                partidas livres de 2x2 ou 4x4 e torneios sazonais.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Redes com regulagem oficial</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Areia profunda para impulsão</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.voleiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Alugar Vôlei de Areia</span>
            </a>
          </div>

          {/* Card 3: Futevôlei */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/20">
                  Técnica Pura
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                Futevôlei
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Desenvolva controle de bola, recepção de peito, cabeceio e
                ataque de perna na areia macia. Treinos táticos e rachões amistosos.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Bola Mikasa oficial disponível</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Turmas de iniciação e avançado</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.futevoleiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Alugar Futevôlei</span>
            </a>
          </div>

          {/* Card 4: Funcional na Areia */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  Alta Intensidade
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                Funcional na Areia
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Potencialize a queima de gordura, fortaleça o core e ganhe
                resistência muscular com o dobro de gasto calórico e baixo impacto
                nas articulações.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Proteção contra lesões articulares</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Prescrição com profissionais formados</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.funcionalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500 hover:text-stone-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Funcional</span>
            </a>
          </div>
        </div>

        {/* Banner de Chamada para Locação Mensalista e Grupos */}
        <div
          id="locacao"
          className="mt-12 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-amber-950/30 via-stone-900 to-orange-950/30 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Planos Mensalistas & Eventos Corporativos
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Garanta o horário fixo da sua turma toda semana
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Evite a disputa por horários nobres de fim de tarde e finais de
              semana. Condições especiais para grupos mensais e confraternizações.
            </p>
          </div>
          <a
            href={CONTACTS.jefe.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 transition-all hover:scale-105 shadow-xl shadow-amber-500/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Consultar Grade com Jefe</span>
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.2 EQUIPE TÉCNICA & METODOLOGIA (Split Editorial Robusto)     */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* C.2 SEÇÃO EDITORIAL: PROFª VIVI NUNES (EX-ATLETA PROFISSIONAL) */}
      {/* ============================================================== */}
      <section
        id="professores"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Ex-Atleta Profissional & Liderança Técnica</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Aprenda com quem vive e respira o Vôlei de Praia
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Aulas exclusivas de Vôlei de Praia feminino e masculino para todas as idades e níveis, ministradas diretamente pela fundadora e idealizadora do CT.
          </p>
        </div>

        {/* Grid Editorial Split: Moldura de Foto da Atleta + Bio Completa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Lado Esquerdo: Espaço Reservado para a Foto Oficial da Profª Vivi Nunes */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="teacher-card w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1A1D21] via-[#14171A] to-[#0D0F12] border border-amber-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden group hover:border-amber-400/60 transition-all duration-500">
              {/* Glows de iluminação solar e areia */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Moldura Fotográfica Editorial */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex flex-col items-center justify-between p-6 text-center shadow-inner">
                {/* Linha Decorativa Superior com Selo */}
                <div className="w-full flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    Profª Vivi Nunes
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                {/* Centro: Arte Editorial & Placeholder Sofisticado */}
                <div className="flex flex-col items-center justify-center my-auto py-6 z-10">
                  <div className="relative mb-5">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-500/20 via-white/10 to-amber-400/30 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-2xl shadow-amber-500/20 animate-pulse">
                      <Trophy className="w-12 h-12" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] items-center justify-center shadow-md">
                      ★
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-white tracking-wide">
                    Profª. Vivi Nunes
                  </h4>
                  <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase mt-1">
                    Ex-Atleta Profissional
                  </p>
                  <span className="mt-3 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium">
                    Foto oficial a ser inserida em breve
                  </span>
                </div>

                {/* Badge Inferior */}
                <div className="w-full pt-4 border-t border-white/10 flex items-center justify-around text-center text-[10px] uppercase tracking-wider text-slate-400 z-10">
                  <div>
                    <span className="block font-black text-white text-xs text-amber-300">Múltiplos</span>
                    <span>Títulos Estaduais</span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div>
                    <span className="block font-black text-white text-xs text-amber-300">Nacional</span>
                    <span>Passagem de Elite</span>
                  </div>
                </div>
              </div>

              {/* Informação de Contato Rápido no Card */}
              <div className="mt-5 flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Atendimento Aulas:</span>
                <strong className="text-amber-400 font-bold">(49) 99804-3322</strong>
              </div>
            </div>
          </div>

          {/* Lado Direito: História da Atleta, Títulos e Detalhes das Aulas */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trajetória Vitoriosa</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Da alta performance competitiva para a formação de novos atletas
              </h3>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
                A <strong className="text-white font-bold">Profª Vivi Nunes</strong> é ex-atleta profissional de voleibol de quadra e de praia, com uma carreira vitoriosa construída ao longo de anos dedicados ao esporte de alto rendimento. Detentora de <strong className="text-amber-300 font-bold">vários títulos estaduais</strong> e passagens marcantes por etapas de <strong className="text-amber-300 font-bold">campeonatos nacionais</strong>, ela traz uma bagagem competitiva ímpar para Videira e região.
              </p>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                Hoje, Vivi vive integralmente da modalidade, dedicando-se com amor e disciplina ao treinamento no complexo esportivo. Seu propósito é compartilhar cada segredo tático, ajuste biomecânico e a paixão pelo vôlei com seus alunos.
              </p>
            </div>

            {/* 3 Pilares Específicos das Aulas de Vôlei de Praia */}
            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-3.5 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Aulas Exclusivas de Vôlei de Praia (Feminino & Masculino)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">
                    Aulas focadas estritamente na modalidade de areia, garantindo dedicação total à evolução técnica de cada turma.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-3.5 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Para Todas as Idades e Todos os Níveis
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">
                    Desde o nível iniciante absoluto (que nunca praticou) até praticantes avançados. Didática paciente, acolhedora e motivadora.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-3.5 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Fundamentos Sólidos & Visão Tática de Jogo
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">
                    Domínio de saque, manchete, levantamento, ataque e bloqueio na areia macia, com melhora visível de reflexo, condicionamento e impulsão.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA com Botão Dourado de Contato Direto */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={CONTACTS.viviane.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 transition-all hover:scale-105 shadow-xl shadow-amber-500/25"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950 stroke-none" />
                <span>Agendar Aula com Profª Vivi Nunes</span>
              </a>
              <span className="text-xs text-slate-400">
                Ou ligue direto: <strong className="text-white">(49) 99804-3322</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.3 DIFERENCIAIS DA NOSSA ESTRUTURA (Com Emblema Oficial)      */}
      {/* ============================================================== */}
      <section
        id="estrutura"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado Esquerdo: Emblema Oficial Completo com Selo */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/15 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src={ASSETS.officialLogo}
                  alt="Selo Oficial CT Vivi Nunes - Desde 2023"
                  fill
                  className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-6">
              <span className="text-xs font-black tracking-widest uppercase text-amber-400">
                Padrão Premium Garantido
              </span>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                O complexo que transformou a prática de esportes de areia em Videira e região.
              </p>
            </div>
          </div>

          {/* Lado Direito: Os 4 Pilares da Estrutura */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Infraestrutura Completa
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                Projetado para o seu conforto do início ao pós-jogo
              </h2>
            </div>

            {/* Pilar 1: 3 Quadras Oficiais (2 Cobertas + 1 Descoberta) */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  3 Quadras Oficiais: 2 Cobertas (Yago & Eloá) e 1 Aberta
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Infraestrutura rara e privilegiada na região: a <strong className="text-white">Quadra 1 (Yago)</strong> e a <strong className="text-white">Quadra 2 (Eloá)</strong> contam com cobertura completa para você jogar ou ter aulas protegido de chuva, frio ou sol forte. E para os dias ensolarados, nossa <strong className="text-white">Quadra 3 Descoberta</strong> traz toda a vibe da praia ao ar livre.
                </p>
              </div>
            </div>

            {/* Pilar 2: Iluminação Noturna em LED até 23:30 */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Aberto Todos os Dias até as 23:30 (LED Sem Pontos Cegos)
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Atendimento diário de segunda a domingo até as 23:30 hrs! Refletores potentes em LED de alto rendimento, eliminando pontos cegos e garantindo partidas noturnas com visibilidade perfeita.
                </p>
              </div>
            </div>

            {/* Pilar 3: Areia Fofinha & Higienizada */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Areia Fofinha, Filtrada & Higienizada
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Tratamento preventivo constante contra fungos e bactérias. Areia macia, limpa e profunda, protegendo as articulações dos joelhos e coluna a cada salto e mergulho.
                </p>
              </div>
            </div>

            {/* Pilar 4: Novo Endereço no Santa Lúcia */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Nova Sede Ampla no Bairro Santa Lúcia
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Novo endereço privilegiado: <strong className="text-white">R. Benedito Tomaz Scussiato, 200 - Santa Lúcia, Videira - SC</strong>. Estacionamento amplo, fácil acesso e ambiente seguro e acolhedor para toda a sua família.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.4 PROVA SOCIAL REAL (Avaliações do Google - 5.0★)            */}
      {/* ============================================================== */}
      <section
        id="avaliacoes"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>Nota Máxima no Google Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Quem joga no CT Vivi Nunes recomenda
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A opinião espontânea de quem frequenta nossas quadras todos os dias.
          </p>
        </div>

        {/* Grid de Depoimentos Reais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Depoimento 1: Gabriela Serena */}
          <div className="testimonial-card p-8 rounded-3xl bg-[#14171A] border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-base text-slate-200 italic font-medium leading-relaxed">
                &ldquo;Amo esse lugar, quadras de areia sempre muito limpas e
                areia fofinha.&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">Gabriela Serena</h5>
                <span className="text-xs text-slate-400">Avaliação do Google</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-amber-400">
                G
              </div>
            </div>
          </div>

          {/* Depoimento 2: Ivonete Soligo */}
          <div className="testimonial-card p-8 rounded-3xl bg-[#14171A] border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-base text-slate-200 italic font-medium leading-relaxed">
                &ldquo;Profissionais competentes, atendimento nota mil...&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">Ivonete Soligo</h5>
                <span className="text-xs text-slate-400">Avaliação do Google</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-orange-400">
                I
              </div>
            </div>
          </div>

          {/* Depoimento 3: Atleta de Videira */}
          <div className="testimonial-card p-8 rounded-3xl bg-[#14171A] border border-white/10 flex flex-col justify-between shadow-xl md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-base text-slate-200 italic font-medium leading-relaxed">
                &ldquo;Melhor estrutura de areia de Videira. A iluminação de LED
                permite jogos noturnos perfeitos e o clima pós-jogo com a galera
                é sensacional!&rdquo;
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">Marcos Vinícius</h5>
                <span className="text-xs text-slate-400">Atleta Mensalista</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-amber-400">
                M
              </div>
            </div>
          </div>
        </div>

        {/* Selo Central Google 5.0 */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white">5.0</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
            </div>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="text-xs sm:text-sm text-slate-300">
              100% de satisfação certificada pelos nossos atletas e alunos
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.5 FAQ ESTRUTURADO (Quebra de Objeções via Accordion)         */}
      {/* ============================================================== */}
      <section
        id="faq"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5"
      >
        <div className="text-center mb-16">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Tudo o que você precisa saber para começar a jogar e treinar conosco.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#14171A] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-amber-500/20 text-amber-400" : "text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-slate-300 leading-relaxed animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.6 LOCALIZAÇÃO, HORÁRIOS & CONTATO DIRETO                     */}
      {/* ============================================================== */}
      <section
        id="localizacao"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
            Venha Nos Conhecer
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
            Localização & Canais de Atendimento
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            No Bairro Santa Lúcia, em Videira. Estamos prontos para receber você e seus amigos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Esquerdo: Endereço & Rota GPS */}
          <div className="lg:col-span-7 rounded-3xl bg-[#14171A] border border-white/10 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">CT Vivi Nunes</h3>
                  <span className="text-xs text-slate-400">
                    Complexo Esportivo de Areia • Desde 2023
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Novo Endereço Oficial:</strong>
                    <p className="text-slate-300 mt-0.5">
                      R. Benedito Tomaz Scussiato, 200 - Bairro Santa Lúcia, Videira - SC, CEP 89565-350.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Horários de Funcionamento:</strong>
                    <p className="text-slate-300 mt-0.5">
                      Aberto todos os dias: 07h às 23:30 (Iluminação Noturna em LED)
                      <br />
                      3 Quadras: 2 Cobertas (Yago & Eloá) e 1 Aberta
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <InstagramIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Instagram Oficial:</strong>
                    <p className="mt-0.5">
                      <a
                        href={CONTACTS.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline font-semibold"
                      >
                        @ct_vivinunes
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ação de GPS Imediata */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACTS.location.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-200"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Traçar Rota no Google Maps / Waze</span>
              </a>
            </div>
          </div>

          {/* Card Direito: Central Direta com a Equipe */}
          <div className="lg:col-span-5 rounded-3xl bg-[#14171A] border border-white/10 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Atendimento Rápido
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Fale Direto com os Responsáveis
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Clique para abrir a conversa no WhatsApp com a mensagem pronta:
              </p>

              <div className="mt-6 space-y-3">
                {/* Jefe */}
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">
                        Jefe (Locação de Quadras)
                      </h5>
                      <span className="text-xs text-slate-400">
                        {CONTACTS.jefe.phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Profª Viviane */}
                <a
                  href={CONTACTS.viviane.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">
                        Profª. Vivi Nunes (Aulas de Vôlei)
                      </h5>
                      <span className="text-xs text-slate-400">
                        {CONTACTS.viviane.phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              Atendimento ágil todos os dias no WhatsApp oficial.
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.7 FOOTER DE CONVERSÃO & CRÉDITOS INSTITUCIONAIS              */}
      {/* ============================================================== */}
      <footer className="relative bg-[#07080A] border-t border-white/10 pt-20 pb-12 overflow-hidden">
        {/* Glow sutil quente */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner Pré-Footer de Conversão Rápida */}
          <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#14171A] to-[#0B0C0E] border border-white/10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Viva a Experiência da Areia
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-4">
                Pronto para entrar em quadra?
              </h3>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Garanta seu horário com seus amigos ou comece a treinar nesta semana.
                Consulte horários disponíveis no WhatsApp agora mesmo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 fill-stone-950 stroke-none" />
                  <span>Reservar Quadra com Jefe</span>
                </a>
                <a
                  href={CONTACTS.viviane.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
                >
                  <span>Informações sobre Aulas</span>
                </a>
              </div>
            </div>
          </div>

          {/* Grid Principal do Rodapé */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
            {/* Coluna 1: Logo Tipográfica e Resumo */}
            <div className="md:col-span-5 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-extrabold text-2xl tracking-tight text-white font-syne">
                  CT
                </span>
                <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent font-syne">
                  VIVI NUNES
                </span>
                <span className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Complexo Esportivo de Areia com foco em Beach Tennis, Vôlei de
                Praia, Futevôlei e Treinamento Funcional. Fundado em 2023 em
                Videira - SC.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={CONTACTS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  aria-label="Instagram Oficial"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  aria-label="WhatsApp Central"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação Rápida */}
            <div className="md:col-span-3">
              <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
                Navegação
              </h5>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <Link href="#modalidades" className="hover:text-amber-400 transition-colors">
                    Beach Tennis & Vôlei
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
                    Diferenciais da Quadra
                  </Link>
                </li>
                <li>
                  <Link href="#localizacao" className="hover:text-amber-400 transition-colors">
                    Como Chegar (Maps)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Contatos Diretos */}
            <div className="md:col-span-4">
              <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
                Atendimento
              </h5>
              <div className="space-y-2 text-xs sm:text-sm text-slate-400">
                <p>
                  <strong className="text-white">Locações (Jefe):</strong> (49) 99948-6797
                </p>
                <p>
                  <strong className="text-white">Aulas (Profª. Vivi Nunes):</strong> (49) 99804-3322
                </p>
                <p className="pt-2 text-slate-500 text-xs">
                  R. Benedito Tomaz Scussiato, 200 - Santa Lúcia, Videira - SC
                </p>
              </div>
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>
              © 2026 CT Vivi Nunes. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1">
              <span>Desenvolvido com padrão editorial de alta conversão</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* D. FLOATING WHATSAPP CTA COM MULTI-DESTINO & PULSE SOLAR       */}
      {/* ============================================================== */}
      <aside
        aria-label="Atendimento WhatsApp CT Vivi Nunes"
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5"
      >
        {/* Menu rápido com opções se modal aberto */}
        {showWaModal && (
          <div className="w-72 p-4 rounded-2xl bg-[#14171A]/95 backdrop-blur-xl border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Falar pelo WhatsApp
              </span>
              <button
                onClick={() => setShowWaModal(false)}
                className="text-slate-400 hover:text-white p-1"
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

        {/* Botão Flutuante Principal em Dourado Solar de Alto Padrão */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWaModal(!showWaModal)}
            className="group relative flex items-center justify-center h-14 px-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-2xl shadow-amber-500/35 transition-transform active:scale-95 duration-200"
            aria-label="Abrir canais de WhatsApp"
          >
            {/* Pulsing beacon solar */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-200" />
            </span>
            <MessageCircle className="w-6 h-6 mr-2 fill-stone-950 stroke-none" />
            <span className="font-extrabold text-sm tracking-wide uppercase">
              Reservar Horário
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
