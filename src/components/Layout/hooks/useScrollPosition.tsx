import { useState, useEffect } from 'react';

function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    function handleScroll() {
      const position = window.pageYOffset;
      setScrollPosition(position);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}

export default useScrollPosition;
