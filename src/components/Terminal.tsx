import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { useTranslation } from "../i18n/context";

interface CommandResult {
  output: string;
}

const filesystem: Record<string, { type: "file" | "dir" }> = {
  about: { type: "file" },
  projects: { type: "dir" },
  skills: { type: "file" },
  experience: { type: "file" },
  education: { type: "file" },
  contact: { type: "file" },
};

const fileContents: Record<string, string> = {
  about: "Khyle Macasilhig — Web & Game Developer. Computer Science student passionate about creating engaging digital experiences.",
  skills: "Programming: C#, JavaScript, HTML/CSS, SQL\nFrameworks: .NET, MonoGame, React\nTools: Visual Studio, Git, Aseprite, Figma",
  experience: "Product Data Encoder at ECOELEMENTS Inc. (2023)\nManaged database entries, cataloged product specs, ensured data consistency.",
  education: "BSCS at STI College Marikina (2024-Present)\nSHS at STI College Marikina (2022-2024)",
  contact: "Email: macasilhigkyle@gmail.com\nPhone: 09625510712\nGitHub: @HenjiAKO\nFacebook: Khyle Macasilhig",
};

export function Terminal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Khyle's Portfolio Terminal v1.0",
    "Type 'help' for available commands.",
    "",
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const runCommand = (cmd: string): string => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    switch (command) {
      case "help":
        return [
          "Available commands:",
          "  help              Show this help",
          "  ls                List portfolio sections",
          "  cat <section>     Show section info",
          "  skills            Show technical skills",
          "  whoami            Show developer info",
          "  clear             Clear terminal",
          "  game.exe          Launch portfolio game",
        ].join("\n");

      case "ls":
        return Object.entries(filesystem)
          .map(([name, info]) =>
            info.type === "dir" ? `  ${name}/` : `  ${name}`
          )
          .join("\n");

      case "cat":
        if (!arg) return "Usage: cat <section>";
        if (filesystem[arg]?.type !== "file") return `cat: ${arg}: no such file`;
        return fileContents[arg] || `cat: ${arg}: no content`;

      case "skills":
        return fileContents.skills;

      case "whoami":
        return "Khyle Macasilhig — Web & Game Developer\nBSCS Student at STI College Marikina\nhttps://henjiako.github.io/My-Portfolio/";

      case "clear":
        return "__CLEAR__";

      case "game.exe": {
        setTimeout(() => {
          const gameSection = document.querySelector("[data-game-section]");
          if (gameSection) {
            gameSection.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              const playBtn = document.querySelector("button");
              const btns = document.querySelectorAll("button");
              for (const btn of btns) {
                if (btn.textContent?.includes("PLAY NOW")) {
                  (btn as HTMLButtonElement).click();
                  break;
                }
              }
            }, 800);
          }
        }, 100);
        return "Launching portfolio game...";
      }

      case "":
        return "";

      default:
        return `bash: ${command}: command not found. Type 'help' for available commands.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const output = runCommand(trimmed);
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistIndex(-1);

    if (output === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, `$ ${trimmed}`, output]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
        setHistIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex >= 0) {
        const newIndex = histIndex + 1;
        if (newIndex >= cmdHistory.length) {
          setHistIndex(-1);
          setInput("");
        } else {
          setHistIndex(newIndex);
          setInput(cmdHistory[newIndex]);
        }
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9997] p-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        title="Open Terminal"
      >
        <TerminalIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-[9997] w-96 max-w-[calc(100vw-2rem)] rounded-xl overflow-hidden border border-border shadow-2xl"
          >
            <div className="bg-slate-900 text-white font-terminal text-sm">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs">portfolio@terminal:~</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-slate-700 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-64 overflow-y-auto p-3 space-y-1 bg-slate-950">
                {history.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.startsWith("$ ")
                        ? "text-green-400"
                        : line.startsWith("  ") || line.startsWith("Available")
                        ? "text-slate-300"
                        : "text-slate-400"
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center px-3 py-2 bg-slate-900 border-t border-slate-800">
                <span className="text-green-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white outline-none text-sm"
                  placeholder="Type help..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
