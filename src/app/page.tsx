"use client";

import PresentBox from "@/components/PresentBox";
import ScrollSection from "@/components/ScrollSection";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Home() {
  const [pressCounter, setPressCounter] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (pressCounter === 3) {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    }
  }, [pressCounter]);
  return (
    <div className="bg-[black] overflow-clip">
      <audio ref={audioRef} loop>
        <source src="music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex w-full relative h-dvh overflow-y-hidden justify-center items-center">
        <PresentBox
          pressCounter={pressCounter}
          setPressCounter={setPressCounter}
        />
        {pressCounter === 3 && (
          <Link
            href="#words"
            className="absolute text-white bottom-5 rounded-full border-white border-2 p-2 px-4 flex justify-center items-center z-20 right-5 animate-pulse"
          >
            Scroll down
            <span>👇</span>
          </Link>
        )}
      </div>
      {pressCounter === 3 && (
        <>
          <ScrollSection />
        </>
      )}
    </div>
  );
}
