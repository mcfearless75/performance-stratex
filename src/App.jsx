import { useState, useEffect, useRef, useCallback } from "react";

const G="#C8A96E",N="#080C18",NC="#0F1525",NL="#161D30",BD="#1E2840",TP="#EDE8DF",TM="#7A7F94",TF="#3A4060";
const SERIF="'Cormorant Garamond',Georgia,serif",SANS="'Syne',sans-serif",MONO="'Syne Mono',monospace";
const SC={INTAKE:"#5B8C5A",RESEARCH:"#4A6FA5",STRATEGY:"#7B5EA7",OUTPUT:"#C8A96E",CONTROL:"#B85C38"};

const DOCS=[
  {num:"01",stage:"INTAKE",name:"Business Plan Narrative Questionnaire",desc:"56-question structured intake — the foundation every document builds from.",format:"DOCX"},
  {num:"02",stage:"INTAKE",name:"Client Financial Questionnaire",desc:"Every numerical input mapped to the financial model Assumptions tab.",format:"XLSX"},
  {num:"03",stage:"INTAKE",name:"Business Plan Financial Model",desc:"Five-year three-statement model. One locked summary block that feeds every other document.",format:"XLSX"},
  {num:"04",stage:"RESEARCH",name:"Market & Competitor Intelligence Report",desc:"Evidence-graded market intelligence — TAM/SAM/SOM, competitor deep-dives, assumptions challenge.",format:"DOCX+PDF"},
  {num:"05",stage:"STRATEGY",name:"Go-to-Market Strategy",desc:"Channel-by-channel acquisition plan with kill-rule framework and 12-month phased roadmap.",format:"DOCX"},
  {num:"06",stage:"OUTPUT",name:"Business Plan",desc:"14-section MBA-standard plan. Every figure from the locked model. Every claim evidence-graded.",format:"DOCX+PDF"},
  {num:"07",stage:"OUTPUT",name:"Pitch Deck",desc:"10-12 slide investor presentation. Model-bound figures. Verified assumptions only.",format:"PPTX+PDF"},
  {num:"08",stage:"OUTPUT",name:"Detailed Use of Funds",desc:"Line-item breakdown of every pound — what it buys, when it deploys, what milestone it unlocks.",format:"DOCX+PDF"},
  {num:"09",stage:"OUTPUT",name:"Investor One-Pager",desc:"Single-page funder summary. The first document sent to any investor.",format:"DOCX+PDF"},
  {num:"10",stage:"OUTPUT",name:"Investor Diligence Supplement",desc:"Deep-dive for serious investors — scenario analysis, evidence checklist, risk summary.",format:"DOCX+PDF"},
  {num:"11",stage:"CONTROL",name:"Marketing Dashboard",desc:"Five-tab Excel decision engine — channel performance, kill rules, monthly model reconciliation.",format:"XLSX"},
  {num:"12",stage:"CONTROL",name:"Risk Register",desc:"19 live risks across five categories, model-linked with triggers, owners, mitigations.",format:"DOCX+PDF"},
  {num:"13",stage:"CONTROL",name:"Implementation Roadmap",desc:"Phase-by-phase delivery plan — budget buckets, milestones, funding checkpoint logic.",format:"DOCX+PDF"},
];

const STAGES=[
  {gate:"A",label:"Intake",num:"Stage 1",docs:"Docs 1-3",c:"#5B8C5A",desc:"Both questionnaires approved. Financial model built, balance checks pass, locked summary sealed before any downstream document begins."},
  {gate:"B",label:"Research",num:"Stage 2",docs:"Doc 4",c:"#4A6FA5",desc:"Market intelligence signed off. Every HIGH intelligence gap resolved. Assumptions validated against independent external evidence."},
  {gate:"C",label:"Strategy",num:"Stage 3",docs:"Doc 5",c:"#7B5EA7",desc:"GTM strategy signed off. CAC reconciles to model assumption. Funnel back-solve confirms customer targets are achievable."},
  {gate:"D",label:"Output",num:"Stage 4",docs:"Docs 6-10",c:"#C8A96E",desc:"All five funder-facing documents reconciled. Every figure traceable to the locked block. Gate D cross-check: 10 key figures verified identical."},
  {gate:"E",label:"Control",num:"Stage 5",docs:"Docs 11-13",c:"#B85C38",desc:"Live documents updated monthly. Dashboard Tab 5 reconciled. Kill-rule triggers reviewed. Investor updates from actuals."},
];

const PROBLEMS=[
  {n:"01",title:"Inconsistent figures",body:"The business plan says 2.1m. The pitch deck says 1.9m. The one-pager says 2.3m. An investor notices in under four minutes. The meeting ends."},
  {n:"02",title:"Heroic assumptions",body:"A 20% conversion rate cited as fact. A 95 CAC based on a guess. A TAM figure from a report the founder cannot locate. Due diligence exposes every one."},
  {n:"03",title:"Documents that do not hold",body:"The use of funds does not reconcile to the model. The risk register is not cross-referenced. Roadmap milestones do not match cash flow. Sophisticated investors stop reading."},
];

const RECIPIENTS=[
  {type:"Angel investor",when:"First outreach",docs:"One-Pager + Pitch Deck"},
  {type:"Angel / seed post-pitch",when:"After positive first meeting",docs:"One-Pager + Model + Diligence Pack + Business Plan"},
  {type:"Grant body",when:"Application submission",docs:"Business Plan + Financial Model + Use of Funds"},
  {type:"Bank / Start Up Loan",when:"Loan application",docs:"Financial Model + Use of Funds + Business Plan"},
  {type:"Adviser / NED",when:"Onboarding",docs:"Full pack — all 13 documents"},
];

