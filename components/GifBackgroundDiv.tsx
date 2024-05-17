import React, { useEffect, useState } from "react";

export default function GifBackgroundDiv({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [slideDistance, setSlideDistance] = useState(
    `-${15 * window.innerWidth}px`,
  );

  // function to update the slide distance
  const updateSlideDistance = () => {
    setSlideDistance(`-${15 * window.innerWidth}px`);
  };

  // Effect to handle window resize to update the animation slide distance
  useEffect(() => {
    window.addEventListener("resize", updateSlideDistance);

    return () => {
      window.removeEventListener("resize", updateSlideDistance);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 h-screen flex animate-slideToLeftGif"
      style={{ "--slide-to-left-distance": slideDistance } as any}
    >
      {children}
    </div>
  );
}
