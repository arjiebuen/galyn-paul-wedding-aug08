"use client";

import { useState } from "react";
import EnterOverlay from "@/components/common/EnterOverlay";
import MusicPlayer from "@/components/music/MusicPlayer";

export default function ClientWrapper() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <EnterOverlay onEnter={() => setEntered(true)} />
      <MusicPlayer autoPlay={entered} />
    </>
  );
}
