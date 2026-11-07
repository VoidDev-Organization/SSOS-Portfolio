import {A} from '../../assets'

export const ovr=e=>({ev:e.slug,t:e.title,c:['overview','previous'],img:e.cover,d:e.description,logo:e.slug==='second-edition'?A.logo2:e.slug==='first-edition'?A.logo1:A.wmDark,color:e.slug==='first-edition'?'#7410ad':e.slug==='second-edition'?'#102653':'#172ccb'})
