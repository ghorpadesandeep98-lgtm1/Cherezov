"use client";

import dynamic from "next/dynamic";

const fallback = () => (
  <div className="absolute inset-0 grid place-items-center">
    <div className="size-40 animate-pulse rounded-full bg-lime/25 blur-3xl" />
  </div>
);

/** 3D грузится только на клиенте — первый экран остаётся мгновенным. */
export const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: fallback,
});

export const ObjectScene = dynamic(() => import("./ObjectScene").then((m) => m.ObjectScene), {
  ssr: false,
  loading: fallback,
});
