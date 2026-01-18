import { useUser } from "@clerk/clerk-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import {
  StreamCall,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data, isLoading, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = data?.session ?? null;

  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  /* ---------------- PROBLEM LOOKUP (SAFE) ---------------- */
  const problemData = useMemo(() => {
    if (!session?.problem) return null;
    return (
      Object.values(PROBLEMS).find(
        (p) => p.title?.trim() === session.problem?.trim()
      ) ?? null
    );
  }, [session?.problem]); // Only depend on session.problem

  /* ---------------- LANGUAGE + CODE STATE ---------------- */
  const defaultLanguage = useMemo(() => {
    if (!problemData?.starterCode) return "javascript";
    return Object.keys(problemData.starterCode)[0];
  }, [problemData?.starterCode]); // Only depend on starterCode

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState("");

  // Track if we've initialized the code
  const isInitialized = useRef(false);

  /* Initialize code once when problemData loads */
  useEffect(() => {
    if (!problemData?.starterCode || isInitialized.current) return;

    const languages = Object.keys(problemData.starterCode);
    const initialLang = languages.includes(defaultLanguage) 
      ? defaultLanguage 
      : languages[0];

    setSelectedLanguage(initialLang);
    setCode(problemData.starterCode[initialLang]);
    isInitialized.current = true;
  }, [problemData?.starterCode, defaultLanguage]);

  /* Reset initialization when problem changes */
  useEffect(() => {
    isInitialized.current = false;
  }, [problemData?.title]);

  /* ---------------- AUTO JOIN SESSION ---------------- */
  useEffect(() => {
    if (!session || !user || isLoading) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, {
      onSuccess: () => refetch(),
    });
  }, [session?.id, user?.id, isLoading, isHost, isParticipant, id]);

  /* ---------------- HANDLE SESSION END ---------------- */
  useEffect(() => {
    if (!session || isLoading) return;
    if (session.status === "completed") {
      navigate("/dashboard");
    }
  }, [session?.status, isLoading, navigate]);

  /* ---------------- STREAM CLIENT ---------------- */
  const {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  } = useStreamClient(
    session,
    isLoading,
    isHost,
    isParticipant
  );

  /* ---------------- ACTIONS ---------------- */
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problemData?.starterCode?.[lang] || "");
    setOutput(null);
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 70, spread: 220, origin: { x: 0.25, y: 0.65 } });
    confetti({ particleCount: 70, spread: 220, origin: { x: 0.75, y: 0.65 } });
  };

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

    try {
      const result = await executeCode(selectedLanguage, code);
      const rawOutput = result?.output || result?.run?.output || "";

      if (!rawOutput.trim()) {
        toast.error("No output produced");
        setOutput({ success: false, error: "No output" });
        return;
      }

      setOutput({ ...result, output: rawOutput });

      if (!problemData?.expectedOutput?.[selectedLanguage]) {
        toast.success("Code executed successfully");
        return;
      }

      const expectedOutput = problemData.expectedOutput[selectedLanguage];
      const passed = checkIfTestsPassed(rawOutput, expectedOutput);

      if (passed) {
        triggerConfetti();
        toast.success("All tests passed! Great job! 🎉");
      } else {
        toast.error("Tests failed. Check your output.");
      }
    } catch (err) {
      console.error("Execution error:", err);
      toast.error("Code execution failed");
      setOutput({ success: false, error: err.message });
    } finally {
      setIsRunning(false);
    }
  };

  const handleEndSession = () => {
    if (!confirm("End this session for all participants?")) return;

    endSessionMutation.mutate(id, {
      onSuccess: () => navigate("/dashboard"),
    });
  };

  /* ---------------- LOADING STATE ---------------- */
  if (isLoading || !session) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b0f14]">
        <Loader2Icon className="w-12 h-12 animate-spin text-orange-400" />
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="h-screen flex flex-col bg-[#0b0f14] text-white">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT SIDE */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto">
                  <div className="p-6 bg-black/50 border-b border-white/10">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-extrabold">
                          {session.problem}
                        </h1>
                        <p className="text-white/60 mt-1">
                          {problemData?.category}
                        </p>
                        <p className="text-white/50 mt-2">
                          Host: {session.host?.name} •{" "}
                          {session.participant ? "2/2" : "1/2"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty}
                        </span>

                        {isHost && session.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {problemData?.description && (
                      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Description</h2>

                        <p className="text-white/80">
                          {problemData.description.text}
                        </p>

                        {problemData.description.notes?.map((note, i) => (
                          <p key={i} className="text-white/70">
                            {note}
                          </p>
                        ))}
                      </div>
                    )}

                    {problemData?.examples?.length > 0 && (
                      <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                        <h2 className="text-xl font-semibold mb-4">Examples</h2>

                        <div className="space-y-4 font-mono text-sm">
                          {problemData.examples.map((ex, i) => (
                            <div key={i} className="bg-black/40 rounded-xl p-4">
                              <p className="text-orange-400 mb-1">
                                Example {i + 1}
                              </p>
                              <p>
                                <span className="text-white/60">Input:</span> {ex.input}
                              </p>
                              <p>
                                <span className="text-white/60">Output:</span> {ex.output}
                              </p>
                              {ex.explanation && (
                                <p className="text-white/50 mt-2">
                                  {ex.explanation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {problemData?.constraints?.length > 0 && (
                      <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                        <h2 className="text-xl font-semibold mb-4">Constraints</h2>
                        <ul className="space-y-2 text-white/70 text-sm">
                          {problemData.constraints.map((c, i) => (
                            <li key={i}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-white/10" />

              {/* EDITOR */}
              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={setCode}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-white/10" />

                  <Panel defaultSize={30}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-white/10" />

          {/* RIGHT SIDE – VIDEO */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full p-4">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2Icon className="w-12 h-12 animate-spin text-orange-400" />
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <PhoneOffIcon className="w-12 h-12 text-red-400" />
                </div>
              ) : (
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI
                      chatClient={chatClient}
                      channel={channel}
                    />
                  </StreamCall>
                </StreamVideo>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;