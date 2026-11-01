import {useEffect,useState} from 'react'
import {RM} from '../../utils/env'
import {useLang} from '../../context/LangContext'
import './CountdownRings.css'

const pad=n=>String(n).padStart(2,'0')

export function CountdownRings({e,st}){const {t}=useLang();const [now,setNow]=useState(Date.now());useEffect(()=>{if(st!=='upcoming')return;const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[st])
 if(st!=='upcoming')return <div className="cd" role="timer"><div className="msg">{st==='live'?t('event.liveMessage'):t('event.dateTbd')}</div></div>
 const d=Math.max(0,+new Date(e.startDate)-now)
 const cells=[[t('event.days'),Math.floor(d/864e5)],[t('event.hours'),Math.floor(d%864e5/36e5)],[t('event.mins'),Math.floor(d%36e5/6e4)],[t('event.secs'),Math.floor(d%6e4/1e3)]]
 return <div className="cd" role="timer" aria-label={t('event.timeUntil')}>{cells.map(([u,n],i)=><div className={'cell'+(i===3?' hot':'')} key={u}><b key={RM?0:n}>{pad(n)}</b><span>{u}</span></div>)}</div>}