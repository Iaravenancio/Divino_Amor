import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Heart, Moon, Sun, VolumeX, Volume2, Sparkles, ShoppingBag, MoveHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";
import { btnPrimary, field, meta } from "@/components/site/Page";
import { INSTALLMENTS, LOOKS, PRODUCTS, brl, waLink } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => meta("DIVINO AMOR — O fio de ouro", "Uma experiência de moda feminina feita de delicadeza, presença e pequenos detalhes."),
  component: Index,
});

type Mood = "Poderosa" | "Romântica" | "Leve" | "Noite";
const moods: {name:Mood; note:string; color:string; key:string}[] = [
  {name:"Poderosa",note:"Presença que fala por si",color:"#6f2435",key:"Poderosa"},
  {name:"Romântica",note:"Delicadeza em cada detalhe",color:"#d8b4b0",key:"Romântica"},
  {name:"Leve",note:"Deixe o dia acontecer",color:"#d7d2bd",key:"Leve"},
  {name:"Noite",note:"Um brilho só seu",color:"#29202b",key:"Noite"},
];
function Thread({className=""}:{className?:string}) {
  return <svg className={className} viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true">
    <path className="gold-thread" d="M72 35 C25 3 0 65 42 93 C55 102 72 113 72 113 C72 113 91 99 105 83 C139 43 92 5 72 35 M72 113 C120 156 54 186 111 225 S175 276 135 330 S210 395 178 458 S265 515 248 579 S330 652 305 710 S430 780 398 900" />
  </svg>;
}
function Index() {
  const [mood,setMood]=useState<Mood>("Romântica");
  const [night,setNight]=useState(false);
  const [sound,setSound]=useState(false);
  const [stylist,setStylist]=useState(false);
  const [occasion,setOccasion]=useState("");
  const [email,setEmail]=useState("");
  const [selected,setSelected]=useState<string|null>(null);
  const ordered=useMemo(()=>{
    const base=[...PRODUCTS];
    if(mood==="Romântica") return base.sort((a,b)=>Number(!/rosa|vestido|bege/i.test(a.name))-Number(!/rosa|vestido|bege/i.test(b.name)));
    if(mood==="Poderosa") return base.sort((a,b)=>Number(!/vermelho|pink|terracota/i.test(a.name))-Number(!/vermelho|pink|terracota/i.test(b.name)));
    if(mood==="Leve") return base.sort((a,b)=>Number(!/bege|azul|pantalona/i.test(a.name))-Number(!/bege|azul|pantalona/i.test(b.name)));
    return base.sort((a,b)=>Number(!/pink|vermelho|macacão/i.test(a.name))-Number(!/pink|vermelho|macacão/i.test(b.name)));
  },[mood]);
  const chosen=PRODUCTS.find(p=>p.slug===selected);
  return <main className={`thread-experience ${night?"thread-night":""}`} style={{"--mood-accent":moods.find(m=>m.name===mood)?.color} as React.CSSProperties}>
    <section className="thread-hero">
      <div className="silk-grain" aria-hidden="true"/>
      <Thread className="thread-path thread-path-hero"/>
      <div className="thread-topline">
        <span className="eyebrow"><span className="tiny-heart">♡</span> UMA HISTÓRIA COSTURADA EM VOCÊ</span>
        <div className="flex items-center gap-4">
          <button className="quiet-icon" onClick={()=>setNight(!night)} aria-label={night?"Ativar modo claro":"Ativar modo noite"}>{night?<Sun size={17}/>:<Moon size={17}/>}</button>
          <button className="quiet-icon" onClick={()=>setSound(!sound)} aria-label={sound?"Desativar som":"Ativar som ambiente"}>{sound?<Volume2 size={17}/>:<VolumeX size={17}/>}</button>
          <Link to="/carrinho" className="quiet-icon" aria-label="Abrir sacola"><ShoppingBag size={17}/></Link>
        </div>
      </div>
      <div className="thread-hero-layout">
        <div className="thread-hero-copy">
          <p className="eyebrow">COLEÇÃO · NOVOS AFETOS</p>
          <h1>O que você veste<br/><em>também conta.</em></h1>
          <p className="hero-description">Peças que acompanham a sua forma de estar no mundo — com leveza, intenção e um toque de encanto.</p>
          <Link to="/produtos" className="thread-link">Descobrir a coleção <ArrowRight size={16}/></Link>
          <div className="hero-index"><span>01</span><span className="index-line"/><span>FEITO PARA SER SEU</span></div>
        </div>
        <div className="fabric-stage" aria-label="Editorial de moda DIVINO AMOR">
          <div className="fabric-orbit orbit-one"/><div className="fabric-orbit orbit-two"/>
          <figure className="fabric-photo fabric-photo-back"><img src={LOOKS[1]} alt="Look feminino azul em fotografia editorial" fetchPriority="high"/></figure>
          <figure className="fabric-photo fabric-photo-front"><img src={LOOKS[0]} alt="Look feminino da coleção DIVINO AMOR" fetchPriority="high"/></figure>
          <div className="fabric-caption"><span>01 / 06</span><span>O FIO DE OURO</span></div>
          <span className="fabric-stamp">DIVINO<br/>AMOR <i>✳</i></span>
        </div>
      </div>
      <div className="hero-bottom"><span>ROUPAS PARA SENTIR, NÃO APENAS VESTIR</span><ArrowDownRight size={17}/><span>DESLIZE PARA EXPLORAR</span></div>
    </section>

    <section className="mood-section">
      <Thread className="thread-path thread-path-mood"/>
      <div className="section-intro"><p className="eyebrow">ANTES DE ESCOLHER UMA PEÇA</p><h2>Como você quer<br/><em>se sentir hoje?</em></h2><p>Deixe a sua intenção guiar o caminho.</p></div>
      <div className="mood-options" role="group" aria-label="Escolha seu humor">
        {moods.map((m,i)=><button key={m.name} className={`mood-option ${mood===m.name?"is-selected":""}`} onClick={()=>setMood(m.name)} aria-pressed={mood===m.name}>
          <span className="mood-number">0{i+1}</span><span className="mood-swatch" style={{background:m.color}}/><span className="mood-name">{m.name}</span><span className="mood-note">{m.note}</span><ArrowRight size={15} className="mood-arrow"/>
        </button>)}
      </div>
    </section>

    <section className="rack-section" id="arara">
      <div className="rack-heading"><div><p className="eyebrow">UMA ARARA, MUITAS VERSÕES DE VOCÊ</p><h2>Escolhidas pelo <em>sentir.</em></h2></div><Link to="/produtos" className="thread-link">Ver toda a coleção <ArrowRight size={16}/></Link></div>
      <div className="rack-note"><MoveHorizontal size={16}/><span>Arraste para explorar · Toque em uma peça para conhecê-la</span><span className="rack-mood">{mood.toUpperCase()}</span></div>
      <div className="hanger-rail"><span className="rail-end rail-left"/><span className="rail-end rail-right"/></div>
      <div className="hanger-rack">
        {ordered.map((p,i)=><button key={p.slug} className={`hanger-piece hanger-${i%4} ${selected===p.slug?"hanger-active":""}`} onClick={()=>setSelected(selected===p.slug?null:p.slug)} aria-pressed={selected===p.slug}>
          <span className="hanger-hook" aria-hidden="true"/><span className="hanger-wood" aria-hidden="true"/><span className="hanger-image"><img src={p.images[0]} alt={p.name} loading="lazy"/><span className="hanger-thread">♡</span></span>
          <span className="hanger-info"><span>{p.name}</span><strong>{brl(p.price)}</strong></span>
        </button>)}
      </div>
      {chosen&&<div className="selected-piece" aria-live="polite"><img src={chosen.images[1]} alt={`Detalhe de ${chosen.name}`} loading="lazy"/><div><p className="eyebrow">UMA PEÇA PARA VOCÊ</p><h3>{chosen.name}</h3><p>{chosen.description}</p><strong>{brl(chosen.price)}</strong><Link to="/produto/$slug" params={{slug:chosen.slug}} className="thread-link">Ver peça e tamanhos <ArrowRight size={16}/></Link></div><button className="quiet-icon" onClick={()=>setSelected(null)} aria-label="Fechar detalhes">×</button></div>}
    </section>

    <section className="runway-section">
      <div className="runway-copy"><p className="eyebrow">UM INSTANTE, UM MOVIMENTO</p><h2>Vista a sua<br/><em>próxima história.</em></h2><p>Uma seleção feita para acompanhar os seus dias mais especiais — e os dias comuns que merecem ser.</p><Link to="/novidades" className="thread-link">Entrar na passarela <ArrowRight size={16}/></Link></div>
      <div className="runway-visual"><img src={LOOKS[4]} alt="Look feminino em tons naturais" loading="lazy"/><span className="runway-number">LOOK<br/><b>04</b></span><span className="runway-line"/></div>
      <Thread className="thread-path runway-thread"/>
    </section>

    <section className="stylist-section">
      <div className="stylist-heart"><Heart size={25} strokeWidth={1}/><span>✳</span></div><div><p className="eyebrow">UM TOQUE DE INTUIÇÃO</p><h2>Uma ajudinha da<br/><em>Estilista Divina.</em></h2><p>Conte para onde você vai. Vamos encontrar um ponto de partida entre as peças da coleção.</p></div><button onClick={()=>setStylist(true)} className="stylist-open">Encontrar meu look <Sparkles size={16}/></button>
    </section>

    <section className="newsletter-section"><p className="eyebrow">CARTAS COM CARINHO</p><h2>Um fio que continua<br/><em>mesmo depois daqui.</em></h2><p>Novidades, inspirações e pequenos presentes direto no seu e-mail.</p><form onSubmit={e=>{e.preventDefault();setEmail("");toast.success("Obrigada! Em breve, novidades com carinho.");}}><label htmlFor="thread-email" className="sr-only">Seu e-mail</label><input id="thread-email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Seu melhor e-mail"/><button type="submit">Quero receber <ArrowRight size={15}/></button></form></section>
    <footer className="thread-footer"><Logo size={48} withName={false}/><span>O fio de ouro — DIVINO AMOR</span><span>FRETE PARA TODO O BRASIL · ATÉ {INSTALLMENTS}X · TROCA FÁCIL</span><a href={waLink("Olá! Quero ajuda para escolher uma peça da DIVINO AMOR.")} target="_blank" rel="noreferrer">Conversar com carinho ↗</a></footer>

    {stylist&&<div className="stylist-overlay" role="dialog" aria-modal="true" aria-labelledby="stylist-title"><button className="stylist-scrim" onClick={()=>setStylist(false)} aria-label="Fechar estilista"/><div className="stylist-panel"><button className="stylist-close" onClick={()=>setStylist(false)} aria-label="Fechar">×</button><p className="eyebrow">ESTILISTA DIVINA · PRIMEIRO PASSO</p><h2 id="stylist-title">Qual é a <em>ocasião?</em></h2><p>Conte um pouquinho sobre o momento. Vamos sugerir peças reais da nossa coleção para você começar.</p><label htmlFor="occasion">Ex.: casamento de dia, calor</label><textarea id="occasion" value={occasion} onChange={e=>setOccasion(e.target.value)} placeholder="Estou procurando um look para..." rows={3}/><button className="stylist-submit" onClick={()=>{setStylist(false);toast.message("Selecionamos algumas peças para você explorar.");document.getElementById("arara")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}}>Encontrar inspiração <ArrowRight size={16}/></button><small>Assistente de inspiração local. Recomendações por IA podem ser conectadas ao catálogo na próxima etapa.</small></div></div>}
  </main>;
}
