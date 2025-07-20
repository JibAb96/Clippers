"use client";
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import OnboardingFlow from "./components/OnboardingFlow";

const OnboardingPage = () => (
  <Suspense fallback={<div />}>
    <OnboardingFlow />
  </Suspense>
);

export default OnboardingPage;
