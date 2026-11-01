import {go} from '../../utils/scroll'

export const NavLink=({id,className,onNav,children})=><a href={'#'+id} className={className} onClick={e=>{e.preventDefault();onNav?.();go(id)}}>{children}</a>
