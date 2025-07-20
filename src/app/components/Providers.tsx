'use client';

import StoreProvider from "@/state/StoreProvider";
import ClientSessionProvider from "@/app/components/ClientSessionProvider";
import { TutorialProvider } from "../../contexts/TutorialContext";
import TutorialWrapper from "./TutorialWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ClientSessionProvider/>
      <TutorialProvider>
        <TutorialWrapper>
        {children}
        </TutorialWrapper>
      </TutorialProvider>
    </StoreProvider>
  );
}