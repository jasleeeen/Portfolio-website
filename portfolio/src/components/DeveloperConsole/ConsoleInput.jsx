import { useState } from "react";
import commands from "../../utils/commands";

export default function ConsoleInput() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState(
    "Type 'help' to view available commands."
  );

  const runCommand = (e) => {
    e.preventDefault();

    const cmd = command.trim().toLowerCase();

    if (cmd === "clear") {
      setOutput("");
      setCommand("");
      return;
    }

    setOutput(commands[cmd] || `Command "${cmd}" not found.`);

    setCommand("");
  };

  return (
    <>
      <div className="console-output">
        <pre>{output}</pre>
      </div>

      <form
        className="console-form"
        onSubmit={runCommand}
      >
        <span>&gt;</span>

        <input
          autoFocus
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="help"
        />
      </form>
    </>
  );
}