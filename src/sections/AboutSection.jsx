import {useEffect,useState} from 'react'
import {A} from '../assets'
import {Reveal} from '../components/ui/Reveal'
import ScrollReveal from '../components/ui/ScrollReveal/ScrollReveal'
import Folder from '../components/ui/Folder'
import {useLang} from '../context/LangContext'
import {useTheme} from '../context/ThemeContext'
import './AboutSection.css'

export function AboutSection(){
  const {t}=useLang()
  const {theme}=useTheme()
  const [folderSize,setFolderSize]=useState(()=>window.matchMedia('(max-width:600px)').matches?0.72:1.1)
  useEffect(()=>{const media=window.matchMedia('(max-width:600px)');const update=()=>setFolderSize(media.matches?0.72:1.1);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[])
  const items=[
    {title:t('about.mission'), description:t('about.missionText')},
    {title:t('about.vision'), description:t('about.visionText')},
    {title:t('about.community'), description:t('about.communityText')},
    {title:t('about.education'), description:t('about.educationText')},
    {title:t('about.career'), description:t('about.careerText')},
    {title:t('about.role'), description:t('about.roleText')},
  ]
  return (
 <section className="about" id="about"><div className="wrap"><Reveal><div className="top"><div><span className="eyebrow">{t('about.eyebrow')}</span><h2>{t('about.title')}</h2><ScrollReveal as="div"><p className="lead">{t('hero.lead')}</p></ScrollReveal></div></div>
 <div className="about-folders">{items.map((it,i)=><Folder key={i} label={it.title} items={[it]} size={folderSize} color={theme==='light'?'#315E91':'#6a2bd1'} theme={theme}/>)}</div>
 <div className="about-mobile">{items.map((it,index)=><details className="about-mobile-item" key={it.title}><summary><span className="about-mobile-count">{String(index+1).padStart(2,'0')}</span><span className="about-mobile-heading">{it.title}</span><span className="about-mobile-action"><span className="about-mobile-read">{t('about.readMore')}</span><span className="about-mobile-less">{t('about.readLess')}</span><span className="about-mobile-mark" aria-hidden="true"/></span></summary><p>{it.description}</p></details>)}</div>
 </Reveal></div></section>
  )
}
