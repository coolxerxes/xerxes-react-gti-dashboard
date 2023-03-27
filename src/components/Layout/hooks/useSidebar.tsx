import { useState } from 'react';

export const useSidebar = (initialVisibility: boolean = true) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return { isVisible, toggleVisibility };
};
