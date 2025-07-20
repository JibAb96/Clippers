"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import TutorialOverlay from '../../components/tutorial/TutorialOverlay';

interface TutorialWrapperProps {
  children: React.ReactNode;
}

const TutorialWrapper: React.FC<TutorialWrapperProps> = ({ children }) => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <>
      {children}
      <TutorialOverlay onNavigate={handleNavigate} />
    </>
  );
};

export default TutorialWrapper; 