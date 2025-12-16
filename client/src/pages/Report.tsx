import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, TrendingDown, TrendingUp, Target, Share2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";
import { useLocation } from "react-router-dom";



const skillAnalysis = [
  { skill: "Data Structures", claimed: "Expert", reality: "Intermediate", gap: -2, score: 62 },
  { skill: "Algorithms", claimed: "Strong", reality: "Below Average", gap: -3, score: 45 },
  { skill: "System Design", claimed: "Proficient", reality: "Beginner", gap: -4, score: 28 },
  { skill: "Dynamic Programming", claimed: "Advanced", reality: "Intermediate", gap: -2, score: 55 },
  { skill: "SQL/Databases", claimed: "Strong", reality: "Strong", gap: 0, score: 78 },
  { skill: "OOP Concepts", claimed: "Expert", reality: "Proficient", gap: -1, score: 72 },
];

const interviewStages = [
  { name: "Resume Screening", status: "pass", probability: 85 },
  { name: "Online Assessment", status: "risk", probability: 62 },
  { name: "Technical Round 1", status: "fail", probability: 35 },
  { name: "System Design", status: "fail", probability: 18 },
  { name: "HR Interview", status: "unknown", probability: null },
];


const Report = () => {
  const navigate = useNavigate();
  
  const [showShare, setShowShare] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);


  useEffect(() => {
    const storedReport = localStorage.getItem("report");

    if (!storedReport) {
      navigate("/analyze");
      return;
    }

    try {
      setReport(JSON.parse(storedReport));
    } catch {
      navigate("/analyze");
    }
  }, [navigate]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading report...</p>
      </div>
    );
  }
  const overallScore = report.readinessScore;
const verdict = report.finalVerdict;
const explanation = report.finalVerdict;



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-shock-red/50 bg-shock-red/10 mb-6">
              <AlertTriangle className="w-4 h-4 text-shock-red" />
              <span className="text-sm font-medium text-shock-red">Reality Check Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="text-gradient-shock">Shock Report</span>
            </h1>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Panel - Skill Analysis */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-gradient-card border border-border p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-shock-red" />
                  Claims vs Reality
                </h2>

                <div className="space-y-4">
                  {skillAnalysis.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-foreground">{item.skill}</span>
                        <span className={`text-sm font-bold ${item.gap < 0 ? "text-shock-red" : "text-success-green"}`}>
                          {item.gap < 0 ? item.gap : `+${item.gap}`}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Claimed: </span>
                          <span className="text-foreground">{item.claimed}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reality: </span>
                          <span className={item.gap < -1 ? "text-shock-red" : "text-foreground"}>{item.reality}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.score < 40 ? "bg-shock-red" : item.score < 60 ? "bg-warning-amber" : "bg-success-green"
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

           {/* Center Panel - Verdict */}
<div className="lg:col-span-4">
  <div className="rounded-2xl bg-gradient-card border border-shock-red/30 p-6 shadow-shock 
                  max-h-[6250x] flex flex-col">

    {/* Header */}
    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
      <Target className="w-5 h-5 text-ai-blue" />
      AI Verdict
    </h2>

    {/* Score */}
    <div className="flex justify-center mb-4">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--shock-red))"
            strokeWidth="8"
            strokeDasharray={`${overallScore * 2.83} 283`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-shock-red">
            {overallScore}
          </span>
          <span className="text-xs text-muted-foreground tracking-wide">
            READINESS
          </span>
        </div>
      </div>
    </div>

   {/* Verdict Content */}
<div className="flex-1 flex flex-col text-center max-w-[420px] mx-auto">

  {/* One-line Verdict */}
  <p className="text-lg font-semibold text-foreground mb-3">
    {verdict}
  </p>

  {/* Divider */}
  <div className="h-px bg-border my-3" />

  {/* Short Summary */}
  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
    Based on LeetCode and GFG data, the candidate shows strong
    problem-solving fundamentals but lacks evidence of real-world
    software development experience.
  </p>

  {/* Expandable Full Analysis */}
  <p
    className={`text-sm text-muted-foreground leading-relaxed ${
      expanded ? "" : "line-clamp-3"
    }`}
  >
    {explanation}
  </p>

  <button
    onClick={() => setExpanded(!expanded)}
    className="mt-2 text-xs text-ai-blue hover:underline"
  >
    {expanded ? "Show less" : "Read full analysis"}
  </button>

</div>



    {/* CTA Buttons */}
    <div className="space-y-2 mt-4">
      <Button
        variant="ai"
        className="w-full"
        onClick={() => navigate("/improve")}
      >
        <Lightbulb className="w-4 h-4 mr-2" />
        What If I Improved?
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowShare(true)}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share My Reality Check
      </Button>
    </div>

  </div>
</div>


            {/* Right Panel - Interview Prediction */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl bg-gradient-card border border-border p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning-amber" />
                  Failure Prediction
                </h2>

                <div className="space-y-3">
                  {interviewStages.map((stage, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border ${
                        stage.status === "fail"
                          ? "bg-shock-red/10 border-shock-red/50"
                          : stage.status === "risk"
                          ? "bg-warning-amber/10 border-warning-amber/50"
                          : stage.status === "pass"
                          ? "bg-success-green/5 border-success-green/30"
                          : "bg-muted/50 border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{stage.name}</span>
                        {stage.status === "fail" && (
                          <span className="text-xs font-bold text-shock-red uppercase">Likely Fail</span>
                        )}
                        {stage.status === "risk" && (
                          <span className="text-xs font-bold text-warning-amber uppercase">At Risk</span>
                        )}
                        {stage.status === "pass" && (
                          <span className="text-xs font-bold text-success-green uppercase">Likely Pass</span>
                        )}
                      </div>
                      {stage.probability !== null && (
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stage.status === "fail"
                                ? "bg-shock-red"
                                : stage.status === "risk"
                                ? "bg-warning-amber"
                                : "bg-success-green"
                            }`}
                            style={{ width: `${stage.probability}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-shock-red/10 border border-shock-red/30">
                  <p className="text-sm font-bold text-shock-red mb-1">Critical Failure Point</p>
                  <p className="text-sm text-muted-foreground">Technical Interview Round 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm" onClick={() => setShowShare(false)}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <ShareCard score={overallScore} verdict={verdict} onClose={() => setShowShare(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const ShareCard = ({ score, verdict, onClose }: { score: number; verdict: string; onClose: () => void }) => {
  return (
    <div className="rounded-2xl bg-gradient-card border border-border p-8 shadow-card animate-scale-in">
      {/* Card Content */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-shock-red/20 mb-4">
          <span className="text-3xl font-black text-shock-red">{score}</span>
        </div>
        <p className="text-lg font-bold text-foreground mb-2">{verdict}</p>
        <p className="text-sm text-muted-foreground italic">
          "My resume was lying. The data wasn't."
        </p>
      </div>

      {/* Watermark */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
        <span className="text-xs">Generated by</span>
        <span className="text-xs font-bold text-foreground">Skill Gap Shock Engine</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="shock" className="flex-1" onClick={() => navigator.clipboard.writeText(`I scored ${score}/100 on my Skill Gap analysis. ${verdict} Try it: skillgapshock.com`)}>
          Copy to Clipboard
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Report;
