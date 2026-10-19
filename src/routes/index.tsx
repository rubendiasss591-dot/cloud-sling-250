import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LockKeyhole,
  PackageCheck,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Truck,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import img1 from "@/assets/poltrona-1.webp.asset.json";
import img2 from "@/assets/poltrona-2.png.asset.json";
import img3 from "@/assets/poltrona-3.png.asset.json";
import img4 from "@/assets/poltrona-4.webp.asset.json";
import img5 from "@/assets/poltrona-5.webp.asset.json";
import img6 from "@/assets/poltrona-6.webp.asset.json";
import img7 from "@/assets/poltrona-7.webp.asset.json";
import img8 from "@/assets/poltrona-8.webp.asset.json";
import garantiaVideo from "@/assets/garantia-video.mp4.asset.json";
import poltronaVideo from "@/assets/poltrona-video.mp4.asset.json";
import puff250kg from "@/assets/puff-250kg.png.asset.json";
import puffPets from "@/assets/puff-pets.png.asset.json";
import puffLavavel from "@/assets/puff-lavavel.png.asset.json";
import infograficoEncher from "@/assets/infografico-encher.png.asset.json";
import conforto3Meses from "@/assets/conforto-3-meses.png.asset.json";
import bombaAsset from "@/assets/bomba-de-ar.png.asset.json";
import review1Asset from "@/assets/review-1.jpg.asset.json";
import review2Asset from "@/assets/review-2.jpg.asset.json";
import review3Asset from "@/assets/review-3.jpg.asset.json";
import review4Asset from "@/assets/review-4.jpg.asset.json";
import review5Asset from "@/assets/review-5.jpg.asset.json";
import review6Asset from "@/assets/review-6.jpg.asset.json";
import { trackInitiateCheckout } from "@/lib/meta-pixel";
import { redirectWithParams } from "@/lib/redirect-with-params";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poltrona Sofá Inflável 250kg com Puff | Casa Conforto" },
      { name: "description", content: "Poltrona Sofá Inflável com puff, tecido aveludado anti-arranhões e suporte para até 250kg. Frete grátis hoje." },
      { property: "og:title", content: "Poltrona Sofá Inflável 250kg com Puff" },
      { property: "og:description", content: "Conforto aveludado, resistente a unhas de pets e suporta até 250kg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8].map((img) => img.url);
const gallery = allImages.map((src, i) => ({ src, alt: `Poltrona Sofá Inflável 250kg com puff - foto ${i + 1}` }));

const palettes = {
  "1 Puff": { image: allImages[0], old: "R$ 399,90", price: "R$ 49,99", off: "88% OFF", checkout: "https://checkout.serenapagamentoseguro.store/pay/175b5b7e-a2ec-444e-a173-0db2f1af2805" },
  "2 Puffs": { image: allImages[0], old: "R$ 799,80", price: "R$ 65,90", off: "92% OFF", checkout: "https://checkout.serenapagamentoseguro.store/pay/175b5b7e-a2ec-444e-a173-0db2f1af2805" },
  "4 Puffs": { image: allImages[0], old: "R$ 1.599,60", price: "R$ 121,90", off: "92% OFF", checkout: "https://checkout.serenapagamentoseguro.store/pay/175b5b7e-a2ec-444e-a173-0db2f1af2805" },
} as const;

type PaletteName = keyof typeof palettes;

const benefits = [
  { icon: ShieldCheck, title: "Suporta 250kg", text: "Estrutura reforçada para adultos de todos os tamanhos." },
  { icon: Sparkles, title: "Toque aveludado", text: "Superfície macia e aconchegante para relaxar." },
  { icon: BadgeCheck, title: "Anti-arranhões", text: "Tecido resistente às unhas de gatos e cães." },
  { icon: Clock3, title: "Pronta em minutos", text: "Enche rápido e guarda em pouco espaço." },
];

const faqs = [
  ["O que vem no kit?", "Você recebe a Poltrona Sofá Inflável e o puff para apoiar os pés."],
  ["Quanto peso ela aguenta?", "A poltrona suporta até 250kg, ideal para adultos."],
  ["Quais as medidas?", "A poltrona tem 100 cm de largura, 85 cm de profundidade e 70 cm de altura. O puff tem 50 cm de diâmetro."],
  ["Meu gato pode furar?", "O tecido aveludado é reforçado e resistente a arranhões do dia a dia com pets."],
  ["É fácil de encher?", "Sim. Enche em poucos minutos e, vazia, pode ser guardada dobrada em qualquer canto."],
];

function useCountdown() {
  const [seconds, setSeconds] = useState(1 * 3600);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function Countdown({ compact = false }: { compact?: boolean }) {
  const time = useCountdown();
  const values = [
    [time.hours, "HORAS"],
    [time.minutes, "MIN"],
    [time.seconds, "SEG"],
  ] as const;

  return (
    <div className={compact ? "flex items-center gap-2" : "flex items-start gap-3"}>
      {values.map(([value, label]) => (
        <div key={label} className="text-center">
          <span className={compact ? "count-chip-small" : "count-chip"}>
            {String(value).padStart(2, "0")}
          </span>
          {!compact && <span className="mt-1 block text-[9px] font-semibold text-muted-foreground">{label}</span>}
        </div>
      ))}
    </div>
  );
}

function BuyButton({ checkout, className = "" }: { checkout: string; className?: string }) {
  return (
    <Button
      size="lg"
      className={`buy-pulse h-16 w-full rounded-md uppercase tracking-wide bg-buy text-base font-extrabold text-buy-foreground shadow-buy hover:bg-buy-hover ${className}`}
      onClick={() => {
        trackInitiateCheckout();
        redirectWithParams(checkout);
      }}
    >
      <LockKeyhole className="size-5" /> Comprar agora <ChevronRight className="size-5" />
    </Button>
  );
}

function Gallery({ palette }: { palette: PaletteName }) {
  const [active, setActive] = useState(0);
  const paletteImage = palettes[palette].image;

  useEffect(() => setActive(0), [palette]);
  const previous = () => setActive((active - 1 + gallery.length) % gallery.length);
  const next = () => setActive((active + 1) % gallery.length);
  const activeImage = active === 0
    ? { src: paletteImage, alt: "Poltrona Sofá Inflável 250kg com puff" }
    : gallery[active] ?? gallery[0];

  if (!activeImage) return null;

  return (
    <div className="min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted shadow-product">
        <span className="absolute left-3 top-3 z-10 rounded-md bg-offer px-3 py-1 text-[10px] font-extrabold uppercase text-offer-foreground">250 KG!</span>
        <img src={activeImage.src} alt={activeImage.alt} className="h-full w-full object-cover" />
        <Button variant="ghost" size="icon" className="gallery-arrow left-3" onClick={previous} aria-label="Imagem anterior">
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" className="gallery-arrow right-3" onClick={next} aria-label="Próxima imagem">
          <ChevronRight />
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-7 lg:grid-cols-6">
        {[{ src: paletteImage, alt: `Paleta ${palette}` }, ...gallery.slice(1, 6)].map((image, index) => (
          <button
            key={image.src}
            onClick={() => setActive(index)}
            aria-label={`Ver imagem ${index + 1}`}
            className={`aspect-square overflow-hidden rounded-md border-2 bg-muted transition ${active === index ? "border-primary" : "border-transparent opacity-85 hover:opacity-100"}`}
          >
            <img src={image.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductVideo({ video, title, subtitle, label }: { video: { url: string }; title: string; subtitle: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mutedStart, setMutedStart] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      video.muted = true;
      setMutedStart(true);
      video.play().catch(() => {});
    });
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      setMutedStart(false);
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="rounded-lg bg-player p-4 text-player-foreground shadow-product sm:col-span-2 lg:col-span-4">
      <p className="text-center font-serif text-2xl tracking-[0.3em]">{title}</p>
      <p className="mt-1 text-center text-xs text-player-muted">{subtitle}</p>
      <div className="relative mt-4 overflow-hidden rounded-md bg-player">
        <video
          ref={videoRef}
          src={video.url}
          className="mx-auto block max-h-[70vh] w-full cursor-pointer"
          loop
          playsInline
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label={label}
        />
        {mutedStart && isPlaying && (
          <button
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              video.muted = false;
              setMutedStart(false);
            }}
            aria-label="Ativar som do vídeo"
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-player-foreground/90 px-4 py-2 text-xs font-extrabold text-player"
          >
            <Volume2 className="size-4" /> ATIVAR SOM
          </button>
        )}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Reproduzir vídeo"
            className="absolute inset-0 grid place-items-center bg-player/45"
          >
            <span className="grid size-16 place-items-center rounded-full bg-card text-foreground shadow-lg">
              <Play className="size-7 fill-current" />
            </span>
          </button>
        )}
        {isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Pausar vídeo"
            className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-player-foreground/90 text-player opacity-80 transition hover:opacity-100"
          >
            <Pause className="size-5 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}

const featured = {
  name: "Juliana Martins",
  text: "Muito confortável e prático.",
  when: "Há 3 meses",
  helpful: 3,
  photo: review1Asset.url,
  photoAlt: "Foto enviada por cliente mostrando a poltrona inflável e o puff na casa dela",
};

const others = [
  {
    name: "Marcos Vinícius",
    text: "Gostei demais, bem confortável e grande. Ótimo para uma noite de cinema.",
    when: "Há 2 meses",
    helpful: 3,
    photo: review2Asset.url,
    photoAlt: "Foto enviada por cliente mostrando a poltrona inflável no quarto",
  },
  {
    name: "Patrícia Gomes",
    text: "Top, gostei 👍.",
    when: "Há 3 meses",
    helpful: 6,
    photo: review3Asset.url,
    photoAlt: "Foto enviada por cliente mostrando a poltrona inflável na sala",
  },
  {
    name: "Fernanda Lima",
    text: "Comprei pra tomar um sol na varanda e tá sendo maravilhoso, é super confortável. A bomba demorou uns 15 minutos pra encher, mas tenho uma bomba elétrica que me ajudou demais e deu tudo certo.",
    when: "Há 2 meses",
    helpful: 4,
    photo: review4Asset.url,
    photoAlt: "Foto enviada por cliente mostrando a poltrona inflável com o puff na varanda",
  },
  {
    name: "Cristiane Almeida",
    text: "Maravilhosa, super confortável e resistente. Ótima para colocar no quarto.",
    when: "Há 4 semanas",
    helpful: 2,
    photo: review6Asset.url,
    photoAlt: "Foto enviada por cliente mostrando a poltrona inflável montada na sala",
  },
  {
    name: "Rafael Souza",
    text: "Enche em minutos, segura o peso sem afundar e guarda em qualquer cantinho.",
    when: "Há 2 semanas",
    helpful: 5,
    photo: review5Asset.url,
    photoAlt: "Foto enviada por cliente mostrando os puffs embalados e as bombas de ar",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-primary" aria-label="5 de 5 estrelas">
      {[0, 1, 2, 3, 4].map((star) => <Star key={star} aria-hidden="true" className="size-5 fill-current" />)}
    </div>
  );
}

function SocialProof() {
  return (
    <section aria-labelledby="depoimento-title" className="mt-10 sm:col-span-2 lg:col-span-4">
      <h2 id="depoimento-title" className="section-title text-center">Nossos Clientes</h2>
      <article className="mx-auto mt-6 grid max-w-xl overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-[190px_minmax(0,1fr)]">
        <img
          src={featured.photo}
          alt={featured.photoAlt}
          width={190}
          height={253}
          loading="lazy"
          className="block aspect-[3/4] w-full object-cover sm:aspect-auto sm:h-full"
        />
        <div className="flex flex-col items-start border-t border-border p-5 sm:border-l sm:border-t-0 sm:p-6">
          <Stars />
          <blockquote className="mt-3 text-base font-semibold leading-relaxed">{featured.text}</blockquote>
          <p className="mt-3 text-sm font-bold">{featured.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">Brasil <span aria-hidden="true" className="mx-2">·</span> {featured.when}</p>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">Útil <ThumbsUp aria-hidden="true" className="size-4" /> {featured.helpful}</p>
        </div>
      </article>
      <div className="mx-auto mt-4 grid max-w-2xl gap-4 sm:grid-cols-2">
        {others.map((review) => (
          <article key={review.name} className="overflow-hidden rounded-lg border border-border bg-card">
            {"photo" in review && review.photo ? (
              <img
                src={review.photo}
                alt={review.photoAlt}
                loading="lazy"
                className="block aspect-[4/5] w-full object-cover"
              />
            ) : null}
            <div className="p-5">
              <Stars />
              <blockquote className="mt-3 text-sm font-semibold leading-relaxed">{review.text}</blockquote>
              <p className="mt-3 text-sm font-bold">{review.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">Brasil <span aria-hidden="true" className="mx-2">·</span> {review.when}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">Útil <ThumbsUp aria-hidden="true" className="size-4" /> {review.helpful}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LiveScarcity() {
  const [viewers, setViewers] = useState(7);
  const [stock, setStock] = useState(6);
  useEffect(() => {
    const tickViewers = () =>
      setViewers((v) => Math.min(16, Math.max(2, v + Math.floor(Math.random() * 5) - 2)));
    const tickStock = () =>
      setStock((s) => Math.min(8, Math.max(4, s + (Math.random() < 0.5 ? -1 : 1))));
    let stockId: ReturnType<typeof setInterval> | undefined;
    const firstStockId = setTimeout(() => {
      tickStock();
      stockId = setInterval(tickStock, 120000);
    }, 20000);
    const viewersId = setInterval(tickViewers, 60000);
    return () => {
      clearTimeout(firstStockId);
      clearInterval(viewersId);
      if (stockId) clearInterval(stockId);
    };
  }, []);
  return (
    <div className="mt-3 space-y-2">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-destructive" /></span>
        <strong className="text-destructive">{viewers}</strong> Pessoas estão vendo esse produto agora
      </p>
      <div className="inline-flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-[11px] font-extrabold text-destructive">
        <span className="size-2 animate-pulse rounded-full bg-destructive" /> RESTAM {stock} UNIDADES
        <span className="rounded bg-destructive px-1.5 py-0.5 text-[9px] text-destructive-foreground">AO VIVO</span>
      </div>
    </div>
  );
}

function ProductDetails({ palette, setPalette }: { palette: PaletteName; setPalette: (palette: PaletteName) => void }) {
  return (
    <section id="comprar" className="min-w-0">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex gap-0.5 text-rating" aria-label="5 estrelas">
          {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-4 fill-current" />)}
        </div>
        <strong>4,9</strong><span className="text-muted-foreground">(327 avaliações)</span>
      </div>
      <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">Oferta exclusiva por tempo limitado</p>
      <h1 className="mt-4 max-w-xl text-[22px] font-extrabold leading-[1.2] text-foreground sm:text-[26px]">
        Poltrona Sofá Inflável 250kg com Puff — Aveludada e Anti-Arranhões
      </h1>


      <div className="urgency-pulse mt-4 rounded-md bg-urgency px-3 py-2 text-center text-[10px] font-extrabold text-urgency-foreground">ÚLTIMAS UNIDADES DISPONÍVEIS — GARANTA A SUA HOJE!</div>
      <LiveScarcity />

      <fieldset className="mt-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <legend className="text-xs font-extrabold uppercase tracking-wider">Escolha seu kit</legend>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-col gap-3">
          {(Object.keys(palettes) as PaletteName[]).map((name, i) => {
            const opt = palettes[name];
            const selected = palette === name;
            const badge = i === 1 ? "🔥 MELHOR OPÇÃO" : null;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setPalette(name)}
                className={`relative flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${selected ? "py-6 scale-[1.03] " : ""}${selected ? "border-banner bg-selected" : "border-border bg-card hover:border-muted-foreground"}`}
              >
                {badge && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-banner px-3 py-1 text-[11px] font-extrabold tracking-wider text-banner-foreground">{badge}</span>
                )}

                <span className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-primary" : "border-muted-foreground"}`}>
                  {selected && <span className="size-2.5 rounded-full bg-primary" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <strong className={selected ? "text-base" : "text-sm"}>{name}</strong>

                    <span className="rounded bg-discount px-1.5 py-0.5 text-[9px] font-extrabold text-price">ECONOMIZE {opt.off.replace(" OFF", "")}</span>
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">Frete grátis incluso</span>
                </span>
                <span className="text-right">
                  <strong className={`block font-extrabold text-price ${selected ? "text-xl" : "text-base"}`}>{opt.price}</strong>
                  <span className="block text-[11px] text-muted-foreground line-through">{opt.old}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border bg-card p-3">
        <img src={bombaAsset.url} alt="Bomba de ar para encher a poltrona" className="h-16 w-16 rounded-md object-cover" />
        <div className="min-w-0"><span className="text-[10px] uppercase text-muted-foreground">Oferta adicional</span><p className="text-xs font-extrabold text-primary">Leve a bomba para encher seu puff em 15 minutos, apenas hoje</p><p className="text-sm font-extrabold text-price">De graça.</p></div>
      </div>
      <BuyButton checkout={palettes[palette].checkout} className="mt-3" />
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" /> Compra segura e protegida</p>
    </section>
  );
}

function Index() {
  const [palette, setPalette] = useState<PaletteName>("2 Puffs");
  const checkout = palettes[palette].checkout;
  const assuranceItems: Array<[LucideIcon, string, string]> = [
    [Truck, "Envio rápido", "para todo Brasil"],
    [ShieldCheck, "Compra segura", "dados protegidos"],
    [PackageCheck, "7 dias", "para experimentar"],
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="bg-banner text-banner-foreground">
        <div className="page-shell flex min-h-8 items-center justify-center gap-4 px-4 py-1 text-center text-[10px] font-extrabold uppercase">
          <span>Promoção especial • Frete grátis somente hoje</span><Countdown compact />
        </div>
      </div>
      <header className="border-b border-border bg-nav">
        <div className="page-shell flex h-[62px] items-center justify-center px-5">
          <a href="#top" className="font-serif text-xl tracking-[0.35em] text-primary">CASA CONFORTO</a>
        </div>
      </header>

      <div id="top" className="page-shell grid gap-10 px-5 py-10 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:py-12">
        <Gallery palette={palette} /><ProductDetails palette={palette} setPalette={setPalette} />
      </div>

      <section className="border-y border-border bg-soft py-2">
        <div className="page-shell grid grid-cols-3 gap-1 px-3">
          {assuranceItems.map(([Icon, title, text]) => (
            <div key={title} className="flex min-w-0 items-center justify-center gap-1.5 py-1"><Icon className="size-4 shrink-0 text-primary" /><p className="text-[9px] leading-tight sm:text-[11px]"><strong className="block">{title}</strong><span className="text-muted-foreground">{text}</span></p></div>
          ))}
        </div>
      </section>

      <section id="kit" className="bg-soft py-16">
        <div className="page-shell px-5">
          <p className="section-kicker text-center">Qualidade em cada detalhe</p>
          <h2 className="section-title text-center">Feita para o seu descanso</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProductVideo video={poltronaVideo} title="VEJA EM AÇÃO" subtitle="Você tem 7 dias para trocas ou devoluções." label="Vídeo da poltrona inflável" />
            {[
              { src: puff250kg.url, alt: "Puff reforçado que suporta até 250 kg" },
              { src: puffPets.url, alt: "Puff resistente para pets felizes" },
              { src: puffLavavel.url, alt: "Puff pet lavável e impermeável" },
              { src: infograficoEncher.url, alt: "Infográfico de como encher a almofada inflável" },
              { src: conforto3Meses.url, alt: "Conforto que dura por até 3 meses" },
            ].map((image) => <img key={image.src} src={image.src} alt={image.alt} className="aspect-[9/16] w-full rounded-lg object-cover shadow-product sm:col-span-1 lg:col-span-2" />)}
            <ProductVideo video={garantiaVideo} title="CONFIANÇA E GARANTIA" subtitle="Trocas e devoluções em até 30 dias sem complicações." label="Vídeo de confiança e garantia da poltrona inflável" />
            <SocialProof />
          </div>
        </div>
      </section>

      <section id="beneficios" className="page-shell px-5 py-16 text-center">
        <p className="section-kicker">Conforto e resistência</p><h2 className="section-title">O canto de relaxar que sua casa merece</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => <article key={title}><div className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-primary"><Icon className="size-6" /></div><h3 className="mt-4 text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
        </div>
      </section>

      <section id="duvidas" className="bg-soft py-16">
        <div className="mx-auto max-w-2xl px-5"><p className="section-kicker text-center">Tire suas dúvidas</p><h2 className="section-title text-center">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="mt-8 rounded-lg border border-border bg-card px-5">
            {faqs.map(([question, answer], index) => <AccordionItem value={`faq-${index}`} key={question}><AccordionTrigger className="py-5 text-left text-sm font-bold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="bg-final py-16 text-final-foreground">
        <div className="mx-auto max-w-2xl px-5 text-center"><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-final-muted">Oferta especial</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Seu novo lugar favorito da casa</h2><p className="mt-4 text-sm text-final-muted">Poltrona 250kg + puff a partir de R$ 49,99.</p><div className="mx-auto mt-7 max-w-md"><BuyButton checkout={checkout} /></div></div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur sm:hidden">
        <BuyButton checkout={checkout} />
      </div>
    </main>
  );
}
