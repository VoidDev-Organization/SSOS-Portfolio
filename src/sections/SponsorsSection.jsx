import {SPONSORS} from '../data'
import {Reveal} from '../components/ui/Reveal'
import {useLang} from '../context/LangContext'
import LogoLoop from '../components/ui/LogoLoop/LogoLoop'
import '../components/ui/LogoLoop/LogoLoop.css'

export function SponsorsSection(){const {t}=useLang();
  const logos=[...SPONSORS].sort((a,b)=>a.displayOrder-b.displayOrder).map(s=>({src:s.logo,alt:s.name,title:s.name,href:s.websiteUrl||undefined}))
  return (
 <section id="sponsors"><div className="wrap"><Reveal><span className="eyebrow">{t('common.support')}</span><h2>{t('sponsors.title')}</h2>
 <div dir="ltr"><LogoLoop logos={logos} speed={60} logoHeight={154} gap={32} hoverSpeed={0} fadeOut fadeOutWidth={80} ariaLabel={t('project.sponsorsAria')}/></div></Reveal></div></section>

  )
}
