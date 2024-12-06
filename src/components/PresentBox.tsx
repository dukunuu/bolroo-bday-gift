"use client";

import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import { motion, useAnimation } from "motion/react";
import React from "react";
import confetti from "@/lotties/confetti.json";
import Image from "next/image";
import pic from "@/assets/me.png";
import { useToast } from "@/hooks/use-toast";

type Props = {
  pressCounter: number;
  setPressCounter: React.Dispatch<React.SetStateAction<number>>;
};

export default function PresentBox({ pressCounter, setPressCounter }: Props) {
  const [showLid, setShowLid] = React.useState(true);
  const confettiRef = React.useRef<DotLottieCommonPlayer>(null);
  const controls = useAnimation();
  const removeLid = useAnimation();
  const { toast } = useToast();
  const toastMessages = [
    "Hmmmm, I wonder what's inside?",
    "Try again!",
    "One more time!",
  ];

  const variants = {
    start: {
      rotate: [-3 - pressCounter * 2, 3.4 + pressCounter * 2, 0],
      transition: {
        repeat: pressCounter,
        duration: 1 / (2 * (pressCounter + 1)),
      },
    },
    reset: {
      rotate: 0,
    },
  };

  const handlePress = async () => {
    if (pressCounter > 3) return;
    if (pressCounter === 3) {
      removeLid.start("start");
      setTimeout(async () => {
        setShowLid(false);
        confettiRef.current?.play();
      }, 1000);
      return;
    }
    switch (pressCounter) {
      case 0:
        toast({ description: toastMessages[0], variant: "default" });
        break;
      case 1:
        toast({ description: toastMessages[1], variant: "default" });
        break;
      case 2:
        toast({ description: toastMessages[2], variant: "default" });
        break;
    }
    setPressCounter((prev) => prev + 1);
    await controls.start("start");
  };
  return (
    <motion.div
      animate={controls}
      variants={variants}
      onClick={handlePress}
      className="flex relative justify-center w-full h-full gap-[2px] items-center flex-col"
    >
      <DotLottiePlayer
        ref={confettiRef}
        src={confetti}
        className="absolute z-10 sm:w-[95dvw] sm:h-auto w-auto  h-[95dvh]"
      />
      {showLid ? (
        <motion.div
          id="lid"
          animate={removeLid}
          variants={{
            start: {
              rotate: [0, -90],
              x: -250,
              y: [0, -200],
              opacity: 0,
              transition: {
                duration: 3,
              },
            },
          }}
          className="flex flex-col justify-center items-center"
        >
          <div className="flex gap-6 border-black border-b-2">
            <div className="w-14 h-20 skew-x-[35deg] border-green-700 border-[20px] border-b-0 rounded-t-full" />
            <div className="w-14 h-20 -skew-x-[35deg] border-green-700 border-[20px] border-b-0 rounded-t-full" />
          </div>
          <div className="w-80 aspect-[10/1] bg-purple-500 rounded-2xl" />
        </motion.div>
      ) : (
        <div className="relative h-min flex justify-center">
          <svg
            width="400"
            height="400"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute h-[120%] overflow-visible bottom-full"
          >
            <defs>
              <radialGradient
                id="gradientId"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                <stop offset="100%" stopColor="rgb(21, 128, 61)" />
              </radialGradient>
              <path
                id="circlePath"
                d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
              />
            </defs>

            <text
              fontSize="40"
              fontWeight={700}
              textAnchor="middle"
              fill="url(#gradientId)"
            >
              <textPath href="#circlePath" startOffset="26%">
                <tspan fontSize="32">🎉</tspan>
                {"Happy Birthday!".split("").map((letter, i) => (
                  <tspan key={i}>
                    {letter}
                    <animate
                      attributeName="dy"
                      from="0"
                      to="-2"
                      values="0; -2; 0"
                      dur="6"
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </tspan>
                ))}
                <tspan fontSize="32">🎉</tspan>
              </textPath>
            </text>
          </svg>
          <Image
            src={pic}
            alt="Picture of the author"
            width={200}
            height={200}
            className="h-[112px] animate-bounce object-contain"
          />
        </div>
      )}
      <div className="flex aspect-[4/3] relative items-center justify-center w-72 bg-purple-500 rounded-b-2xl">
        <div className="bg-green-700 w-full h-10 absolute border-y-2 border-black"></div>
        <div className="bg-green-700 w-10 h-full absolute border-x-2 border-black"></div>
      </div>
    </motion.div>
  );
}
