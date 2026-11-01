import {useEffect,useState} from 'react'
import {A} from '../assets'
import {EVENTS} from '../data'
import {RM} from '../utils/env'
import {stateOf,fmt} from '../utils/events'
import {NavLink} from '../components/layout/NavLink'
import {useLang} from '../context/LangContext'
import {CountUp} from '../components/ui/CountUp'
import './EventHero.css'

const pad=n=>String(n).padStart(2,'0')

function icsFor(e){
  const z=d=>new Date(d).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')
  const end=e.endDate||new Date(+new Date(e.startDate)+36e5*2)
  const t=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SSOS//Website//EN','BEGIN:VEVENT','UID:'+e.id+'@ssos',
    'DTSTAMP:'+z(Date.now()),'DTSTART:'+z(e.startDate),'DTEND:'+z(end),'SUMMARY:'+e.title,'LOCATION:'+e.location,'END:VEVENT','END:VCALENDAR']
  return 'data:text/calendar;charset=utf-8,'+encodeURIComponent(t.join('\r\n'))
}

function Countdown({e,st}){
  const {t}=useLang()
  const [now,setNow]=useState(Date.now())
  useEffect(()=>{if(st!=='upcoming')return;const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[st])
  const d=st==='upcoming'?Math.max(0,+new Date(e.startDate)-now):null
  const cells=[[t('event.days'),d===null?null:Math.floor(d/864e5)],[t('event.hours'),d===null?null:Math.floor(d%864e5/36e5)],[t('event.mins'),d===null?null:Math.floor(d%36e5/6e4)],[t('event.secs'),d===null?null:Math.floor(d%6e4/1e3)]]
  return <div className="cd" role="timer" aria-label={d===null?t('event.countdownPending'):t('event.timeUntil')}>
    {cells.map(([u,n],i)=><div className={'cell'+(i===3?' hot':'')} key={u}><b key={RM?0:n}>{n===null?'--':pad(n)}</b><span>{u}</span></div>)}
  </div>
}

export function EventHero({event}){const {lang,t}=useLang();
  const past=EVENTS.filter(x=>x.historical&&x.beneficiaries)
  if(!event) return <section className="eh" id="home"><div className="wrap"><div className="glass eh-card"><div className="eh-main"><span className="pill">{t('event.noneScheduled')}</span><h1>{t('event.noEvent')}</h1><p className="lead">{t('event.checkBack')}</p></div></div></div></section>
  const st=stateOf(event),live=st==='live'
  const rows=[[t('event.eventDate'),event.startDate?t('event.confirmed'):t('event.toAnnounce'),event.startDate?'ok':'wait'],
    [t('event.speakerLineup'),event.speakers?.length?t('event.announced'):t('event.toAnnounce'),event.speakers?.length?'ok':'wait'],
    [t('event.accessLink'),event.ticketUrl?t('event.open'):t('event.coming'),event.ticketUrl?'ok':'soon']]
  return (
  <section className="eh" id="home"><span id="event" className="eh-anchor"/>
   <div className="wrap"><div className="glass eh-card">
    <div className="eh-main">
      <span className={'pill'+(live?' live':'')}><i/>{live?t('event.live'):st==='tbd'?t('event.dateTbd'):t('event.startsSoon')}</span>
      <h1>{event.title}</h1>
      <p className="lead">{lang==='ar'&&(event.descriptionAr)?event.descriptionAr:event.description}</p>
      <div className="chips"><span>📍 {lang==='ar'&&(event.locationAr)?event.locationAr:event.location}</span><span>🎓 {t('event.audience')}</span>{event.startDate&&<span>📅 {lang==='ar'?new Intl.DateTimeFormat('ar',{dateStyle:'full',timeStyle:'short',timeZone:event.timezone}).format(new Date(event.startDate))+' ('+event.timezone+')':fmt(event)}</span>}</div>
      <div className="cta">
        {event.ticketUrl?<a className="btn grad" href={event.ticketUrl} target="_blank" rel="noopener noreferrer">{live?t('event.joinNow'):t('event.getTicket')}</a>:<span className="btn off" role="note">{t('event.accessComing')}</span>}
        <NavLink id="projects" className="btn ghost">{t('event.explorePast')}</NavLink>
      </div>
      <div className="stats">
        <div><b><CountUp to={past.length}/></b><span>{t('impact.editions')}</span></div>
        {past.slice().sort((a,b)=>a.edition-b.edition).map(x=><div key={x.id}><b><CountUp to={x.beneficiaries}/></b><span>{x.title} · {t('impact.reported')}</span></div>)}
      </div>
    </div>
    <aside className="eh-side">
      <div className="mascot"><img src={A.owl} alt={t('event.owlAlt')} width="190" height="199"/><span className="badge">{t('event.mascotBadge')}</span></div>
      <div className="glass unit">
        <div className="unit-h"><span>{t('event.countdownTitle')}</span><em>{st==='upcoming'?t('event.liveTimer'):live?t('event.live'):t('event.awaiting')}</em></div>
        <Countdown e={event} st={st}/>
        {st==='tbd'&&<p className="note">{t('event.timerNote')}</p>}
        <ul className="rows">{rows.map(([k,v,c])=><li key={k}><span>{k}</span><b className={c}>{v}</b></li>)}</ul>
        {event.startDate?<a className="btn ghost wide" href={icsFor(event)} download="ssos-third-edition.ics">{t('event.addCalendar')} (.ics)</a>:<span className="btn off wide" role="note">{t('event.calendarAvail')}</span>}
      </div>
    </aside>
   </div></div>
  </section>)
}
