import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Sparkles, Target } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const improvementFactors = [
  { id: "dp", label: "Dynamic Programming Problems", max: 50, baseImpact: 0.8 },
  { id: "medium", label: "Medium LC Problems", max: 100, baseImpact: 0.5 },
  { id: "hard", label: "Hard LC Problems", max: 30, baseImpact: 1.2 },
  { id: "system", label: "System Design Projects", max: 5, baseImpact: 4 },
  { id: "contests", label: "Weekly Contests Participated", max: 20, baseImpact: 1.5 },
];

const Improve = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, number>>({
    dp: 0,
    medium: 0,
    hard: 0,
    system: 0,
    contests: 0,
  });

  const baseScore = 47;
  const maxBonus = 53;

  const calculateBonus = () => {
    let totalImpact = 0;
    improvementFactors.forEach((factor) => {
      const normalized = values[factor.id] / factor.max;
      totalImpact += normalized * factor.baseImpact * 10;
    });
    return Math.min(totalImpact, maxBonus);
  };

  const bonus = calculateBonus();
  const newScore = Math.round(baseScore + bonus);
  const successProbability = Math.min(95, Math.round(35 + bonus * 1.1));

  const getVerdict = () => {
    if (newScore >= 85) return { text: "You would be interview-ready.", color: "text-success-green" };
    if (newScore >= 70) return { text: "You would pass most technical rounds.", color: "text-success-green" };
    if (newScore >= 55) return { text: "You would be a competitive candidate.", color: "text-warning-amber" };
    return { text: "You would still need more work.", color: "text-shock-red" };
  };

  const verdict = getVerdict();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" className="mb-8" onClick={() => navigate("/report")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Report
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ai-blue/50 bg-ai-blue/10 mb-6">
              <Sparkles className="w-4 h-4 text-ai-blue" />
              <span className="text-sm font-medium text-ai-blue">Counterfactual Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What If You <span className="text-gradient-ai">Actually Improved?</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Adjust the sliders to see how specific improvements would change your interview success probability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sliders Panel */}
            <div className="rounded-2xl bg-gradient-card border border-border p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-ai-blue" />
                Improvement Factors
              </h2>

              <div className="space-y-8">
                {improvementFactors.map((factor) => (
                  <div key={factor.id}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-foreground">
                        {factor.label}
                      </label>
                      <span className="text-sm font-bold text-ai-blue">
                        +{values[factor.id]}
                      </span>
                    </div>
                    <Slider
                      value={[values[factor.id]]}
                      onValueChange={([val]) => setValues({ ...values, [factor.id]: val })}
                      max={factor.max}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">0</span>
                      <span className="text-xs text-muted-foreground">{factor.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Score Comparison */}
              <div className="rounded-2xl bg-gradient-card border border-border p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-success-green" />
                  Projected Impact
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Current Score */}
                  <div className="text-center p-6 rounded-xl bg-shock-red/10 border border-shock-red/30">
                    <p className="text-sm text-muted-foreground mb-2">Current Score</p>
                    <p className="text-4xl font-black text-shock-red">{baseScore}</p>
                  </div>

                  {/* Projected Score */}
                  <div className="text-center p-6 rounded-xl bg-success-green/10 border border-success-green/30">
                    <p className="text-sm text-muted-foreground mb-2">Projected Score</p>
                    <p className="text-4xl font-black text-success-green">{newScore}</p>
                  </div>
                </div>

                {/* Improvement Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Score Improvement</span>
                    <span className="text-success-green font-bold">+{Math.round(bonus)} pts</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-shock-red via-warning-amber to-success-green transition-all duration-500"
                      style={{ width: `${newScore}%` }}
                    />
                  </div>
                </div>

                {/* New Verdict */}
                <div className="p-4 rounded-xl bg-secondary border border-border">
                  <p className="text-sm text-muted-foreground mb-1">New Verdict</p>
                  <p className={`text-lg font-bold ${verdict.color}`}>{verdict.text}</p>
                </div>
              </div>

              {/* Success Probability */}
              <div className="rounded-2xl bg-gradient-card border border-border p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Technical Interview Pass Probability
                </h3>

                <div className="relative h-4 bg-muted rounded-full overflow-hidden mb-4">
                  {/* Current probability marker */}
                  <div className="absolute top-0 h-full w-1 bg-shock-red z-10" style={{ left: "35%" }} />
                  
                  {/* New probability fill */}
                  <div
                    className="h-full bg-gradient-to-r from-warning-amber to-success-green transition-all duration-500"
                    style={{ width: `${successProbability}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Current: </span>
                    <span className="text-shock-red font-bold">35%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Projected: </span>
                    <span className="text-success-green font-bold">{successProbability}%</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <Button
                variant="ai"
                size="xl"
                className="w-full"
                onClick={() => navigate("/analyze")}
              >
                Start Fresh Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Improve;
