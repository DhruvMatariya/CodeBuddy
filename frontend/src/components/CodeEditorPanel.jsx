import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  // ✅ SAFE fallback language (prevents undefined.icon crash)
  const fallbackLanguageKey = Object.keys(LANGUAGE_CONFIG)[0];
  const language =
    LANGUAGE_CONFIG[selectedLanguage] || LANGUAGE_CONFIG[fallbackLanguageKey];

  return (
    <div className="h-full flex flex-col bg-[#0b0f14] text-white">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* ✅ SAFE icon rendering */}
          {language?.icon && (
            <img
              src={language.icon}
              alt={language.name}
              className="size-6 opacity-90"
            />
          )}

          <select
            className="select select-sm bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-400"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} className="bg-[#0b0f14]">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={isRunning}
          onClick={onRunCode}
          className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            isRunning
              ? "bg-orange-500/20 text-orange-300 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-amber-400 text-black hover:shadow-[0_8px_30px_rgba(255,140,0,0.45)] hover:scale-[1.03]"
          }`}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language.monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 10 },
            fontLigatures: true,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;
