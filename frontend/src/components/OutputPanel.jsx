function OutputPanel({ output }) {
  return (
    <div className="h-full flex flex-col bg-[#0b0f14] text-white">

      {/* HEADER */}
      <div
        className="px-4 py-2 text-sm font-semibold
        bg-black/50 backdrop-blur-xl
        border-b border-white/10"
      >
        Output
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-auto p-4 text-sm font-mono">

        {/* EMPTY STATE */}
        {output === null ? (
          <p className="text-white/40">
            Click <span className="text-orange-400">Run Code</span> to see the output here…
          </p>
        ) : output.success ? (
          /* SUCCESS OUTPUT */
          <pre className="whitespace-pre-wrap text-green-400">
            {output.output}
          </pre>
        ) : (
          /* ERROR / WARNING OUTPUT */
          <div className="space-y-3">
            {output.output && (
              <pre className="whitespace-pre-wrap text-white/80">
                {output.output}
              </pre>
            )}
            <pre className="whitespace-pre-wrap text-red-400">
              {output.error}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default OutputPanel;
