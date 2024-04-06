import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { useLayoutScrollStore } from '../stores/layout-scroll-stores';
import { useNavStore } from '../stores/nav-stores';
import { motion } from 'framer-motion';

type LayoutProps = ComponentProps<'div'>;

export default function Layout({ children, className, ...props }: LayoutProps) {
   const { setIsNavVisible } = useNavStore();
   const [prevScroll, setPrevScroll] = useState(0);
   const { setIsScrollTop, isScrollTop } = useLayoutScrollStore();
   const LayoutRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      LayoutRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      setIsScrollTop(false);
   }, [isScrollTop]);

   return (
      <div
         id="layout"
         ref={LayoutRef}
         className={`w-full flex flex-col gap-3 p-5 overflow-auto h-[calc(100dvh-60px)] pb-[60px] ${className}`}
         onScroll={({ currentTarget }) => {
            if (currentTarget.scrollTop < 100) {
               setIsNavVisible(true);
            } else {
               setIsNavVisible(prevScroll > currentTarget.scrollTop && currentTarget.scrollTop >= 0);
               setPrevScroll(currentTarget.scrollTop >= 0 ? currentTarget.scrollTop : 0);
            }
         }}
         {...props}
      >
         <motion.div
            className="w-full flex flex-col gap-3"
            variants={{
               hidden: { y: 10, opacity: 0 },
               enter: { opacity: 1, x: 0, y: 0 },
            }}
            initial="hidden"
            exit={{ y: -10, opacity: 0 }}
            animate="enter"
            transition={{ type: 'linear' }}
         >
            {children}
         </motion.div>
      </div>
   );
}
