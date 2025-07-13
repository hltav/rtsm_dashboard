'use client';
import { useState } from 'react';

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggleSidebar };
};

export default useSidebar;