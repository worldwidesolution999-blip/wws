'use client';import {motion} from 'framer-motion';
export default function Reveal({children,d=0,className=''}){return <motion.div className={className} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.9,delay:d,ease:[.22,1,.36,1]}}>{children}</motion.div>}
