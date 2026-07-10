import { useEffect, useState } from "react";
import "./PerformanceMonitor.css";

export default function PerformanceMonitor() {

  const [memory, setMemory] = useState("--");

  useEffect(() => {

    const update = () => {

      if (performance.memory) {

        setMemory(
          (
            performance.memory.usedJSHeapSize /
            1048576
          ).toFixed(0)
        );

      }

    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="performance-monitor">

      <span>Memory</span>

      <strong>{memory} MB</strong>

    </div>

  );

}