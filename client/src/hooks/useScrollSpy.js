import { useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export function useScrollSpy(offset = 100) {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return active;
}
