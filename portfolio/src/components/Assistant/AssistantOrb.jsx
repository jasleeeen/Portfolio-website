import { useState } from "react";
import {
  Sparkles,
  X,
  ArrowRight
} from "lucide-react";
import "./AssistantOrb.css";

const steps = [
  "👋 Welcome to my AI Workspace.",
  "🧠 Scroll to explore Computer Vision, Deep Learning and 3D Reconstruction.",
  "🚀 Visit the Projects section to see real implementations.",
  "💻 Press Ctrl + Shift + A to open the hidden Developer Console.",
  "📩 Reach the Contact section if you'd like to collaborate."
];

export default function AssistantOrb() {

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((s) => (s + 1) % steps.length);
  };

  return (
    <>

      <button
        className="assistant-orb"
        onClick={() => setOpen(true)}
      >
        <Sparkles size={22} />
      </button>

      {open && (

        <div className="assistant-window">

          <div className="assistant-header">

            <div>

              <h3>AI Assistant</h3>

              <span>Interactive Guide</span>

            </div>

            <button
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>

          </div>

          <div className="assistant-body">

            <p>{steps[step]}</p>

          </div>

          <div className="assistant-footer">

            <button
              className="assistant-next"
              onClick={next}
            >
              Next

              <ArrowRight size={18}/>
            </button>

          </div>

        </div>

      )}

    </>
  );

}