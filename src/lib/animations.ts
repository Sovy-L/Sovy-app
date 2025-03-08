
import { ClassValue } from "clsx";

export const hover = {
  scale: "transition-transform duration-300 hover:scale-[1.02]",
  lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
  glow: "transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
};

export const transitions = {
  fast: "transition-all duration-200 ease-in-out",
  medium: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
};

export default {
  hover,
  transitions,
};
