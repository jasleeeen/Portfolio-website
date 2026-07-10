import { ChevronDown } from "lucide-react";
import "./ScrollToBottom.css";

export default function ScrollToBottom() {
  return (
    <button
      className="scroll-bottom"
      onClick={() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    >
      <ChevronDown size={22} />
    </button>
  );
}