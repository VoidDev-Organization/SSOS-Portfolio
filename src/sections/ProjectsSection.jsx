import {useState} from 'react'
import {SHOW} from '../data'
import {ovr} from '../features/projects/utils'
import {stateOf} from '../utils/events'
import {Reveal} from '../components/ui/Reveal'
import {useLang} from '../context/LangContext'
import {useTheme} from '../context/ThemeContext'
import {ProjectCard} from '../features/projects/ProjectCard'
import ProfileCard from '../components/ui/ProfileCard/ProfileCard'
import SpotlightCard from '../components/ui/SpotlightCard/SpotlightCard'
import './ProjectsSection.css'

export function ProjectsSection({events}){const {t}=useLang();const {theme}=useTheme();const [f,setF]=useState('all')
 const it=events.filter(e=>e.published&&stateOf(e)==='ended').flatMap(e=>{const s=SHOW.filter(x=>x.ev===e.slug);return s.length?s:[ovr(e)]})
 const cs=['overview','workshops','guests','initiatives','previous'].filter(c=>it.some(x=>x.c.includes(c)));const filters=cs.filter(c=>c!=='overview'&&c!=='previous');const cur=f==='all'||cs.includes(f)?f:'all'
 const list=it.filter(x=>cur==='all'||x.c.includes(cur))
 return <section id="projects"><div className="wrap"><Reveal><span className="eyebrow">{t('projects.eyebrow')}</span><h2>{t('projects.title')}</h2><p className="lead">{t('projects.lead')}</p>
 {filters.length>0&&<div className="filters" role="group" aria-label={t('projects.filterLabel')}>{filters.map(k=><button key={k} aria-pressed={cur===k} onClick={()=>setF(k)}>{t('categories.'+k)}</button>)}</div>}
 <div className="grid g3">{list.length?list.map(x=><a key={x.t} className="project-entry" href={'#p-'+x.ev}><ProfileCard avatarUrl={x.img} name={x.t} title={x.d} handle={x.ev} status={t('common.completed')} showUserInfo={false} theme={theme}/><span className="project-entry-cta">{t('project.view')}</span></a>):<div className="empty" style={{gridColumn:'1/-1'}}>{t('projects.empty')}</div>}</div></Reveal></div></section>}
