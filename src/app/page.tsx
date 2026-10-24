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
      "https://wa.me/5549999486797?text=Ol%C3%A1+Jefe%2C+gostaria+de+informa%C3%A7%C3%B5es+sobre+o+Treinamento+Funcional+na+areia.",
  },
  viviane: {
    name: "Profª. Viviane Nunes",
    role: "Idealizadora, Metodologia & Aulas",
    phoneDisplay: "(49) 99804-3322",
    whatsappUrl:
      "https://wa.me/5549998043322?text=Ol%C3%A1+Prof.+Viviane%2C+visitei+o+site+e+gostaria+de+informa%C3%A7%C3%B5es+sobre+as+aulas.",
  },
  anderson: {
    name: "Prof. Anderson Tansini",
    role: "Aulas & Preparação Física na Areia",
    phoneDisplay: "(49) 9927-3900",
    whatsappUrl:
      "https://wa.me/554999273900?text=Ol%C3%A1+Prof.+Anderson%2C+visitei+o+site+e+gostaria+de+informa%C3%A7%C3%B5es+sobre+os+treinos.",
  },
  location: {
    address:
      "R. Antônio Pícoli, s/n - Bairro Campo Experimental, Videira - SC, 89560-000",
    shortAddress: "Campo Experimental, Videira - SC",
    googleMapsDirections:
      "https://www.google.com/maps/dir/?api=1&destination=CT+Vivi+Nunes+R.+Ant%C3%B4nio+P%C3%ADcoli+Videira+SC+89560-000",
  },
  social: {
    instagram: "https://www.instagram.com/ct_vivinunes",
    handle: "@ct_vivinunes",
  },
};

