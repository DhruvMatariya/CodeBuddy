import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Default language is now C++
  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(
    PROBLEMS["two-sum"].starterCode.cpp
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  /* -------------------- Sync URL -------------------- */
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage] || "");
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang] || "");
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => {
    navigate(`/problem/${newProblemId}`);
  };

  /* -------------------- Confetti -------------------- */
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 220,
      origin: { x: 0.25, y: 0.65 },
    });
    confetti({
      particleCount: 70,
      spread: 220,
      origin: { x: 0.75, y: 0.65 },
    });
  };

  /* -------------------- Output Check -------------------- */
  const normalizeOutput = (output) =>
    output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter(Boolean)
      .join("\n");

  const checkIfTestsPassed = (actual, expected) =>
    normalizeOutput(actual) === normalizeOutput(expected);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput =
        currentProblem.expectedOutput[selectedLanguage];

      const passed = checkIfTestsPassed(
        result.output,
        expectedOutput
      );

      if (passed) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output.");
      }
    } else {
      toast.error("Code execution failed.");
    }
  };

  return (
    <div className="h-screen bg-[#0b0f14] text-white flex flex-col">
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          
          {/* LEFT — PROBLEM DESCRIPTION */}
          <Panel defaultSize={40} minSize={28}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          {/* RESIZE HANDLE */}
          <PanelResizeHandle className="w-2 bg-white/5 hover:bg-orange-500/30 transition-colors cursor-col-resize" />

          {/* RIGHT — EDITOR + OUTPUT */}
          <Panel defaultSize={60} minSize={32}>
            <PanelGroup direction="vertical">

              {/* CODE EDITOR */}
              <Panel defaultSize={70} minSize={35}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              {/* RESIZE HANDLE */}
              <PanelResizeHandle className="h-2 bg-white/5 hover:bg-orange-500/30 transition-colors cursor-row-resize" />

              {/* OUTPUT */}
              <Panel defaultSize={30} minSize={25}>
                <OutputPanel output={output} />
              </Panel>

            </PanelGroup>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
