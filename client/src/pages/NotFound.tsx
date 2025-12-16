import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-shock-red/20 mb-8">
          <AlertTriangle className="w-10 h-10 text-shock-red" />
        </div>

        <h1 className="text-6xl font-black text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This route doesn't exist in our data.
          <br />
          <span className="text-foreground font-medium">Unlike your skill gaps.</span>
        </p>

        <Button variant="shock" onClick={() => navigate("/")} className="group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Reality Check
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