export const FAQ_DATA = [
  {
    question: "Como funciona a locação de quadras avulsas e horários mensalistas?",
    answer:
      "Você pode alugar horários avulsos por hora para seu grupo de amigos ou fechar um plano mensalista com dia e horário fixo garantido toda semana. Basta enviar uma mensagem para o WhatsApp do Jefe para verificar a disponibilidade da grade e reservar instantaneamente.",
  },
  {
    question: "Nunca pratiquei esportes de areia, posso agendar uma aula experimental?",
    answer:
      "Com certeza! Nossos professores atendem desde alunos no nível iniciante absoluto (que nunca pegaram em uma raquete ou bola) até atletas avançados. A areia reduz o impacto nas articulações e torna o aprendizado natural, dinâmico e seguro.",
  },
  {
    question: "O complexo fornece raquetes e bolas para uso durante os jogos?",
    answer:
      "Sim! Nas aulas, todo o material esportivo oficial (bolas oficiais, redes regulamentadas, cones e equipamentos funcionais) está incluso. Para locações livres, também disponibilizamos suporte de bolas e locação de raquetes de Beach Tennis mediante consulta prévia.",
  },
  {
    question: "O treinamento funcional na areia é indicado para quem tem dores ou está sedentário?",
    answer:
      "Sim, é altamente recomendado! O piso de areia fofa e higienizada absorve mais de 60% do impacto mecânico em comparação com pisos rígidos ou asfalto, protegendo joelhos, tornozelos e coluna. O treino acelera o gasto calórico e fortalece a musculatura estabilizadora com total segurança e prescrição individualizada.",
  },
  {
    question: "É possível jogar à noite? Como funciona a iluminação?",
    answer:
      "Sim! O complexo conta com sistema de iluminação potente em refletores de LED dispostos estrategicamente para eliminar pontos cegos e sombras. As quadras funcionam até as 23h de segunda a sábado.",
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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations seguras (fromTo com clearProps para nunca sumir elementos)
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
      className="relative min-h-screen bg-[#0B0C0E] text-[#F8FAFC] overflow-x-hidden selection:bg-emerald-500 selection:text-black"
    >
      {/* ============================================================== */}
      {/* A. NAVBAR EDITORIAL (Sticky com Blur e Logo Tipográfica)       */}
      {/* ============================================================== */}
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Tipográfica Oficial (Sem caixa branca, refinada) */}
          <Link
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl py-1 px-2 -ml-2 transition-colors hover:bg-white/5"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white font-syne">
                  CT
                </span>
                <span className="font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent font-syne drop-shadow-[0_2px_12px_rgba(34,197,94,0.3)]">
                  VIVI NUNES
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-400 group-hover:text-emerald-400 transition-colors -mt-0.5">
                Complexo de Areia • Videira
              </span>
            </div>
          </Link>

          {/* Links Centrais de Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link
              href="#modalidades"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Modalidades
            </Link>
            <Link
              href="#locacao"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Locação
            </Link>
            <Link
              href="#professores"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Professores & Aulas
            </Link>
            <Link
              href="#estrutura"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Nossa Estrutura
            </Link>
            <Link
              href="#avaliacoes"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Avaliações (5.0★)
            </Link>
            <Link
              href="#localizacao"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Localização
            </Link>
          </nav>

          {/* CTA Direita Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={CONTACTS.jefe.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Reservar Quadra</span>
            </a>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-emerald-400 transition-colors"
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
                className="py-2 border-b border-white/5 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Modalidades Esportivas</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#locacao"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Locação de Quadras</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#professores"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Professores & Metodologia</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#estrutura"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Diferenciais da Estrutura</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#avaliacoes"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Avaliações dos Alunos (5.0★)</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#localizacao"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Localização & Contato</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-bold text-center text-sm uppercase tracking-wide bg-emerald-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  <MessageCircle className="w-5 h-5" />
                  Reservar com Jefe no WhatsApp
                </a>
                <a
                  href={CONTACTS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-medium text-center text-sm text-slate-300 bg-white/5 border border-white/10 flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-orange-400" />
                  Seguir @ct_vivinunes
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* B. 1ª DOBRA: HERO SECTION (IMAGENS 100% VISÍVEIS EM TELA CHEIA)*/}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative isolate min-h-[100dvh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
      >
        {/* Layer 0: Imagem Desktop (16:9) em tela cheia garantida */}
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

        {/* Layer 0: Imagem Mobile (9:16) em tela cheia garantida */}
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

        {/* Layer 1: Overlay Suave para proteger a leitura sem apagar a foto dourada da quadra */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/50 to-[#0B0C0E]/25 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-[#0B0C0E] pointer-events-none" />

        {/* Layer 2: Conteúdo Central Hero */}
        <div className="relative z-10 max-w-5xl mx-auto my-auto w-full text-center flex flex-col items-center pt-8">
          {/* Eyebrow Badge Editorial */}
          <div className="hero-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 backdrop-blur-md mb-6 shadow-lg shadow-black/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-emerald-400">
              Complexo Esportivo de Areia • Videira - SC
            </span>
          </div>

          {/* H1 Imponente */}
          <h1 className="hero-reveal font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Viva a energia da praia no{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              coração de Videira
            </span>
            .
          </h1>

          {/* Subtítulo Conversivo */}
          <p className="hero-reveal mt-6 text-base sm:text-xl text-slate-100 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Quadras de areia higienizada para{" "}
            <strong className="text-white font-bold">Beach Tennis</strong>,{" "}
            <strong className="text-white font-bold">Vôlei</strong> e{" "}
            <strong className="text-white font-bold">Futevôlei</strong>, além de
            treinamento funcional e aulas com acompanhamento profissional
            qualificado.
          </p>

          {/* Ação Dupla Direcionada (CRO Multi-Intenção) */}
          <div className="hero-reveal mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Botão Primário: WhatsApp Jefe */}
            <a
              href={CONTACTS.jefe.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-black uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 stroke-none" />
              <span>Alugar Quadra com Jefe</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Botão Secundário: Aulas & Metodologia */}
            <Link
              href="#professores"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-slate-100 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/50"
            >
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Aulas e Treinamento Funcional</span>
            </Link>
          </div>
        </div>

        {/* Layer 2: Barra Inferior de Autoridade / Trust Badges */}
        <div className="hero-reveal relative z-10 max-w-5xl mx-auto w-full mt-10 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2.5 py-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow-md">
              5.0 no Google (Areia Limpa e Fofa)
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 py-1">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow-md">
              Referência Esportiva Desde 2023
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 py-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow-md">
              Iluminação em LED para Jogos Noturnos
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
        {/* Glow de fundo */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Raquetes e bolas disponíveis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Horários avulsos ou mensalistas</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.beachTennisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Alugar Beach Tennis</span>
            </a>
          </div>

          {/* Card 2: Vôlei de Praia */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  Tradição & Salto
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                Vôlei de Praia
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Treinos de fundamentos (saque, manchete, levantamento e bloqueio),
                partidas livres de 2x2 ou 4x4 e torneios sazonais.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Redes com regulagem oficial</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Areia profunda para impulsão</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.voleiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Alugar Vôlei de Areia</span>
            </a>
          </div>

          {/* Card 3: Futevôlei */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  Técnica Pura
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
                Futevôlei
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Desenvolva controle de bola, recepção de peito, cabeceio e
                ataque de perna na areia macia. Treinos táticos e rachões amistosos.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Bola Mikasa oficial disponível</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Turmas de iniciação e avançado</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.futevoleiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Alugar Futevôlei</span>
            </a>
          </div>

          {/* Card 4: Funcional na Areia */}
          <div className="bento-card group relative flex flex-col justify-between p-7 rounded-3xl bg-[#14171A] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/20">
                  Alta Intensidade
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                Funcional na Areia
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Potencialize a queima de gordura, fortaleça o core e ganhe
                resistência muscular com o dobro de gasto calórico e baixo impacto
                nas articulações.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Proteção contra lesões articulares</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Prescrição com profissionais formados</span>
                </li>
              </ul>
            </div>
            <a
              href={CONTACTS.jefe.funcionalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Funcional</span>
            </a>
          </div>
        </div>

        {/* Banner de Chamada para Locação Mensalista e Grupos */}
        <div
          id="locacao"
          className="mt-12 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-emerald-950/40 via-stone-900 to-amber-950/30 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
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
            className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Consultar Grade com Jefe</span>
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* C.2 EQUIPE TÉCNICA & METODOLOGIA (Split Editorial Robusto)     */}
      {/* ============================================================== */}
      <section
        id="professores"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Corpo Docente Especializado</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Aprenda com quem vive o esporte de areia
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Metodologia focada na evolução técnica consciente, condicionamento
            físico e bem-estar, do iniciante que nunca pisou na areia até
            atletas competitivos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Profª. Viviane Nunes */}
          <div className="teacher-card rounded-3xl bg-[#14171A] border border-white/10 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl -z-10 group-hover:bg-emerald-500/20 transition-all" />

            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    Idealizadora do CT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Profª. Viviane Nunes
                  </h3>
                  <p className="text-sm font-semibold text-slate-400 mt-0.5">
                    Metodologia & Aulas Técnicas
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Award className="w-7 h-7" />
                </div>
              </div>

              <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                À frente da criação e desenvolvimento do CT, a Profª. Viviane
                combina paixão pelos esportes de praia com uma abordagem pedagógica
                acolhedora e motivacional. Seu foco é fazer cada aluno se sentir
                confiante, melhorando reflexos, postura e ritmo de jogo desde o
                primeiro treino.
              </p>

              <div className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Turmas femininas, masculinas e mistas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Aulas personalizadas para iniciantes sem experiência</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Acompanhamento direto e correção minuciosa</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                WhatsApp: <strong>(49) 99804-3322</strong>
              </span>
              <a
                href={CONTACTS.viviane.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com Profª. Viviane</span>
              </a>
            </div>
          </div>

          {/* Card 2: Prof. Anderson Tansini */}
          <div className="teacher-card rounded-3xl bg-[#14171A] border border-white/10 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl -z-10 group-hover:bg-amber-500/20 transition-all" />

            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Preparação & Condicionamento
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Prof. Anderson Tansini
                  </h3>
                  <p className="text-sm font-semibold text-slate-400 mt-0.5">
                    Aulas & Treinamento Físico de Areia
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Flame className="w-7 h-7" />
                </div>
              </div>

              <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                Especialista na dinâmica biomecânica da areia, o Prof. Anderson
                conduz treinos de alto rendimento com foco em ganho de agilidade,
                potência muscular de salto e resistência cardiovascular, garantindo
                que o aluno extraia o máximo de resultado com total proteção articular.
              </p>

              <div className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Preparação física específica para Beach Sports</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Circuitos funcionais com alta queima calórica</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Treinos táticos e correção de movimentação na areia</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                WhatsApp: <strong>(49) 9927-3900</strong>
              </span>
              <a
                href={CONTACTS.anderson.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-200 shadow-lg shadow-amber-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com Prof. Anderson</span>
              </a>
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
              <span className="text-xs font-black tracking-widest uppercase text-emerald-400">
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

            {/* Pilar 1: Areia Fofinha & Higienizada */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Areia Fofinha, Filtrada & Higienizada
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Tratamento preventivo constante contra fungos e bactérias. Areia fina,
                  macia e sem pedriscos, garantindo toque agradável nos pés, segurança
                  para mergulhos e saltos sem risco de arranhões.
                </p>
              </div>
            </div>

            {/* Pilar 2: Iluminação Noturna em LED */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Iluminação Noturna em LED Sem Pontos Cegos
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Refletores de alta eficiência posicionados de maneira calculada
                  para evitar sombras e ofuscamento visual durante o saque ou bolas altas,
                  proporcionando jogos noturnos tão claros quanto de dia.
                </p>
              </div>
            </div>

            {/* Pilar 3: Ambiente Familiar & Social */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Ambiente Acolhedor & Espaço de Convivência
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Área social para resenha entre as partidas, quiosque coberto,
                  banheiros e vestiários limpos para a comodidade de toda a família.
                </p>
              </div>
            </div>

            {/* Pilar 4: Tranquilidade no Campo Experimental */}
            <div className="structure-pillar p-5 sm:p-6 rounded-2xl bg-[#14171A] border border-purple-500/20 text-purple-400 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Fácil Estacionamento & Localização Privilegiada
                </h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Situado no bairro Campo Experimental, uma região tranquila de fácil
                  acesso em Videira, com estacionamento amplo e seguro para você
                  jogar sem preocupações.
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
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-emerald-400">
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
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-amber-400">
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
              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-blue-400">
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
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
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
                      isOpen ? "rotate-180 bg-emerald-500/20 text-emerald-400" : "text-slate-400"
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
            No Campo Experimental, em Videira. Estamos prontos para receber você e seus amigos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Esquerdo: Endereço & Rota GPS */}
          <div className="lg:col-span-7 rounded-3xl bg-[#14171A] border border-white/10 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
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
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Endereço Oficial:</strong>
                    <p className="text-slate-300 mt-0.5">
                      R. Antônio Pícoli, s/n - Bairro Campo Experimental, Videira - SC, CEP 89560-000.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Horários de Funcionamento:</strong>
                    <p className="text-slate-300 mt-0.5">
                      Segunda a Sábado: 07h às 23h (Iluminação Noturna em LED)
                      <br />
                      Domingos e Feriados: 08h às 20h (Sob agendamento prévio)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <InstagramIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Instagram Oficial:</strong>
                    <p className="mt-0.5">
                      <a
                        href={CONTACTS.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline font-semibold"
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
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Traçar Rota no Google Maps / Waze</span>
              </a>
            </div>
          </div>

          {/* Card Direito: Central Direta com a Equipe */}
          <div className="lg:col-span-5 rounded-3xl bg-[#14171A] border border-white/10 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
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
                  className="group p-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
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
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Profª Viviane */}
                <a
                  href={CONTACTS.viviane.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">
                        Profª. Viviane (Aulas & Iniciação)
                      </h5>
                      <span className="text-xs text-slate-400">
                        {CONTACTS.viviane.phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Prof Anderson */}
                <a
                  href={CONTACTS.anderson.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">
                        Prof. Anderson (Treinos & Físico)
                      </h5>
                      <span className="text-xs text-slate-400">
                        {CONTACTS.anderson.phoneDisplay}
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
        {/* Glow sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner Pré-Footer de Conversão Rápida */}
          <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#14171A] to-[#0B0C0E] border border-white/10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950 stroke-none" />
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
                <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent font-syne">
                  VIVI NUNES
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
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
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                  aria-label="Instagram Oficial"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={CONTACTS.jefe.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
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
                  <Link href="#modalidades" className="hover:text-emerald-400 transition-colors">
                    Beach Tennis & Vôlei
                  </Link>
                </li>
                <li>
                  <Link href="#locacao" className="hover:text-emerald-400 transition-colors">
                    Locações & Mensalistas
                  </Link>
                </li>
                <li>
                  <Link href="#professores" className="hover:text-emerald-400 transition-colors">
                    Profª. Viviane & Anderson
                  </Link>
                </li>
                <li>
                  <Link href="#estrutura" className="hover:text-emerald-400 transition-colors">
                    Diferenciais da Quadra
                  </Link>
                </li>
                <li>
                  <Link href="#localizacao" className="hover:text-emerald-400 transition-colors">
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
                  <strong className="text-white">Aulas (Profª. Viviane):</strong> (49) 99804-3322
                </p>
                <p>
                  <strong className="text-white">Treinos (Prof. Anderson):</strong> (49) 9927-3900
                </p>
                <p className="pt-2 text-slate-500 text-xs">
                  R. Antônio Pícoli, s/n - Campo Experimental, Videira - SC
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
      {/* D. FLOATING WHATSAPP CTA COM MULTI-DESTINO & PULSE DE ATENÇÃO  */}
      {/* ============================================================== */}
      <aside
        aria-label="Atendimento WhatsApp CT Vivi Nunes"
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5"
      >
        {/* Menu rápido com opções se modal aberto */}
        {showWaModal && (
          <div className="w-72 p-4 rounded-2xl bg-[#14171A]/95 backdrop-blur-xl border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
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
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white flex items-center justify-between transition-colors text-xs font-semibold"
              >
                <span>Reservar Quadra (Jefe)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACTS.viviane.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWaModal(false)}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-white flex items-center justify-between transition-colors text-xs font-semibold"
              >
                <span>Aulas & Iniciação (Viviane)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACTS.anderson.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWaModal(false)}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-between transition-colors text-xs font-semibold"
              >
                <span>Treinos de Areia (Anderson)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Botão Flutuante Principal */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWaModal(!showWaModal)}
            className="group relative flex items-center justify-center h-14 px-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 transition-transform active:scale-95 duration-200"
            aria-label="Abrir canais de WhatsApp"
          >
            {/* Pulsing beacon */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-200" />
            </span>
            <MessageCircle className="w-6 h-6 mr-2 fill-slate-950 stroke-none" />
            <span className="font-extrabold text-sm tracking-wide uppercase">
              Reservar Horário
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
