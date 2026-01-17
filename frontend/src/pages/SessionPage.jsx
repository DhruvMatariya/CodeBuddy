function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } =
    useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || ""
  );

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("End this session for all participants?")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

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
                <div className="h-full overflow-y-auto bg-[#0b0f14]">

                  {/* HEADER */}
                  <div className="p-6 bg-black/50 backdrop-blur-xl border-b border-white/10">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-extrabold">
                          {session?.problem || "Loading..."}
                        </h1>
                        <p className="text-white/60 mt-1">
                          {problemData?.category}
                        </p>
                        <p className="text-white/50 mt-2">
                          Host: {session?.host?.name} •{" "}
                          {session?.participant ? "2/2" : "1/2"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty}
                        </span>

                        {isHost && session?.status === "active" && (
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

                  {/* CONTENT */}
                  <div className="p-6 space-y-6">

                    {/* DESCRIPTION */}
                    {problemData?.description && (
                      <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                        <h2 className="text-xl font-semibold mb-4">
                          Description
                        </h2>
                        <div className="space-y-3 text-white/80">
                          <p>{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, i) => (
                            <p key={i}>{note}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EXAMPLES */}
                    {problemData?.examples?.length > 0 && (
                      <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                        <h2 className="text-xl font-semibold mb-4">
                          Examples
                        </h2>
                        <div className="space-y-4 font-mono text-sm">
                          {problemData.examples.map((ex, i) => (
                            <div key={i} className="bg-black/40 rounded-xl p-4">
                              <p className="text-orange-400 mb-1">
                                Example {i + 1}
                              </p>
                              <p>
                                <span className="text-white/60">Input:</span>{" "}
                                {ex.input}
                              </p>
                              <p>
                                <span className="text-white/60">Output:</span>{" "}
                                {ex.output}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-white/10 hover:bg-orange-400 cursor-row-resize" />

              {/* EDITOR + OUTPUT */}
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

                  <PanelResizeHandle className="h-2 bg-white/10 hover:bg-orange-400 cursor-row-resize" />

                  <Panel defaultSize={30}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-white/10 hover:bg-orange-400 cursor-col-resize" />

          {/* RIGHT SIDE – VIDEO */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-[#0b0f14] p-4">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2Icon className="w-12 h-12 animate-spin text-orange-400" />
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center">
                    <PhoneOffIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-lg">Connection Failed</p>
                  </div>
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
