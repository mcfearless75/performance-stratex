import { useEffect } from "react";

const G="#C8A96E",N="#080C18",NC="#0F1525",BD="#1E2840",TP="#EDE8DF",TM="#7A7F94",TF="#3A4060";
const SERIF="'Cormorant Garamond',Georgia,serif",SANS="'Syne',sans-serif",MONO="'Syne Mono',monospace";

export default function LegalLayout({ eyebrow, title, updated, children }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{background:N,color:TP,fontFamily:SANS,minHeight:'100vh'}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:${G}33;color:${TP};}
        html{scroll-behavior:smooth;}
        .legal-body h2{font-family:${SERIF};font-size:24px;font-weight:400;color:${TP};margin:44px 0 14px;letter-spacing:-.01em;}
        .legal-body h3{font-family:${SANS};font-size:13px;font-weight:600;color:${G};margin:28px 0 10px;letter-spacing:.08em;text-transform:uppercase;}
        .legal-body p{color:${TM};line-height:1.85;font-size:14px;margin-bottom:14px;}
        .legal-body ul,.legal-body ol{color:${TM};line-height:1.85;font-size:14px;margin:0 0 16px 22px;}
        .legal-body li{margin-bottom:6px;}
        .legal-body strong{color:${TP};font-weight:600;}
        .legal-body a{color:${G};text-decoration:underline;text-underline-offset:3px;}
        .legal-body hr{border:none;border-top:1px solid ${BD};margin:36px 0;}
      `}</style>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:`${N}EE`,backdropFilter:'blur(16px)',borderBottom:`1px solid ${BD}`}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="#/" style={{fontFamily:SERIF,fontSize:18,color:TP,textDecoration:'none'}}>
            Performance <em style={{color:G,fontStyle:'italic'}}>StratEx</em>
          </a>
          <a href="#/" style={{fontFamily:MONO,fontSize:11,color:TM,textDecoration:'none',letterSpacing:'.1em',textTransform:'uppercase'}}>← Back to site</a>
        </div>
      </nav>

      <article style={{maxWidth:780,margin:'0 auto',padding:'120px 24px 80px'}}>
        <header style={{marginBottom:48,paddingBottom:32,borderBottom:`1px solid ${BD}`}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:24,height:1,background:G}}/>
            <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'.2em',color:G,textTransform:'uppercase'}}>{eyebrow}</span>
          </div>
          <h1 style={{fontFamily:SERIF,fontSize:'clamp(34px,5vw,52px)',fontWeight:300,lineHeight:1.1,color:TP,marginBottom:18}}>{title}</h1>
          <p style={{fontFamily:MONO,fontSize:10,color:TF,letterSpacing:'.08em',textTransform:'uppercase'}}>Last updated: {updated}</p>
        </header>
        <div className="legal-body">{children}</div>
      </article>

      <footer style={{borderTop:`1px solid ${BD}`,padding:'32px 24px',marginTop:40}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
          <div style={{fontFamily:SERIF,fontSize:15,color:TP}}>Performance <em style={{color:G,fontStyle:'italic'}}>StratEx</em></div>
          <div style={{fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.06em'}}>2026 Performance StratEx</div>
          <div style={{display:'flex',gap:18}}>
            <a href="#/privacy" style={{fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.06em',textDecoration:'none'}}>Privacy</a>
            <a href="#/terms" style={{fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.06em',textDecoration:'none'}}>Terms</a>
            <a href="#/#contact" style={{fontFamily:MONO,fontSize:9,color:TF,letterSpacing:'.06em',textDecoration:'none'}}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
