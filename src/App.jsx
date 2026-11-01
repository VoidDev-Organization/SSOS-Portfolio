import {useEffect,useMemo,useState} from 'react'
import {EVENTS} from './data'
import {getEvents,nextBoundary} from './utils/events'
import {ProjectDetail} from './pages/ProjectDetail'
import {Home} from './pages/Home'

export default function App(){const [hash,setHash]=useState(location.hash),[tick,setTick]=useState(0),events=useMemo(()=>getEvents(EVENTS),[])
 useEffect(()=>{const h=()=>setHash(location.hash);addEventListener('hashchange',h);return()=>removeEventListener('hashchange',h)},[])
 useEffect(()=>{const n=nextBoundary(events);if(!n||n-Date.now()>2147e6)return;const t=setTimeout(()=>setTick(x=>x+1),n-Date.now()+500);return()=>clearTimeout(t)},[events,tick])
 return hash.startsWith('#p-')?<ProjectDetail events={events} slug={hash.slice(3)}/>:<Home events={events}/>}
