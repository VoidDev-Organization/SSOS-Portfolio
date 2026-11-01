import {A} from '../../assets'
import {CONFIG,NAV} from '../../data'
import {NavLink} from './NavLink'
import {useLang} from '../../context/LangContext'
import './Footer.css'

const SOCIALS = CONFIG.social ? [
  {key:'instagram',label:'Instagram',href:CONFIG.social.instagram,icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>)},
  {key:'facebook',label:'Facebook',href:CONFIG.social.facebook,icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1v-2.9h2.1V9.8c0-2.1 1.2-3.2 3.1-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.6-1.3 1.3v1.6h2.2l-.35 2.9h-1.85v7A10 10 0 0 0 22 12z"/></svg>)},
  {key:'x',label:'X',href:CONFIG.social.x,icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2h3.3l-7.2 8.3L22.8 22h-6.6l-5.2-6.8L4.8 22H1.5l7.7-8.9L1.2 2h6.8l4.7 6.2L18.2 2zm-1.2 18h1.8L7.1 3.9H5.2L17 20z"/></svg>)},
  {key:'linkedin',label:'LinkedIn',href:CONFIG.social.linkedin,icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h3.96V21H3zM9.5 8.98h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-3.96v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9.5z"/></svg>)},
  {key:'youtube',label:'YouTube',href:CONFIG.social.youtube,icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>)},
  {key:'tiktok',label:'TikTok',href:CONFIG.social.tiktok,icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.6 2.3 2.2 3.9 4.5 4.3v3.1c-1.7-.1-3.3-.7-4.5-1.6v6.4a6.1 6.1 0 1 1-5.2-6v3.2a2.9 2.9 0 1 0 2.1 2.8V3h3.1z"/></svg>)},
] : []

export function Footer(){const {t}=useLang();return <footer><div className="wrap"><div className="cols"><div className="brand"><div className="lp"><img src={A.logoLight||A.logo} alt="SSOS"/></div><p>{t('footer.tagline')}</p><p className="muted">{t('footer.mission')}</p></div>
 <nav aria-label={t("footer.navAria")}>{NAV.map(([i,t])=><NavLink key={i} id={i}>{t}</NavLink>)}</nav>
 <div className="info"><h4>{t('footer.contact')}</h4>{CONFIG.contact?<a href={'mailto:'+CONFIG.contact}>{CONFIG.contact}</a>:<span className="muted">{t('footer.contactSoon')}</span>}<h4>{t('footer.follow')}</h4><div className="socials">
{SOCIALS.map(s=><a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>)}
</div></div></div>
 <div className="void-credit">
  <a className="void-mark" href={CONFIG.voiddevUrl} target="_blank" rel="noopener noreferrer" aria-label={t('footer.portfolio')}><img src={A.voidDevMark} alt=""/></a>
  <div className="void-credit-copy"><span>{t('footer.credit')}</span><a className="void-name" href={CONFIG.voiddevUrl} target="_blank" rel="noopener noreferrer">Void Developers <span aria-hidden="true">↗</span></a></div>
  <a className="void-portfolio" href={CONFIG.voiddevUrl} target="_blank" rel="noopener noreferrer">{t('footer.portfolio')} <span aria-hidden="true">↗</span></a>
 </div></div></footer>}