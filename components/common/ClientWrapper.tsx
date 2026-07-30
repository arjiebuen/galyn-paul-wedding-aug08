"use client";

import EnterOverlay from "@/components/common/EnterOverlay";

interface ClientWrapperProps {
  onEnter?: () => void;
}

export default function ClientWrapper({ onEnter }: ClientWrapperProps) {
  return <EnterOverlay onEnter={onEnter ?? (() => {})} />;
}
