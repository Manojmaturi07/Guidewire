import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Zap, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import { api } from "../services/api";

export function Onboarding() {
  const { user, loginUser } = useAppContext();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    jobType: user?.jobType || "Delivery",
    plan: "Standard"
  });

  const PLANS = [
    { name: "Basic", price: "₹99/wk", coverage: "Upto ₹20,000" },
    { name: "Standard", price: "₹149/wk", coverage: "Upto ₹50,000" },
    { name: "Premium", price: "₹299/wk", coverage: "Upto ₹1,00,000" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.location) {
      addToast({ title: "Validation Error", description: "Please enter your location.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const updatedUser = await api.completeOnboarding(user.id, formData);
      loginUser(updatedUser); // Update the context with the new hasActivePlan flag
      addToast({ title: "Setup Complete", description: "Your dashboard is ready.", variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      addToast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 bg-background"
    >
      <Card className="w-full max-w-lg border-border/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {user?.name.split(" ")[0]}!</CardTitle>
          <CardDescription>Let's set up your income protection plan before you start.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Primary Work Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. Bangalore, Kormangala"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Job Type</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background appearance-none"
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                >
                  <option value="Delivery">Delivery</option>
                  <option value="Ride-hailing">Ride-hailing</option>
                  <option value="Freelancer">Freelancer / Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium leading-none">Select Coverage Plan</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {PLANS.map((plan) => (
                  <div
                    key={plan.name}
                    onClick={() => setFormData({ ...formData, plan: plan.name })}
                    className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                      formData.plan === plan.name 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold text-sm">{plan.name}</p>
                    <p className="font-bold text-lg text-primary my-1">{plan.price}</p>
                    <p className="text-xs text-muted-foreground">{plan.coverage}</p>
                  </div>
                ))}
              </div>
            </div>

          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6 pb-6">
          <Button variant="ghost" onClick={() => navigate("/")}>Sign out</Button>
          <Button type="submit" form="onboarding-form" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
            Activate Coverage
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
