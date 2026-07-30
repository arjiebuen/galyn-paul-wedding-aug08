"use client";

import { useState } from "react";
import EnterOverlay from "@/components/common/EnterOverlay";
import MusicPlayer from "@/components/music/MusicPlayer";

interface ClientWrapperProps {
  onEnter?: () => void;
}

export default function ClientWrapper({ onEnter }: ClientWrapperProps) {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    onEnter?.();
  };

  return (
    <>
      <EnterOverlay onEnter={handleEnter} />
      <MusicPlayer autoPlay={entered} />
    </>
  );
}
