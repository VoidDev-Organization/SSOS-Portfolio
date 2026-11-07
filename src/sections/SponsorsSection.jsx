import {useEffect,useState} from 'react'
import {SPONSORS} from '../data'
import {Reveal} from '../components/ui/Reveal'
import {useLang} from '../context/LangContext'
import LogoLoop from '../components/ui/LogoLoop/LogoLoop'
import '../components/ui/LogoLoop/LogoLoop.css'

export function SponsorsSection(){const {t}=useLang();const [logoHeight,setLogoHeight]=useState(()=>window.matchMedia('(max-width:600px)').matches?64:96);const [gap,setGap]=useState(()=>window.matchMedia('(max-width:600px)').matches?20:28)
  useEffect(()=>{const media=window.matchMedia('(max-width:600px)');const update=()=>{setLogoHeight(media.matches?64:96);setGap(media.matches?20:28)};media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[])
  const logos=[...SPONSORS].sort((a,b)=>a.displayOrder-b.displayOrder).map(s=>({src:s.logo,alt:s.name,title:s.name,href:s.websiteUrl||undefined}))
  return (
 <section id="sponsors"><div className="wrap"><Reveal><span className="eyebrow">{t('common.support')}</span><h2>{t('sponsors.title')}</h2>
 <div dir="ltr"><LogoLoop logos={logos} speed={48} logoHeight={logoHeight} gap={gap} hoverSpeed={0} fadeOut fadeOutWidth={0.06} draggable scrollBoost={0.12} ariaLabel={t('project.sponsorsAria')}/></div></Reveal></div></section>

  )
}
