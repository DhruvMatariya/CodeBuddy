const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_MAP = {
  cpp: "cpp",
  python: "python",
  java: "java",
};

/**
 * @param {string} language - cpp | python | java
 * @param {string} code
 */
export async function executeCode(language, code) {
  try {
    const pistonLang = LANGUAGE_MAP[language];

    if (!pistonLang) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: pistonLang,
        version: "*", // Use latest version
        files: [
          {
            name: "main",
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        success: false,
        error: `Piston error ${response.status}: ${text}`,
      };
    }

    const data = await response.json();

    const stdout = data.run?.stdout || "";
    const stderr = data.run?.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: stdout,
        error: stderr,
      };
    }

    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}
