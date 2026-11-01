import {useEffect,useRef} from 'react'
import './Reveal.css'

export function Reveal({className='',children}){const r=useRef();useEffect(()=>{const o=new IntersectionObserver(([x])=>{if(x.isIntersecting){x.target.classList.add('in');o.disconnect()}},{threshold:.1});o.observe(r.current);return()=>o.disconnect()},[]);return <div ref={r} className={'rv '+className}>{children}</div>}
