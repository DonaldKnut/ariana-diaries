"use client";
import React, { useState, useEffect } from "react";

const CountDown = () => {
  const targetDate = new Date(`10/10/2023`).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeft(difference);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const m = Math.floor((timeLeft / 1000 / 60) % 60);
  const s = Math.floor((timeLeft / 1000) % 60);

  return (
    <span className="font-bold text-[30px] text-yellow-300">
      {d.toString().padStart(2, "0")}
      <span className="text-sm"> days </span>
      {h.toString().padStart(2, "0")}
      <span className="text-sm"> hours </span>
      {m.toString().padStart(2, "0")}
      <span className="text-sm"> minutes </span>
      {s.toString().padStart(2, "0")}
      <span className="text-sm"> seconds</span>
    </span>
  );
};

export default CountDown;
