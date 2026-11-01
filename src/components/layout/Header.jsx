import {useState} from 'react'
import {A} from '../../assets'
import {CONFIG,NAV} from '../../data'
import {go} from '../../utils/scroll'
import {NavLink} from './NavLink'
import GooeyNav from '../ui/GooeyNav/GooeyNav'
import '../ui/GooeyNav/GooeyNav.css'
import './Header.css'
import {useTheme} from '../../context/ThemeContext'
import {useLang} from '../../context/LangContext'

export function Header({back}){const [open,setOpen]=useState(false);const {theme,toggle:toggleTheme}=useTheme();const {lang,toggle:toggleLang,t}=useLang();const navItems=NAV.filter(([id])=>id!=='event')
 return <header><div className="wrap nav"><div className="brand-lockup"><NavLink id="home"><img className="lg-l" src={A.wmLight} alt={t('common.logoAlt')} width="104" height="44"/><img className="lg-d" src={A.wmDark} alt="" aria-hidden="true" width="104" height="44"/></NavLink><span className="brand-cross" aria-hidden="true">×</span><a className="void-header-link" href={CONFIG.voiddevUrl} target="_blank" rel="noopener noreferrer" aria-label="Void Developers"><img src={A.voidDevMark} alt="" width="22" height="22"/></a></div>
 {back?<button className="btn sec" style={{padding:'8px 18px'}} onClick={back}>← {t('common.backArchive')}</button>:<><button className="burger" aria-label={t('common.toggleMenu')} aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button>
 <nav className={'links'+(open?' open':'')} aria-label={t('common.mainNav')}><GooeyNav items={navItems.map(([i])=>({label:t('nav.'+i)}))} onChange={(idx)=>{setOpen(false);go(navItems[idx][0])}} theme={theme} size="sm"/><NavLink id="event" className="btn" onNav={()=>setOpen(false)}>{t('nav.nextEvent')}</NavLink>
 <div className="controls">
   <div className={'lang-pill'+(lang==='ar'?' ar':'')} onClick={toggleLang} role="button" aria-label={t('common.switchLang')} tabIndex={0}>
     <span className={'lp-opt'+(lang==='en'?' active':'')}>EN</span>
     <span className={'lp-opt'+(lang==='ar'?' active':'')}>عربي</span>
     <span className="lp-slider"/>
   </div>
   <button className="theme-toggle" onClick={toggleTheme} aria-label={t('common.toggleTheme')}>
     <span className={'tt-icon'+(theme==='dark'?' dark':'')}>{theme==='dark'?'🌙':'☀️'}</span>
   </button>
 </div>
 </nav></>}</div></header>}