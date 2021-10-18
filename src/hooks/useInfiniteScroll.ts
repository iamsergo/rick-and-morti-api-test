import React from "react";

export const useInfiniteScroll = (listener: () => void) => {
  const prevRef = React.useRef(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if(!ref.current) return;
    if(ref.current === prevRef.current) return;

    prevRef.current = ref.current;

    const handler: IntersectionObserverCallback = ([target]) => {
      if(target.isIntersecting)
        listener();
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `${window.innerHeight * 0.5}px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver(handler, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  });

  return ref;
};