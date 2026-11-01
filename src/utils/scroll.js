import {RM} from './env'

export const go=id=>{if(location.hash.startsWith('#p-')){history.replaceState(null,'',location.pathname+location.search);dispatchEvent(new HashChangeEvent('hashchange'));setTimeout(()=>go(id),60);return}document.getElementById(id)?.scrollIntoView({behavior:RM?'auto':'smooth'})}
