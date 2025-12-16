import { FileText, Code2, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Claims",
    description: "We extract every skill you've claimed. Every buzzword. Every 'proficient in' statement.",
    accent: "shock-red",
    delay: "stagger-1",
  },
  {
    icon: Code2,
    title: "Coding Reality",
    description: "Your LeetCode & GFG data tells the truth. Problems solved. Difficulty distribution. Actual competence.",
    accent: "ai-blue",
    delay: "stagger-2",
  },
  {
    icon: AlertTriangle,
    title: "Failure Prediction",
    description: "Our AI simulates interview rounds and predicts exactly where you'll crack under pressure.",
    accent: "warning-amber",
    delay: "stagger-3",
  },
];

const FeatureCards = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The <span className="text-gradient-shock">Brutal</span> Truth Engine
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three-stage analysis that leaves nowhere to hide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-${feature.accent}/50 transition-all duration-500 opacity-0 animate-slide-up ${feature.delay}`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-${feature.accent}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-${feature.accent}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 text-${feature.accent}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Number indicator */}
              <div className="absolute top-6 right-6 text-6xl font-black text-foreground/5 select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
