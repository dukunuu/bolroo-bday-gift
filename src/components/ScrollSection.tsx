"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const thingsILike = [
  "🎧 A great listener who makes you feel truly heard and understood.",
  "🤝 Open-minded and welcomes different ideas and perspectives with grace.",
  "✨ Has a strong, magnetic aura that naturally draws people in.",
  "💪 Determined and never gives up until she reaches her goals.",
  "😂 Has an amazing sense of humor that brightens everyone's day.",
  "🌍 Embraces new experiences and sees the world with open eyes.",
  "🔍 Pays attention to the little details that others often miss.",
  "📚 Always curious and eager to learn, constantly growing as a person.",
  "🎨 Creative and full of unique, brilliant ideas that spark excitement.",
  "🤝 Honest and trustworthy, someone you can always count on.",
  "🧘‍♀️ Calm and composed under pressure, handling challenges with poise.",
  "🔥 Dedicated to everything she does, giving it her 110%.",
  "",
];
const ThingsILikeSection = () => {
  const targetRef = useRef(null);
  const header = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const cardTimeline = thingsILike.map((_, index) => {
    const start = window.innerHeight * 2 + index * window.innerHeight;
    const end = window.innerHeight * 2 + window.innerHeight * (index + 1);
    return [start, end];
  });

  const animation = cardTimeline.map(([start, end]) => ({
    scale: useTransform(scrollY, [start, end], [1.1, 1]),
    opacity: useTransform(scrollY, [start, end], [0, 1]),
    rotate: useTransform(scrollY, [start, end], [0, Math.random() * 10 - 5]),
    /* eslint-disable-line */
  }));

  useEffect(() => {}, []);

  return (
    <section
      id="words"
      ref={targetRef}
      className="bg-black px-5 relative text-white w-full"
    >
      {/* Sticky Header */}
      <div
        ref={header}
        className="text-white sticky left-0 z-10 h-dvh text-2xl font-semibold w-full top-0 py-24 flex justify-center items-start"
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600">
          Things I Like About Bolor-Erdene
        </h1>
      </div>

      {/* Things I Like List with Random Animations */}
      {thingsILike.map((item, index) => {
        return (
          <motion.div
            key={index}
            style={{
              scale: animation[index].scale,
              opacity: animation[index].opacity,
              rotate: animation[index].rotate,
            }}
            className="h-dvh flex sticky top-0 justify-center items-center w-full text-center text-md md:text-xl font-semibold transition-all"
          >
            <div className="flex justify-center items-center w-full h-full px-5 py-10">
              {item.length !== 0 && (
                <div className="border-2 w-full h-full max-w-xl max-h-80 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-2">
                  {/* Gradient Border */}
                  <div className="w-full h-full p-3 rounded-lg bg-black ">
                    {/* Content inside the card */}
                    <div className="w-full h-full bg-black flex items-center justify-center rounded-lg text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                      {item}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default ThingsILikeSection;