function useInView(t=0.12){
  const r=useRef(null);const[v,sv]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sv(true);o.disconnect();}},{threshold:t});
    if(r.current)o.observe(r.current);return()=>o.disconnect();
  },[t]);return[r,v];
}

function useCounter(target,duration=2000,active=false){
  const[c,sc]=useState(0);
  useEffect(()=>{
    if(!active)return;let s=null;
    const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/duration,1);sc(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  },[target,duration,active]);return c;
}

function useW(){
  const[w,sw]=useState(typeof window!=='undefined'?window.innerWidth:1200);
  useEffect(()=>{const h=()=>sw(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return w;
}

function ParticleCanvas(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');let id,cw,ch;
    const resize=()=>{const d=window.devicePixelRatio||1;cw=canvas.offsetWidth;ch=canvas.offsetHeight;canvas.width=cw*d;canvas.height=ch*d;ctx.scale(d,d);};
    resize();window.addEventListener('resize',resize);
    const pts=Array.from({length:50},()=>({x:Math.random()*cw,y:Math.random()*ch,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.4+.4}));
    const draw=()=>{
      ctx.clearRect(0,0,cw,ch);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>cw)p.vx*=-1;if(p.y<0||p.y>ch)p.vy*=-1;});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(200,169,110,${.1*(1-d/130)})`;ctx.lineWidth=.5;ctx.stroke();}
      }
      pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(200,169,110,0.22)';ctx.fill();});
      id=requestAnimationFrame(draw);
    };
    draw();return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>;
}

function Shape({top,left,right,bottom,size=60,type='circle',opacity=.05,delay=0,spd=6}){
  const s={position:'absolute',top,left,right,bottom,width:size,height:size,opacity,animation:`floatA ${spd}s ease-in-out ${delay}s infinite`,pointerEvents:'none',zIndex:0,flexShrink:0};
  if(type==='ring')return<div style={{...s,borderRadius:'50%',border:`1px solid ${G}`,boxShadow:`0 0 15px ${G}22`}}/>;
  if(type==='diamond')return<div style={{...s,transform:'rotate(45deg)',border:`1px solid ${G}`}}/>;
  return<div style={{...s,borderRadius:'50%',border:`1px solid ${G}`}}/>;
}

function DocFloat({title,stage,delay=0,top,right,rotate=0}){
  const c=SC[stage]||G;
  return(
    <div style={{position:'absolute',top,right,width:190,background:'rgba(15,21,37,0.94)',border:`1px solid ${c}33`,borderRadius:3,padding:'12px 14px',animation:`floatB 7s ease-in-out ${delay}s infinite`,backdropFilter:'blur(8px)',boxShadow:`0 16px 50px rgba(0,0,0,.5)`,transform:`rotate(${rotate}deg)`,zIndex:5,pointerEvents:'none'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
        <span style={{fontFamily:MONO,fontSize:8,color:c,letterSpacing:'.1em',textTransform:'uppercase'}}>{stage}</span>
        <span style={{fontFamily:MONO,fontSize:7,color:TF,background:TF+'33',padding:'1px 5px'}}>CONFIDENTIAL</span>
      </div>
      <div style={{fontFamily:SERIF,fontSize:11,color:TP,marginBottom:8,lineHeight:1.4}}>{title}</div>
      {[85,70,90,60,75].map((w,i)=><div key={i} style={{height:3,background:i%3===0?c+'33':BD,borderRadius:2,marginBottom:4,width:`${w}%`}}/>)}
      <div style={{marginTop:8,paddingTop:6,borderTop:`1px solid ${BD}`,display:'flex',gap:3}}>
        {['V','V','S'].map((g,i)=><span key={i} style={{fontFamily:MONO,fontSize:7,color:g==='V'?'#5B8C5A':'#4A6FA5',background:g==='V'?'#5B8C5A18':'#4A6FA518',padding:'1px 4px'}}>{g}</span>)}
      </div>
    </div>
  );
}

function Reveal({children,delay=0,dir='up',style={}}){
  const[r,v]=useInView();
  const t={up:'translateY(36px)',left:'translateX(-36px)',right:'translateX(36px)'};
  return<div ref={r} style={{opacity:v?1:0,transform:v?'none':t[dir]||t.up,transition:`opacity .8s ease ${delay}s,transform .8s cubic-bezier(.16,1,.3,1) ${delay}s`,...style}}>{children}</div>;
}

function TiltCard({children,style={},off=false}){
  const r=useRef(null);
  const mv=e=>{if(off||!r.current)return;const b=r.current.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;r.current.style.transform=`perspective(900px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateZ(8px)`;};
  const lv=()=>{if(r.current)r.current.style.transform='perspective(900px) rotateY(0) rotateX(0) translateZ(0)';};
  return<div ref={r} onMouseMove={mv} onMouseLeave={lv} style={{transition:'transform .2s ease',...style}}>{children}</div>;
}

function Stat({n,lbl,pre='',suf='',delay=0}){
  const[r,v]=useInView();const c=useCounter(n,1800,v);
  return<div ref={r}>
    <div style={{fontFamily:SERIF,fontSize:'clamp(32px,5vw,48px)',fontWeight:300,lineHeight:1,background:`linear-gradient(135deg,${G},#E8C97A,${G})`,backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shimmer 3s linear infinite',animationDelay:`${delay}s`}}>{pre}{c}{suf}</div>
    <div style={{fontFamily:MONO,fontSize:9,color:TM,letterSpacing:'.12em',textTransform:'uppercase',marginTop:5}}>{lbl}</div>
  </div>;
}

function Pipeline({active,setActive,mob}){
  const shown=mob?STAGES.slice(0,3):STAGES;
  return<div>
    <div style={{position:'relative'}}>
      {!mob&&<svg style={{position:'absolute',top:50,left:'5%',width:'90%',height:4,overflow:'visible',pointerEvents:'none'}} viewBox="0 0 900 4" preserveAspectRatio="none">
        <line x1="0" y1="2" x2="900" y2="2" stroke={BD} strokeWidth="1"/>
        {STAGES.map((_,i)=>i<4&&<line key={i} x1={i*225+30} y1="2" x2={(i+1)*225-30} y2="2" stroke={G} strokeWidth="1" strokeDasharray="5 7" opacity="0.35"/>)}
        <circle r="3" fill={G} opacity=".9"><animateMotion dur="4s" repeatCount="indefinite" path="M0,2 L900,2"/></circle>
      </svg>}
      <div style={{display:'grid',gridTemplateColumns:`repeat(${mob?3:5},1fr)`,gap:0,position:'relative',zIndex:1}}>
        {shown.map((s,i)=>{const on=active===s.gate;return(
          <Reveal key={s.gate} delay={i*.1}>
            <div onClick={()=>setActive(on?null:s.gate)} style={{padding:'0 8px',textAlign:'center',cursor:'pointer'}}>
              <div style={{width:mob?76:96,height:mob?76:96,borderRadius:'50%',border:`1px solid ${s.c}${on?'88':'3A'}`,background:on?`${s.c}1A`:NC,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',transition:'all .4s cubic-bezier(.16,1,.3,1)',boxShadow:on?`0 0 36px ${s.c}44,inset 0 0 16px ${s.c}0D`:'none',transform:on?'scale(1.1)':'scale(1)'}}>
                <span style={{fontFamily:MONO,fontSize:7,color:s.c,letterSpacing:'.12em',textTransform:'uppercase'}}>Gate</span>
                <span style={{fontFamily:SERIF,fontSize:mob?24:30,fontWeight:300,color:s.c,lineHeight:1}}>{s.gate}</span>
              </div>
              <div style={{fontFamily:MONO,fontSize:8,color:TF,letterSpacing:'.12em',textTransform:'uppercase',marginBottom:3}}>{s.num}</div>
              <div style={{fontFamily:SERIF,fontSize:mob?13:16,fontWeight:400,color:TP,marginBottom:2}}>{s.label}</div>
              <div style={{fontFamily:MONO,fontSize:8,color:s.c}}>{s.docs}</div>
            </div>
          </Reveal>
        );})}
      </div>
    </div>
    {mob&&<p style={{textAlign:'center',fontFamily:MONO,fontSize:9,color:TF,margin:'12px 0',letterSpacing:'.08em',textTransform:'uppercase'}}>+ Gates D & E on delivery</p>}
    {active&&(()=>{const s=STAGES.find(x=>x.gate===active);return(
      <div style={{marginTop:20,padding:'24px 28px',background:NC,border:`1px solid ${s.c}44`,animation:'slideDown .3s cubic-bezier(.16,1,.3,1)'}}>
        <div style={{display:'flex',gap:20,alignItems:'flex-start'}}>
          <div style={{width:2,alignSelf:'stretch',background:`linear-gradient(to bottom,${s.c},${s.c}44)`,borderRadius:2,flexShrink:0}}/>
          <div>
            <div style={{fontFamily:MONO,fontSize:9,color:s.c,letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Gate {s.gate} — {s.label}</div>
            <p style={{color:TM,lineHeight:1.8,fontSize:13}}>{s.desc}</p>
          </div>
        </div>
      </div>
    );})()}
    {!active&&<p style={{textAlign:'center',fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.1em',marginTop:18,textTransform:'uppercase'}}>Select a gate</p>}
  </div>;
}

function MobMenu({open,close}){
  const links=[["Methodology","#methodology"],["Documents","#documents"],["How It Works","#how-it-works"],["Contact","#contact"]];
  return<div style={{position:'fixed',inset:0,zIndex:200,pointerEvents:open?'all':'none'}}>
    <div onClick={close} style={{position:'absolute',inset:0,background:'rgba(8,12,24,.7)',opacity:open?1:0,transition:'opacity .3s ease',backdropFilter:'blur(4px)'}}/>
    <div style={{position:'absolute',top:0,right:0,bottom:0,width:270,background:NC,borderLeft:`1px solid ${BD}`,transform:open?'translateX(0)':'translateX(100%)',transition:'transform .4s cubic-bezier(.16,1,.3,1)',display:'flex',flexDirection:'column',padding:28}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:44}}>
        <span style={{fontFamily:SERIF,fontSize:16,color:TP}}>Performance <em style={{color:G}}>StratEx</em></span>
        <button onClick={close} style={{background:'none',border:`1px solid ${BD}`,color:TM,width:34,height:34,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s'}}>✕</button>
      </div>
      <nav style={{display:'flex',flexDirection:'column',gap:2}}>
        {links.map(([l,h],i)=><a key={l} href={h} onClick={close} style={{fontFamily:MONO,fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',color:TM,textDecoration:'none',padding:'15px 0',borderBottom:`1px solid ${BD}`,opacity:open?1:0,transform:open?'none':'translateX(20px)',transition:`all .4s cubic-bezier(.16,1,.3,1) ${.12+i*.07}s`}}>{l}</a>)}
      </nav>
      <div style={{marginTop:'auto'}}>
        <button style={{width:'100%',padding:15,background:G,color:N,fontFamily:SANS,fontWeight:700,fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',border:'none',cursor:'pointer',transition:'all .25s ease'}}>Book a Call</button>
      </div>
    </div>
  </div>;
}

export default function App(){
  const[gate,setGate]=useState(null);
  const[menu,setMenu]=useState(false);
  const ww=useW();const mob=ww<768,tab=ww<1024;
  const docsByStage={};DOCS.forEach(d=>{if(!docsByStage[d.stage])docsByStage[d.stage]=[];docsByStage[d.stage].push(d);});

  useEffect(()=>{
    const l=document.createElement('link');l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Syne:wght@400;500;600;700&family=Syne+Mono&display=swap';
    document.head.appendChild(l);return()=>{if(document.head.contains(l))document.head.removeChild(l);};
  },[]);

  return(
    <div style={{background:N,color:TP,fontFamily:SANS,minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:${G}33;color:${TP};}
        ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:${N};}::-webkit-scrollbar-thumb{background:${G}55;border-radius:3px;}
        html{scroll-behavior:smooth;}
        @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-16px) rotate(1.5deg)}66%{transform:translateY(-8px) rotate(-.8deg)}}
        @keyframes floatB{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-20px) rotate(calc(var(--r,0deg) + 2deg))}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes morph{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
        @keyframes rotate-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(350%)}}
        @keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
        .btn-g{background:${G};color:${N};border:none;padding:14px 30px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .25s ease;display:inline-block;text-decoration:none;}
        .btn-g:hover{background:#D9BB7C;box-shadow:0 8px 28px ${G}44;transform:translateY(-2px);}
        .btn-o{background:transparent;color:${TP};border:1px solid ${BD};padding:14px 30px;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .25s ease;display:inline-block;text-decoration:none;}
        .btn-o:hover{border-color:${G}66;color:${G};}
        .nav-a{color:${TM};text-decoration:none;font-size:12px;letter-spacing:.09em;text-transform:uppercase;font-family:${SANS};transition:color .2s;}.nav-a:hover{color:${G};}
        .dc{transition:all .3s cubic-bezier(.16,1,.3,1);cursor:pointer;position:relative;overflow:hidden;}
        .dc:hover{transform:translateY(-5px) !important;box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 0 1px ${G}33 !important;}
        .dc::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${G}07,transparent);opacity:0;transition:opacity .3s;}.dc:hover::before{opacity:1;}
        .gr{transition:transform .2s ease;}.gr:hover{transform:translateX(5px);}
        @media(max-width:768px){.dt{display:none !important;}.mob-2{grid-template-columns:1fr 1fr !important;}.mob-1{grid-template-columns:1fr !important;}}
        @media(min-width:769px){.mo{display:none !important;}}
        @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms !important;transition-duration:.01ms !important;}}
      `}</style>

      <MobMenu open={menu} close={()=>setMenu(false)}/>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:`${N}EE`,backdropFilter:'blur(16px)',borderBottom:`1px solid ${BD}`}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{fontFamily:SERIF,fontSize:18}}>
            Performance <em style={{color:G,fontStyle:'italic'}}>StratEx</em>
          </div>
          <div className="dt" style={{display:'flex',gap:32,alignItems:'center'}}>
            {[["Methodology","#methodology"],["Documents","#documents"],["How It Works","#how-it-works"],["Contact","#contact"]].map(([l,h])=><a key={l} href={h} className="nav-a">{l}</a>)}
            <button className="btn-g" style={{padding:'10px 22px',fontSize:11}}>Book a Call</button>
          </div>
          <button className="mo" onClick={()=>setMenu(true)} style={{background:'none',border:`1px solid ${BD}`,color:TM,width:40,height:40,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:5}}>
            {[0,1,2].map(i=><span key={i} style={{width:18,height:1,background:TM,display:'block'}}/>)}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',paddingTop:64,overflow:'hidden'}}>
        <ParticleCanvas/>
        <Shape top="15%" left="5%" size={110} type="ring" opacity={.04} delay={0} spd={9}/>
        <Shape top="65%" left="7%" size={55} type="diamond" opacity={.05} delay={2} spd={6}/>
        <Shape bottom="25%" right="3%" size={90} type="circle" opacity={.04} delay={1} spd={11}/>
        <div className="dt" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:650,height:650,borderRadius:'50%',border:`1px solid ${G}06`,animation:'rotate-slow 40s linear infinite',pointerEvents:'none',zIndex:0}}/>
        <div className="dt" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:900,height:900,borderRadius:'50%',border:`1px solid ${G}03`,animation:'rotate-slow 65s linear infinite reverse',pointerEvents:'none',zIndex:0}}/>
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${G}55 30%,${G}55 70%,transparent)`,zIndex:1}}/>
        <div className="dt" style={{position:'absolute',right:-80,top:'50%',transform:'translateY(-50%)',fontFamily:SERIF,fontSize:'min(360px,28vw)',fontWeight:300,color:`${G}05`,lineHeight:1,userSelect:'none',pointerEvents:'none'}}>13</div>

        <div style={{maxWidth:1200,margin:'0 auto',padding:`80px 24px`,width:'100%',position:'relative',zIndex:2}}>
          <div style={{display:'grid',gridTemplateColumns:tab?'1fr':'1fr 1fr',gap:48,alignItems:'center'}}>
            <div style={{maxWidth:600}}>
              <Reveal>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:26}}>
                  <div style={{width:24,height:1,background:G}}/>
                  <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'.2em',color:G,textTransform:'uppercase'}}>Forensic-grade investor documentation</span>
                </div>
              </Reveal>
              <Reveal delay={.1}>
                <h1 style={{fontFamily:SERIF,fontSize:'clamp(38px,6vw,74px)',fontWeight:300,lineHeight:1.08,marginBottom:22,color:TP}}>
                  The documents that<br/>
                  <em style={{background:`linear-gradient(135deg,${G},#EDD48A,${G})`,backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontStyle:'italic',animation:'shimmer 4s linear infinite'}}>survive due diligence.</em>
                </h1>
              </Reveal>
              <Reveal delay={.2}>
                <p style={{fontSize:mob?14:17,lineHeight:1.8,color:TM,marginBottom:36,maxWidth:500}}>
                  Performance StratEx turns founder ideas into 13 professionally integrated documents — every figure from one locked financial model, every claim graded against independent evidence.
                </p>
              </Reveal>
              <Reveal delay={.3}>
                <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:48}}>
                  <button className="btn-g">Book an Introductory Call</button>
                  <a href="#documents" className="btn-o">See the Pack</a>
                </div>
              </Reveal>
              <Reveal delay={.4}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:mob?12:20,paddingTop:28,borderTop:`1px solid ${BD}`}}>
                  <Stat n={13} lbl="Documents" delay={0}/>
                  <Stat n={5} lbl="Gates" delay={.2}/>
                  <Stat n={3} lbl="Ventures" delay={.4}/>
                  <Stat n={0} pre="£" lbl="Retyped" delay={.6}/>
                </div>
              </Reveal>
            </div>

            {/* Floating doc cards — desktop only */}
            {!tab&&(
              <div style={{position:'relative',height:440}}>
                <DocFloat title="Business Plan Financial Model" stage="INTAKE" delay={0} top="2%" right="8%" rotate={-3}/>
                <DocFloat title="Market & Competitor Intelligence Report" stage="RESEARCH" delay={1.4} top="32%" right="2%" rotate={2}/>
                <DocFloat title="Go-to-Market Strategy" stage="STRATEGY" delay={.7} top="62%" right="12%" rotate={-1.5}/>
                <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'visible'}} viewBox="0 0 300 440">
                  <line x1="150" y1="110" x2="190" y2="200" stroke={G} strokeWidth=".5" strokeDasharray="4 7" opacity=".25"/>
                  <line x1="190" y1="200" x2="170" y2="295" stroke={G} strokeWidth=".5" strokeDasharray="4 7" opacity=".25"/>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="dt" style={{position:'absolute',top:82,right:56,width:90,height:90,borderTop:`1px solid ${G}33`,borderRight:`1px solid ${G}33`}}/>
        <div className="dt" style={{position:'absolute',bottom:56,left:56,width:65,height:65,borderBottom:`1px solid ${G}22`,borderLeft:`1px solid ${G}22`}}/>
      </section>

      {/* PROBLEM */}
      <section style={{background:NC,borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-25%',right:'-8%',width:350,height:350,borderRadius:'50%',background:`radial-gradient(circle,${G}07,transparent 70%)`,pointerEvents:'none',animation:'glow 4s ease infinite'}}/>
        <div style={{maxWidth:1200,margin:'0 auto',padding:`${mob?56:96}px 24px`}}>
          <Reveal>
            <div style={{textAlign:'center',marginBottom:52}}>
              <span style={{fontFamily:MONO,fontSize:10,color:G,letterSpacing:'.2em',textTransform:'uppercase'}}>The problem</span>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(26px,4vw,50px)',fontWeight:300,marginTop:12,color:TP}}>Three ways investor documents fail.</h2>
            </div>
          </Reveal>
          <div className="mob-1" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:BD}}>
            {PROBLEMS.map((p,i)=>(
              <Reveal key={p.n} delay={i*.12}>
                <div style={{background:NC,padding:'38px 32px',height:'100%',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${G},transparent)`,opacity:.4}}/>
                  <div style={{fontFamily:MONO,fontSize:10,color:TF,letterSpacing:'.15em',marginBottom:16}}>{p.n}</div>
                  <h3 style={{fontFamily:SERIF,fontSize:22,fontWeight:400,color:TP,marginBottom:16,lineHeight:1.3}}>{p.title}</h3>
                  <p style={{color:TM,lineHeight:1.8,fontSize:14}}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" style={{padding:`${mob?56:116}px 24px`,position:'relative'}}>
        <Shape top="8%" right="2%" size={130} type="circle" opacity={.03} delay={0} spd={14}/>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <Reveal>
            <div style={{textAlign:'center',marginBottom:mob?36:68}}>
              <span style={{fontFamily:MONO,fontSize:10,color:G,letterSpacing:'.2em',textTransform:'uppercase'}}>The methodology</span>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(26px,4vw,50px)',fontWeight:300,marginTop:12,color:TP,marginBottom:12}}>Five stages. Five gates.<br/>Nothing advances without sign-off.</h2>
              <p style={{color:TM,maxWidth:480,margin:'0 auto',lineHeight:1.75,fontSize:14}}>Each gate is a hard stop. No document generated before its gate. No document reaches a client without explicit approval.</p>
            </div>
          </Reveal>
          <Pipeline active={gate} setActive={setGate} mob={mob}/>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section id="documents" style={{background:NC,borderTop:`1px solid ${BD}`,padding:`${mob?56:116}px 24px`,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',bottom:'-15%',left:'-4%',width:280,height:280,borderRadius:'50%',background:`radial-gradient(circle,${G}05,transparent 70%)`,pointerEvents:'none'}}/>
        <div style={{maxWidth:1200,margin:'0 auto',position:'relative',zIndex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:mob?'flex-start':'flex-end',flexDirection:mob?'column':'row',marginBottom:48,gap:20}}>
            <Reveal>
              <div>
                <span style={{fontFamily:MONO,fontSize:10,color:G,letterSpacing:'.2em',textTransform:'uppercase'}}>The document pack</span>
                <h2 style={{fontFamily:SERIF,fontSize:'clamp(26px,4vw,50px)',fontWeight:300,marginTop:12,color:TP}}>13 documents.<br/>One integrated system.</h2>
              </div>
            </Reveal>
            <Reveal delay={.15}><p style={{color:TM,maxWidth:320,lineHeight:1.8,fontSize:14}}>Every document feeds the next. Every figure from one locked model. Every claim evidence-graded before it reaches a funder.</p></Reveal>
          </div>
          {Object.entries(docsByStage).map(([stage,docs])=>(
            <div key={stage} style={{marginBottom:36}}>
              <Reveal>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:SC[stage],boxShadow:`0 0 10px ${SC[stage]}88`,animation:'glow 2s ease infinite'}}/>
                  <span style={{fontFamily:MONO,fontSize:9,color:SC[stage],letterSpacing:'.18em',textTransform:'uppercase'}}>{stage}</span>
                  <div style={{flex:1,height:1,background:`linear-gradient(90deg,${SC[stage]}33,transparent)`}}/>
                </div>
              </Reveal>
              <div className="mob-1" style={{display:'grid',gridTemplateColumns:tab?'repeat(2,1fr)':'repeat(auto-fill,minmax(250px,1fr))',gap:1,background:BD}}>
                {docs.map((doc,i)=>(
                  <Reveal key={doc.num} delay={i*.07}>
                    <TiltCard off={mob} style={{height:'100%'}}>
                      <div className="dc" style={{background:N,padding:'24px 22px',borderTop:`2px solid ${SC[stage]}44`,height:'100%'}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:9}}>
                          <span style={{fontFamily:MONO,fontSize:9,color:TF}}>{doc.num}</span>
                          <span style={{fontFamily:MONO,fontSize:8,color:SC[stage],background:`${SC[stage]}18`,padding:'2px 6px'}}>{doc.format}</span>
                        </div>
                        <h4 style={{fontFamily:SERIF,fontSize:15,fontWeight:400,color:TP,lineHeight:1.35,marginBottom:7}}>{doc.name}</h4>
                        <p style={{fontSize:12,color:TM,lineHeight:1.7}}>{doc.desc}</p>
                        <div style={{marginTop:12,height:1,background:`linear-gradient(90deg,${SC[stage]}33,transparent)`}}/>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{padding:`${mob?56:116}px 24px`,position:'relative',overflow:'hidden'}}>
        <Shape top="5%" left="1%" size={180} type="ring" opacity={.02} delay={1} spd={16}/>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <Reveal>
            <div style={{textAlign:'center',marginBottom:mob?36:68}}>
              <span style={{fontFamily:MONO,fontSize:10,color:G,letterSpacing:'.2em',textTransform:'uppercase'}}>The quality layer</span>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(26px,4vw,50px)',fontWeight:300,marginTop:12,color:TP}}>Built to survive scrutiny.</h2>
            </div>
          </Reveal>
          <div className="mob-1" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:2,background:BD}}>
            <Reveal dir="left">
              <div style={{background:N,padding:mob?'34px 26px':'50px 42px'}}>
                <div style={{fontFamily:MONO,fontSize:9,color:G,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:18}}>Evidence grading</div>
                <h3 style={{fontFamily:SERIF,fontSize:mob?20:24,fontWeight:300,color:TP,marginBottom:16,lineHeight:1.3}}>Every claim graded before it reaches a funder.</h3>
                <p style={{color:TM,lineHeight:1.8,marginBottom:28,fontSize:13}}>No claim enters a document without an evidence grade. Unverified assumptions are flagged explicitly — never silently included.</p>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {[{g:'V',l:'Verified',d:'External source, cited',c:'#5B8C5A'},{g:'S',l:'Supported',d:'Multiple credible indicators',c:'#4A6FA5'},{g:'E',l:'Estimated',d:'Reasoned — flagged as such',c:G},{g:'U',l:'Unsupported',d:'Intelligence gap — must resolve before sign-off',c:'#B85C38'}].map(({g,l,d,c})=>(
                    <div key={g} className="gr" style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',background:NC,borderLeft:`2px solid ${c}44`}}>
                      <span style={{fontFamily:MONO,fontSize:14,fontWeight:700,color:c,minWidth:16,textShadow:`0 0 16px ${c}66`}}>{g}</span>
                      <div>
                        <div style={{fontFamily:SANS,fontSize:12,fontWeight:600,color:TP,marginBottom:2}}>{l}</div>
                        <div style={{fontSize:11,color:TM}}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div style={{background:N,padding:mob?'34px 26px':'50px 42px'}}>
                <div style={{fontFamily:MONO,fontSize:9,color:G,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:18}}>Adversarial review</div>
                <h3 style={{fontFamily:SERIF,fontSize:mob?20:24,fontWeight:300,color:TP,marginBottom:16,lineHeight:1.3}}>Independent AI panels challenge every stage.</h3>
                <p style={{color:TM,lineHeight:1.8,marginBottom:28,fontSize:13}}>After every stage, a panel of different AI models attempts to break the work. The builder never reviews its own output.</p>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {[{b:'Optimism audit',d:'Challenges every growth, conversion, churn and CAC assumption against sector norms.'},{b:'Arithmetic check',d:'Re-derives key outputs by hand. Finds any sum or carry-forward that does not reconcile.'},{b:'Formula integrity',d:'Traces every cross-sheet reference. Finds anything hard-typed that should be a live formula.'},{b:'Investor sceptic',d:'Tests every figure against the locked block. Finds the first question that sinks the pitch.'}].map(({b,d},i)=>(
                    <Reveal key={b} delay={i*.08}>
                      <div style={{padding:'14px 18px',background:NC,borderLeft:`2px solid ${G}44`}}>
                        <div style={{fontFamily:MONO,fontSize:10,color:G,marginBottom:4}}>{b}</div>
                        <div style={{fontSize:12,color:TM,lineHeight:1.65}}>{d}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="left">
              <div style={{background:NC,padding:mob?'34px 26px':'50px 42px',position:'relative',overflow:'hidden'}}>
                <div style={{fontFamily:MONO,fontSize:9,color:G,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:18}}>The locked block</div>
                <h3 style={{fontFamily:SERIF,fontSize:mob?20:24,fontWeight:300,color:TP,marginBottom:16,lineHeight:1.3}}>One financial model. Every document reads from it.</h3>
                <p style={{color:TM,lineHeight:1.8,marginBottom:24,fontSize:13}}>The model produces one locked summary block. Every downstream document is a live read. Figures cannot contradict each other.</p>
                <div style={{position:'relative',padding:'18px',background:N,fontFamily:MONO,fontSize:mob?9:11,color:TM,lineHeight:2.1,borderLeft:`1px solid ${BD}`,overflow:'hidden'}}>
                  <div style={{position:'absolute',left:0,right:0,height:36,background:`linear-gradient(to bottom,transparent,${G}07,transparent)`,animation:'scan 3s linear infinite',pointerEvents:'none'}}/>
                  <div><span style={{color:G}}>Revenue Y1  </span>Business Plan · One-Pager · Use of Funds</div>
                  <div><span style={{color:G}}>Revenue Y5  </span>Business Plan · Pitch Deck · Diligence</div>
                  <div><span style={{color:G}}>CAC         </span>GTM · Dashboard · Risk Register · Roadmap</div>
                  <div><span style={{color:G}}>Churn       </span>GTM · Dashboard · Business Plan</div>
                  <div style={{marginTop:8,paddingTop:8,borderTop:`1px solid ${BD}`,color:'#5B8C5A'}}>Gate D: 10 key figures verified identical</div>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div style={{background:NC,padding:mob?'34px 26px':'50px 42px'}}>
                <div style={{fontFamily:MONO,fontSize:9,color:G,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:18}}>Proven on live ventures</div>
                <h3 style={{fontFamily:SERIF,fontSize:mob?20:24,fontWeight:300,color:TP,marginBottom:16,lineHeight:1.3}}>Full document packs delivered. Not theory.</h3>
                <p style={{color:TM,lineHeight:1.8,marginBottom:28,fontSize:13}}>The workflow validated end-to-end on three live engagements. The documents are real. The methodology works.</p>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {[{n:'Motorlyst',s:'Used car dealer marketplace — Northern Ireland'},{n:'Revizr',s:'Property technology platform'},{n:'Farmmap',s:'Agricultural data platform — NI / ROI cross-border'}].map(({n,s},i)=>(
                    <Reveal key={n} delay={i*.1}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px',background:N,gap:10,flexWrap:'wrap'}}>
                        <div>
                          <div style={{fontFamily:SERIF,fontSize:15,fontWeight:400,color:TP,marginBottom:2}}>{n}</div>
                          <div style={{fontSize:11,color:TM}}>{s}</div>
                        </div>
                        <div style={{fontFamily:MONO,fontSize:9,color:'#5B8C5A',background:'#5B8C5A18',padding:'3px 9px',animation:`glow 3s ease infinite`,animationDelay:`${i*.4}s`,flexShrink:0}}>Full pack delivered</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{background:NC,borderTop:`1px solid ${BD}`,padding:`${mob?56:96}px 24px`}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <Reveal><div style={{textAlign:'center',marginBottom:44}}>
            <span style={{fontFamily:MONO,fontSize:10,color:G,letterSpacing:'.2em',textTransform:'uppercase'}}>Who it's for</span>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(26px,4vw,50px)',fontWeight:300,marginTop:12,color:TP}}>Documents for every funding route.</h2>
          </div></Reveal>
          <div className="mob-1" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:1,background:BD}}>
            {RECIPIENTS.map((r,i)=>(
              <Reveal key={r.type} delay={i*.07}>
                <div style={{background:N,padding:'28px 28px',position:'relative',overflow:'hidden',transition:'background .25s ease'}}>
                  <div style={{position:'absolute',top:0,left:0,width:2,height:'100%',background:`linear-gradient(to bottom,${G},transparent)`}}/>
                  <div style={{fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.12em',textTransform:'uppercase',marginBottom:9}}>{r.when}</div>
                  <h4 style={{fontFamily:SERIF,fontSize:mob?17:19,fontWeight:400,color:TP,marginBottom:12,lineHeight:1.3}}>{r.type}</h4>
                  <div style={{height:1,background:BD,marginBottom:12}}/>
                  <div style={{fontFamily:MONO,fontSize:10,color:G,lineHeight:1.8}}>{r.docs}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{padding:`${mob?56:116}px 24px`,position:'relative',overflow:'hidden'}}>
        <Shape bottom="8%" right="2%" size={150} type="ring" opacity={.03} delay={2} spd={12}/>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="mob-1" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:mob?36:72,alignItems:'center'}}>
            <Reveal dir="left">
              <div>
                <span style={{fontFamily:MONO,fontSize:10,color:G,letterSpacing:'.2em',textTransform:'uppercase'}}>What makes this different</span>
                <h2 style={{fontFamily:SERIF,fontSize:'clamp(22px,3.5vw,44px)',fontWeight:300,marginTop:18,color:TP,lineHeight:1.15,marginBottom:20}}>
                  Not a template.<br/>Not a consultant draft.<br/><em style={{color:G,fontStyle:'italic'}}>A forensic system.</em>
                </h2>
                <p style={{color:TM,lineHeight:1.8,fontSize:14,marginBottom:18}}>Every document produced from verified inputs. Every financial figure originates in a model built for your venture. Every assumption challenged before any funder-facing document is written.</p>
                <p style={{color:TM,lineHeight:1.8,fontSize:14}}>Lynsey brings a forensic accounting background to every engagement. The numbers hold up under scrutiny — not because they look right, but because they are right.</p>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div style={{display:'flex',flexDirection:'column',gap:1}}>
                {[["Generic templates filled in","Tailored model built from your inputs"],["Figures retyped between documents","One locked source — live formula links"],["Assumptions presented as facts","V/S/E/U evidence grading throughout"],["No cross-document reconciliation","10 key figures verified at Gate D"],["Documents you produce yourself","Adviser-signed, gate-enforced workflow"]].map(([bad,good],i)=>(
                  <Reveal key={i} delay={i*.07}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:BD}}>
                      <div style={{padding:'14px 16px',background:N,display:'flex',gap:8,alignItems:'flex-start'}}>
                        <span style={{color:'#B85C38',fontFamily:MONO,fontSize:11,flexShrink:0,marginTop:1}}>x</span>
                        <span style={{fontSize:12,color:TM,lineHeight:1.5}}>{bad}</span>
                      </div>
                      <div style={{padding:'14px 16px',background:NC,display:'flex',gap:8,alignItems:'flex-start'}}>
                        <span style={{color:'#5B8C5A',fontFamily:MONO,fontSize:11,flexShrink:0,marginTop:1}}>v</span>
                        <span style={{fontSize:12,color:TP,lineHeight:1.5}}>{good}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{borderTop:`1px solid ${BD}`,background:`linear-gradient(135deg,${N} 0%,#0C1220 100%)`,padding:`${mob?72:116}px 24px`,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:mob?280:600,height:mob?280:600,background:`radial-gradient(circle,${G}09,transparent 65%)`,animation:'morph 12s ease-in-out infinite',pointerEvents:'none'}}/>
        <div className="dt" style={{position:'absolute',top:'25%',right:'12%',width:180,height:180,borderRadius:'50%',border:`1px solid ${G}07`,animation:'rotate-slow 22s linear infinite',pointerEvents:'none'}}/>
        <Shape top="12%" left="6%" size={55} type="diamond" opacity={.04} delay={.5} spd={8}/>
        <Shape bottom="15%" right="6%" size={75} type="circle" opacity={.04} delay={1.5} spd={10}/>
        <div style={{maxWidth:640,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
          <Reveal>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:24}}>
              <div style={{width:32,height:1,background:`linear-gradient(90deg,transparent,${G})`}}/>
              <span style={{fontFamily:MONO,fontSize:9,letterSpacing:'.2em',color:G,textTransform:'uppercase'}}>Start your engagement</span>
              <div style={{width:32,height:1,background:`linear-gradient(90deg,${G},transparent)`}}/>
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(30px,5vw,60px)',fontWeight:300,color:TP,lineHeight:1.08,marginBottom:20}}>
              Ready to build documents<br/><em style={{background:`linear-gradient(135deg,${G},#EDD48A,${G})`,backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'shimmer 4s linear infinite'}}>that survive due diligence?</em>
            </h2>
          </Reveal>
          <Reveal delay={.2}>
            <p style={{color:TM,lineHeight:1.85,fontSize:mob?14:15,marginBottom:40,maxWidth:440,margin:'0 auto 40px'}}>
              Book an introductory call with Lynsey. Bring your idea or an existing draft. We will set out a clear path to a complete, investor-ready pack.
            </p>
          </Reveal>
          <Reveal delay={.3}>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:40}}>
              <button className="btn-g">Book an Introductory Call</button>
              <button className="btn-o">hello@performancestratex.com</button>
            </div>
          </Reveal>
          <Reveal delay={.4}>
            <div style={{display:'flex',gap:mob?14:32,justifyContent:'center',flexWrap:'wrap'}}>
              {["No obligation","Confidential throughout","Turnaround discussed at intake"].map(t=>(
                <div key={t} style={{display:'flex',alignItems:'center',gap:6}}>
                  <div style={{width:4,height:4,borderRadius:'50%',background:G,boxShadow:`0 0 8px ${G}`}}/>
                  <span style={{fontFamily:MONO,fontSize:9,color:TM,letterSpacing:'.05em'}}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${BD}`,padding:'32px 24px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
          <div style={{fontFamily:SERIF,fontSize:15,color:TP}}>Performance <em style={{color:G,fontStyle:'italic'}}>StratEx</em></div>
          <div style={{fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.06em'}}>2026 Performance StratEx · Forensic-grade investor documentation</div>
          <div style={{display:'flex',gap:18}}>{['Privacy','Terms','Contact'].map(l=><span key={l} style={{fontFamily:MONO,fontSize:9,color:TF,cursor:'pointer',transition:'color .2s ease',letterSpacing:'.06em'}}>{l}</span>)}</div>
        </div>
      </footer>
    </div>
  );
}
