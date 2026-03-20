import { useState } from "react";
import { Shield, ShieldAlert, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useToast } from "../components/ui/Toast";
import { Modal } from "../components/ui/Modal";

export function PolicyManagement() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [planOption, setPlanOption] = useState("Standard");
  const { addToast } = useToast();

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
      addToast({ title: "Coverage Updated", description: "Your new parameters are active immediately.", variant: "success" });
    }, 1200);
  };

  const PLANS = [
    { name: "Basic", price: "₹99/wk", coverage: "Upto ₹20,000", disruptions: "Curfew & Heavy Rain" },
    { name: "Standard", price: "₹149/wk", coverage: "Upto ₹50,000", disruptions: "Weather, AQI > 300, Curfew" },
    { name: "Premium", price: "₹299/wk", coverage: "Upto ₹1,00,000", disruptions: "All Disruptions + Loss of Work" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Policy Management</h1>
          <p className="text-muted-foreground">Review and optimize your automated coverage.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Upgrade Coverage</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/50 shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Current Plan: Standard</CardTitle>
            </div>
            <CardDescription>Active since March 1, 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">Weekly Premium</span>
              <span className="font-bold">₹149</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground">Max Payout</span>
              <span className="font-bold">₹50,000</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-muted-foreground">Auto-trigger Conditions</span>
              <div className="flex space-x-2">
                <Badge variant="outline">Rain &gt; 50mm</Badge>
                <Badge variant="outline">AQI &gt; 300</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <CardTitle>Risk Factors Profile</CardTitle>
            </div>
            <CardDescription>Parameters affecting your premium</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-secondary p-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Job Category</p>
                  <p className="text-xs text-muted-foreground">Delivery (High Exposure)</p>
                </div>
              </div>
              <Badge variant="warning">Medium Risk</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-secondary p-2">
                  <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Primary Zone</p>
                  <p className="text-xs text-muted-foreground">Bangalore, Koramangala</p>
                </div>
              </div>
              <Badge variant="outline">Low Risk</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Included Protections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Heavy Rainfall (>50mm/day)", "Severe AQI (>300 sustained)", "Government Curfew (Sec 144)","Platform Outage (>4 hours)"].map(opt => (
            <Card key={opt} className="bg-success/5 border-success/20">
              <CardContent className="p-4 flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{opt}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upgrade Coverage Plans" description="Select a plan that fits your risk profile.">
        <div className="grid gap-4 py-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setPlanOption(plan.name)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${planOption === plan.name ? "border-primary bg-primary/5" : "border-transparent bg-secondary"}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{plan.name}</h3>
                <span className="font-bold text-lg">{plan.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Coverage: {plan.coverage}</p>
              <p className="text-xs text-muted-foreground">Triggers: {plan.disruptions}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={loading || planOption === "Standard"}>
             {loading ? "Processing..." : "Confirm Update"}
          </Button>
        </div>
      </Modal>

    </div>
  );
}
