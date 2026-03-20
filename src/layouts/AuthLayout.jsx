import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/ui/Button";

export function AuthLayout() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80" />
      
      {/* Universal Floating Back Button */}
      <div className="absolute top-6 left-4 sm:left-6 z-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors rounded-full px-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Landing
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
