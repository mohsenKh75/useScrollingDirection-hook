import { RefObject, useEffect, useRef, useState } from 'react';

const isServerSide = typeof window === 'undefined';
const SCROLL_DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  NONE: 'NONE'
} as const;


export const useScrollDirection = (ref?: RefObject<HTMLDivElement | null>): ScrollDirectionType => {
  const getScrollY = () => {
    if (ref) {
      return !isServerSide ? ref?.current?.scrollTop : 0;
    }
    return !isServerSide ? window.scrollY : 0;
  };

  const scrollYRef = useRef(getScrollY());
  const [scrollDirection, setScrollDirection] = useState<ScrollDirectionType>(SCROLL_DIRECTION.NONE);
  useEffect(() => {
    if (isServerSide) {
      return undefined;
    }

    function handleScroll() {
      const newY = getScrollY();
      if (newY) {
        if (scrollYRef.current && scrollYRef.current !== newY) {
          setScrollDirection(scrollYRef.current > newY ? SCROLL_DIRECTION.UP : SCROLL_DIRECTION.DOWN);
        } else {
          setScrollDirection(SCROLL_DIRECTION.NONE);
        }
      }

      scrollYRef.current = newY;
    }
    if (ref) {
      ref?.current?.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      ref
        ? ref?.current?.removeEventListener('scroll', handleScroll)
        : window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isServerSide) return SCROLL_DIRECTION.NONE;

  return scrollDirection;
};
