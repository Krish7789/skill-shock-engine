import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Check, AlertCircle, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/common/Navbar";

const targetRoles = [
  "Software Engineer (Entry Level)",
  "Software Engineer (Mid Level)",
  "Software Engineer (Senior)",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Engineer",
  "ML Engineer",
  "DevOps Engineer",
];

const Analyze = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [gfgUsername, setGfgUsername] = useState("");
  const [githubUrl, setGithubUrl] = useState(""); // ✅ NEW
  const [targetRole, setTargetRole] = useState("");

  // ✅ UPDATED validation (GitHub added)
  const isValid =
    file &&
    leetcodeUsername.trim() &&
    gfgUsername.trim() &&
    githubUrl.trim() &&
    targetRole;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!isValid || !file) return;

    // 🚀 Navigate IMMEDIATELY
    navigate("/loading", {
      state: {
        file,
        leetcode: leetcodeUsername,
        gfg: gfgUsername,
        github: githubUrl, // ✅ NEW
        role: targetRole,
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-background"
      onSubmitCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Your <span className="text-gradient-shock">Claims</span>
            </h1>
            <p className="text-muted-foreground">
              We'll cross-reference with cold, hard data
            </p>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* File Upload */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Resume (PDF only)
              </Label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-shock-red bg-shock-red/5"
                    : file
                    ? "border-success-green bg-success-green/5"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success-green/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-success-green" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">
                        {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium mb-1">
                      Drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Coding Profiles */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* LeetCode */}
              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  LeetCode Username
                </Label>
                <div className="relative">
                  <Input
                    value={leetcodeUsername}
                    onChange={(e) =>
                      setLeetcodeUsername(e.target.value)
                    }
                    className="h-12 bg-secondary border-border focus:border-ai-blue"
                  />
                  {leetcodeUsername && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success-green" />
                  )}
                </div>
              </div>

              {/* GFG */}
              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  GeeksForGeeks Username
                </Label>
                <div className="relative">
                  <Input
                    value={gfgUsername}
                    onChange={(e) => setGfgUsername(e.target.value)}
                    className="h-12 bg-secondary border-border focus:border-ai-blue"
                  />
                  {gfgUsername && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success-green" />
                  )}
                </div>
              </div>
            </div>

            {/* ✅ GitHub Profile (NEW, same styling) */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                GitHub Profile URL
              </Label>
              <Input
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="h-12 bg-secondary border-border focus:border-ai-blue"
              />
            </div>

            {/* Target Role */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Target Role
              </Label>
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger className="h-12 bg-secondary border-border">
                  <SelectValue placeholder="Select your target role" />
                </SelectTrigger>
                <SelectContent>
                  {targetRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-shock-red/10 border border-shock-red/20">
              <AlertCircle className="w-5 h-5 text-shock-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Fair Warning
                </p>
                <p className="text-sm text-muted-foreground">
                  The analysis ahead may be uncomfortable. Our AI doesn't care
                  about your feelings—only the data.
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="button"
              variant="brutal"
              size="xl"
              className="w-full group"
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Run Skill Gap Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analyze;
