import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Zap, Terminal } from "lucide-react";

const steps = [
  { id: 1, text: "Parsing Resume Claims", duration: 1200 },
  { id: 2, text: "Fetching LeetCode Data", duration: 1200 },
  { id: 3, text: "Fetching GFG Data", duration: 1200 },
  { id: 4, text: "Cross-Analyzing Skills", duration: 1500 },
  { id: 5, text: "Simulating Interview Scenarios", duration: 1500 },
  { id: 6, text: "Generating Shock Report", duration: 1200 },
];

const terminalLogs = [
  "Initializing analysis engine...",
  "Extracting resume claims...",
  "Connecting to LeetCode...",
  "Connecting to GFG...",
  "Cross validating skills...",
  "Running interview simulations...",
  "Finalizing report...",
];

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!location.state) {
      navigate("/analyze");
      return;
    }

    // ✅ GitHub added (nothing else touched)
    const { file, leetcode, gfg, github, role } = location.state as any;

    // ---- 1️⃣ Run animation ----
    let stepIndex = 0;
    let logIndex = 0;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      stepIndex++;
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 95));
    }, 300);

    const logInterval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-6), terminalLogs[logIndex]]);
      logIndex++;
      if (logIndex >= terminalLogs.length) clearInterval(logInterval);
    }, 600);

    // ---- 2️⃣ Call backend ----
    const runAnalysis = async () => {
      try {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("leetcode", leetcode);
        formData.append("gfg", gfg);
        formData.append("github", github); // ✅ NEW
        formData.append("role", role);

       const res = await fetch(
  `${import.meta.env.VITE_API_BASE_URL}/api/analyze`,
  {
    method: "POST",
    body: formData,
  }
);


        const result = await res.json();

        if (!result.success) {
          throw new Error("Analysis failed");
        }

        // Save report
        localStorage.setItem("report", JSON.stringify(result.data));

        // Finish animation
        setProgress(100);

        setTimeout(() => {
          navigate("/report");
        }, 800);
      } catch (err) {
        console.error(err);
        navigate("/analyze");
      }
    };

    runAnalysis();

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-shock mb-4">
            <Zap className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Analyzing Your Claims</h1>
          <p className="text-muted-foreground">This might hurt a little</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-shock transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2 mb-6">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`p-3 rounded-xl border ${
                i === currentStep
                  ? "border-shock-red bg-shock-red/10"
                  : i < currentStep
                  ? "border-success-green bg-success-green/5"
                  : "border-border bg-secondary/40"
              }`}
            >
              {step.text}
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div className="rounded-xl bg-card border border-border">
          <div className="px-4 py-2 border-b border-border flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="text-sm">Analysis Log</span>
          </div>
          <div className="p-4 font-mono text-sm h-40 overflow-hidden">
            {logs.map((log, i) => (
              <div key={i} className="text-ai-blue">
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
