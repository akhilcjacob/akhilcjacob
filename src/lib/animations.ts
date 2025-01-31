import { spring, stagger, timeline, type TimelineDefinition } from "motion";
import { loaderAnimation } from "./constants";

export const cardEntryAnimation = () => {
  const cards = document.querySelectorAll(".card");
  
  const sequence = [
    loaderAnimation,
    [
      cards,
      { y: ["40%", "0%"], opacity: [0, 1] },
      {
        at: "-0.1",
        duration: 0.3,
        delay: stagger(0.2),
        easing: spring({ velocity: 100, stiffness: 150, damping: 15 }),
      },
    ],
  ];

  timeline(sequence as TimelineDefinition);
};
