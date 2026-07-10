import useReducedMotion from "../../hooks/useReducedMotion";

export default function PerformanceMode() {

  const reduced = useReducedMotion();

  if (reduced) {

    document.body.classList.add("reduced-motion");

  } else {

    document.body.classList.remove("reduced-motion");

  }

  return null;

}