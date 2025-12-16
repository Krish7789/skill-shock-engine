import { Upload, Search, BarChart3, Share2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Drop your PDF and watch our AI dissect every claim you've made",
  },
  {
    icon: Search,
    title: "Link Profiles",
    description: "Connect your LeetCode & GFG accounts for raw, unfiltered data",
  },
  {
    icon: BarChart3,
    title: "Get Analyzed",
    description: "AI cross-references claims vs reality in under 10 seconds",
  },
  {
    icon: Share2,
    title: "Face The Truth",
    description: "Receive your brutal verdict and shareable reality check",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-32 relative bg-card/30">
      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How The <span className="text-gradient-ai">Shock</span> Unfolds
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four steps between you and uncomfortable self-awareness
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-shock-red/50 via-ai-blue/50 to-ai-violet/50 hidden md:block" />

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Step card */}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary border border-border flex items-center justify-center mb-4 group-hover:border-shock-red/50 transition-colors">
                      <step.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-shock-red text-foreground text-xs font-bold flex items-center justify-center md:left-1/2 md:-translate-x-1/2 md:right-auto">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
