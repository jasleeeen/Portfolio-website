import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import "./BackToTop.css";

export default function BackToTop() {

  const [show, setShow] = useState(false);

  useEffect(() => {

    const update = () => {

      setShow(window.scrollY > 700);

    };

    update();

    window.addEventListener("scroll", update);

    return () =>
      window.removeEventListener("scroll", update);

  }, []);

  return (

    <button
      className={`back-top ${show ? "show" : ""}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >

      <ChevronUp size={22} />

    </button>

  );

}