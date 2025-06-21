'use client';

import StoreProvider from "@/state/StoreProvider";
import ClientSessionProvider from "@/app/components/ClientSessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ClientSessionProvider/>
        {children}
    </StoreProvider>
  );
}