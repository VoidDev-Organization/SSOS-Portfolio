import {demo} from './env'

const H=36e5
/* ?demo=upcoming|live|ended swaps test dates onto the third edition in memory only. */
export function getEvents(list){const l=list.map(e=>({...e}));const m={upcoming:[72*H,74*H],live:[-H,H],ended:[-2*H,-H]}[demo];if(m){const e=l.find(x=>x.id==='ssos-3');e.startDate=new Date(Date.now()+m[0]).toISOString();e.endDate=new Date(Date.now()+m[1]).toISOString()}return l}
export function stateOf(e,now=Date.now()){if(e.historical)return'ended';if(!e.startDate)return'tbd';const s=+new Date(e.startDate),en=e.endDate?+new Date(e.endDate):s+6*H;return now<s?'upcoming':now<en?'live':'ended'}
export const featured=l=>l.filter(e=>e.published&&['upcoming','live','tbd'].includes(stateOf(e))).sort((a,b)=>(a.startDate?+new Date(a.startDate):1e18)-(b.startDate?+new Date(b.startDate):1e18))[0]||null
export const fmt=e=>{try{return new Intl.DateTimeFormat('en-GB',{dateStyle:'full',timeStyle:'short',timeZone:e.timezone}).format(new Date(e.startDate))+' ('+e.timezone+')'}catch{return e.startDate}}
export const nextBoundary=l=>l.filter(e=>e.startDate).flatMap(e=>[+new Date(e.startDate),e.endDate?+new Date(e.endDate):0]).filter(t=>t>Date.now()).sort((a,b)=>a-b)[0]
