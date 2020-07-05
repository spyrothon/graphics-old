import { TimelineMax } from "gsap";

export const FadeShrink = (element: object) => {
  return new TimelineMax()
    .to(element, 0.4, { opacity: 0 })
    .to(element, 0.7, { width: 0, ease: "Power3.easeInOut" });
};
