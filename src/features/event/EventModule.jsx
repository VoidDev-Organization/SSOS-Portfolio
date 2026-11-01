import {A} from '../../assets'
import {stateOf,fmt} from '../../utils/events'
import {useLang} from '../../context/LangContext'
import {CalendarIcon,LocationIcon} from '../../components/ui/MetaIcons'
import {CountdownRings} from './CountdownRings'
import './EventModule.css'

export function EventModule({e}){
 const {t,lang}=useLang()
 if(!e)return <div className="evt" style={{gridTemplateColumns:'1fr'}}><div><span className="pill">{t('event.noneScheduled')}</span><h2>{t('event.noEvent')}</h2><p>{t('event.checkBack')}</p></div></div>
 const st=stateOf(e),live=st==='live'
 const dateLabel=lang==='ar'&&e.startDate?new Intl.DateTimeFormat('ar',{dateStyle:'full',timeStyle:'short',timeZone:e.timezone}).format(new Date(e.startDate))+' ('+e.timezone+')':null
 return <div className="evt"><div><span className={'pill'+(live?' live':'')}>{live?t('event.live'):st==='tbd'?t('event.dateTbd'):t('event.notStarted')}</span><h2>{e.title}</h2><p>{lang==='ar'&&e.descriptionAr?e.descriptionAr:e.description}</p>
 <div className="meta">{e.startDate&&<div className="meta-item"><CalendarIcon/>{dateLabel||fmt(e)}</div>}<div className="meta-item"><LocationIcon/>{lang==='ar'&&e.locationAr?e.locationAr:e.location}</div></div>
 {e.ticketUrl?<a className="btn gold" href={e.ticketUrl} target="_blank" rel="noopener noreferrer">{live?t('event.joinNow'):t('event.getTicket')}</a>:<span className="btn off" role="note">{t('event.accessComing')}</span>}</div>
 <div className="owlbox"><img src={A.owlPen} alt={t('event.owlAlt')} width="100" height="127"/><div className="cd-panel"><h3 className="cd-title">{t('event.countdownTitle')}</h3><CountdownRings e={e} st={st}/></div></div></div>}
