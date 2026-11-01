import {useEffect,useRef,useState} from 'react'
import {RM} from '../../utils/env'

export function CountUp({to}){const r=useRef(),[v,setV]=useState(RM?to:0);useEffect(()=>{if(RM)return;let raf;const o=new IntersectionObserver(([x])=>{if(!x.isIntersecting)return;o.disconnect();const t0=performance.now();const s=n=>{const p=Math.min(1,(n-t0)/1500);setV(Math.round(to*p));if(p<1)raf=requestAnimationFrame(s)};raf=requestAnimationFrame(s)},{threshold:.6});o.observe(r.current);return()=>{o.disconnect();cancelAnimationFrame(raf)}},[to]);return <span ref={r} aria-label={to.toLocaleString()}>{v.toLocaleString()}</span>}
